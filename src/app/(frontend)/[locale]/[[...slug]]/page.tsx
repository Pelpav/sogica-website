import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { findPageBySlug, getGlobal } from '@/lib/payload'
import { isLocale, type Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const pageSlug = slug?.join('/') || 'home'
  const page = await findPageBySlug(pageSlug === '' ? 'home' : pageSlug, locale)
  const site = await getGlobal('site-settings', locale)
  const title = page?.seo?.title || page?.title || site?.defaultSeo?.title || site?.companyName
  const description = page?.seo?.description || site?.defaultSeo?.description || site?.tagline

  return {
    title,
    description: description || undefined,
    alternates: {
      canonical: `/${locale}/${pageSlug === 'home' ? '' : pageSlug}`.replace(/\/$/, '') || `/${locale}`,
      languages: {
        fr: `/fr${pageSlug === 'home' ? '' : `/${pageSlug}`}`,
        en: `/en${pageSlug === 'home' ? '' : `/${pageSlug}`}`,
      },
    },
    robots: page?.seo?.noindex ? { index: false } : undefined,
  }
}

export default async function CmsPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const pageSlug = slug?.length ? slug.join('/') : 'home'
  const page = await findPageBySlug(pageSlug, locale)
  if (!page) notFound()

  return (
    <BlockRenderer blocks={page.layout as Parameters<typeof BlockRenderer>[0]['blocks']} locale={locale as Locale} />
  )
}
