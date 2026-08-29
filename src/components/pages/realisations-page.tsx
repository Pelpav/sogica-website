import { PageHeroReveal } from '@/components/motion/PageHeroReveal'
import { RevealEach } from '@/components/motion/RevealEach'
import { SiteLink } from '@/components/ui/SiteLink'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { CmsImage } from '@/components/media/CmsMedia'
import { ProjectFilters } from '@/components/portfolio/ProjectFilters'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { fetchProjects } from '@/lib/cms-queries'
import {
  formatResultsCount,
  getRealisationsIndexContent,
} from '@/lib/realisations-content'
import { localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { requireLocale } from '@/lib/page-locale'
import type { Media as MediaType, Project } from '@/payload-types'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

function projectLocation(project: Project): string {
  return (
    project.locationText ||
    [project.city, project.country].filter(Boolean).join(', ')
  )
}

function matchesFilters(project: Project, filters: Record<string, string | undefined>): boolean {
  if (
    filters.expertise &&
    !project.expertises?.some(
      (expertise) =>
        String(expertise) === filters.expertise ||
        (typeof expertise === 'object' &&
          expertise &&
          'id' in expertise &&
          String(expertise.id) === filters.expertise),
    )
  ) {
    return false
  }

  if (filters.year && project.year !== Number(filters.year)) return false
  if (filters.country && project.country !== filters.country) return false
  return true
}

export async function generateRealisationsMetadata(locale: Locale): Promise<Metadata> {
  const content = getRealisationsIndexContent(locale)
  return buildPageMetadata({
    locale,
    title: routeLabels[locale].realisations,
    description: content.heroLead,
    pathname: localizedPath(locale, slugRoutes.realisations[locale]),
    ogImageKey: 'realisations',
  })
}

export async function RealisationsPage({ params, searchParams }: Props) {
  const locale = await requireLocale(params)
  const filters = await searchParams
  const content = getRealisationsIndexContent(locale)
  const { docs } = await fetchProjects(locale, 48)
  const filtered = docs.filter((project) => matchesFilters(project, filters))

  const listBase = slugRoutes.realisations[locale]
  const contactPath = localizedPath(locale, slugRoutes.contact[locale])

  return (
    <article className="realisations-page">
      <PageHeroReveal className="legal-page__hero realisations-page__hero">
        <p className="legal-page__eyebrow">{content.heroEyebrow}</p>
        <h1 className="legal-page__title realisations-page__hero-title">{content.heroTitle}</h1>
        <div className="realisations-page__hero-copy">
          <p className="legal-page__intro">{content.heroLead}</p>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="realisations-page__text">
              {paragraph}
            </p>
          ))}
        </div>
      </PageHeroReveal>

      <section className="realisations-page__section">
        <div className="container-site">
          {!docs.length ? (
            <div className="realisations-page__empty">
              <p className="realisations-page__eyebrow">{content.heroEyebrow}</p>
              <h2 className="realisations-page__empty-title">{content.emptyTitle}</h2>
              <p className="realisations-page__empty-lead">{content.emptyLead}</p>
              <SiteLink href={contactPath} className="btn btn-primary realisations-page__empty-cta">
                {content.emptyCta}
                <BtnArrowIcon />
              </SiteLink>
            </div>
          ) : (
            <>
              <ProjectFilters
                locale={locale}
                projects={docs}
                labels={{
                  filters: content.filtersLabel,
                  year: content.yearLabel,
                  country: content.countryLabel,
                  all: content.allLabel,
                  reset: content.resetLabel,
                }}
              />

              <p className="realisations-page__count" aria-live="polite">
                {formatResultsCount(content.resultsLabel, filtered.length)}
              </p>

              {filtered.length ? (
                <RevealEach className="realisations-page__grid">
                  {filtered.map((project) => {
                    const href = localizedPath(locale, `${listBase}/${project.slug}`)
                    const location = projectLocation(project)

                    return (
                      <SiteLink key={project.id} href={href} className="realisations-page__card">
                        <div className="realisations-page__card-media">
                          {project.coverImage && typeof project.coverImage === 'object' ? (
                            <CmsImage
                              media={project.coverImage as MediaType}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="realisations-page__card-placeholder" aria-hidden />
                          )}
                        </div>

                        <div className="realisations-page__card-body">
                          <div className="realisations-page__card-meta">
                            {project.year ? (
                              <span className="realisations-page__card-year">{project.year}</span>
                            ) : null}
                            {location ? (
                              <span className="realisations-page__card-location">{location}</span>
                            ) : null}
                          </div>

                          <h2 className="realisations-page__card-title">{project.title}</h2>

                          {project.shortDescription ? (
                            <p className="realisations-page__card-desc">{project.shortDescription}</p>
                          ) : null}

                          <span className="link-arrow realisations-page__card-link">
                            {content.viewLabel}
                            <BtnArrowIcon />
                          </span>
                        </div>
                      </SiteLink>
                    )
                  })}
                </RevealEach>
              ) : (
                <div className="realisations-page__no-results">
                  <h2 className="realisations-page__no-results-title">{content.noResultsTitle}</h2>
                  <p className="realisations-page__no-results-lead">{content.noResultsLead}</p>
                  <SiteLink href={localizedPath(locale, listBase)} className="link-arrow">
                    {content.resetLabel}
                    <BtnArrowIcon />
                  </SiteLink>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </article>
  )
}
