import { SkBlock, SkLegalHero, SkRoot } from './primitives'

export function ClientsPageSkeleton() {
  return (
    <SkRoot className="page-skeleton--clients clients-page">
      <SkLegalHero lines={2} />

      <section className="page-skeleton__section-pad">
        <div className="container-site">
          <div className="page-skeleton__logo-row page-skeleton__logo-row--large">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkBlock key={i} className="page-skeleton__logo-chip page-skeleton__logo-chip--large" />
            ))}
          </div>
        </div>
      </section>

      <section className="page-skeleton__section-pad page-skeleton__section-muted">
        <div className="container-site page-skeleton__clients-groups">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="page-skeleton__clients-group">
              <SkBlock className="page-skeleton__clients-heading" />
              <div className="page-skeleton__clients-grid">
                <SkBlock className="page-skeleton__client-logo" />
                <SkBlock className="page-skeleton__client-logo" />
                <SkBlock className="page-skeleton__client-logo" />
                <SkBlock className="page-skeleton__client-logo" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </SkRoot>
  )
}
