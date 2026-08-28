'use client'

import dynamic from 'next/dynamic'
import type { Locale } from '@/lib/i18n'

const ProjectMap = dynamic(() => import('@/components/map/ProjectMap').then((m) => m.ProjectMap), {
  ssr: false,
  loading: () => <div className="h-[480px] animate-pulse bg-[var(--color-muted)]" />,
})

export function MapBlockClient({
  locale,
  points,
  height,
}: {
  locale: Locale
  points: { id: string; title: string; slug: string; lat: number; lng: number }[]
  height: number
}) {
  return <ProjectMap locale={locale} points={points} height={height} />
}
