/**
 * Retire les photos non professionnelles (voir src/lib/media-curation.ts).
 *
 *   pnpm media:cull
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../payload.config'
import { REJECTED_PHOTO_FILENAMES, REJECTED_PHOTOS } from '../lib/media-curation'
import type { Media, Project } from '@/payload-types'

const SOURCE_PHOTOS = path.resolve('_source/photos')
const UPLOADS_DIR = path.resolve('public/media/uploads')

function relatedUploadFiles(filename: string): string[] {
  const ext = path.extname(filename)
  const stem = filename.slice(0, -ext.length)
  if (!fs.existsSync(UPLOADS_DIR)) return []

  return fs.readdirSync(UPLOADS_DIR).filter((file) => file === filename || file.startsWith(`${stem}-`))
}

function deleteLocalFiles(filename: string) {
  const paths = [
    path.join(SOURCE_PHOTOS, filename),
    ...relatedUploadFiles(filename).map((file) => path.join(UPLOADS_DIR, file)),
  ]

  for (const filePath of paths) {
    if (!fs.existsSync(filePath)) continue
    fs.unlinkSync(filePath)
    console.log(`  - fichier supprimé : ${path.relative(process.cwd(), filePath)}`)
  }
}

async function detachFromProjects(
  payload: Awaited<ReturnType<typeof getPayload>>,
  rejectedIds: Set<number>,
) {
  const { docs } = await payload.find({
    collection: 'projects',
    locale: 'fr',
    limit: 100,
    pagination: false,
    depth: 0,
  })

  let updated = 0

  for (const project of docs as Project[]) {
    const coverId = typeof project.coverImage === 'number' ? project.coverImage : null
    const gallery = Array.isArray(project.gallery) ? project.gallery : []
    const filteredGallery = gallery.filter((entry) => {
      const mediaId = typeof entry.media === 'number' ? entry.media : null
      return mediaId !== null && !rejectedIds.has(mediaId)
    })

    const coverRejected = coverId !== null && rejectedIds.has(coverId)
    const galleryChanged = filteredGallery.length !== gallery.length

    if (!coverRejected && !galleryChanged) continue

    await payload.update({
      collection: 'projects',
      id: project.id,
      locale: 'fr',
      data: {
        ...(coverRejected ? { coverImage: null } : {}),
        ...(galleryChanged ? { gallery: filteredGallery } : {}),
      },
    })
    updated++
    console.log(`  ~ projet détaché : ${project.slug}`)
  }

  return updated
}

async function cullUnprofessionalMedia() {
  const payload = await getPayload({ config })
  const rejectedIds = new Set<number>()
  let deletedMedia = 0

  console.log(`${REJECTED_PHOTOS.length} photo(s) marquée(s) non professionnelle(s).\n`)

  for (const rejected of REJECTED_PHOTOS) {
    const { docs } = await payload.find({
      collection: 'media',
      where: { filename: { equals: rejected.filename } },
      limit: 1,
    })

    const doc = docs[0] as Media | undefined
    if (doc && typeof doc.id === 'number') {
      rejectedIds.add(doc.id)
      await payload.delete({ collection: 'media', id: doc.id })
      deletedMedia++
      console.log(`  - CMS : ${rejected.filename} (${rejected.note})`)
    } else {
      console.log(`  · absent du CMS : ${rejected.filename}`)
    }

    deleteLocalFiles(rejected.filename)
  }

  const projectsUpdated = await detachFromProjects(payload, rejectedIds)

  console.log(
    `\n${deletedMedia} entrée(s) média supprimée(s), ${projectsUpdated} projet(s) mis à jour.`,
  )
  console.log(`Photos approuvées restantes : ${58 - REJECTED_PHOTOS.length} (sur 58 JPEG).`)
}

cullUnprofessionalMedia()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
