import { isLogoMedia } from '@/lib/cms-media'
import { HERO_FALLBACK_IMAGE } from '@/lib/media-filenames'
import { getMediaUrl } from '@/lib/media-url'
import type { Media, Page } from '@/payload-types'

type PageBlock = NonNullable<Page['layout']>[number]

export const HERO_LCP_WIDTH = 1200
export const HERO_LCP_HEIGHT = 900
export const HERO_LCP_QUALITY = 70
export const HERO_LCP_SIZES = '(max-width: 1024px) 100vw, 50vw'

export function resolveHeroImageSrcFromBlocks(blocks: PageBlock[] | null | undefined): string {
  const hero = blocks?.find((block) => block.blockType === 'hero')
  if (!hero) return HERO_FALLBACK_IMAGE

  const media = hero.media as Media | null | undefined
  if (!media || isLogoMedia(media)) return HERO_FALLBACK_IMAGE

  return getMediaUrl(media) || HERO_FALLBACK_IMAGE
}

export function resolveHeroImageSrcFromPage(page: Page | null | undefined): string {
  const blocks = Array.isArray(page?.layout) ? (page.layout as PageBlock[]) : undefined
  return resolveHeroImageSrcFromBlocks(blocks)
}
