import type { Media as MediaType } from '@/payload-types'

export function getMediaUrl(media: MediaType | string | number | null | undefined): string | null {
  if (!media || typeof media === 'string' || typeof media === 'number') return null
  if (media.url) return media.url
  if (media.filename) return `/media/uploads/${media.filename}`
  return null
}

export function getMediaAlt(
  media: MediaType | string | number | null | undefined,
  fallback = '',
): string {
  if (!media || typeof media === 'string' || typeof media === 'number') return fallback
  return media.alt || fallback
}

export function isVideoMedia(media: MediaType | null | undefined): boolean {
  if (!media) return false
  return media.mediaType === 'video' || (media.mimeType?.startsWith('video/') ?? false)
}
