'use client'

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

  const props = node.props as { children?: ReactNode; 'data-page-skeleton'?: boolean; className?: string }
  if (props['data-page-skeleton']) return true
  if (typeof props.className === 'string' && props.className.includes('page-skeleton')) return true

  return Children.toArray(props.children).some(isPageSkeleton)
}

function hasRenderableContent(node: ReactNode) {
  if (node == null || node === false) return false
  if (isPageSkeleton(node)) return false
  return true
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
  const root = document.documentElement

  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    const transition = document.startViewTransition(() => {
      flushSync(callback)
    })

    void transition.finished.finally(() => {
      delete root.dataset.navTransition
    })
    return
  }

  callback()
  delete root.dataset.navTransition
}

export function NavigationContentShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const committedPath = useRef(pathname)
  const frozenChildren = useRef<ReactNode>(children)
  const navigationTarget = useRef<string | null>(null)
  const hasRealContent = useRef(hasRenderableContent(children))

  useEffect(() => {
    if (isNavigating) return
    if (!hasRenderableContent(children)) return

    frozenChildren.current = children
    committedPath.current = pathname
    hasRealContent.current = true
  }, [children, pathname, isNavigating])

  useEffect(() => {
    if (pathname === committedPath.current || isNavigating) return
    if (!hasRealContent.current || !hasRenderableContent(frozenChildren.current)) return

    setNavTransitionDirection(committedPath.current, pathname)
    navigationTarget.current = pathname
    setIsNavigating(true)
  }, [pathname, isNavigating])

  useEffect(() => {
    const beginNavigation = (targetPath: string) => {
      if (!hasRealContent.current || !hasRenderableContent(frozenChildren.current)) return
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
    if (!hasRenderableContent(children)) return

    commitWithTransition(() => {
      frozenChildren.current = children
      committedPath.current = pathname
      navigationTarget.current = null
      hasRealContent.current = true
      setIsNavigating(false)
      window.scrollTo(0, 0)
    })
  }, [children, pathname, isNavigating])

  const awaitingContent =
    pathname !== committedPath.current || !hasRenderableContent(children)

  const canHoldPreviousPage =
    hasRealContent.current &&
    hasRenderableContent(frozenChildren.current) &&
    (isNavigating || awaitingContent)

  const visibleChildren = canHoldPreviousPage ? frozenChildren.current : children

  return (
    <div
      className="navigation-content-shell"
      data-navigating={isNavigating ? 'true' : 'false'}
      aria-busy={isNavigating || awaitingContent ? 'true' : undefined}
    >
      <div className="navigation-content-shell__page" data-page-transition>
        {visibleChildren}
      </div>
    </div>
  )
}
