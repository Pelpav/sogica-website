import { getImageProps } from 'next/image'
import { preload } from 'react-dom'

/** Précharge l'image hero LCP dès le HTML initial. */
export function HeroImagePreload({ src }: { src: string }) {
  const { props } = getImageProps({
    alt: '',
    width: 1200,
    height: 900,
    quality: 75,
    sizes: '(max-width: 1024px) 100vw, 50vw',
    priority: true,
    src,
  })

  preload(props.src, {
    as: 'image',
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    fetchPriority: 'high',
  })

  return null
}
