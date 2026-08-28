import { getPayload, type Payload } from 'payload'
import configPromise from '@payload-config'
import type { Locale } from './i18n'

let payloadInstance: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise })
  }
  return payloadInstance
}

export async function findPublishedPages(locale: Locale) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'pages',
    locale,
    where: { _status: { equals: 'published' } },
    limit: 100,
    depth: 2,
  })
}

export async function findPageBySlug(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    locale,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 3,
  })
  return result.docs[0] ?? null
}

export async function getGlobal<T extends keyof import('../payload-types').Config['globals']>(
  slug: T,
  locale: Locale,
) {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, locale, depth: 2 })
}
