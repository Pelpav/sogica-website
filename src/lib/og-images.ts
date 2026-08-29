import type { Locale } from '@/lib/i18n'
import { routeLabels } from '@/lib/i18n'

export type OgImageKey =
  | 'default'
  | 'about'
  | 'expertises'
  | 'realisations'
  | 'clients'
  | 'contact'
  | 'quote'
  | 'legal'
  | 'privacy'

const OG_LABELS: Record<OgImageKey, Record<Locale, string>> = {
  default: {
    fr: 'Ingénierie & BTP',
    en: 'Engineering & Construction',
  },
  about: {
    fr: routeLabels.fr.about,
    en: routeLabels.en.about,
  },
  expertises: {
    fr: routeLabels.fr.expertises,
    en: routeLabels.en.expertises,
  },
  realisations: {
    fr: routeLabels.fr.realisations,
    en: routeLabels.en.realisations,
  },
  clients: {
    fr: routeLabels.fr.clients,
    en: routeLabels.en.clients,
  },
  contact: {
    fr: routeLabels.fr.contact,
    en: routeLabels.en.contact,
  },
  quote: {
    fr: routeLabels.fr.quote,
    en: routeLabels.en.quote,
  },
  legal: {
    fr: routeLabels.fr.legal,
    en: routeLabels.en.legal,
  },
  privacy: {
    fr: routeLabels.fr.privacy,
    en: routeLabels.en.privacy,
  },
}

export function getOgImagePath(key: OgImageKey, locale: Locale): string {
  return `/brand/og/${key}-${locale}.png`
}

export function getOgImageLabel(key: OgImageKey, locale: Locale): string {
  return OG_LABELS[key][locale]
}

export const OG_BACKGROUND_FILES = [
  'sogica-hero-reference-01.png',
  'sogica-hero-reference-02.png',
  'sogica-hero-reference-03.png',
  'sogica-hero-reference-04.png',
] as const
