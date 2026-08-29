'use client'

import type { ReactNode } from 'react'

/** Enveloppe section sans animation globale — les enfants s'animent individuellement au scroll. */
export function MotionSection({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}
