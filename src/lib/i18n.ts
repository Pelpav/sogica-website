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

export type SlugRouteKey = keyof typeof slugRoutes

const slugToRouteKey: Record<string, SlugRouteKey> = {}
for (const [key, routes] of Object.entries(slugRoutes) as [SlugRouteKey, (typeof slugRoutes)[SlugRouteKey]][]) {
  slugToRouteKey[routes.fr] = key
  slugToRouteKey[routes.en] = key
}

export function routePath(locale: Locale, route: SlugRouteKey): string {
  return localizedPath(locale, slugRoutes[route][locale])
}

function canonicalSegment(segment: string, targetLocale: Locale): string {
  const routeKey = slugToRouteKey[segment]
  if (routeKey) return slugRoutes[routeKey][targetLocale]
  return segment
}

function normalizePathSegments(segments: string[], targetLocale: Locale): string[] {
  if (segments.length === 0) return segments
  return [canonicalSegment(segments[0], targetLocale), ...segments.slice(1)]
}

/** Switch the locale prefix and translate known route segments (e.g. clients-partenaires → clients-partners). */
export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const clean = pathname.split('?')[0].split('#')[0]
  const parts = clean.split('/').filter(Boolean)

  if (parts.length === 0) return localizedPath(targetLocale)

  const segments = isLocale(parts[0]) ? parts.slice(1) : parts
  const normalized = normalizePathSegments(segments, targetLocale)

  if (normalized.length === 0) return localizedPath(targetLocale)
  return localizedPath(targetLocale, normalized.join('/'))
}

/** Normalize a CMS or internal URL to the correct locale and canonical route slugs. */
export function resolveLocaleUrl(url: string | undefined, locale: Locale, fallback = ''): string {
  if (!url) return fallback
  if (/^https?:\/\//i.test(url) || url.startsWith('tel:') || url.startsWith('mailto:') || url === '#') {
    return url
  }

  const parts = url.split('/').filter(Boolean)
  const segments = parts.length > 0 && isLocale(parts[0]) ? parts.slice(1) : parts
  const normalized = normalizePathSegments(segments, locale)

  if (normalized.length === 0) return localizedPath(locale)
  return localizedPath(locale, normalized.join('/'))
}
