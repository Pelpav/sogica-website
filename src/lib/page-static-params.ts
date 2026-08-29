import type { Locale } from '@/lib/i18n'
import { locales, slugRoutes } from '@/lib/i18n'
import { fetchExpertises, fetchProjects } from '@/lib/cms-queries'
import { findPublishedPages } from '@/lib/payload'

export function generateStaticParamsForLocale(locale: Locale) {
  return [{ locale }]
}

export function generateStaticParamsForLocales(...allowedLocales: Locale[]) {
  return allowedLocales.map((locale) => ({ locale }))
}

export function generateStaticParamsForAllLocales() {
  return locales.map((locale) => ({ locale }))
}

const RESERVED_ROUTE_SLUGS = new Set<string>(
  Object.values(slugRoutes).flatMap((routes) => [routes.fr, routes.en]),
)

export async function generateExpertiseSlugStaticParams(locale: Locale) {
  const { docs } = await fetchExpertises(locale)
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ locale, slug: doc.slug! }))
}

export async function generateProjectSlugStaticParams(locale: Locale) {
  const { docs } = await fetchProjects(locale, 100)
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ locale, slug: doc.slug! }))
}

/** Pages CMS custom via `[...slug]` — exclut home et routes déjà dédiées. */
export async function generateCmsSlugStaticParams() {
  const params = await Promise.all(
    locales.map(async (locale) => {
      const { docs } = await findPublishedPages(locale)
      return docs
        .filter(
          (page) =>
            page.slug &&
            page.slug !== 'home' &&
            !RESERVED_ROUTE_SLUGS.has(page.slug) &&
            !page.slug.includes('/'),
        )
        .map((page) => ({
          locale,
          slug: [page.slug!],
        }))
    }),
  )

  return params.flat()
}
