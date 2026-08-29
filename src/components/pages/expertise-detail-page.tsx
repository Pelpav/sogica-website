import { SiteLink } from '@/components/ui/SiteLink'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'
import { CmsImage } from '@/components/media/CmsMedia'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { IconBadge, expertiseIconVariantFromSlug } from '@/components/ui/IconBadge'
import { fetchExpertises } from '@/lib/cms-queries'
import { resolveExpertiseCover } from '@/lib/cms-media'
import {
  getExpertiseDetailFallback,
  getExpertiseDetailLabels,
} from '@/lib/expertise-content'
import { isLocale, localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { hasLexicalContent } from '@/lib/legal-content'
import { serializeLexical } from '@/lib/serialize-lexical'
import type { Media as MediaType, Project } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateExpertiseDetailMetadata(
  locale: Locale,
  slug: string,
): Promise<Metadata> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'expertises',
    locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 1,
  })
  const expertise = result.docs[0]
  if (!expertise) {
    return buildPageMetadata({
      locale,
      title: locale === 'fr' ? 'Expertise' : 'Expertise',
      pathname: localizedPath(locale, `${slugRoutes.expertises[locale]}/${slug}`),
      noindex: true,
    })
  }

  const cover = resolveExpertiseCover(expertise)

  return buildPageMetadata({
    locale,
    pathname: localizedPath(locale, `${slugRoutes.expertises[locale]}/${slug}`),
    title: expertise.name,
    description: expertise.shortDescription,
    ogImage: expertise.seo?.ogImage ?? cover,
    seo: expertise.seo,
  })
}

export async function ExpertiseDetailPage({ params }: Props) {
  const { locale: localeParam, slug } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam

  const payload = await getPayloadClient()
  const [result, { docs: allExpertises }] = await Promise.all([
    payload.find({
      collection: 'expertises',
      locale,
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
      limit: 1,
      depth: 2,
    }),
    fetchExpertises(locale),
  ])

  const expertise = result.docs[0]
  if (!expertise) notFound()

  const labels = getExpertiseDetailLabels(locale)
  const fallback = getExpertiseDetailFallback(locale, slug)
  const cmsHtml = hasLexicalContent(expertise.fullContent) ? serializeLexical(expertise.fullContent) : ''
  const cover = resolveExpertiseCover(expertise)
  const iconVariant = expertiseIconVariantFromSlug(expertise.slug)
  const expertiseBase = slugRoutes.expertises[locale]
  const otherExpertises = allExpertises.filter((item) => item.slug !== expertise.slug)

  const relatedProjects = (Array.isArray(expertise.relatedProjects) ? expertise.relatedProjects : [])
    .filter((project): project is Project => typeof project === 'object' && project !== null && 'slug' in project)

  const projectsBase = slugRoutes.realisations[locale]

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: routeLabels[locale].home, path: localizedPath(locale) },
    { name: routeLabels[locale].expertises, path: localizedPath(locale, expertiseBase) },
    {
      name: expertise.name || '',
      path: localizedPath(locale, `${expertiseBase}/${expertise.slug}`),
    },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <article className="expertise-page expertise-page--detail">
      <header className="legal-page__hero">
        <div className="container-site expertise-page__detail-hero">
          <div className="expertise-page__detail-hero-copy">
            <p className="legal-page__eyebrow">{locale === 'fr' ? 'Expertise' : 'Expertise'}</p>
            <div className="expertise-page__detail-title-row">
              <span className="expertise-page__detail-icon" aria-hidden>
                <IconBadge variant={iconVariant} />
              </span>
              <h1 className="legal-page__title expertise-page__hero-title">{expertise.name}</h1>
            </div>
            {expertise.shortDescription ? (
              <p className="legal-page__intro">{expertise.shortDescription}</p>
            ) : null}
          </div>

          {cover ? (
            <div className="expertise-page__detail-cover">
              <CmsImage
                media={cover as MediaType}
                alt={expertise.name || ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          ) : null}
        </div>
      </header>

      <section className="expertise-page__body">
        <div className="container-site expertise-page__detail-grid">
          <div className="expertise-page__content">
            {cmsHtml ? (
              <div
                className="legal-page__content"
                dangerouslySetInnerHTML={{ __html: cmsHtml }}
              />
            ) : fallback ? (
              <>
                {fallback.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="expertise-page__text">
                    {paragraph}
                  </p>
                ))}
              </>
            ) : null}
          </div>

          {fallback?.capabilities.length ? (
            <aside className="expertise-page__aside">
              <p className="expertise-page__aside-label">{labels.capabilities}</p>
              <ul className="expertise-page__capabilities">
                {fallback.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </section>

      {expertise.gallery?.length ? (
        <section className="expertise-page__section expertise-page__section--muted">
          <div className="container-site">
            <h2 className="expertise-page__section-title">{labels.gallery}</h2>
            <div className="expertise-page__gallery">
              {expertise.gallery.map((item, i) =>
                item.media && typeof item.media === 'object' ? (
                  <div key={i} className="expertise-page__gallery-item">
                    <CmsImage media={item.media as MediaType} alt="" className="h-full w-full object-cover" />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      ) : null}

      {relatedProjects.length ? (
        <section className="expertise-page__section">
          <div className="container-site">
            <h2 className="expertise-page__section-title">{labels.related}</h2>
            <div className="expertise-page__related">
              {relatedProjects.map((project) => (
                <SiteLink
                  key={project.id}
                  href={localizedPath(locale, `${projectsBase}/${project.slug}`)}
                  className="expertise-page__related-card"
                >
                  <h3 className="expertise-page__related-title">{project.title}</h3>
                  {project.locationText || project.city ? (
                    <p className="expertise-page__related-meta">
                      {project.locationText || [project.city, project.country].filter(Boolean).join(', ')}
                    </p>
                  ) : null}
                  <span className="link-arrow mt-3">
                    {labels.discover}
                    <BtnArrowIcon />
                  </span>
                </SiteLink>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {otherExpertises.length ? (
        <section className="expertise-page__section expertise-page__section--muted">
          <div className="container-site">
            <h2 className="expertise-page__section-title">{labels.other}</h2>
            <div className="expertise-page__list">
              {otherExpertises.map((exp) => (
                <SiteLink
                  key={exp.id}
                  href={localizedPath(locale, `${expertiseBase}/${exp.slug}`)}
                  className="expertise-page__card"
                >
                  <span className="expertise-page__card-icon" aria-hidden>
                    <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                  </span>
                  <div className="expertise-page__card-copy">
                    <h3 className="expertise-page__card-title">{exp.name}</h3>
                    {exp.shortDescription ? (
                      <p className="expertise-page__card-desc">{exp.shortDescription}</p>
                    ) : null}
                  </div>
                  <span className="expertise-page__card-arrow" aria-hidden>
                    <BtnArrowIcon />
                  </span>
                </SiteLink>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
    </>
  )
}
