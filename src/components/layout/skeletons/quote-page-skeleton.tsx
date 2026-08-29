import { SkBlock, SkLine, SkLegalHero, SkRoot } from './primitives'

export function QuotePageSkeleton() {
  return (
    <SkRoot className="page-skeleton--quote quote-page">
      <SkLegalHero lines={2} />

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__quote-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
            <SkBlock className="page-skeleton__quote-note" />
          </div>
          <SkBlock className="page-skeleton__form-panel page-skeleton__form-panel--tall" />
        </div>
      </section>
    </SkRoot>
  )
}
