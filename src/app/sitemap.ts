import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { locales, localizedPath, slugRoutes, type Locale } from '@/lib/i18n'

type SitemapEntry = MetadataRoute.Sitemap[number]

function getBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
}

function localizedAlternates(frPath: string, enPath: string, base: string) {
  return {
    languages: {
      fr: `${base}${frPath}`,
      en: `${base}${enPath}`,
      'x-default': `${base}${frPath}`,
    },
  }
}

function staticRouteEntries(base: string): SitemapEntry[] {
  const routeKeys = Object.keys(slugRoutes) as (keyof typeof slugRoutes)[]
  const entries: SitemapEntry[] = []

  for (const key of routeKeys) {
    const frPath = localizedPath('fr', slugRoutes[key].fr)
    const enPath = localizedPath('en', slugRoutes[key].en)
    const alternates = localizedAlternates(frPath, enPath, base)

    entries.push(
      {
        url: `${base}${frPath}`,
        changeFrequency: 'monthly',
        priority: key === 'contact' || key === 'quote' ? 0.9 : 0.8,
        alternates,
      },
      {
        url: `${base}${enPath}`,
        changeFrequency: 'monthly',
        priority: key === 'contact' || key === 'quote' ? 0.9 : 0.8,
        alternates,
      },
    )
  }

  return entries
}

function homeEntries(base: string): SitemapEntry[] {
  const frPath = localizedPath('fr')
  const enPath = localizedPath('en')
  const alternates = localizedAlternates(frPath, enPath, base)

  return [
    {
      url: `${base}${frPath}`,
      changeFrequency: 'weekly',
      priority: 1,
      alternates,
    },
    {
      url: `${base}${enPath}`,
      changeFrequency: 'weekly',
      priority: 1,
      alternates,
    },
  ]
}

function pairEntry(
  base: string,
  locale: Locale,
  slug: string,
  collectionBase: { fr: string; en: string },
  options: { lastModified?: Date | string; priority?: number },
): SitemapEntry {
  const frPath = localizedPath('fr', `${collectionBase.fr}/${slug}`)
  const enPath = localizedPath('en', `${collectionBase.en}/${slug}`)
  const path = localizedPath(locale, `${collectionBase[locale]}/${slug}`)

  return {
    url: `${base}${path}`,
    lastModified: options.lastModified,
    changeFrequency: 'monthly',
    priority: options.priority ?? 0.7,
    alternates: localizedAlternates(frPath, enPath, base),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl()
  const entries: SitemapEntry[] = [...homeEntries(base), ...staticRouteEntries(base)]

  if (!process.env.DATABASE_URL) {
    return entries
  }

  try {
    const payload = await getPayloadClient()

    for (const locale of locales) {
      const pages = await payload.find({
        collection: 'pages',
        locale,
        where: { _status: { equals: 'published' } },
        limit: 100,
      })

      for (const page of pages.docs) {
        if (page.slug === 'home') continue
        const path = localizedPath(locale, page.slug || '')
        entries.push({
          url: `${base}${path}`,
          lastModified: page.updatedAt,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }

      const expertises = await payload.find({
        collection: 'expertises',
        locale,
        where: { _status: { equals: 'published' } },
        limit: 100,
      })

      for (const expertise of expertises.docs) {
        if (!expertise.slug) continue
        entries.push(
          pairEntry(base, locale, expertise.slug, slugRoutes.expertises, {
            lastModified: expertise.updatedAt,
            priority: 0.8,
          }),
        )
      }

      const projects = await payload.find({
        collection: 'projects',
        locale,
        where: { _status: { equals: 'published' } },
        limit: 200,
      })

      for (const project of projects.docs) {
        if (!project.slug) continue
        entries.push(
          pairEntry(base, locale, project.slug, slugRoutes.realisations, {
            lastModified: project.updatedAt,
            priority: 0.8,
          }),
        )
      }
    }
  } catch {
    // Build/CI without DB: keep static URLs only
  }

  return entries
}
