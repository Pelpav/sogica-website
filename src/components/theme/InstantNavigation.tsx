'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export function InstantNavigation() {
  const router = useRouter()

  useEffect(() => {
    const prefetched = new Set<string>()

    const prefetch = (href: string) => {
      if (!isInternalHref(href) || prefetched.has(href)) return
      prefetched.add(href)
      router.prefetch(href)
    }

    const prefetchVisibleLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((anchor) => {
        const href = anchor.getAttribute('href')
        if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return
        prefetch(href)
      })
    }

    const onIntent = (event: Event) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a[href^="/"]')
      if (!anchor || anchor instanceof HTMLAnchorElement === false) return
      const href = anchor.getAttribute('href')
      if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      prefetch(href)
    }

    prefetchVisibleLinks()

    const observer = new MutationObserver(() => prefetchVisibleLinks())
    observer.observe(document.body, { childList: true, subtree: true })

    document.addEventListener('mouseover', onIntent, { capture: true, passive: true })
    document.addEventListener('focusin', onIntent, { capture: true })
    document.addEventListener('touchstart', onIntent, { capture: true, passive: true })

    return () => {
      observer.disconnect()
      document.removeEventListener('mouseover', onIntent, { capture: true })
      document.removeEventListener('focusin', onIntent, { capture: true })
      document.removeEventListener('touchstart', onIntent, { capture: true })
    }
  }, [router])

  return null
}
