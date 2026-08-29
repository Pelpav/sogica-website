import { getImageProps } from 'next/image'
import { preload } from 'react-dom'
import {
  HERO_LCP_HEIGHT,
  HERO_LCP_QUALITY,
  HERO_LCP_SIZES,
  HERO_LCP_WIDTH,
} from '@/lib/hero-lcp'

export function getHeroLcpImageProps(src: string, alt = '') {
  return getImageProps({
    alt,
    width: HERO_LCP_WIDTH,
    height: HERO_LCP_HEIGHT,
    quality: HERO_LCP_QUALITY,
    sizes: HERO_LCP_SIZES,
    priority: true,
    src,
  })
}

/** Précharge l'image hero LCP dès le HTML initial. */
export function HeroImagePreload({ src }: { src: string }) {
  const { props } = getHeroLcpImageProps(src)

  preload(props.src, {
    as: 'image',
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    fetchPriority: 'high',
  })

  return null
}
