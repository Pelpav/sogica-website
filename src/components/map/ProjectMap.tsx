'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Locale } from '@/lib/i18n'
import { localizedPath } from '@/lib/i18n'

type Point = {
  id: string
  title: string
  slug: string
  lat: number
  lng: number
}

export function ProjectMap({
  points,
  locale,
  height = 480,
}: {
  points: Point[]
  locale: Locale
  height?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const style = process.env.NEXT_PUBLIC_MAP_STYLE_URL || process.env.MAP_STYLE_URL || 'https://demotiles.maplibre.org/style.json'

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      center: [points[0]?.lng ?? -8, points[0]?.lat ?? 12.6],
      zoom: 5,
    })

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    const base = locale === 'fr' ? 'realisations' : 'projects'

    points.forEach((point) => {
      const el = document.createElement('a')
      el.href = localizedPath(locale, `${base}/${point.slug}`)
      el.className = 'map-marker'
      el.title = point.title
      el.setAttribute('aria-label', point.title)
      el.innerHTML = '<span></span>'
      el.style.cssText =
        'width:14px;height:14px;background:var(--color-primary,#f00080);border:2px solid white;border-radius:50%;display:block;'

      new maplibregl.Marker({ element: el }).setLngLat([point.lng, point.lat]).addTo(map)
    })

    if (points.length > 1) {
      const bounds = new maplibregl.LngLatBounds()
      points.forEach((p) => bounds.extend([p.lng, p.lat]))
      map.fitBounds(bounds, { padding: 48, maxZoom: 10 })
    }

    mapRef.current = map
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [points, locale])

  return (
    <div
      ref={containerRef}
      className="w-full border border-[var(--color-border)]"
      style={{ height }}
      role="region"
      aria-label={locale === 'fr' ? 'Carte des réalisations' : 'Projects map'}
    />
  )
}
