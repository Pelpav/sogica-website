import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import type { Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'

function tagCollection(collection: string, locale: Locale) {
  cacheTag('cms', `cms-${collection}`, `cms-${collection}-${locale}`)
}

export async function fetchExpertises(locale: Locale, primaryOnly = false) {
  'use cache'
  tagCollection('expertises', locale)
  cacheLife('hours')

  const payload = await getPayloadClient()
  return payload.find({
    collection: 'expertises',
    locale,
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(primaryOnly ? [{ isPrimary: { equals: true } }] : []),
      ],
    },
    sort: 'sortOrder',
    limit: 20,
    depth: 2,
  })
}

export async function fetchProjects(locale: Locale, limit = 12, featured?: boolean) {
  'use cache'
  tagCollection('projects', locale)
  cacheLife('hours')

  const payload = await getPayloadClient()
  return payload.find({
    collection: 'projects',
    locale,
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(featured ? [{ featured: { equals: true } }] : []),
      ],
    },
    sort: 'sortOrder',
    limit,
    depth: 2,
  })
}

export type ProjectMapPoint = {
  id: string
  title: string
  slug: string
  lat: number
  lng: number
}

export async function fetchProjectMapPoints(locale: Locale, limit = 100): Promise<ProjectMapPoint[]> {
  'use cache'
  tagCollection('projects-map', locale)
  cacheLife('hours')

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    locale,
    where: { _status: { equals: 'published' } },
    limit,
    depth: 0,
  })

  return docs
    .filter(
      (project) =>
        typeof project.coordinates?.lat === 'number' &&
        typeof project.coordinates?.lng === 'number',
    )
    .map((project) => ({
      id: String(project.id),
      title: project.title || '',
      slug: project.slug || '',
      lat: project.coordinates!.lat!,
      lng: project.coordinates!.lng!,
    }))
}

export async function fetchClientsPartners(
  locale: Locale,
  options: { featuredOnly?: boolean; limit?: number } = {},
) {
  'use cache'
  const { featuredOnly = true, limit = 24 } = options
  tagCollection('clients-partners', locale)
  cacheLife('hours')

  const payload = await getPayloadClient()
  return payload.find({
    collection: 'clients-partners',
    locale,
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(featuredOnly ? [{ featured: { equals: true } }] : []),
      ],
    },
    sort: 'sortOrder',
    limit,
    depth: 1,
  })
}

export async function fetchExpertiseBySlug(slug: string, locale: Locale) {
  'use cache'
  tagCollection('expertises', locale)
  cacheTag('cms', `cms-expertise-${slug}-${locale}`)
  cacheLife('hours')

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'expertises',
    locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function fetchProjectBySlug(slug: string, locale: Locale) {
  'use cache'
  tagCollection('projects', locale)
  cacheTag('cms', `cms-project-${slug}-${locale}`)
  cacheLife('hours')

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function fetchRelatedProjectsForProject(
  projectId: number,
  expertiseIds: number[],
  locale: Locale,
  limit = 3,
) {
  'use cache'
  tagCollection('projects', locale)
  cacheTag('cms', `cms-project-related-${projectId}-${locale}`)
  cacheLife('hours')

  if (!expertiseIds.length) return []

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    locale,
    where: {
      and: [
        { _status: { equals: 'published' } },
        { id: { not_equals: projectId } },
        { expertises: { in: expertiseIds } },
      ],
    },
    limit,
    depth: 1,
    sort: '-year',
  })

  return docs
}

export async function fetchEquipment(locale: Locale) {
  'use cache'
  tagCollection('equipment', locale)
  cacheLife('hours')

  const payload = await getPayloadClient()
  return payload.find({
    collection: 'equipment',
    locale,
    sort: 'sortOrder',
    limit: 50,
    depth: 1,
  })
}

export function EmptyPortfolioState({ locale }: { locale: Locale }) {
  return (
    <div className="container-site rounded border border-dashed border-[var(--color-border)] bg-[var(--color-muted)] p-10 text-center">
      <p className="eyebrow">{locale === 'fr' ? 'Portfolio' : 'Portfolio'}</p>
      <h2 className="mt-2 text-2xl">
        {locale === 'fr' ? 'Réalisations à venir' : 'Projects coming soon'}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-[var(--color-muted-foreground)]">
        {locale === 'fr'
          ? 'Les projets seront publiés dès validation éditoriale. Contactez-nous pour discuter de vos besoins.'
          : 'Projects will be published once editorially validated. Contact us to discuss your requirements.'}
      </p>
      <Link href={localizedPath(locale, 'contact')} className="btn btn-primary mt-6 inline-flex">
        {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
      </Link>
    </div>
  )
}
