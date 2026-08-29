import { SkBlock, SkLine, SkRoot } from './primitives'

export function ExpertiseDetailPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--expertise-detail expertise-page">
      <header className="legal-page__hero page-skeleton__legal-hero">
        <div className="container-site page-skeleton__detail-hero-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
          </div>
          <SkBlock className="page-skeleton__detail-cover" />
        </div>
      </header>

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__detail-body-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
            <SkLine className="page-skeleton__line--lead" />
          </div>
          <SkBlock className="page-skeleton__detail-aside" />
        </div>
      </section>

      <section className="page-skeleton__section-pad page-skeleton__section-muted">
        <div className="container-site">
          <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
          <div className="page-skeleton__cards page-skeleton__cards--3">
            <SkBlock className="page-skeleton__related-card" />
            <SkBlock className="page-skeleton__related-card" />
            <SkBlock className="page-skeleton__related-card" />
          </div>
        </div>
      </section>
    </SkRoot>
  )
}
