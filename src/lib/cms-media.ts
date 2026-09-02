import type { Payload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'
import type { Expertise, Media } from '@/payload-types'
import { getPayloadClient } from './payload'
import { isRejectedPhotoFilename } from './media-curation'

const EXPERTISE_COVER_SLUGS = [
  'genie-civil',
  'construction-metallique',
  'equipements-pesage-controle-routier',
] as const

const LOGO_FILENAME_PATTERN = /logo|transparent|favicon|icon/i

export function isLogoMedia(media: Pick<Media, 'filename' | 'alt'> | null | undefined): boolean {
  if (!media) return false
  const name = (media.filename || '').toLowerCase()
  const alt = (media.alt || '').toLowerCase()
  return LOGO_FILENAME_PATTERN.test(name) || (alt.includes('sogica') && name.includes('logo'))
}

export function filterPhotoMedia(docs: Media[]): Media[] {
  return docs.filter(
    (doc) =>
      doc.mediaType === 'image' &&
      !isLogoMedia(doc) &&
      !isRejectedPhotoFilename(doc.filename),
  )
}

export async function pickHeroMediaId(payload: Payload): Promise<string | number | null> {
  const { docs } = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 50,
    sort: 'createdAt',
  })

  const photos = filterPhotoMedia(docs as Media[])
  return photos[0]?.id ?? null
}

export async function pickGalleryMediaIds(payload: Payload, limit = 12): Promise<(string | number)[]> {
  const { docs } = await payload.find({
    collection: 'media',
    where: { mediaType: { equals: 'image' } },
    limit: 50,
    sort: 'createdAt',
  })

  return filterPhotoMedia(docs as Media[])
    .slice(0, limit)
    .map((doc) => doc.id)
}

export async function getCachedGalleryMediaIds(limit = 12): Promise<(string | number)[]> {
  'use cache'
  cacheTag('cms', 'cms-media-gallery')
  cacheLife('hours')

  const payload = await getPayloadClient()
  return pickGalleryMediaIds(payload, limit)
}

export async function getCachedMediaById(id: string | number) {
  'use cache'
  cacheTag('cms', `cms-media-${String(id)}`)
  cacheLife('hours')

  const payload = await getPayloadClient()
  return payload.findByID({
    collection: 'media',
    id,
    depth: 0,
  })
}

export function resolveExpertiseCover(exp: Expertise): Media | null {
  if (exp.cover && typeof exp.cover === 'object') return exp.cover
  const galleryMedia = exp.gallery?.[0]?.media
  if (galleryMedia && typeof galleryMedia === 'object') return galleryMedia
  return null
}

export async function assignExpertiseCovers(payload: Payload) {
  const galleryIds = await pickGalleryMediaIds(payload, 12)
  if (!galleryIds.length) return 0

  let assigned = 0
  for (const [index, slug] of EXPERTISE_COVER_SLUGS.entries()) {
    const coverId = galleryIds[index % galleryIds.length]
    const result = await payload.find({
      collection: 'expertises',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const doc = result.docs[0]
    if (!doc || doc.cover) continue

    await payload.update({
      collection: 'expertises',
      id: doc.id,
      data: { cover: coverId as number },
    })
    assigned++
  }

  return assigned
}
