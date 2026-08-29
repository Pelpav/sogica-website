import { SiteLink } from '@/components/ui/SiteLink'
import type { Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/i18n'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { SectionShell, SectionShellFooter } from '@/components/layout/SectionShell'
import { CmsImage } from '@/components/media/CmsMedia'
import { LogoCarousel } from '@/components/blocks/LogoCarousel'
import type { PageBlock } from './BlockRenderer'
import { EmptyPortfolioState, fetchClientsPartners, fetchEquipment, fetchExpertises, fetchProjectMapPoints, fetchProjects } from '@/lib/cms-queries'
import type { Media as MediaType } from '@/payload-types'
import { getMediaUrl } from '@/lib/media-url'
import { getPartnerLogoPath } from '@/lib/partner-logos'
import { resolveExpertiseCover } from '@/lib/cms-media'
import { ExpertiseShowcase } from '@/components/blocks/ExpertiseShowcase'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { IconBadge, expertiseIconVariantFromSlug } from '@/components/ui/IconBadge'
import { MapBlockClient } from '@/components/map/MapBlockClient'
import { Suspense, type ReactNode } from 'react'

function AsyncBlock({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

function txt(value: unknown): string {
  return value == null ? '' : String(value)
}

export function ExpertiseGridBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  const primaryOnly = block.showPrimaryOnly !== false
  return (
    <AsyncBlock>
      <ExpertiseGridInner block={block} locale={locale} primaryOnly={primaryOnly} />
    </AsyncBlock>
  )
}

async function ExpertiseGridInner({
  block,
  locale,
  primaryOnly,
}: {
  block: PageBlock
  locale: Locale
  primaryOnly: boolean
}) {
  const { docs } = await fetchExpertises(locale, primaryOnly)
  const base = locale === 'fr' ? 'expertises' : 'expertise'
  const layout = (block.layout as string) || 'showcase'
  const isShowcase = layout === 'showcase'
  const expertiseItems = docs.map((exp) => ({
    id: String(exp.id),
    slug: exp.slug || '',
    name: exp.name || '',
    shortDescription: exp.shortDescription,
    cover: resolveExpertiseCover(exp),
    href: localizedPath(locale, `${base}/${exp.slug}`),
  }))

  if (isShowcase) {
    return (
      <SectionShell tone="dark">
        <SectionHeader
          eyebrow={locale === 'fr' ? 'Expertises' : 'Expertise'}
          title={txt(block.title) || (locale === 'fr' ? 'Un ensemble complet de services' : 'A complete range of services')}
          description={
            locale === 'fr'
              ? 'Génie civil, construction métallique et équipements spécialisés.'
              : 'Civil engineering, steel construction and specialized equipment.'
          }
          className="sogica-shell__header"
        />
        <ExpertiseShowcase locale={locale} items={expertiseItems} />
        <SectionShellFooter>
          <SiteLink href={localizedPath(locale, base)} className="btn btn-primary">
            {locale === 'fr' ? 'Toutes les expertises' : 'All expertise'}
            <BtnArrowIcon />
          </SiteLink>
        </SectionShellFooter>
      </SectionShell>
    )
  }

  return (
    <section className="section-block" data-tone={block.backgroundVariant === 'dark' ? 'dark' : 'default'}>
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            eyebrow={locale === 'fr' ? 'Expertises' : 'Expertise'}
            title={txt(block.title) || (locale === 'fr' ? 'Nos domaines d\'intervention' : 'Our areas of expertise')}
            description={
              locale === 'fr'
                ? 'Génie civil, construction métallique et équipements spécialisés.'
                : 'Civil engineering, steel construction and specialized equipment.'
            }
          />
          <SiteLink href={localizedPath(locale, base)} className="link-arrow">
            {locale === 'fr' ? 'Toutes les expertises' : 'All expertise'}
            <span aria-hidden>→</span>
          </SiteLink>
        </div>

        {layout === 'services' ? (
          <div className="services-list">
            {docs.map((exp) => (
              <SiteLink
                key={exp.id}
                href={localizedPath(locale, `${base}/${exp.slug}`)}
                className="services-list__item group"
              >
                <span className="services-list__icon" aria-hidden>
                  <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="services-list__title">{exp.name}</h3>
                  {exp.shortDescription ? (
                    <p className="services-list__desc">{exp.shortDescription}</p>
                  ) : null}
                </div>
                <span className="services-list__arrow" aria-hidden>
                  <BtnArrowIcon />
                </span>
              </SiteLink>
            ))}
          </div>
        ) : layout === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((exp) => {
              const cover = exp.cover && typeof exp.cover === 'object' ? (exp.cover as MediaType) : null
              return (
                <SiteLink
                  key={exp.id}
                  href={localizedPath(locale, `${base}/${exp.slug}`)}
                  className="card group block overflow-hidden"
                >
                  {cover ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <CmsImage media={cover} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-[var(--color-surface-alt)]">
                      <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold">{exp.name}</h3>
                    {exp.shortDescription ? (
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted-foreground)] line-clamp-3">
                        {exp.shortDescription}
                      </p>
                    ) : null}
                    <span className="link-arrow mt-4">
                      {locale === 'fr' ? 'Découvrir' : 'Discover'}
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </SiteLink>
              )
            })}
          </div>
        ) : (
          <div className="service-cards">
            {docs.map((exp) => {
              const cover = exp.cover && typeof exp.cover === 'object' ? (exp.cover as MediaType) : null
              return (
                <SiteLink
                  key={exp.id}
                  href={localizedPath(locale, `${base}/${exp.slug}`)}
                  className="service-card group"
                >
                  <div className="service-card__media">
                    {cover ? (
                      <CmsImage media={cover} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[var(--color-surface-alt)]">
                        <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                      </div>
                    )}
                    <div className="service-card__icon" aria-hidden>
                      <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                    </div>
                  </div>
                  <div className="service-card__body">
                    <h3 className="service-card__title">{exp.name}</h3>
                    {exp.shortDescription ? (
                      <p className="service-card__desc">{exp.shortDescription}</p>
                    ) : null}
                    <span className="service-card__link">
                      {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
                      <BtnArrowIcon />
                    </span>
                  </div>
                </SiteLink>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export function FeaturedProjectsBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return (
    <AsyncBlock>
      <FeaturedProjectsInner block={block} locale={locale} />
    </AsyncBlock>
  )
}

async function FeaturedProjectsInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const limit = Number(block.limit || 4)
  const layout = (block.layout as string) || 'showcase'
  let projects = block.projects as unknown[] | undefined

  if (!projects?.length) {
    const { docs } = await fetchProjects(locale, limit, true)
    if (!docs.length) {
      const all = await fetchProjects(locale, limit, false)
      if (!all.docs.length) {
        return (
          <SectionShell tone="light">
            <SectionHeader title={txt(block.title)} className="sogica-shell__header mb-8" />
            <EmptyPortfolioState locale={locale} />
          </SectionShell>
        )
      }
      projects = all.docs
    } else {
      projects = docs
    }
  }

  const base = locale === 'fr' ? 'realisations' : 'projects'
  const list = (projects as { id: string; slug?: string; title?: string; shortDescription?: string; coverImage?: MediaType; year?: number; city?: string; country?: string }[]).slice(0, limit)
  const [spotlight, ...rest] = list
  const spotlightLocation = spotlight
    ? [spotlight.city, spotlight.country].filter(Boolean).join(', ')
    : ''

  const renderProjectCard = (
    project: (typeof list)[number],
    editorial: boolean,
  ) => {
    const location = [project.city, project.country].filter(Boolean).join(', ')

    if (editorial) {
      return (
        <SiteLink
          key={project.id}
          href={localizedPath(locale, `${base}/${project.slug}`)}
          className="project-card-editorial group"
        >
          {project.coverImage ? (
            <>
              <div className="project-card-editorial__media">
                <CmsImage media={project.coverImage} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="50vw" />
              </div>
              <div className="project-card-editorial__footer">
                <div className="min-w-0">
                  {project.year ? <p className="project-card-editorial__meta">{project.year}</p> : null}
                  <h3 className="project-card-editorial__title">{project.title}</h3>
                  {location ? <p className="project-card-editorial__location">{location}</p> : null}
                </div>
                <span className="project-card-editorial__arrow" aria-hidden>
                  <BtnArrowIcon />
                </span>
              </div>
            </>
          ) : (
            <div className="p-6">
              <h3 className="text-lg font-semibold">{project.title}</h3>
            </div>
          )}
        </SiteLink>
      )
    }

    return (
      <SiteLink
        key={project.id}
        href={localizedPath(locale, `${base}/${project.slug}`)}
        className="project-card-overlay group"
      >
        {project.coverImage ? (
          <div className="project-card-overlay__media">
            <CmsImage media={project.coverImage} fill className="object-cover" sizes="33vw" />
            <div className="project-card-overlay__shade" />
            <div className="project-card-overlay__body">
              {project.year ? <p className="project-card-overlay__year">{project.year}</p> : null}
              <h3 className="project-card-overlay__title">{project.title}</h3>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <h3 className="text-lg font-semibold">{project.title}</h3>
          </div>
        )}
      </SiteLink>
    )
  }

  return (
    <SectionShell tone="light">
      <SectionHeader
        eyebrow={locale === 'fr' ? 'Portfolio' : 'Portfolio'}
        title={txt(block.title) || (locale === 'fr' ? 'Nos récentes réalisations' : 'Our recent projects')}
        description={
          locale === 'fr'
            ? 'Des ouvrages livrés avec rigueur sur le terrain.'
            : 'Projects delivered with rigor in the field.'
        }
        className="sogica-shell__header mb-10"
      />

      {layout === 'showcase' && spotlight?.coverImage ? (
        <SiteLink
          href={localizedPath(locale, `${base}/${spotlight.slug}`)}
          className="project-spotlight group mb-8"
        >
          <div className="project-spotlight__media">
            <CmsImage media={spotlight.coverImage} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="100vw" />
            <div className="project-spotlight__shade" />
            <div className="project-spotlight__body">
              <p className="project-spotlight__meta">
                {spotlightLocation || (locale === 'fr' ? 'Réalisation SOGICA' : 'SOGICA project')}
              </p>
              <h3 className="project-spotlight__title">{spotlight.title}</h3>
            </div>
          </div>
        </SiteLink>
      ) : null}

      <div
        className={
          layout === 'editorial'
            ? 'projects-editorial'
            : layout === 'showcase'
              ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
              : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
        }
      >
        {(layout === 'showcase' ? rest : list).map((project) =>
          renderProjectCard(project, layout === 'editorial'),
        )}
      </div>

      <SectionShellFooter align="end">
        <SiteLink href={localizedPath(locale, base)} className="btn btn-primary">
          {locale === 'fr' ? 'Voir le portfolio' : 'Browse portfolio'}
          <BtnArrowIcon />
        </SiteLink>
      </SectionShellFooter>
    </SectionShell>
  )
}

export function ProjectGridBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return (
    <AsyncBlock>
      <ProjectGridInner block={block} locale={locale} />
    </AsyncBlock>
  )
}

async function ProjectGridInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const limit = Number(block.limit || 12)
  const { docs } = await fetchProjects(locale, limit)
  if (!docs.length) {
    return (
      <section className="section-block">
        <div className="container-site">
          <EmptyPortfolioState locale={locale} />
        </div>
      </section>
    )
  }

  const base = locale === 'fr' ? 'realisations' : 'projects'
  return (
    <section className="section-block">
      <div className="container-site">
        {txt(block.title) ? <h2 className="section-title mb-8">{txt(block.title)}</h2> : null}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((p) => (
            <SiteLink key={p.id} href={localizedPath(locale, `${base}/${p.slug}`)} className="project-card-overlay group">
              {p.coverImage && typeof p.coverImage === 'object' ? (
                <div className="project-card-overlay__media">
                  <CmsImage media={p.coverImage} fill className="object-cover" sizes="33vw" />
                  <div className="project-card-overlay__shade" />
                  <div className="project-card-overlay__body">
                    <h3 className="project-card-overlay__title">{p.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                </div>
              )}
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClientsBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return (
    <AsyncBlock>
      <ClientsInner block={block} locale={locale} />
    </AsyncBlock>
  )
}

async function ClientsInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const { docs } = await fetchClientsPartners(locale, block.featuredOnly !== false)

  if (!docs.length) return null

  const items = docs
    .map((client) => {
      const cmsSrc =
        client.logo && typeof client.logo === 'object' ? getMediaUrl(client.logo as MediaType) : ''
      const src = cmsSrc || getPartnerLogoPath(client.name)
      if (!src) return null
      return {
        id: String(client.id),
        name: client.name || '',
        src,
        href: client.website || null,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <section className="sogica-section sogica-section--tight-top trusted-by-section" id="trusted">
      <div className="container-site">
        <p className="trusted-by__label">
          {txt(block.title) || (locale === 'fr' ? 'Ils nous font confiance' : 'Trusted by')}
        </p>
        {items.length ? (
          <LogoCarousel items={items} />
        ) : (
          <div className="logo-wall-light trusted-by__logos">
            {docs.map((client) => (
              <div key={client.id}>
                <span className="text-sm font-semibold text-[var(--color-muted-foreground)]">{client.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export function EquipmentBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return (
    <AsyncBlock>
      <EquipmentInner block={block} locale={locale} />
    </AsyncBlock>
  )
}

async function EquipmentInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const { docs } = await fetchEquipment(locale)

  if (!docs.length) return null

  return (
    <section className="section-block" data-tone="alt">
      <div className="container-site">
        <SectionHeader
          title={txt(block.title) || (locale === 'fr' ? 'Moyens matériels' : 'Equipment')}
          description={locale === 'fr' ? 'Un parc adapté aux chantiers d\'envergure.' : 'Equipment suited to large-scale projects.'}
          className="mb-8"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {docs.map((item) => (
            <div key={item.id} className="card-flat flex items-start gap-4 p-5">
              <IconBadge variant="equipment" />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                {item.description ? (
                  <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{item.description}</p>
                ) : null}
              </div>
              {item.quantity != null ? (
                <span className="shrink-0 text-xl font-bold text-[var(--color-primary)]">×{item.quantity}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MapBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return (
    <AsyncBlock>
      <MapInner block={block} locale={locale} />
    </AsyncBlock>
  )
}

async function MapInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const points = await fetchProjectMapPoints(locale)

  if (!points.length) return null

  return (
    <SectionShell tone="light">
      <SectionHeader
        eyebrow={locale === 'fr' ? 'Présence terrain' : 'Field presence'}
        title={
          txt(block.title) ||
          (locale === 'fr'
            ? 'Nos chantiers au Mali et en Afrique de l\'Ouest'
            : 'Our project sites in Mali and West Africa')
        }
        className="sogica-shell__header mb-8"
      />
      <div className="projects-map-block">
        <MapBlockClient locale={locale} points={points} height={Number(block.height || 520)} />
      </div>
    </SectionShell>
  )
}

export {
  HeroBlock,
  IntroBlock,
  RichTextBlock,
  TextMediaBlock,
  FullWidthMediaBlock,
  GalleryBlock,
  MasonryBlock,
  StatsBlock,
  MarqueeBlock,
  WhyChooseUsBlock,
  CtaBlock,
  BeforeAfterBlock,
  TimelineBlock,
  QuoteBlock,
  FaqBlock,
  ContactSectionBlock,
  SpacerBlock,
} from './content-blocks'
