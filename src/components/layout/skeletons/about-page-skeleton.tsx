import { SkBlock, SkLine, SkLegalHero, SkRoot } from './primitives'

export function AboutPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--about about-page">
      <SkLegalHero lines={3} />

      <section className="about-page__intro page-skeleton__section-pad">
        <div className="container-site page-skeleton__about-intro-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
            <SkLine className="page-skeleton__line--label" />
          </div>
          <div className="page-skeleton__about-aside">
            <SkBlock className="page-skeleton__about-media" />
            <SkBlock className="page-skeleton__about-stat" />
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

      <section className="page-skeleton__section-pad">
        <div className="container-site">
          <SkLine className="page-skeleton__line--eyebrow" />
          <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
          <div className="page-skeleton__about-expertises">
            <SkBlock className="page-skeleton__about-expertise" />
            <SkBlock className="page-skeleton__about-expertise" />
            <SkBlock className="page-skeleton__about-expertise" />
          </div>
        </div>
      </section>

      <section className="page-skeleton__section-pad page-skeleton__section-muted">
        <div className="container-site page-skeleton__about-steps">
          <SkLine className="page-skeleton__line--eyebrow" />
          <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
          <div className="page-skeleton__steps-row">
            <SkBlock className="page-skeleton__step-card" />
            <SkBlock className="page-skeleton__step-card" />
            <SkBlock className="page-skeleton__step-card" />
          </div>
        </div>
      </section>
    </SkRoot>
  )
}
