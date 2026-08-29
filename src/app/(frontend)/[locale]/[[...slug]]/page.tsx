import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CmsCustomPage } from '@/components/pages/cms-custom-page'
import { findPageBySlug, findPageBySlugLive, getGlobal } from '@/lib/payload'
import { isLocale, switchLocalePath, type Locale } from '@/lib/i18n'
import { withPageSuspense } from '@/lib/page-suspense'

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>
  searchParams: Promise<{ livePreview?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const pageSlug = slug?.join('/') || 'home'
  const page = await findPageBySlug(pageSlug === '' ? 'home' : pageSlug, locale)
  const site = await getGlobal('site-settings', locale)
  const title = page?.seo?.title || page?.title || site?.defaultSeo?.title || site?.companyName
  const description = page?.seo?.description || site?.defaultSeo?.description || site?.tagline

  const canonicalPath = `/${locale}/${pageSlug === 'home' ? '' : pageSlug}`.replace(/\/$/, '') || `/${locale}`

  return {
    title,
    description: description || undefined,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: switchLocalePath(canonicalPath, 'fr'),
        en: switchLocalePath(canonicalPath, 'en'),
      },
    },
    robots: page?.seo?.noindex ? { index: false } : undefined,
  }
}

async function CmsPageContent({ params, searchParams }: Props) {
  const { locale, slug } = await params
  const { livePreview } = await searchParams
  if (!isLocale(locale)) notFound()

  const pageSlug = slug?.length ? slug.join('/') : 'home'
  const page =
    livePreview === '1'
      ? await findPageBySlugLive(pageSlug, locale)
      : await findPageBySlug(pageSlug, locale)
  if (!page) notFound()

  return <CmsCustomPage page={page} locale={locale as Locale} />
}

export default withPageSuspense(CmsPageContent)
