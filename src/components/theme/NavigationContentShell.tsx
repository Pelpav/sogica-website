'use client'

import { PageContentSkeleton } from '@/components/layout/PageContentSkeleton'
import { getNavTransitionType } from '@/lib/nav-transition'
import { usePathname } from 'next/navigation'
import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'

function isInternalNavigation(href: string, pathname: string) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false

  try {
    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) return false
    if (url.pathname === pathname && !url.search) return false
    return true
  } catch {
    return false
  }
}

function pathMatchesTarget(pathname: string, target: string) {
  return pathname === target || pathname.startsWith(`${target}/`)
}

function isPageSkeleton(node: ReactNode) {
  if (!isValidElement(node)) return false
  if (node.type === PageContentSkeleton) return true

  const props = node.props as { children?: ReactNode; 'data-page-skeleton'?: boolean }
  if (props['data-page-skeleton']) return true

  return Children.toArray(props.children).some(isPageSkeleton)
}

function setNavTransitionDirection(fromPath: string, toPath: string) {
  const direction = getNavTransitionType(toPath, fromPath)
  const root = document.documentElement

  if (direction) {
    root.dataset.navTransition = direction
    return
  }

  delete root.dataset.navTransition
}

function commitWithTransition(callback: () => void) {
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    document.startViewTransition(() => {
      flushSync(callback)
    })
    return
  }

  callback()
}

export function NavigationContentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const committedPath = useRef(pathname)
  const frozenChildren = useRef<ReactNode>(children)
  const navigationTarget = useRef<string | null>(null)
  const hasRealContent = useRef(!isPageSkeleton(children))

  useEffect(() => {
    if (isNavigating) return
    if (isPageSkeleton(children)) return

    frozenChildren.current = children
    committedPath.current = pathname
    hasRealContent.current = true
  }, [children, pathname, isNavigating])

  useEffect(() => {
    if (pathname === committedPath.current || isNavigating) return
    if (!hasRealContent.current || isPageSkeleton(frozenChildren.current)) return

    setNavTransitionDirection(committedPath.current, pathname)
    navigationTarget.current = pathname
    setIsNavigating(true)
  }, [pathname, isNavigating])

  useEffect(() => {
    const beginNavigation = (targetPath: string) => {
      if (!hasRealContent.current || isPageSkeleton(frozenChildren.current)) return
      setNavTransitionDirection(pathname, targetPath)
      navigationTarget.current = targetPath
      setIsNavigating(true)
    }

    const onNavigate = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || !isInternalNavigation(href, pathname)) return

      beginNavigation(new URL(href, window.location.origin).pathname)
    }

    const onPopState = () => {
      if (!hasRealContent.current) return
      const targetPath = window.location.pathname
      setNavTransitionDirection(pathname, targetPath)
      navigationTarget.current = targetPath
      setIsNavigating(true)
    }

    document.addEventListener('click', onNavigate, true)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('click', onNavigate, true)
      window.removeEventListener('popstate', onPopState)
    }
  }, [pathname])

  useEffect(() => {
    if (!isNavigating) return

    const target = navigationTarget.current
    if (!target || !pathMatchesTarget(pathname, target)) return
    if (isPageSkeleton(children)) return

    commitWithTransition(() => {
      frozenChildren.current = children
      committedPath.current = pathname
      navigationTarget.current = null
      hasRealContent.current = true
      setIsNavigating(false)
      window.scrollTo(0, 0)
    })
  }, [children, pathname, isNavigating])

  useEffect(() => {
    if (isNavigating) return
    delete document.documentElement.dataset.navTransition
  }, [isNavigating, pathname])

  const canHoldPreviousPage =
    isNavigating && hasRealContent.current && !isPageSkeleton(frozenChildren.current)

  const visibleChildren =
    canHoldPreviousPage || (isNavigating && isPageSkeleton(children))
      ? frozenChildren.current
      : children

  return (
    <div
      className="navigation-content-shell"
      data-navigating={isNavigating ? 'true' : 'false'}
      aria-busy={isNavigating ? 'true' : undefined}
    >
      <div className="navigation-content-shell__page" data-page-transition>
        {visibleChildren}
      </div>
    </div>
  )
}
