import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config'
import {
  BRAND_LOGO_FILENAME,
  BRAND_LOGO_WHITE_FILENAME,
  HERO_FALLBACK_FILENAMES,
  buildWhatsAppRenameMap,
  buildWhatsAppRepairMap,
  isLegacyMediaFilename,
  resolveRenamedFilename,
} from '../lib/media-filenames'

const ROOT = process.cwd()
const UPLOADS_DIR = path.join(ROOT, 'public/media/uploads')
const SOURCE_PHOTOS = path.join(ROOT, '_source/photos')
const SOURCE_BRAND = path.join(ROOT, '_source/brand')
const PUBLIC_BRAND = path.join(ROOT, 'public/brand')
const PUBLIC_MEDIA = path.join(ROOT, 'public/media')
const PUBLIC_ROOT = path.join(ROOT, 'public')

function renameFileIfExists(from: string, to: string) {
  if (!fs.existsSync(from)) return false
  if (from === to) return false
  fs.mkdirSync(path.dirname(to), { recursive: true })
  if (fs.existsSync(to)) fs.unlinkSync(to)
  fs.renameSync(from, to)
  return true
}

function renameDirectoryFiles(dir: string, whatsAppMap: Map<string, string>) {
  if (!fs.existsSync(dir)) return 0
  let count = 0
  const files = fs.readdirSync(dir)

  for (const file of files) {
    if (!isLegacyMediaFilename(file)) continue
    const next = resolveRenamedFilename(file, whatsAppMap)
    if (next === file) continue
    if (renameFileIfExists(path.join(dir, file), path.join(dir, next))) {
      count++
      console.log(`  ${file} → ${next}`)
    }
  }

  return count
}

async function updateCmsMedia(whatsAppMap: Map<string, string>) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'media', limit: 500 })
  let updated = 0

  for (const doc of docs) {
    const oldFilename = doc.filename as string | undefined
    if (!oldFilename || !isLegacyMediaFilename(oldFilename)) continue

    const newFilename = resolveRenamedFilename(oldFilename, whatsAppMap)
    if (newFilename === oldFilename) continue

    const sizes = (doc.sizes || {}) as Record<
      string,
      { filename?: string | null; url?: string | null } | null | undefined
    >

    const nextSizes: Record<string, { filename?: string; url?: string }> = {}
    for (const [sizeName, size] of Object.entries(sizes)) {
      if (!size?.filename) continue
      const newSizeFilename = resolveRenamedFilename(size.filename, whatsAppMap)
      nextSizes[sizeName] = {
        filename: newSizeFilename,
        url: size.url?.replace(encodeURIComponent(size.filename), encodeURIComponent(newSizeFilename)),
      }
    }

    const nextUrl =
      typeof doc.url === 'string'
        ? doc.url
            .replace(oldFilename, newFilename)
            .replace(encodeURIComponent(oldFilename), encodeURIComponent(newFilename))
        : undefined

    await payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        filename: newFilename,
        url: nextUrl,
        sizes: nextSizes,
      },
    })

    updated++
    console.log(`  CMS #${doc.id}: ${oldFilename} → ${newFilename}`)
  }

  return updated
}

async function repairCmsMediaSizes(whatsAppMap: Map<string, string>) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'media', limit: 500 })
  let updated = 0

  for (const doc of docs) {
    const sizes = (doc.sizes || {}) as Record<
      string,
      { filename?: string | null; url?: string | null } | null | undefined
    >

    const nextSizes: Record<string, { filename?: string; url?: string }> = {}
    let changed = false

    for (const [sizeName, size] of Object.entries(sizes)) {
      if (!size?.filename) continue
      const newSizeFilename = resolveRenamedFilename(size.filename, whatsAppMap)
      if (newSizeFilename === size.filename) {
        nextSizes[sizeName] = { filename: size.filename, url: size.url ?? undefined }
        continue
      }
      changed = true
      nextSizes[sizeName] = {
        filename: newSizeFilename,
        url: size.url
          ?.replace(size.filename, newSizeFilename)
          .replace(encodeURIComponent(size.filename), encodeURIComponent(newSizeFilename)),
      }
    }

    if (!changed) continue

    await payload.update({
      collection: 'media',
      id: doc.id,
      data: { sizes: nextSizes },
    })

    updated++
    console.log(`  CMS #${doc.id}: variantes redimensionnées mises à jour`)
  }

  return updated
}

async function main() {
  const sourceFiles = fs.existsSync(SOURCE_PHOTOS) ? fs.readdirSync(SOURCE_PHOTOS) : []
  const uploadFiles = fs.existsSync(UPLOADS_DIR) ? fs.readdirSync(UPLOADS_DIR) : []
  const whatsAppMap = buildWhatsAppRenameMap([...sourceFiles, ...uploadFiles])
  const repairMap = buildWhatsAppRepairMap(uploadFiles)
  for (const [key, value] of repairMap) whatsAppMap.set(key, value)

  console.log('Renommage _source/photos…')
  renameDirectoryFiles(SOURCE_PHOTOS, whatsAppMap)

  console.log('Renommage _source/brand…')
  renameFileIfExists(path.join(SOURCE_BRAND, 'logo.png'), path.join(SOURCE_BRAND, BRAND_LOGO_FILENAME))
  renameFileIfExists(
    path.join(SOURCE_BRAND, 'logo_transparent.png'),
    path.join(SOURCE_BRAND, BRAND_LOGO_WHITE_FILENAME),
  )

  console.log('Renommage public/brand…')
  renameFileIfExists(path.join(PUBLIC_BRAND, 'logo.png'), path.join(PUBLIC_BRAND, BRAND_LOGO_FILENAME))
  renameFileIfExists(
    path.join(PUBLIC_BRAND, 'logo_transparent.png'),
    path.join(PUBLIC_BRAND, BRAND_LOGO_WHITE_FILENAME),
  )

  for (const [index, nextName] of HERO_FALLBACK_FILENAMES.entries()) {
    renameFileIfExists(path.join(PUBLIC_ROOT, `example${index + 1}.png`), path.join(PUBLIC_BRAND, nextName))
  }

  renameFileIfExists(path.join(PUBLIC_MEDIA, 'loader.mp4'), path.join(PUBLIC_MEDIA, 'sogica-site-preloader.mp4'))

  console.log('Renommage public/media/uploads…')
  const renamedUploads = renameDirectoryFiles(UPLOADS_DIR, whatsAppMap)
  console.log(`  ${renamedUploads} fichier(s) renommé(s)`)

  console.log('Mise à jour CMS…')
  const cmsUpdated = await updateCmsMedia(whatsAppMap)
  console.log(`  ${cmsUpdated} entrée(s) média mise(s) à jour`)

  console.log('Réparation variantes CMS…')
  const sizesUpdated = await repairCmsMediaSizes(whatsAppMap)
  console.log(`  ${sizesUpdated} entrée(s) avec variantes corrigées`)

  console.log('Terminé.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
