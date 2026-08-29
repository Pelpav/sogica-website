import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getPayload } from 'payload'

const ROOT = process.cwd()
const UPLOADS_DIR = path.join(ROOT, 'public/media/uploads')
const SOURCE_PHOTOS = path.join(ROOT, '_source/photos')
const SOURCE_BRAND = path.join(ROOT, '_source/brand')

const MEDIA_EXT = /\.(jpe?g|png|webp|gif|mp4|pdf)$/i

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
}

type CliOptions = {
  dryRun: boolean
  force: boolean
  skipCms: boolean
  noCreateMissing: boolean
}

function parseCli(): CliOptions {
  const args = new Set(process.argv.slice(2))
  return {
    dryRun: args.has('--dry-run'),
    force: args.has('--force'),
    skipCms: args.has('--skip-cms'),
    noCreateMissing: args.has('--no-create-missing'),
  }
}

function assertR2Config() {
  const required = [
    'R2_BUCKET',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_ENDPOINT',
    'R2_PUBLIC_URL',
  ] as const
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) {
    throw new Error(`Variables R2 manquantes : ${missing.join(', ')}`)
  }
  if (process.env.USE_LOCAL_MEDIA === 'true' || process.env.USE_LOCAL_MEDIA === '1') {
    console.warn(
      'USE_LOCAL_MEDIA est actif : lancez via `pnpm import:media` (force USE_LOCAL_MEDIA=false) pour créer les entrées CMS sur R2.',
    )
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  return MIME_BY_EXT[ext] ?? 'application/octet-stream'
}

function createS3Client() {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  })
}

function collectLocalFiles(): Map<string, string> {
  const files = new Map<string, string>()

  const addDir = (dir: string, filter?: (name: string) => boolean) => {
    if (!fs.existsSync(dir)) return
    for (const name of fs.readdirSync(dir)) {
      if (filter && !filter(name)) continue
      const fullPath = path.join(dir, name)
      if (!fs.statSync(fullPath).isFile()) continue
      if (!files.has(name)) files.set(name, fullPath)
    }
  }

  addDir(UPLOADS_DIR)
  addDir(SOURCE_PHOTOS, (name) => MEDIA_EXT.test(name))
  addDir(SOURCE_BRAND, (name) => MEDIA_EXT.test(name))

  return files
}

function collectSourceOnlyFilenames(localFiles: Map<string, string>): Set<string> {
  const sourceOnly = new Set<string>()
  for (const [filename, filePath] of localFiles) {
    if (filePath.startsWith(SOURCE_PHOTOS) || filePath.startsWith(SOURCE_BRAND)) {
      sourceOnly.add(filename)
    }
  }
  return sourceOnly
}

async function objectExists(client: S3Client, key: string): Promise<boolean> {
  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
      }),
    )
    return true
  } catch {
    return false
  }
}

async function uploadFiles(
  client: S3Client,
  localFiles: Map<string, string>,
  options: Pick<CliOptions, 'dryRun' | 'force'>,
) {
  let uploaded = 0
  let skipped = 0
  const concurrency = 5
  const entries = [...localFiles.entries()]

  for (let index = 0; index < entries.length; index += concurrency) {
    const batch = entries.slice(index, index + concurrency)
    await Promise.all(
      batch.map(async ([filename, filePath]) => {
        if (options.dryRun) {
          console.log(`  [dry-run] ↑ ${filename}`)
          return
        }

        if (!options.force && (await objectExists(client, filename))) {
          skipped++
          return
        }

        const body = fs.readFileSync(filePath)
        await client.send(
          new PutObjectCommand({
            Bucket: process.env.R2_BUCKET!,
            Key: filename,
            Body: body,
            ContentType: getContentType(filePath),
          }),
        )
        uploaded++
        console.log(`  ↑ ${filename}`)
      }),
    )
  }

  return { uploaded, skipped }
}

function buildPublicUrl(filename: string): string {
  const base = process.env.R2_PUBLIC_URL!.replace(/\/$/, '')
  return `${base}/${filename}`
}

async function createMissingMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  localFiles: Map<string, string>,
  sourceOnly: Set<string>,
) {
  let created = 0

  for (const [filename, filePath] of localFiles) {
    if (!sourceOnly.has(filename)) continue

    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })
    if (existing.docs.length) continue

    const isVideo = filename.endsWith('.mp4')
    const isBrand = filePath.startsWith(SOURCE_BRAND)

    await payload.create({
      collection: 'media',
      data: {
        alt: isBrand ? 'SOGICA SA' : '',
        assignmentStatus: isBrand ? 'assigned' : 'unassigned',
        virtualFolder: isBrand ? undefined : 'non-classe',
        mediaType: isVideo ? 'video' : 'image',
        published: true,
      },
      filePath,
    })

    created++
    console.log(`  créé : ${filename}`)
  }

  return created
}

async function updateCmsUrls(payload: Awaited<ReturnType<typeof getPayload>>) {
  let updated = 0
  let page = 1

  while (true) {
    const result = await payload.find({
      collection: 'media',
      limit: 100,
      page,
    })

    for (const doc of result.docs) {
      const filename = doc.filename as string | undefined
      if (!filename) continue

      const sizes = (doc.sizes || {}) as Record<
        string,
        { filename?: string | null; url?: string | null } | null | undefined
      >

      const nextUrl = buildPublicUrl(filename)
      const nextSizes: Record<string, { filename?: string; url?: string }> = {}
      let changed = doc.url !== nextUrl

      for (const [sizeName, size] of Object.entries(sizes)) {
        if (!size?.filename) continue
        const sizeUrl = buildPublicUrl(size.filename)
        if (size.url !== sizeUrl) changed = true
        nextSizes[sizeName] = {
          filename: size.filename,
          url: sizeUrl,
        }
      }

      if (!changed) continue

      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          url: nextUrl,
          ...(Object.keys(nextSizes).length ? { sizes: nextSizes } : {}),
        },
      })

      updated++
      console.log(`  CMS #${doc.id} : ${filename}`)
    }

    if (!result.hasNextPage) break
    page++
  }

  return updated
}

async function main() {
  const options = parseCli()
  assertR2Config()

  const localFiles = collectLocalFiles()
  console.log(`${localFiles.size} fichier(s) local(aux) à synchroniser`)

  if (localFiles.size === 0) {
    console.log('Aucun fichier dans public/media/uploads/, _source/photos/ ou _source/brand/.')
    process.exit(0)
  }

  const client = createS3Client()
  console.log('Upload vers R2…')
  const { uploaded, skipped } = await uploadFiles(client, localFiles, options)
  console.log(`Upload : ${uploaded} envoyé(s), ${skipped} déjà présent(s)`)

  if (options.skipCms || options.dryRun) {
    console.log('Étape CMS ignorée.')
    process.exit(0)
  }

  const config = (await import('../payload.config.js')).default
  const payload = await getPayload({ config })

  if (!options.noCreateMissing) {
    const sourceOnly = collectSourceOnlyFilenames(localFiles)
    console.log('Création des entrées CMS manquantes (_source)…')
    const created = await createMissingMedia(payload, localFiles, sourceOnly)
    console.log(`  ${created} entrée(s) créée(s)`)
  }

  console.log('Mise à jour des URLs CMS vers R2_PUBLIC_URL…')
  const updated = await updateCmsUrls(payload)
  console.log(`  ${updated} entrée(s) mise(s) à jour`)

  console.log('Import terminé.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
