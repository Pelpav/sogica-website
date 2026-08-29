import type { ReactNode } from 'react'

export function SkRoot({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`page-skeleton ${className}`.trim()} data-page-skeleton aria-hidden>
      {children}
    </div>
  )
}

export function SkLine({ className = '' }: { className?: string }) {
  return <span className={`page-skeleton__line ${className}`.trim()} />
}

export function SkBlock({ className = '' }: { className?: string }) {
  return <span className={`page-skeleton__block ${className}`.trim()} />
}

export function SkPill({ className = '' }: { className?: string }) {
  return <span className={`page-skeleton__pill ${className}`.trim()} />
}

export function SkLegalHero({ lines = 2 }: { lines?: number }) {
  return (
    <header className="legal-page__hero page-skeleton__legal-hero">
      <div className="container-site page-skeleton__legal-hero-inner">
        <SkLine className="page-skeleton__line--eyebrow" />
        <SkLine className="page-skeleton__line--title" />
        {lines >= 2 ? <SkLine className="page-skeleton__line--lead" /> : null}
        {lines >= 3 ? <SkLine className="page-skeleton__line--lead page-skeleton__line--mid" /> : null}
      </div>
    </header>
  )
}
