import type { Locale } from '@/lib/i18n'

export type QuotePageContent = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  introParagraphs: string[]
  asideTitle: string
  tipsTitle: string
  tips: string[]
  formTitle: string
  contactTitle: string
  contactText: string
  contactLink: string
}

const fr: QuotePageContent = {
  heroEyebrow: 'Devis',
  heroTitle: 'Demande de devis',
  heroLead:
    'Décrivez votre projet en quelques lignes pour recevoir une première analyse de faisabilité.',
  introParagraphs: [
    'Plus votre demande est précise (périmètre, lieu, délais, contraintes techniques), plus notre réponse sera pertinente.',
    'Notre équipe étudie chaque dossier et vous recontacte pour affiner le cadrage si nécessaire.',
  ],
  asideTitle: 'Pour un dossier complet',
  tipsTitle: 'Informations utiles',
  tips: [
    'Nature des travaux et périmètre attendu',
    'Localisation du chantier ou du site',
    'Délais souhaités et contraintes connues',
    'Documents techniques disponibles (plans, notes, cahier des charges)',
  ],
  formTitle: 'Votre demande',
  contactTitle: 'Une question avant de déposer ?',
  contactText: 'Contactez-nous directement si vous préférez échanger avant de formaliser votre besoin.',
  contactLink: 'Nous contacter',
}

const en: QuotePageContent = {
  heroEyebrow: 'Quote',
  heroTitle: 'Request a quote',
  heroLead:
    'Describe your project in a few lines to receive an initial feasibility review.',
  introParagraphs: [
    'The more specific your request (scope, location, timeline, technical constraints), the more relevant our response will be.',
    'Our team reviews each submission and will follow up to refine the scope if needed.',
  ],
  asideTitle: 'For a complete submission',
  tipsTitle: 'Helpful information',
  tips: [
    'Nature of works and expected scope',
    'Project or site location',
    'Desired timeline and known constraints',
    'Available technical documents (drawings, notes, specifications)',
  ],
  formTitle: 'Your request',
  contactTitle: 'A question before submitting?',
  contactText: 'Contact us directly if you prefer to discuss before formalizing your requirements.',
  contactLink: 'Contact us',
}

export function getQuotePageContent(locale: Locale): QuotePageContent {
  return locale === 'fr' ? fr : en
}
