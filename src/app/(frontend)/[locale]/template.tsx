import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { PageTransitionShell } from '@/components/theme/PageTransitionShell'

export default function LocaleTemplate({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="page-transition-shell">
          <div className="navigation-content-shell">
            <div className="navigation-content-shell__page">{children}</div>
          </div>
        </div>
      }
    >
      <PageTransitionShell>{children}</PageTransitionShell>
    </Suspense>
  )
}
