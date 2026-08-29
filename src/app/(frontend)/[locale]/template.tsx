import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { PageContentSkeleton } from '@/components/layout/PageContentSkeleton'
import { PageTransitionShell } from '@/components/theme/PageTransitionShell'

function TemplateFallback() {
  return (
    <div className="page-transition-shell">
      <div className="navigation-content-shell">
        <div className="navigation-content-shell__page" data-page-transition>
          <PageContentSkeleton />
        </div>
      </div>
    </div>
  )
}

export default function LocaleTemplate({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<TemplateFallback />}>
      <PageTransitionShell>{children}</PageTransitionShell>
    </Suspense>
  )
}
