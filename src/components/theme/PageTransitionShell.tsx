'use client'

import { NavigationContentShell } from '@/components/theme/NavigationContentShell'
import type { ReactNode } from 'react'

export function PageTransitionShell({ children }: { children: ReactNode }) {
  return (
    <div className="page-transition-shell">
      <NavigationContentShell>{children}</NavigationContentShell>
    </div>
  )
}