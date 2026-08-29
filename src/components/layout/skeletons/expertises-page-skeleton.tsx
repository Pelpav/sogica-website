import { SkBlock, SkLine, SkLegalHero, SkRoot } from './primitives'

function SkPole({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`page-skeleton__pole ${reverse ? 'page-skeleton__pole--reverse' : ''}`}>
      <SkBlock className="page-skeleton__pole-media" />
      <div className="page-skeleton__stack">
        <SkLine className="page-skeleton__line--label" />
        <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
        <SkLine className="page-skeleton__line--lead" />
        <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
        <SkLine className="page-skeleton__line--label" />
      </div>
    </div>
  )
}

export function ExpertisesPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--expertises expertise-page">
      <SkLegalHero lines={3} />

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__poles">
          <SkPole />
          <SkPole reverse />
          <SkPole />
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
