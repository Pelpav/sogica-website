import { getHeroLcpImageProps } from '@/components/seo/HeroImagePreload'

/** Image hero sans hydratation next/image — même URL que le preload. */
export function HeroLcpImage({ src, alt }: { src: string; alt: string }) {
  const { props } = getHeroLcpImageProps(src, alt)

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- alt fourni via getImageProps
    <img {...props} className="h-full w-full object-cover" decoding="async" />
  )
}
