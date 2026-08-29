'use client'

import {
  getMotionIntensity,
  MOTION_EASE,
  MOTION_VIEWPORT,
  motionDistance,
} from '@/lib/motion-config'
import { motion, useReducedMotion } from 'framer-motion'
import { Children, createElement, isValidElement, type ReactNode } from 'react'
import { useMotionActive } from './MotionProvider'

type RevealStaggerElement = 'div' | 'section' | 'header' | 'ul' | 'ol'

type RevealStaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  as?: RevealStaggerElement
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const active = useMotionActive()
  const reduced = useReducedMotion()
  const intensity = getMotionIntensity()

  if (!active || reduced || intensity === 0) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      suppressHydrationWarning
      className={className}
      data-motion-reveal=""
      variants={{
        hidden: { opacity: 0, y: motionDistance(36, intensity) },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealStagger({
  children,
  className,
  stagger = 0.1,
  as = 'div',
}: RevealStaggerProps) {
  const active = useMotionActive()
  const reduced = useReducedMotion()
  const intensity = getMotionIntensity()
  const Tag = motion[as]

  if (!active || reduced || intensity === 0) {
    return createElement(as, { className }, children)
  }

  const items = Children.toArray(children).filter(isValidElement)

  return (
    <Tag
      suppressHydrationWarning
      className={className}
      data-motion-reveal=""
      initial="hidden"
      whileInView="visible"
      viewport={MOTION_VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.04,
          },
        },
      }}
    >
      {items.map((child, index) => (
        <motion.div
          key={child.key ?? index}
          suppressHydrationWarning
          variants={{
            hidden: { opacity: 0, y: motionDistance(36, intensity) },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.62, ease: MOTION_EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </Tag>
  )
}
