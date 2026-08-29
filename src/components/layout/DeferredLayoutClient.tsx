'use client'

import dynamic from 'next/dynamic'
import { Suspense, type ReactNode } from 'react'
import { MotionProvider } from '@/components/motion/MotionProvider'

const SitePreloader = dynamic(
  () => import('@/components/theme/SitePreloader').then((m) => m.SitePreloader),
  { ssr: false },
)

const RouteProgressBar = dynamic(
  () => import('@/components/theme/RouteProgressBar').then((m) => m.RouteProgressBar),
  { ssr: false },
)

const InstantNavigation = dynamic(
  () => import('@/components/theme/InstantNavigation').then((m) => m.InstantNavigation),
  { ssr: false },
)

const MotionScrollEnhancerLazy = dynamic(
  () =>
    import('@/components/motion/MotionScrollEnhancerLazy').then((m) => m.MotionScrollEnhancerLazy),
  { ssr: false },
)

const RefreshRouteOnSave = dynamic(
  () => import('@/components/cms/RefreshRouteOnSave').then((m) => m.RefreshRouteOnSave),
  { ssr: false },
)

export function DeferredLayoutClient({ children }: { children: ReactNode }) {
  return (
    <>
      <InstantNavigation />
      <RouteProgressBar />
      <SitePreloader />
      <Suspense fallback={null}>
        <MotionProvider>
          <MotionScrollEnhancerLazy />
          <RefreshRouteOnSave />
          {children}
        </MotionProvider>
      </Suspense>
    </>
  )
}
