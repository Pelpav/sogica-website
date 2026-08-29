'use client'

import { MotionPage } from '@/components/motion/MotionPage'
import { NavigationContentShell } from '@/components/theme/NavigationContentShell'
import { Suspense, type ReactNode } from 'react'

function PageTransitionFallback({ children }: { children: ReactNode }) {
  return (
    <div className="navigation-content-shell">
      <div className="navigation-content-shell__page" data-page-transition>
        {children}
      </div>
    </div>
  )
}

export function PageTransitionShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-transition-shell">
      <Suspense fallback={<PageTransitionFallback>{children}</PageTransitionFallback>}>
        <NavigationContentShell>
          <MotionPage>{children}</MotionPage>
        </NavigationContentShell>
      </Suspense>
    </div>
  )
}
