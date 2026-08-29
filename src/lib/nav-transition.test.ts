import { describe, expect, it } from 'vitest'
import { getNavTransitionType } from './nav-transition'

describe('getNavTransitionType', () => {
  it('returns nav-forward when going deeper', () => {
    expect(getNavTransitionType('/fr/expertises/foo', '/fr/expertises')).toBe('nav-forward')
  })

  it('returns nav-back when going up', () => {
    expect(getNavTransitionType('/fr', '/fr/expertises/foo')).toBe('nav-back')
  })

  it('returns undefined at same depth', () => {
    expect(getNavTransitionType('/fr/contact', '/fr/expertises')).toBeUndefined()
  })
})
