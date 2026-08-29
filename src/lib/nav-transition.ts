import { isLocale, slugRoutes, type SlugRouteKey } from './i18n'

export type NavTransitionType = 'nav-forward' | 'nav-back'

const slugToRouteKey: Record<string, SlugRouteKey> = {}
for (const [key, routes] of Object.entries(slugRoutes) as [SlugRouteKey, (typeof slugRoutes)[SlugRouteKey]][]) {
  slugToRouteKey[routes.fr] = key
  slugToRouteKey[routes.en] = key
}

/** Ordre des pages dans la navigation principale (gauche → droite). */
const NAV_POSITION: Record<SlugRouteKey | 'home', number> = {
  home: 0,
  about: 10,
  expertises: 20,
  realisations: 30,
  equipment: 35,
  clients: 40,
  contact: 50,
  quote: 55,
  legal: 900,
  privacy: 910,
}

function pathSegments(pathname: string): string[] {
  const clean = pathname.split('?')[0].split('#')[0]
  const parts = clean.split('/').filter(Boolean)
  return parts.length > 0 && isLocale(parts[0]) ? parts.slice(1) : parts
}

function isDetailPath(pathname: string): boolean {
  return pathSegments(pathname).length > 1
}

function getNavPosition(pathname: string): number {
  const segments = pathSegments(pathname)

  if (segments.length === 0) return NAV_POSITION.home

  const routeKey = slugToRouteKey[segments[0]]
  if (!routeKey) return 100 + segments.length

  const base = NAV_POSITION[routeKey] ?? 100 + segments.length
  return base + (segments.length - 1)
}

/** Swipe gauche/droite selon la position dans la navigation (pages index uniquement). */
export function getNavTransitionType(
  targetHref: string,
  pathname: string,
): NavTransitionType | undefined {
  if (isDetailPath(targetHref) || isDetailPath(pathname)) return undefined

  const from = getNavPosition(pathname)
  const to = getNavPosition(targetHref)

  if (to > from) return 'nav-forward'
  if (to < from) return 'nav-back'
  return undefined
}
