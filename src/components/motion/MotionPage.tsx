'use client'

import { getMotionIntensity, MOTION_EASE } from '@/lib/motion-config'
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useMotionActive } from './MotionProvider'

export function MotionPage({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const active = useMotionActive()
  const reduced = useReducedMotion()
  const intensity = getMotionIntensity()

  if (!active || reduced || intensity === 0) {
    return <>{children}</>
  }

  return (
    <motion.div
      suppressHydrationWarning
      key={pathname}
      initial={{ opacity: 0, y: 14 * intensity }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  )
}
