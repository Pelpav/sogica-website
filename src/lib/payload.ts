import { getPayload, type Payload } from 'payload'
import configPromise from '@payload-config'
import { cache } from 'react'
import { cacheLife, cacheTag } from 'next/cache'
import type { Locale } from './i18n'

export const getPayloadClient = cache(async (): Promise<Payload> => {
  return getPayload({ config: configPromise })
})

function tagCms(scope: string, locale: Locale, key?: string) {
  cacheTag('cms', `cms-${scope}`, `cms-${scope}-${locale}`)
  if (key) cacheTag(`cms-${scope}-${key}-${locale}`)
}

export async function findPublishedPages(locale: Locale) {
  'use cache'
  tagCms('pages', locale)
  cacheLife('hours')

  const payload = await getPayloadClient()
  return payload.find({
    collection: 'pages',
    locale,
    where: { _status: { equals: 'published' } },
    limit: 100,
    depth: 2,
  })
}

async function withDepthFallback<T>(load: (depth: number) => Promise<T>, depths = [2, 1, 0]): Promise<T | null> {
  let lastError: unknown

  for (const depth of depths) {
    try {
      return await load(depth)
    } catch (error) {
      lastError = error
    }
  }

  console.error('[payload] query failed after depth fallbacks:', lastError)
  return null
}

export async function findPageBySlug(slug: string, locale: Locale) {
  'use cache'
  tagCms('page', locale, slug)
  cacheLife('hours')

  const payload = await getPayloadClient()

  const page = await withDepthFallback(async (depth) => {
    const result = await payload.find({
      collection: 'pages',
      locale,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
      limit: 1,
      depth,
    })
    return result.docs[0] ?? null
  }, [3, 2, 1, 0])

  return page
}

export async function getGlobal<T extends keyof import('../payload-types').Config['globals']>(
  slug: T,
  locale: Locale,
) {
  'use cache'
  tagCms('global', locale, String(slug))
  cacheLife('hours')

  const payload = await getPayloadClient()

  return withDepthFallback((depth) => payload.findGlobal({ slug, locale, depth }), [1, 0])
}
