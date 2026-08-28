export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeLabels: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localizedPath(locale: Locale, path = ''): string {
  const clean = path.startsWith('/') ? path : path ? `/${path}` : ''
  return `/${locale}${clean}`
}

export function alternateLocale(locale: Locale): Locale {
  return locale === 'fr' ? 'en' : 'fr'
}

export const routeLabels: Record<Locale, Record<string, string>> = {
  fr: {
    home: 'Accueil',
    about: 'À propos',
    expertises: 'Expertises',
    realisations: 'Réalisations',
    equipment: 'Moyens matériels',
    clients: 'Clients & partenaires',
    contact: 'Contact',
    quote: 'Demande de devis',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
  en: {
    home: 'Home',
    about: 'About',
    expertises: 'Expertise',
    realisations: 'Projects',
    equipment: 'Equipment',
    clients: 'Clients & partners',
    contact: 'Contact',
    quote: 'Request a quote',
    legal: 'Legal notice',
    privacy: 'Privacy',
  },
}

export const slugRoutes = {
  about: { fr: 'a-propos', en: 'about' },
  expertises: { fr: 'expertises', en: 'expertise' },
  realisations: { fr: 'realisations', en: 'projects' },
  equipment: { fr: 'moyens-materiels', en: 'equipment' },
  clients: { fr: 'clients-partenaires', en: 'clients-partners' },
  contact: { fr: 'contact', en: 'contact' },
  quote: { fr: 'demande-de-devis', en: 'request-quote' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
  privacy: { fr: 'confidentialite', en: 'privacy' },
} as const
