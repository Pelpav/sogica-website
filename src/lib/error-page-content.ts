import type { Locale } from '@/lib/i18n'

export type ErrorPageContent = {
  eyebrow: string
  title: string
  lead: string
  homeCta: string
  contactCta: string
  exploreCta: string
}

export function getNotFoundContent(locale: Locale): ErrorPageContent {
  if (locale === 'en') {
    return {
      eyebrow: 'Error 404',
      title: 'Page not found',
      lead: 'The page you are looking for may have been moved, removed, or does not exist yet.',
      homeCta: 'Back to home',
      contactCta: 'Contact us',
      exploreCta: 'View our projects',
    }
  }

  return {
    eyebrow: 'Erreur 404',
    title: 'Page introuvable',
    lead: 'La page que vous recherchez a peut-être été déplacée, supprimée ou n’existe pas encore.',
    homeCta: 'Retour à l’accueil',
    contactCta: 'Nous contacter',
    exploreCta: 'Voir nos réalisations',
  }
}
