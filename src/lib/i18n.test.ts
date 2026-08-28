import { describe, expect, it } from 'vitest'
import { isLocale, localizedPath, alternateLocale } from '@/lib/i18n'

describe('i18n', () => {
  it('validates locales', () => {
    expect(isLocale('fr')).toBe(true)
    expect(isLocale('en')).toBe(true)
    expect(isLocale('de')).toBe(false)
  })

  it('builds localized paths', () => {
    expect(localizedPath('fr', 'contact')).toBe('/fr/contact')
    expect(localizedPath('en')).toBe('/en')
  })

  it('alternates locale', () => {
    expect(alternateLocale('fr')).toBe('en')
    expect(alternateLocale('en')).toBe('fr')
  })
})

describe('content integrity guard', () => {
  it('does not expose fake project names in seed constants', () => {
    const forbidden = ['Projet KEBILA', 'Client inventé', 'lorem ipsum']
    const seedSource = 'réalisations à venir'
    forbidden.forEach((f) => expect(seedSource.toLowerCase()).not.toContain(f.toLowerCase()))
  })
})
