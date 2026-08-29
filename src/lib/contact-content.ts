import type { Locale } from '@/lib/i18n'

export type ContactPageContent = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  introParagraphs: string[]
  asideTitle: string
  responseTitle: string
  responseText: string
  quoteTitle: string
  quoteText: string
  quoteLink: string
  formTitle: string
  addressLabel: string
  phoneLabel: string
  emailLabel: string
}

const fr: ContactPageContent = {
  heroEyebrow: 'Contact',
  heroTitle: 'Parlons de votre projet',
  heroLead:
    'Une question, un besoin technique ou un chantier à cadrer : notre équipe vous répond avec précision.',
  introParagraphs: [
    'Décrivez votre contexte, vos contraintes et vos délais. Nous revenons vers vous pour préciser la faisabilité et la suite à donner.',
    'Pour une demande chiffrée structurée, vous pouvez aussi utiliser le formulaire de devis dédié.',
  ],
  asideTitle: 'Coordonnées',
  responseTitle: 'Délai de réponse',
  responseText: 'Nous traitons les demandes entrantes sous 2 à 3 jours ouvrés.',
  quoteTitle: 'Besoin d\'un chiffrage ?',
  quoteText: 'Le formulaire de devis permet de détailler votre projet et vos attentes.',
  quoteLink: 'Demande de devis',
  formTitle: 'Écrivez-nous',
  addressLabel: 'Adresse',
  phoneLabel: 'Téléphone',
  emailLabel: 'E-mail',
}

const en: ContactPageContent = {
  heroEyebrow: 'Contact',
  heroTitle: "Let's discuss your project",
  heroLead:
    'A question, a technical need or a project to scope: our team will respond with clarity.',
  introParagraphs: [
    'Describe your context, constraints and timeline. We will get back to you to clarify feasibility and next steps.',
    'For a structured quote request, you can also use the dedicated quote form.',
  ],
  asideTitle: 'Contact details',
  responseTitle: 'Response time',
  responseText: 'We review incoming requests within 2 to 3 business days.',
  quoteTitle: 'Need a quote?',
  quoteText: 'The quote form lets you detail your project and expectations.',
  quoteLink: 'Request a quote',
  formTitle: 'Write to us',
  addressLabel: 'Address',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
}

export function getContactPageContent(locale: Locale): ContactPageContent {
  return locale === 'fr' ? fr : en
}
