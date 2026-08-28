import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { locales } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const entries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: 'weekly',
    priority: 1,
  }))

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
        entries.push({
          url: `${base}/${locale}/${page.slug}`,
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }

      const projects = await payload.find({
        collection: 'projects',
        locale,
        where: { _status: { equals: 'published' } },
        limit: 200,
      })
      const projectBase = locale === 'fr' ? 'realisations' : 'projects'
      for (const p of projects.docs) {
        entries.push({
          url: `${base}/${locale}/${projectBase}/${p.slug}`,
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      }
    }
  } catch {
    // Build/CI without DB: keep locale home URLs only
  }

  return entries
}
