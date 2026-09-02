/**
 * Rapport assignation photos ↔ projets (lecture seule).
 *   pnpm audit:projects
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { SOURCE_PROJECTS } from '../lib/projects-source'
import { PROJECT_PHOTO_MAP, resolveProjectPhotoFilenames } from '../lib/project-photo-map'
import { isRejectedPhotoFilename } from '../lib/media-curation'
import type { Media, Project } from '@/payload-types'

function mediaFilename(value: number | Media | null | undefined): string | null {
  if (value && typeof value === 'object' && 'filename' in value) return value.filename ?? null
  return null
}

async function main() {
  const payload = await getPayload({ config })

  const { docs: mediaDocs } = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 200,
    sort: 'filename',
  })

  const assigned = new Set<string>()
  const { docs: projects } = await payload.find({
    collection: 'projects',
    locale: 'fr',
    limit: 20,
    depth: 1,
    sort: 'sortOrder',
  })

  console.log('=== REVUE PROJETS ===\n')

  for (const project of projects as Project[]) {
    const slug = project.slug ?? ''
    const cover = mediaFilename(project.coverImage)
    const gallery = (project.gallery ?? [])
      .map((item) => mediaFilename(item.media))
      .filter((name): name is string => Boolean(name))

    for (const file of cover ? [cover, ...gallery] : gallery) assigned.add(file)

    const expected = resolveProjectPhotoFilenames(slug)
    let status = 'OK'
    if (!cover && !expected) status = 'SANS PHOTO'
    else if (!cover && expected) status = 'MANQUE'
    else if (expected && cover !== expected.cover) status = 'ÉCART'

    console.log(`${status.padEnd(12)} ${slug}`)
    console.log(`  titre: ${project.title}`)
    if (cover) {
      const note = expected && expected.cover !== cover ? ` (attendu: ${expected.cover})` : ''
      console.log(`  cover: ${cover}${note}`)
    }
    console.log(`  galerie (${gallery.length}): ${gallery.length ? gallery.join(', ') : '—'}`)
    console.log('')
  }

  const chantier = mediaDocs.filter(
    (doc) => doc.filename?.includes('sogica-chantier') && !isRejectedPhotoFilename(doc.filename),
  )
  const orphans = chantier.filter((doc) => doc.filename && !assigned.has(doc.filename))

  console.log(`=== PHOTOS ORPHELINES (${orphans.length}) ===`)
  for (const doc of orphans) console.log(`  ${doc.filename}`)

  console.log(
    `\n=== PROJETS SANS MAPPING (${SOURCE_PROJECTS.filter((p) => !PROJECT_PHOTO_MAP[p.slug]).length}) ===`,
  )
  for (const project of SOURCE_PROJECTS.filter((p) => !PROJECT_PHOTO_MAP[p.slug])) {
    console.log(`  ${project.slug}`)
  }

  console.log('\n=== PHOTOS REJETÉES ENCORE EN CMS ===')
  const rejectedInCms = mediaDocs.filter((doc) => isRejectedPhotoFilename(doc.filename))
  if (rejectedInCms.length) {
    for (const doc of rejectedInCms) console.log(`  ALERTE: ${doc.filename}`)
  } else {
    console.log('  Aucune — OK')
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
