import type { Media as MediaType } from '@/payload-types'
import {
  BRAND_LOGO_PATH,
  BRAND_LOGO_WHITE_PATH,
  BRAND_LOGO_FILENAME,
  BRAND_LOGO_WHITE_FILENAME,
} from '@/lib/media-filenames'

export function getMediaUrl(media: MediaType | string | number | null | undefined): string | null {
  if (!media || typeof media === 'string' || typeof media === 'number') return null
  if (media.url) return media.url
  if (media.filename) return `/media/uploads/${media.filename}`
  return null
}

/** Logo blanc sur fond transparent pour fonds sombres (footer, hero overlay). */
export function getFooterLogoUrl(media: MediaType | string | number | null | undefined): string {
  const url = getMediaUrl(media) || BRAND_LOGO_WHITE_PATH
  if (url.includes(BRAND_LOGO_FILENAME)) {
    return url.replace(BRAND_LOGO_FILENAME, BRAND_LOGO_WHITE_FILENAME)
  }
  if (url.includes('logo.png') && !url.includes('logo_transparent') && !url.includes('logo-white')) {
    return url.replace(/logo\.png/, BRAND_LOGO_WHITE_FILENAME)
  }
  return url
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
