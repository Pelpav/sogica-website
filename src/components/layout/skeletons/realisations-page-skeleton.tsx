import { SkBlock, SkLine, SkLegalHero, SkPill, SkRoot } from './primitives'

export function RealisationsPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--realisations realisations-page">
      <SkLegalHero lines={3} />

      <section className="page-skeleton__section-pad">
        <div className="container-site">
          <div className="page-skeleton__filters">
            <SkPill className="page-skeleton__filter-pill" />
            <SkPill className="page-skeleton__filter-pill" />
            <SkPill className="page-skeleton__filter-pill" />
          </div>
          <SkLine className="page-skeleton__line--label" />
          <div className="page-skeleton__cards page-skeleton__cards--3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkBlock key={i} className="page-skeleton__project-card" />
            ))}
          </div>
        </div>
      </section>
    </SkRoot>
  )
}
