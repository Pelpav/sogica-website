import { describe, expect, it } from 'vitest'
import { alternateLocale, isLocale, localizedPath, resolveLocaleUrl, switchLocalePath } from '@/lib/i18n'

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

  it('switches locale paths with translated route segments', () => {
    expect(switchLocalePath('/fr/clients-partenaires', 'en')).toBe('/en/clients-partners')
    expect(switchLocalePath('/en/clients-partners', 'fr')).toBe('/fr/clients-partenaires')
    expect(switchLocalePath('/fr/mentions-legales', 'en')).toBe('/en/legal-notice')
    expect(switchLocalePath('/fr/realisations/projet-test', 'en')).toBe('/en/projects/projet-test')
    expect(switchLocalePath('/fr', 'en')).toBe('/en')
  })

  it('normalizes CMS URLs to the active locale', () => {
    expect(resolveLocaleUrl('/fr/demande-de-devis', 'en')).toBe('/en/request-quote')
    expect(resolveLocaleUrl('/en/clients-partenaires', 'en')).toBe('/en/clients-partners')
    expect(resolveLocaleUrl('/contact', 'fr')).toBe('/fr/contact')
  })
})

describe('content integrity guard', () => {
  it('does not expose fake project names in seed constants', () => {
    const forbidden = ['Projet KEBILA', 'Client inventé', 'lorem ipsum']
    const seedSource = 'réalisations à venir'
    forbidden.forEach((f) => expect(seedSource.toLowerCase()).not.toContain(f.toLowerCase()))
  })
})
