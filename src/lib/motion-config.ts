export const LEGAL_ROUTE_SEGMENTS = [
  'mentions-legales',
  'confidentialite',
  'legal-notice',
  'privacy',
] as const

export function isLegalRoute(pathname: string): boolean {
  return LEGAL_ROUTE_SEGMENTS.some((segment) => pathname.includes(`/${segment}`))
}

export function getMotionIntensity(): number {
  if (typeof window === 'undefined') return 0.75

  const mode = document.documentElement.dataset.motion
  if (mode === 'none') return 0
  if (mode === 'moderate') return 1
  return 0.75
}

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const

export const MOTION_VIEWPORT = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -10% 0px' as const,
}

/** Déclenchement plus tôt pour les éléments individuels dans une liste/grille. */
export const MOTION_VIEWPORT_ITEM = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -6% 0px' as const,
}

export type RevealVariant = 'up' | 'fade' | 'left' | 'right' | 'scale' | 'hero'

export function motionDistance(base: number, intensity = getMotionIntensity()): number {
  return base * intensity
}
