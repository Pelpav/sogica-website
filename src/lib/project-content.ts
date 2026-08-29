import type { Locale } from '@/lib/i18n'

export type ProjectDetailLabels = {
  eyebrow: string
  back: string
  year: string
  country: string
  location: string
  city: string
  status: string
  client: string
  period: string
  expertises: string
  workTypes: string
  services: string
  about: string
  challenges: string
  solutions: string
  gallery: string
  video: string
  beforeAfter: string
  before: string
  after: string
  map: string
  related: string
  discover: string
  ctaTitle: string
  ctaLead: string
  ctaContact: string
  ctaQuote: string
  statusCompleted: string
  statusInProgress: string
  statusPlanned: string
}

export function getProjectDetailLabels(locale: Locale): ProjectDetailLabels {
  if (locale === 'en') {
    return {
      eyebrow: 'Project',
      back: 'All projects',
      year: 'Year',
      country: 'Country',
      location: 'Location',
      city: 'Area',
      status: 'Status',
      client: 'Client',
      period: 'Period',
      expertises: 'Expertise',
      workTypes: 'Work types',
      services: 'Services delivered',
      about: 'About the project',
      challenges: 'Challenges',
      solutions: 'Solutions',
      gallery: 'Project gallery',
      video: 'Project video',
      beforeAfter: 'Before / after',
      before: 'Before',
      after: 'After',
      map: 'Location',
      related: 'Related projects',
      discover: 'View project',
      ctaTitle: 'A similar project in mind?',
      ctaLead: 'Contact our team to discuss your requirements and receive a tailored proposal.',
      ctaContact: 'Contact us',
      ctaQuote: 'Request a quote',
      statusCompleted: 'Completed',
      statusInProgress: 'In progress',
      statusPlanned: 'Planned',
    }
  }

  return {
    eyebrow: 'Réalisation',
    back: 'Toutes les réalisations',
    year: 'Année',
    country: 'Pays',
    location: 'Lieu',
    city: 'Ville / zone',
    status: 'Statut',
    client: 'Client',
    period: 'Période',
    expertises: 'Expertises',
    workTypes: 'Types de travaux',
    services: 'Prestations réalisées',
    about: 'À propos du projet',
    challenges: 'Défis',
    solutions: 'Solutions',
    gallery: 'Galerie du chantier',
    video: 'Vidéo du projet',
    beforeAfter: 'Avant / après',
    before: 'Avant',
    after: 'Après',
    map: 'Localisation',
    related: 'Projets associés',
    discover: 'Voir le projet',
    ctaTitle: 'Un projet similaire en tête ?',
    ctaLead: 'Contactez notre équipe pour étudier vos besoins et recevoir une proposition adaptée.',
    ctaContact: 'Nous contacter',
    ctaQuote: 'Demander un devis',
    statusCompleted: 'Terminé',
    statusInProgress: 'En cours',
    statusPlanned: 'Planifié',
  }
}

export function projectStatusLabel(
  status: string | null | undefined,
  labels: ProjectDetailLabels,
): string | null {
  if (!status) return null
  if (status === 'completed') return labels.statusCompleted
  if (status === 'in-progress') return labels.statusInProgress
  if (status === 'planned') return labels.statusPlanned
  return null
}

export function formatProjectPeriod(
  start: string | null | undefined,
  end: string | null | undefined,
  locale: Locale,
): string | null {
  if (!start && !end) return null
  const fmt = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  })
  if (start && end) {
    return `${fmt.format(new Date(start))} — ${fmt.format(new Date(end))}`
  }
  if (start) return fmt.format(new Date(start))
  if (end) return fmt.format(new Date(end))
  return null
}

export function projectLocationText(project: {
  locationText?: string | null
  city?: string | null
  country?: string | null
}): string {
  return project.locationText || [project.city, project.country].filter(Boolean).join(', ')
}
