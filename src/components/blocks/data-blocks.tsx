import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { CmsImage } from '@/components/media/CmsMedia'
import type { PageBlock } from './BlockRenderer'
import { EmptyPortfolioState, fetchExpertises, fetchProjects } from '@/lib/cms-queries'

function txt(value: unknown): string {
  return value == null ? '' : String(value)
}
import type { Media as MediaType } from '@/payload-types'
import { MapBlockClient } from '@/components/map/MapBlockClient'

export function ExpertiseGridBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  const primaryOnly = block.showPrimaryOnly !== false
  return <ExpertiseGridInner block={block} locale={locale} primaryOnly={primaryOnly} />
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

  return (
    <section className="section-block">
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-10 text-3xl">{txt(block.title)}</h2> : null}
        <div className="grid gap-6 md:grid-cols-3">
          {docs.map((exp) => (
            <Link
              key={exp.id}
              href={localizedPath(locale, `${base}/${exp.slug}`)}
              className="group border border-[var(--color-border)] bg-white p-0 transition hover:border-[var(--color-primary)]"
            >
              {exp.cover && typeof exp.cover === 'object' && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CmsImage media={exp.cover as MediaType} className="transition group-hover:scale-[1.02]" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl">{exp.name}</h3>
                {exp.shortDescription && (
                  <p className="mt-2 line-clamp-3 text-sm text-[var(--color-muted-foreground)]">{exp.shortDescription}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedProjectsBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return <FeaturedProjectsInner block={block} locale={locale} />
}

async function FeaturedProjectsInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const limit = Number(block.limit || 3)
  let projects = block.projects as unknown[] | undefined

  if (!projects?.length) {
    const { docs } = await fetchProjects(locale, limit, true)
    if (!docs.length) {
      const all = await fetchProjects(locale, limit, false)
      if (!all.docs.length) {
        return (
          <section className="section-block">
            <div className="container-site">
              {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
              <EmptyPortfolioState locale={locale} />
            </div>
          </section>
        )
      }
      projects = all.docs
    } else {
      projects = docs
    }
  }

  const base = locale === 'fr' ? 'realisations' : 'projects'

  return (
    <section className="section-block" data-bg="muted">
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
        <div className="grid gap-6 lg:grid-cols-3">
          {(projects as { id: string; slug?: string; title?: string; shortDescription?: string; coverImage?: MediaType }[]).slice(0, limit).map((project) => (
            <Link key={project.id} href={localizedPath(locale, `${base}/${project.slug}`)} className="media-frame group block">
              {project.coverImage && <CmsImage media={project.coverImage} />}
              <div className="p-4">
                <h3 className="text-lg">{project.title}</h3>
                {project.shortDescription && <p className="mt-1 text-sm text-[var(--color-muted-foreground)] line-clamp-2">{project.shortDescription}</p>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectGridBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return <ProjectGridInner block={block} locale={locale} />
}

async function ProjectGridInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const limit = Number(block.limit || 12)
  const { docs } = await fetchProjects(locale, limit)
  if (!docs.length) return <section className="section-block"><div className="container-site"><EmptyPortfolioState locale={locale} /></div></section>

  const base = locale === 'fr' ? 'realisations' : 'projects'
  return (
    <section className="section-block">
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((p) => (
            <Link key={p.id} href={localizedPath(locale, `${base}/${p.slug}`)} className="media-frame block">
              {p.coverImage && typeof p.coverImage === 'object' && <CmsImage media={p.coverImage} />}
              <div className="p-3">
                <h3 className="text-base">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClientsBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return <ClientsInner block={block} locale={locale} />
}

async function ClientsInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'clients-partners',
    locale,
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(block.featuredOnly !== false ? [{ featured: { equals: true } }] : []),
      ],
    },
    sort: 'sortOrder',
    limit: 24,
    depth: 1,
  })

  return (
    <section className="section-block" data-bg={block.backgroundVariant as string || 'default'}>
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {docs.map((client) => (
            <div key={client.id} className="flex min-h-20 items-center justify-center border border-[var(--color-border)] p-4 text-center">
              {client.logo && typeof client.logo === 'object' ? (
                <CmsImage media={client.logo as MediaType} className="max-h-12 w-auto object-contain" />
              ) : (
                <span className="text-sm font-semibold uppercase tracking-wide">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EquipmentBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return <EquipmentInner block={block} locale={locale} />
}

async function EquipmentInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'equipment',
    locale,
    sort: 'sortOrder',
    limit: 50,
    depth: 1,
  })

  return (
    <section className="section-block">
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
        <div className="divide-y divide-[var(--color-border)] border border-[var(--color-border)]">
          {docs.map((item) => (
            <div key={item.id} className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                {item.description && <p className="text-sm text-[var(--color-muted-foreground)]">{item.description}</p>}
              </div>
              {item.quantity != null && (
                <span className="text-2xl font-semibold tabular-nums text-[var(--color-primary)]">×{item.quantity}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MapBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return <MapInner block={block} locale={locale} />
}

async function MapInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    locale,
    where: { _status: { equals: 'published' } },
    limit: 100,
    depth: 0,
  })

  const points = docs
    .filter((p) => p.coordinates?.lat && p.coordinates?.lng)
    .map((p) => ({
      id: String(p.id),
      title: p.title || '',
      slug: p.slug || '',
      lat: p.coordinates!.lat!,
      lng: p.coordinates!.lng!,
    }))

  if (!points.length) return null

  return (
    <section className="section-block">
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-6 text-3xl">{txt(block.title)}</h2> : null}
        <MapBlockClient locale={locale} points={points} height={Number(block.height || 480)} />
      </div>
    </section>
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
  CtaBlock,
  BeforeAfterBlock,
  TimelineBlock,
  QuoteBlock,
  SpacerBlock,
} from './content-blocks'
