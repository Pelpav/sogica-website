import { SiteLink } from '@/components/ui/SiteLink'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbJsonLd, buildPageMetadata } from '@/lib/seo'
import { CmsImage, CmsVideo } from '@/components/media/CmsMedia'
import { ProjectMap } from '@/components/map/ProjectMap'
import { NarrativeRenderer } from '@/components/portfolio/NarrativeRenderer'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { IconBadge, expertiseIconVariantFromSlug } from '@/components/ui/IconBadge'
import { isLocale, localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { fetchProjectBySlug, fetchRelatedProjectsForProject } from '@/lib/cms-queries'
import { hasLexicalContent } from '@/lib/legal-content'
import {
  formatProjectPeriod,
  getProjectDetailLabels,
  projectLocationText,
  projectStatusLabel,
} from '@/lib/project-content'
import { serializeLexical } from '@/lib/serialize-lexical'
import type {
  ClientsPartner,
  Expertise,
  Media as MediaType,
  Project,
} from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateProjectDetailMetadata(
  locale: Locale,
  slug: string,
): Promise<Metadata> {
  const project = await fetchProjectBySlug(slug, locale)
  if (!project) {
    return buildPageMetadata({
      locale,
      title: locale === 'fr' ? 'Réalisation' : 'Project',
      pathname: localizedPath(locale, `${slugRoutes.realisations[locale]}/${slug}`),
      noindex: true,
    })
  }

  return buildPageMetadata({
    locale,
    pathname: localizedPath(locale, `${slugRoutes.realisations[locale]}/${slug}`),
    title: project.title,
    description: project.shortDescription,
    ogImage: project.coverImage,
    seo: project.seo,
  })
}

function isExpertise(value: unknown): value is Expertise {
  return typeof value === 'object' && value !== null && 'slug' in value
}

function isClient(value: unknown): value is ClientsPartner {
  return typeof value === 'object' && value !== null && 'name' in value
}

function isProject(value: unknown): value is Project {
  return typeof value === 'object' && value !== null && 'slug' in value
}

async function fetchRelatedProjects(project: Project, locale: Locale): Promise<Project[]> {
  const related = (Array.isArray(project.relatedProjects) ? project.relatedProjects : []).filter(isProject)
  if (related.length) return related.slice(0, 3)

  const expertiseIds = (project.expertises || [])
    .map((item) => (typeof item === 'object' && item ? item.id : item))
    .filter((id): id is number => typeof id === 'number')

  if (!expertiseIds.length || typeof project.id !== 'number') return []

  return fetchRelatedProjectsForProject(project.id, expertiseIds, locale)
}

export async function ProjectDetailPage({ params }: Props) {
  const { locale: localeParam, slug } = await params
  if (!isLocale(localeParam)) notFound()
  const locale = localeParam

  const project = await fetchProjectBySlug(slug, locale)
  if (!project) notFound()

  const labels = getProjectDetailLabels(locale)
  const listBase = slugRoutes.realisations[locale]
  const contactPath = localizedPath(locale, slugRoutes.contact[locale])
  const quotePath = localizedPath(locale, slugRoutes.quote[locale])
  const expertiseBase = slugRoutes.expertises[locale]

  const location = projectLocationText(project)
  const status = projectStatusLabel(project.projectStatus, labels)
  const period = formatProjectPeriod(project.dateRange?.start, project.dateRange?.end, locale)

  const summaryHtml = hasLexicalContent(project.summary) ? serializeLexical(project.summary) : ''
  const challengesHtml = hasLexicalContent(project.challenges) ? serializeLexical(project.challenges) : ''
  const solutionsHtml = hasLexicalContent(project.solutions) ? serializeLexical(project.solutions) : ''

  const expertises = (project.expertises || []).filter(isExpertise)
  const client = isClient(project.client) ? project.client : null
  const keyFacts = (project.keyFacts || []).filter((fact) => fact.label && fact.value)
  const serviceTags = (project.serviceTags || []).map((item) => item.tag).filter(Boolean) as string[]
  const services = (project.servicesPerformed || []).map((item) => item.item).filter(Boolean) as string[]
  const gallery = (project.gallery || []).filter((item) => item.media && typeof item.media === 'object')
  const beforeAfter = (project.beforeAfter || []).filter(
    (item) =>
      (item.before && typeof item.before === 'object') ||
      (item.after && typeof item.after === 'object'),
  )
  const videoGallery = (project.videoGallery || []).filter(
    (item) => item.media && typeof item.media === 'object',
  )

  const hasCoordinates =
    typeof project.coordinates?.lat === 'number' && typeof project.coordinates?.lng === 'number'

  const relatedProjects = await fetchRelatedProjects(project, locale)

  const cover = project.coverImage && typeof project.coverImage === 'object' ? project.coverImage : null
  const hasEditorial = project.pageMode === 'editorial' && Boolean(project.narrative?.length)
  const hasMainContent = Boolean(summaryHtml || challengesHtml || solutionsHtml || project.shortDescription)
  const hasAsideContent = Boolean(
    client ||
      period ||
      (project.city && !project.locationText) ||
      expertises.length ||
      serviceTags.length ||
      services.length,
  )
  const hasStandardBody = hasMainContent || hasAsideContent

  const heroMeta = [
    project.year ? { label: labels.year, value: String(project.year) } : null,
    location ? { label: labels.location, value: location } : null,
    project.country ? { label: labels.country, value: project.country } : null,
    status ? { label: labels.status, value: status } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: routeLabels[locale].home, path: localizedPath(locale) },
    { name: routeLabels[locale].realisations, path: localizedPath(locale, listBase) },
    {
      name: project.title || '',
      path: localizedPath(locale, `${listBase}/${project.slug}`),
    },
  ])

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <article className="project-detail-page">
      <header className="hero-immersive project-detail-page__hero">
        {cover ? (
          <div className="hero-immersive__media" aria-hidden>
            <CmsImage media={cover as MediaType} fill priority className="object-cover" sizes="100vw" />
          </div>
        ) : null}
        <div className="hero-immersive__overlay" aria-hidden />
        <div className="hero-immersive__scrim" aria-hidden />

        <div className="hero-immersive__content">
          <div className="container-site project-detail-page__hero-inner">
            <SiteLink href={localizedPath(locale, listBase)} className="project-detail-page__back">
              <span className="project-detail-page__back-icon" aria-hidden>←</span>
              {labels.back}
            </SiteLink>

            <div className="project-detail-page__hero-copy">
              <p className="eyebrow">{labels.eyebrow}</p>
              <h1 className="display-title display-title--light">{project.title}</h1>
              {project.shortDescription ? (
                <p className="lead-text lead-text--light project-detail-page__hero-lead">
                  {project.shortDescription}
                </p>
              ) : null}
            </div>

            {heroMeta.length ? (
              <dl className="project-detail-page__hero-meta">
                {heroMeta.map((item) => (
                  <div key={item.label} className="project-detail-page__hero-meta-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </header>

      {keyFacts.length ? (
        <section className="project-detail-page__facts" aria-label={labels.about}>
          <div className="container-site project-detail-page__facts-grid">
            {keyFacts.map((fact, index) => (
              <div key={`${fact.label}-${index}`} className="project-detail-page__fact">
                <p className="project-detail-page__fact-value">{fact.value}</p>
                <p className="project-detail-page__fact-label">{fact.label}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hasEditorial ? (
        <NarrativeRenderer blocks={project.narrative!} locale={locale} />
      ) : (
        <>
          {hasStandardBody ? (
            <section className="project-detail-page__body">
              <div
                className={`container-site project-detail-page__grid${!hasMainContent ? ' project-detail-page__grid--aside-only' : ''}`}
              >
                {hasMainContent ? (
                  <div className="project-detail-page__main">
                  {summaryHtml ? (
                    <div
                      className="legal-page__content project-detail-page__prose"
                      dangerouslySetInnerHTML={{ __html: summaryHtml }}
                    />
                  ) : project.shortDescription ? (
                    <>
                      <h2 className="project-detail-page__section-kicker">{labels.about}</h2>
                      <p className="project-detail-page__lead">{project.shortDescription}</p>
                    </>
                  ) : null}

                  {challengesHtml ? (
                    <div className="project-detail-page__block">
                      <h2 className="project-detail-page__section-kicker">{labels.challenges}</h2>
                      <div
                        className="legal-page__content project-detail-page__prose"
                        dangerouslySetInnerHTML={{ __html: challengesHtml }}
                      />
                    </div>
                  ) : null}

                  {solutionsHtml ? (
                    <div className="project-detail-page__block">
                      <h2 className="project-detail-page__section-kicker">{labels.solutions}</h2>
                      <div
                        className="legal-page__content project-detail-page__prose"
                        dangerouslySetInnerHTML={{ __html: solutionsHtml }}
                      />
                    </div>
                  ) : null}
                </div>
                ) : null}

                {hasAsideContent ? (
                <aside className="project-detail-page__aside">
                  {client?.name ? (
                    <div className="project-detail-page__aside-block">
                      <p className="project-detail-page__aside-label">{labels.client}</p>
                      <p className="project-detail-page__aside-value">{client.name}</p>
                    </div>
                  ) : null}

                  {period ? (
                    <div className="project-detail-page__aside-block">
                      <p className="project-detail-page__aside-label">{labels.period}</p>
                      <p className="project-detail-page__aside-value">{period}</p>
                    </div>
                  ) : null}

                  {project.city && !project.locationText ? (
                    <div className="project-detail-page__aside-block">
                      <p className="project-detail-page__aside-label">{labels.city}</p>
                      <p className="project-detail-page__aside-value">{project.city}</p>
                    </div>
                  ) : null}

                  {expertises.length ? (
                    <div className="project-detail-page__aside-block">
                      <p className="project-detail-page__aside-label">{labels.expertises}</p>
                      <ul className="project-detail-page__expertise-list">
                        {expertises.map((expertise) => (
                          <li key={expertise.id}>
                            <SiteLink
                              href={localizedPath(locale, `${expertiseBase}/${expertise.slug}`)}
                              className="project-detail-page__expertise-link"
                            >
                              <span className="project-detail-page__expertise-icon" aria-hidden>
                                <IconBadge variant={expertiseIconVariantFromSlug(expertise.slug)} />
                              </span>
                              <span>{expertise.name}</span>
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {serviceTags.length ? (
                    <div className="project-detail-page__aside-block">
                      <p className="project-detail-page__aside-label">{labels.workTypes}</p>
                      <ul className="project-detail-page__tag-list">
                        {serviceTags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {services.length ? (
                    <div className="project-detail-page__aside-block">
                      <p className="project-detail-page__aside-label">{labels.services}</p>
                      <ul className="project-detail-page__service-list">
                        {services.map((service) => (
                          <li key={service}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </aside>
                ) : null}
              </div>
            </section>
          ) : null}

          {project.coverVideo && typeof project.coverVideo === 'object' ? (
            <section className="project-detail-page__section project-detail-page__section--video">
              <div className="container-site">
                <h2 className="project-detail-page__section-title">{labels.video}</h2>
                <div className="project-detail-page__video-frame">
                  <CmsVideo media={project.coverVideo as MediaType} />
                </div>
              </div>
            </section>
          ) : null}

          {gallery.length ? (
            <section className="project-detail-page__section project-detail-page__section--gallery">
              <div className="container-site">
                <h2 className="project-detail-page__section-title">{labels.gallery}</h2>
                <div className="project-detail-page__gallery">
                  {gallery.map((item, index) => (
                    <figure
                      key={index}
                      className={`project-detail-page__gallery-item${index === 0 ? ' project-detail-page__gallery-item--feature' : ''}`}
                    >
                      <div className="project-detail-page__gallery-media">
                        <CmsImage
                          media={item.media as MediaType}
                          alt={item.caption || project.title || ''}
                          fill
                          className="object-cover"
                          sizes={index === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        />
                      </div>
                      {item.caption ? (
                        <figcaption className="project-detail-page__gallery-caption">{item.caption}</figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {beforeAfter.length ? (
            <section className="project-detail-page__section project-detail-page__section--muted">
              <div className="container-site">
                <h2 className="project-detail-page__section-title">{labels.beforeAfter}</h2>
                <div className="project-detail-page__before-after-list">
                  {beforeAfter.map((item, index) => (
                    <div key={index} className="project-detail-page__before-after">
                      <div className="project-detail-page__before-after-grid">
                        {item.before && typeof item.before === 'object' ? (
                          <figure className="project-detail-page__before-after-item">
                            <div className="project-detail-page__gallery-media">
                              <CmsImage
                                media={item.before as MediaType}
                                alt={labels.before}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                            <figcaption>{labels.before}</figcaption>
                          </figure>
                        ) : null}
                        {item.after && typeof item.after === 'object' ? (
                          <figure className="project-detail-page__before-after-item">
                            <div className="project-detail-page__gallery-media">
                              <CmsImage
                                media={item.after as MediaType}
                                alt={labels.after}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                            <figcaption>{labels.after}</figcaption>
                          </figure>
                        ) : null}
                      </div>
                      {item.caption ? (
                        <p className="project-detail-page__before-after-caption">{item.caption}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {videoGallery.length ? (
            <section className="project-detail-page__section">
              <div className="container-site project-detail-page__video-list">
                {videoGallery.map((item, index) => (
                  <div key={index} className="project-detail-page__video-frame">
                    <CmsVideo media={item.media as MediaType} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {hasCoordinates ? (
            <section className="project-detail-page__section project-detail-page__section--map">
              <div className="container-site">
                <h2 className="project-detail-page__section-title">{labels.map}</h2>
                <p className="project-detail-page__map-lead">{location}</p>
                <ProjectMap
                  locale={locale}
                  height={420}
                  points={[
                    {
                      id: String(project.id),
                      title: project.title || '',
                      slug: project.slug || slug,
                      lat: project.coordinates!.lat!,
                      lng: project.coordinates!.lng!,
                    },
                  ]}
                />
              </div>
            </section>
          ) : null}
        </>
      )}

      {relatedProjects.length ? (
        <section className="project-detail-page__section project-detail-page__section--related">
          <div className="container-site">
            <h2 className="project-detail-page__section-title">{labels.related}</h2>
            <div className="project-detail-page__related-grid">
              {relatedProjects.map((related) => {
                const relatedLocation = projectLocationText(related)
                const relatedCover =
                  related.coverImage && typeof related.coverImage === 'object'
                    ? related.coverImage
                    : null

                return (
                  <SiteLink
                    key={related.id}
                    href={localizedPath(locale, `${listBase}/${related.slug}`)}
                    className="project-detail-page__related-card"
                  >
                    <div className="project-detail-page__related-media">
                      {relatedCover ? (
                        <CmsImage
                          media={relatedCover as MediaType}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="project-detail-page__related-placeholder" aria-hidden />
                      )}
                    </div>
                    <div className="project-detail-page__related-body">
                      {related.year ? (
                        <p className="project-detail-page__related-year">{related.year}</p>
                      ) : null}
                      <h3 className="project-detail-page__related-title">{related.title}</h3>
                      {relatedLocation ? (
                        <p className="project-detail-page__related-location">{relatedLocation}</p>
                      ) : null}
                      <span className="link-arrow project-detail-page__related-link">
                        {labels.discover}
                        <BtnArrowIcon />
                      </span>
                    </div>
                  </SiteLink>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="project-detail-page__cta">
        <div className="container-site project-detail-page__cta-inner">
          <div className="project-detail-page__cta-copy">
            <h2 className="project-detail-page__cta-title">{labels.ctaTitle}</h2>
            <p className="project-detail-page__cta-lead">{labels.ctaLead}</p>
          </div>
          <div className="project-detail-page__cta-actions">
            <SiteLink href={contactPath} className="btn btn-primary">
              {labels.ctaContact}
              <BtnArrowIcon />
            </SiteLink>
            <SiteLink href={quotePath} className="btn btn-secondary">
              {labels.ctaQuote}
              <BtnArrowIcon />
            </SiteLink>
          </div>
        </div>
      </section>
    </article>
    </>
  )
}
