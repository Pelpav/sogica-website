import { EmptyPortfolioState, fetchProjects } from '@/lib/cms-queries'
import { ProjectFilters } from '@/components/portfolio/ProjectFilters'
import { isLocale, localizedPath, type Locale } from '@/lib/i18n'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CmsImage } from '@/components/media/CmsMedia'
import type { Media as MediaType } from '@/payload-types'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function RealisationsPage({ params, searchParams }: Props) {
  const { locale } = await params
  const filters = await searchParams
  if (!isLocale(locale)) notFound()

  const payloadFilters: Record<string, unknown>[] = [{ _status: { equals: 'published' } }]
  if (filters.expertise) payloadFilters.push({ expertises: { contains: filters.expertise } })
  if (filters.year) payloadFilters.push({ year: { equals: Number(filters.year) } })
  if (filters.country) payloadFilters.push({ country: { equals: filters.country } })

  const { docs } = await fetchProjects(locale as Locale, 48)
  const filtered = docs.filter((p) => {
    if (filters.expertise && !p.expertises?.some((e) => String(e) === filters.expertise || (typeof e === 'object' && e && 'id' in e && String(e.id) === filters.expertise))) return false
    if (filters.year && p.year !== Number(filters.year)) return false
    if (filters.country && p.country !== filters.country) return false
    return true
  })

  const base = locale === 'fr' ? 'realisations' : 'projects'

  return (
    <section className="section-block">
      <div className="container-site">
        <p className="eyebrow">{locale === 'fr' ? 'Réalisations' : 'Projects'}</p>
        <h1 className="mt-2 text-4xl">{locale === 'fr' ? 'Portfolio' : 'Portfolio'}</h1>
        {!docs.length ? (
          <div className="mt-10">
            <EmptyPortfolioState locale={locale as Locale} />
          </div>
        ) : (
          <>
            <ProjectFilters locale={locale as Locale} projects={docs} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <Link key={project.id} href={localizedPath(locale as Locale, `${base}/${project.slug}`)} className="media-frame block">
                  {project.coverImage && typeof project.coverImage === 'object' && (
                    <CmsImage media={project.coverImage as MediaType} />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg">{project.title}</h2>
                    {project.shortDescription && (
                      <p className="mt-1 line-clamp-2 text-sm text-[var(--color-muted-foreground)]">{project.shortDescription}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
