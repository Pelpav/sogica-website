import { SkBlock, SkLine, SkLegalHero, SkRoot } from './primitives'

export function LegalPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--legal legal-page">
      <SkLegalHero lines={2} />

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__legal-grid">
          <SkBlock className="page-skeleton__legal-aside" />
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
          </div>
        </div>
      </section>
    </SkRoot>
  )
}
