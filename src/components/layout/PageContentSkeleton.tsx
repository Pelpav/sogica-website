export function PageContentSkeleton() {
  return (
    <div className="page-skeleton" data-page-skeleton aria-hidden>      <div className="page-skeleton__hero">
        <div className="container-site page-skeleton__hero-grid">
          <div className="page-skeleton__hero-copy">
            <span className="page-skeleton__line page-skeleton__line--eyebrow" />
            <span className="page-skeleton__line page-skeleton__line--title" />
            <span className="page-skeleton__line page-skeleton__line--title page-skeleton__line--short" />
            <span className="page-skeleton__line page-skeleton__line--lead" />
            <span className="page-skeleton__line page-skeleton__line--lead page-skeleton__line--mid" />
            <div className="page-skeleton__actions">
              <span className="page-skeleton__pill" />
              <span className="page-skeleton__pill page-skeleton__pill--ghost" />
            </div>
          </div>
          <div className="page-skeleton__hero-media" />
        </div>
      </div>

      <div className="container-site page-skeleton__section">
        <span className="page-skeleton__line page-skeleton__line--label" />
        <div className="page-skeleton__cards">
          <span className="page-skeleton__card" />
          <span className="page-skeleton__card" />
          <span className="page-skeleton__card" />
        </div>
      </div>

      <div className="page-skeleton__band">
        <div className="container-site page-skeleton__split">
          <div className="page-skeleton__media" />
          <div className="page-skeleton__copy">
            <span className="page-skeleton__line page-skeleton__line--label" />
            <span className="page-skeleton__line page-skeleton__line--title page-skeleton__line--short" />
            <span className="page-skeleton__line page-skeleton__line--lead" />
            <span className="page-skeleton__line page-skeleton__line--lead page-skeleton__line--mid" />
          </div>
        </div>
      </div>
    </div>
  )
}
