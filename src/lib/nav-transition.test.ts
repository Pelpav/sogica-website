import { describe, expect, it } from 'vitest'
import { getNavTransitionType } from './nav-transition'

describe('getNavTransitionType', () => {
  it('returns nav-forward when opening a detail page', () => {
    expect(getNavTransitionType('/fr/expertises/foo', '/fr/expertises')).toBe('nav-forward')
  })

  it('returns nav-back when returning home from a detail page', () => {
    expect(getNavTransitionType('/fr', '/fr/expertises/foo')).toBe('nav-back')
  })

  it('returns nav-forward when moving right in the main nav', () => {
    expect(getNavTransitionType('/fr/contact', '/fr/expertises')).toBe('nav-forward')
  })

  it('returns nav-back when moving left in the main nav', () => {
    expect(getNavTransitionType('/fr/expertises', '/fr/contact')).toBe('nav-back')
  })

  it('returns undefined for a locale switch on the same page', () => {
    expect(getNavTransitionType('/en/contact', '/fr/contact')).toBeUndefined()
  })
})
