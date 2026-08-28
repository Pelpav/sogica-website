import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CmsImage, CmsVideo } from '@/components/media/CmsMedia'
import { NarrativeRenderer } from '@/components/portfolio/NarrativeRenderer'
import { getPayloadClient } from '@/lib/payload'
import { isLocale, localizedPath, type Locale } from '@/lib/i18n'
import type { Media as MediaType } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    locale: locale as Locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 3,
  })
  const project = result.docs[0]
  if (!project) notFound()

  const listPath = locale === 'fr' ? 'realisations' : 'projects'

  return (
    <>
      <section className="relative min-h-[50vh] section-block">
        {project.coverImage && typeof project.coverImage === 'object' && (
          <div className="absolute inset-0 -z-10">
            <CmsImage media={project.coverImage as MediaType} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div className="container-site text-white">
          <Link href={localizedPath(locale as Locale, listPath)} className="text-sm uppercase tracking-wide text-white/70 hover:text-white">
            ← {locale === 'fr' ? 'Réalisations' : 'Projects'}
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl">{project.title}</h1>
          {project.shortDescription && <p className="mt-4 max-w-2xl text-lg text-white/85">{project.shortDescription}</p>}
          <dl className="mt-8 flex flex-wrap gap-6 text-sm">
            {project.year && (
              <div>
                <dt className="eyebrow text-white/60">{locale === 'fr' ? 'Année' : 'Year'}</dt>
                <dd className="font-semibold">{project.year}</dd>
              </div>
            )}
            {project.country && (
              <div>
                <dt className="eyebrow text-white/60">{locale === 'fr' ? 'Pays' : 'Country'}</dt>
                <dd className="font-semibold">{project.country}</dd>
              </div>
            )}
            {project.locationText && (
              <div>
                <dt className="eyebrow text-white/60">{locale === 'fr' ? 'Lieu' : 'Location'}</dt>
                <dd className="font-semibold">{project.locationText}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {project.pageMode === 'editorial' && project.narrative?.length ? (
        <NarrativeRenderer blocks={project.narrative} locale={locale as Locale} />
      ) : (
        <>
          {project.gallery?.length ? (
            <section className="section-block">
              <div className="container-site grid gap-4 sm:grid-cols-2">
                {project.gallery.map((item, i) =>
                  item.media && typeof item.media === 'object' ? (
                    <figure key={i} className="media-frame">
                      <CmsImage media={item.media as MediaType} alt={item.caption || ''} />
                      {item.caption && <figcaption className="p-2 text-sm">{item.caption}</figcaption>}
                    </figure>
                  ) : null,
                )}
              </div>
            </section>
          ) : null}
          {project.coverVideo && typeof project.coverVideo === 'object' && (
            <section className="section-block container-site">
              <CmsVideo media={project.coverVideo as MediaType} />
            </section>
          )}
        </>
      )}
    </>
  )
}
