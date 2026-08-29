export type NavTransitionType = 'nav-forward' | 'nav-back'

/** Détermine le type de transition selon la profondeur de l'URL cible. */
export function getNavTransitionType(
  targetHref: string,
  pathname: string,
): NavTransitionType | undefined {
  const depth = (path: string) => path.split('/').filter(Boolean).length
  const current = depth(pathname)
  const target = depth(targetHref)

  if (target > current) return 'nav-forward'
  if (target < current) return 'nav-back'
  return undefined
}
