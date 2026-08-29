'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

type BarState = 'idle' | 'loading' | 'completing'

export function RouteProgressBar() {
  const pathname = usePathname()
  const [state, setState] = useState<BarState>('idle')
  const [progress, setProgress] = useState(0)
  const prevPath = useRef(pathname)
  const tickRef = useRef<number | null>(null)
  const hideRef = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    if (tickRef.current) window.clearInterval(tickRef.current)
    if (hideRef.current) window.clearTimeout(hideRef.current)
    tickRef.current = null
    hideRef.current = null
  }, [])

  const start = useCallback(() => {
    clearTimers()
    setState('loading')
    setProgress(12)

    tickRef.current = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 88) return value
        const step = value < 40 ? 9 : value < 70 ? 5 : 2
        return Math.min(88, value + step + Math.random() * 4)
      })
    }, 220)
  }, [clearTimers])

  const complete = useCallback(() => {
    clearTimers()
    setProgress(100)
    setState('completing')

    hideRef.current = window.setTimeout(() => {
      setState('idle')
      setProgress(0)
    }, 450)
  }, [clearTimers])

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname
    complete()
  }, [pathname, complete])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) return
        if (url.pathname === pathname && !url.search) return
        start()
      } catch {
        /* ignore malformed href */
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, start])

  useEffect(() => () => clearTimers(), [clearTimers])

  if (state === 'idle' && progress === 0) return null

  return (
    <div className="route-progress" aria-hidden="true">
      <span
        className={`route-progress__bar route-progress__bar--${state}`}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
      <span className="route-progress__glow" style={{ transform: `scaleX(${progress / 100})` }} aria-hidden />
    </div>
  )
}
