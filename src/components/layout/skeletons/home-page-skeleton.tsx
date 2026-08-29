import { SkBlock, SkLine, SkPill, SkRoot } from './primitives'

export function HomePageSkeleton() {
  return (
    <SkRoot className="page-skeleton--home">
      <section className="page-skeleton__home-hero">
        <div className="container-site page-skeleton__home-hero-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
            <div className="page-skeleton__actions">
              <SkPill />
              <SkPill className="page-skeleton__pill--ghost" />
            </div>
          </div>
          <SkBlock className="page-skeleton__home-hero-media" />
        </div>
      </section>

      <section className="page-skeleton__home-strip">
        <div className="container-site">
          <SkLine className="page-skeleton__line--label page-skeleton__line--center" />
          <div className="page-skeleton__logo-row">
            <SkBlock className="page-skeleton__logo-chip" />
            <SkBlock className="page-skeleton__logo-chip" />
            <SkBlock className="page-skeleton__logo-chip" />
            <SkBlock className="page-skeleton__logo-chip" />
          </div>
        </div>
      </section>

      <section className="page-skeleton__home-stats">
        <div className="container-site page-skeleton__home-stats-grid">
          <SkBlock className="page-skeleton__stat" />
          <SkBlock className="page-skeleton__stat" />
          <SkBlock className="page-skeleton__stat" />
        </div>
      </section>

      <section className="page-skeleton__home-split">
        <div className="container-site page-skeleton__home-split-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
          </div>
          <SkBlock className="page-skeleton__home-split-media" />
        </div>
      </section>

      <section className="page-skeleton__home-cards">
        <div className="container-site">
          <SkLine className="page-skeleton__line--label" />
          <div className="page-skeleton__cards page-skeleton__cards--3">
            <SkBlock className="page-skeleton__feature-card" />
            <SkBlock className="page-skeleton__feature-card" />
            <SkBlock className="page-skeleton__feature-card" />
          </div>
        </div>
      </section>

      <section className="page-skeleton__home-process">
        <div className="container-site page-skeleton__home-process-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow page-skeleton__line--light" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--light" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--light" />
            <SkBlock className="page-skeleton__home-process-media" />
          </div>
          <div className="page-skeleton__process-steps">
            <SkBlock className="page-skeleton__process-step" />
            <SkBlock className="page-skeleton__process-step" />
            <SkBlock className="page-skeleton__process-step" />
          </div>
        </div>
      </section>

      <section className="page-skeleton__home-contact">
        <div className="container-site page-skeleton__home-contact-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
          </div>
          <SkBlock className="page-skeleton__form-panel" />
        </div>
      </section>
    </SkRoot>
  )
}
