'use client'

import {
  getMotionIntensity,
  MOTION_EASE,
  MOTION_VIEWPORT_ITEM,
  motionDistance,
  type RevealVariant,
} from '@/lib/motion-config'
import { motion, useReducedMotion } from 'framer-motion'
import { Children, createElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react'
import { useMotionActive } from './MotionProvider'

type RevealEachContainer = 'div' | 'section' | 'ul' | 'ol' | 'article'
type RevealEachItem = 'div' | 'li' | 'article'

type RevealEachProps = {
  children: ReactNode
  className?: string
  as?: RevealEachContainer
  itemAs?: RevealEachItem
  variant?: RevealVariant
  role?: string
  'aria-label'?: string
  style?: CSSProperties
}

function hiddenState(variant: RevealVariant, intensity: number) {
  switch (variant) {
    case 'fade':
      return { opacity: 0 }
    case 'left':
      return { opacity: 0, x: -motionDistance(28, intensity) }
    case 'right':
      return { opacity: 0, x: motionDistance(28, intensity) }
    case 'scale':
      return { opacity: 0, scale: 1 - 0.04 * intensity }
    case 'hero':
      return { opacity: 0, y: motionDistance(18, intensity) }
    case 'up':
    default:
      return { opacity: 0, y: motionDistance(48, intensity) }
  }
}

function motionProps(variant: RevealVariant, intensity: number) {
  return {
    'data-motion-reveal': '',
    initial: hiddenState(variant, intensity),
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: MOTION_VIEWPORT_ITEM,
    transition: { duration: 0.72, ease: MOTION_EASE },
  } as const
}

function enhanceListChild(
  child: ReactElement<{ className?: string; children?: ReactNode }>,
  index: number,
  variant: RevealVariant,
  intensity: number,
) {
  const Li = motion.li
  return (
    <Li
      key={child.key ?? index}
      suppressHydrationWarning
      className={child.props.className}
      {...motionProps(variant, intensity)}
    >
      {child.props.children}
    </Li>
  )
}

function enhanceArticleChild(
  child: ReactElement<{ className?: string; children?: ReactNode }>,
  index: number,
  variant: RevealVariant,
  intensity: number,
) {
  const Article = motion.article
  return (
    <Article
      key={child.key ?? index}
      suppressHydrationWarning
      className={child.props.className}
      {...motionProps(variant, intensity)}
    >
      {child.props.children}
    </Article>
  )
}

export function RevealEach({
  children,
  className,
  as = 'div',
  itemAs = 'div',
  variant = 'up',
  role,
  'aria-label': ariaLabel,
  style,
}: RevealEachProps) {
  const active = useMotionActive()
  const reduced = useReducedMotion()
  const intensity = getMotionIntensity()

  if (!active || reduced || intensity === 0) {
    return createElement(as, { className, role, 'aria-label': ariaLabel, style }, children)
  }

  const items = Children.toArray(children).filter(isValidElement)
  const ItemTag = motion[itemAs]

  const enhanced = items.map((child, index) => {
    if ((as === 'ul' || as === 'ol') && child.type === 'li') {
      return enhanceListChild(
        child as ReactElement<{ className?: string; children?: ReactNode }>,
        index,
        variant,
        intensity,
      )
    }

    if (child.type === 'article') {
      return enhanceArticleChild(
        child as ReactElement<{ className?: string; children?: ReactNode }>,
        index,
        variant,
        intensity,
      )
    }

    if (itemAs !== 'div' && child.type === itemAs) {
      const Tag = motion[itemAs]
      const typedChild = child as ReactElement<{ className?: string; children?: ReactNode }>
      return (
        <Tag
          key={child.key ?? index}
          suppressHydrationWarning
          className={typedChild.props.className}
          {...motionProps(variant, intensity)}
        >
          {typedChild.props.children}
        </Tag>
      )
    }

    return (
      <ItemTag key={child.key ?? index} suppressHydrationWarning {...motionProps(variant, intensity)}>
        {child}
      </ItemTag>
    )
  })

  if (as === 'ul' || as === 'ol') {
    return createElement(as, { className, role, 'aria-label': ariaLabel, style }, enhanced)
  }

  const ContainerTag = motion[as]
  return (
    <ContainerTag
      suppressHydrationWarning
      className={className} role={role} aria-label={ariaLabel} style={style}>
      {enhanced}
    </ContainerTag>
  )
}
