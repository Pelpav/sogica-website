'use client'

import {
  getMotionIntensity,
  MOTION_EASE,
  MOTION_VIEWPORT,
  motionDistance,
} from '@/lib/motion-config'
import { motion, useReducedMotion } from 'framer-motion'
import { createElement, type ReactNode } from 'react'
import { useMotionActive } from './MotionProvider'

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'hero'

type RevealElement = 'div' | 'section' | 'header' | 'article' | 'li' | 'span'

type RevealProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delay?: number
  as?: RevealElement
}

function hiddenState(variant: RevealVariant, intensity: number) {
  switch (variant) {
    case 'fade':
      return { opacity: 0 }
    case 'left':
      return { opacity: 0, x: -motionDistance(32, intensity) }
    case 'right':
      return { opacity: 0, x: motionDistance(32, intensity) }
    case 'scale':
      return { opacity: 0, scale: 1 - 0.05 * intensity }
    case 'hero':
      return { opacity: 0, y: motionDistance(20, intensity) }
    case 'up':
    default:
      return { opacity: 0, y: motionDistance(40, intensity) }
  }
}

export function Reveal({
  children,
  className,
  variant = 'up',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const active = useMotionActive()
  const reduced = useReducedMotion()
  const intensity = getMotionIntensity()

  if (!active || reduced || intensity === 0) {
    return createElement(as, { className }, children)
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      suppressHydrationWarning
      className={className}
      data-motion-reveal=""
      initial={hiddenState(variant, intensity)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={MOTION_VIEWPORT}
      transition={{ duration: variant === 'hero' ? 0.5 : 0.65, delay, ease: MOTION_EASE }}
    >
      {children}
    </MotionTag>
  )
}
