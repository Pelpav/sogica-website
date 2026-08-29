import type { ReactNode } from 'react'
import { HeroImagePreload } from '@/components/seo/HeroImagePreload'
import { resolveHeroImageSrcFromPage } from '@/lib/hero-lcp'
import { isLocale } from '@/lib/i18n'
import { findPageBySlug } from '@/lib/payload'
import { HERO_FALLBACK_IMAGE } from '@/lib/media-filenames'

type HomeLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function HomeLayout({ children, params }: HomeLayoutProps) {
  const { locale } = await params
  let heroSrc = HERO_FALLBACK_IMAGE

  if (isLocale(locale)) {
    const page = await findPageBySlug('home', locale)
    heroSrc = resolveHeroImageSrcFromPage(page)
  }

  return (
    <>
      <HeroImagePreload src={heroSrc} />
      {children}
    </>
  )
}
