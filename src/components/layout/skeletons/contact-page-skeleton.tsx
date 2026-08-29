import { SkBlock, SkLine, SkLegalHero, SkRoot } from './primitives'

export function ContactPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--contact contact-page">
      <SkLegalHero lines={2} />

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__contact-grid">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--eyebrow" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkBlock className="page-skeleton__contact-detail" />
            <SkBlock className="page-skeleton__contact-detail" />
            <SkBlock className="page-skeleton__contact-detail" />
          </div>
          <SkBlock className="page-skeleton__form-panel page-skeleton__form-panel--tall" />
        </div>
      </section>
    </SkRoot>
  )
}
