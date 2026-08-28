import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'

export async function fetchExpertises(locale: Locale, primaryOnly = false) {
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
