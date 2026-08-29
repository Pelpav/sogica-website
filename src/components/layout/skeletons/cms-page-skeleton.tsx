import { SkBlock, SkLine, SkLegalHero, SkRoot } from './primitives'

export function CmsPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--cms">
      <SkLegalHero lines={2} />

      <section className="page-skeleton__section-pad">
        <div className="container-site page-skeleton__cms-blocks">
          <div className="page-skeleton__stack">
            <SkLine className="page-skeleton__line--title page-skeleton__line--short" />
            <SkLine className="page-skeleton__line--lead" />
            <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" />
          </div>
          <SkBlock className="page-skeleton__cms-media" />
          <div className="page-skeleton__cards page-skeleton__cards--2">
            <SkBlock className="page-skeleton__feature-card" />
            <SkBlock className="page-skeleton__feature-card" />
          </div>
        </div>
      </section>
    </SkRoot>
  )
}
