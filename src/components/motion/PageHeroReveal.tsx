'use client'

import type { ReactNode } from 'react'
import { RevealStagger } from './RevealStagger'

export function PageHeroReveal({
  children,
  className = 'legal-page__hero',
  innerClassName = 'container-site',
}: {
  children: ReactNode
  className?: string
  innerClassName?: string
}) {
  return (
    <header className={className}>
      <RevealStagger className={innerClassName} stagger={0.12}>
        {children}
      </RevealStagger>
    </header>
  )
}
