import { SkBlock, SkLine, SkPill, SkRoot } from './primitives'

export function ProjectDetailPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--project-detail realisations-page">
      <header className="page-skeleton__project-hero">
        <div className="container-site page-skeleton__project-hero-inner">
          <SkLine className="page-skeleton__line--eyebrow page-skeleton__line--light" />
          <SkLine className="page-skeleton__line--title page-skeleton__line--light" />
          <SkLine className="page-skeleton__line--lead page-skeleton__line--light" />
          <div className="page-skeleton__project-meta">
            <SkPill className="page-skeleton__pill--ghost page-skeleton__pill--light" />
            <SkPill className="page-skeleton__pill--ghost page-skeleton__pill--light" />
          </div>
        </div>
      </header>

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__detail-body-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
          </div>
          <SkBlock className="page-skeleton__detail-aside" />
        </div>
      </section>

      <section className="page-skeleton__section-pad page-skeleton__section-muted">
        <div className="container-site">
          <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
          <div className="page-skeleton__gallery">
            <SkBlock className="page-skeleton__gallery-item" />
            <SkBlock className="page-skeleton__gallery-item" />
            <SkBlock className="page-skeleton__gallery-item" />
          </div>
        </div>
      </section>
    </SkRoot>
  )
}
