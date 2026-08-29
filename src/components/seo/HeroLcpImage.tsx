import { getHeroLcpImageProps } from '@/components/seo/HeroImagePreload'

/** Image hero LCP — img natif avec priorité maximale, sans style next/image. */
export function HeroLcpImage({ src, alt }: { src: string; alt: string }) {
  const { props } = getHeroLcpImageProps(src, alt)
  const { style, ...imgProps } = props
  void style

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...imgProps}
      alt={alt}
      className="h-full w-full object-cover"
      decoding="async"
      loading="eager"
      fetchPriority="high"
    />
  )
}
