import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsCustomPage } from '@/components/pages/cms-custom-page'
import { findPageBySlug, findPageBySlugLive, getGlobal } from '@/lib/payload'
import { buildPageMetadata } from '@/lib/seo'
import { isLocale, type Locale } from '@/lib/i18n'

export type CmsHomeRouteProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ livePreview?: string }>
}

export type CmsSlugRouteProps = {
  params: Promise<{ locale: string; slug: string[] }>
  searchParams: Promise<{ livePreview?: string }>
}

export function resolveCmsPageSlug(slug: string[]) {
  return slug.join('/')
}

export async function generateCmsRouteMetadata(
  params: Promise<{ locale: string; slug: string[] }>,
): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const pageSlug = resolveCmsPageSlug(slug)
  const page = await findPageBySlug(pageSlug, locale)
  const site = await getGlobal('site-settings', locale)
  const canonicalPath = `/${locale}/${pageSlug}`

  return buildPageMetadata({
    locale,
    pathname: canonicalPath,
    title: page?.title || site?.defaultSeo?.title || site?.companyName,
    description: site?.defaultSeo?.description || site?.tagline,
    ogImage: site?.defaultSeo?.ogImage,
    seo: page?.seo,
  })
}

export async function generateCmsHomeMetadata(
  params: Promise<{ locale: string }>,
): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const page = await findPageBySlug('home', locale)
  const site = await getGlobal('site-settings', locale)
  const canonicalPath = `/${locale}`

  return buildPageMetadata({
    locale,
    pathname: canonicalPath,
    title: page?.title || site?.defaultSeo?.title || site?.companyName,
    description: site?.defaultSeo?.description || site?.tagline,
    ogImage: site?.defaultSeo?.ogImage,
    ogImageKey: 'default',
    seo: page?.seo,
  })
}

export async function CmsPageRouteContent({ params, searchParams }: CmsSlugRouteProps) {
  const { locale, slug } = await params
  const { livePreview } = await searchParams
  if (!isLocale(locale)) notFound()

  const pageSlug = resolveCmsPageSlug(slug)
  const page =
    livePreview === '1'
      ? await findPageBySlugLive(pageSlug, locale)
      : await findPageBySlug(pageSlug, locale)
  if (!page) notFound()

  return <CmsCustomPage page={page} locale={locale as Locale} />
}

export async function CmsHomeRouteContent({ params, searchParams }: CmsHomeRouteProps) {
  const { locale } = await params
  const { livePreview } = await searchParams
  if (!isLocale(locale)) notFound()

  const page =
    livePreview === '1'
      ? await findPageBySlugLive('home', locale)
      : await findPageBySlug('home', locale)
  if (!page) notFound()

  return <CmsCustomPage page={page} locale={locale as Locale} />
}
