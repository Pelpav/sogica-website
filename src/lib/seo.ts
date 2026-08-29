import type { Metadata } from 'next'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/lib/media-url'
import { switchLocalePath, type Locale } from '@/lib/i18n'
import { getOgImagePath, type OgImageKey } from '@/lib/og-images'
import { SITE_AUTHOR } from '@/lib/site-credits'

export const SITE_NAME = 'SOGICA SA'
const DEFAULT_OG_IMAGE = '/brand/og/default-fr.png'

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`)
}

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteUrl()}${normalized}`
}

export function resolveOgImageUrl(
  media: Media | string | number | null | undefined,
): string {
  const url = getMediaUrl(media)
  if (!url) return toAbsoluteUrl(DEFAULT_OG_IMAGE)
  return toAbsoluteUrl(url)
}

type SeoFields = {
  title?: string | null
  description?: string | null
  ogImage?: Media | string | number | null
  noindex?: boolean | null
}

type BuildPageMetadataInput = {
  locale: Locale
  /** Pathname with locale prefix, e.g. /fr/a-propos */
  pathname: string
  title?: string | null
  description?: string | null
  ogImage?: Media | string | number | null
  ogImageKey?: OgImageKey
  noindex?: boolean
  seo?: SeoFields | null
}

export function buildDynamicOgImageUrl(
  locale: Locale,
  title?: string | null,
  subtitle?: string | null,
): string {
  const params = new URLSearchParams({
    locale,
    title: title || SITE_NAME,
  })
  if (subtitle) params.set('subtitle', subtitle)
  return toAbsoluteUrl(`/api/og?${params.toString()}`)
}

export function resolvePageOgImageUrl({
  locale,
  title,
  description,
  ogImage,
  ogImageKey,
  seo,
}: {
  locale: Locale
  title?: string | null
  description?: string | null
  ogImage?: Media | string | number | null
  ogImageKey?: OgImageKey
  seo?: SeoFields | null
}): string {
  const cmsImage = seo?.ogImage ?? ogImage
  if (cmsImage) return resolveOgImageUrl(cmsImage)

  if (ogImageKey) {
    return toAbsoluteUrl(getOgImagePath(ogImageKey, locale))
  }

  if (title || description) {
    return buildDynamicOgImageUrl(locale, title, description)
  }

  return toAbsoluteUrl(getOgImagePath('default', locale))
}

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description,
  ogImage,
  ogImageKey,
  noindex,
  seo,
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = pathname.split('?')[0].split('#')[0].replace(/\/$/, '') || `/${locale}`
  const pageTitle = seo?.title || title || undefined
  const pageDescription = seo?.description || description || undefined
  const imageUrl = resolvePageOgImageUrl({
    locale,
    title: pageTitle,
    description: pageDescription,
    ogImage,
    ogImageKey,
    seo,
  })
  const shouldNoindex = seo?.noindex === true || noindex === true
  const absoluteUrl = toAbsoluteUrl(canonicalPath)

  const resolvedTitle =
    pageTitle && pageTitle.includes('SOGICA')
      ? { absolute: pageTitle }
      : pageTitle

  return {
    title: resolvedTitle,
    description: pageDescription,
    authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
    creator: SITE_AUTHOR.name,
    publisher: SITE_NAME,
    alternates: {
      canonical: canonicalPath,
      languages: {
        fr: switchLocalePath(canonicalPath, 'fr'),
        en: switchLocalePath(canonicalPath, 'en'),
        'x-default': switchLocalePath(canonicalPath, 'fr'),
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      url: absoluteUrl,
      siteName: SITE_NAME,
      title: pageTitle || SITE_NAME,
      description: pageDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle || SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle || SITE_NAME,
      description: pageDescription,
      images: [imageUrl],
    },
    robots: shouldNoindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

export type BreadcrumbItem = {
  name: string
  path: string
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  }
}

export type OrganizationJsonLdInput = {
  name: string
  legalName?: string | null
  description?: string | null
  url: string
  logo?: string
  address?: string | null
  phones?: { number: string }[] | null
  emails?: { address: string }[] | null
  foundingYear?: number | null
}

export function buildOrganizationJsonLd(input: OrganizationJsonLdInput) {
  const telephone = input.phones?.[0]?.number
  const email = input.emails?.[0]?.address

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'GeneralContractor'],
    name: input.name,
    legalName: input.legalName || input.name,
    description: input.description,
    url: input.url,
    logo: input.logo,
    foundingDate: input.foundingYear ? String(input.foundingYear) : undefined,
    address: input.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: input.address,
          addressCountry: 'ML',
        }
      : undefined,
    areaServed: {
      '@type': 'Country',
      name: 'Mali',
    },
    contactPoint: telephone || email
      ? {
          '@type': 'ContactPoint',
          telephone,
          email,
          contactType: 'customer service',
          availableLanguage: ['French', 'English'],
        }
      : undefined,
  }
}

export function buildWebSiteJsonLd(siteUrl: string, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: locale === 'fr' ? 'fr-ML' : 'en-ML',
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR.name,
      url: SITE_AUTHOR.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
    },
  }
}
