'use client'

import dynamic from 'next/dynamic'
import { scheduleIdleWork } from '@/lib/idle'
import { useEffect, useState } from 'react'

const MotionScrollEnhancer = dynamic(
  () => import('@/components/motion/MotionScrollEnhancer').then((m) => m.MotionScrollEnhancer),
  { ssr: false },
)

/** Charge le enhancer DOM après le LCP pour réduire le TBT initial. */
export function MotionScrollEnhancerLazy() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    return scheduleIdleWork(() => setReady(true), { timeout: 2500, fallbackMs: 1200 })
  }, [])

  if (!ready) return null
  return <MotionScrollEnhancer />
}
