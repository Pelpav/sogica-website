import type { Locale } from '@/lib/i18n'

export type RealisationsIndexContent = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  introParagraphs: string[]
  filtersLabel: string
  yearLabel: string
  countryLabel: string
  allLabel: string
  resetLabel: string
  resultsLabel: string
  noResultsTitle: string
  noResultsLead: string
  viewLabel: string
  emptyTitle: string
  emptyLead: string
  emptyCta: string
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaSecondary: string
}

const indexFr: RealisationsIndexContent = {
  heroEyebrow: 'Portfolio',
  heroTitle: 'Nos réalisations',
  heroLead:
    'Des ouvrages livrés avec rigueur sur le terrain, en génie civil, construction métallique et équipements routiers.',
  introParagraphs: [
    'Chaque projet reflète notre capacité à mobiliser des équipes spécialisées et à tenir les délais dans des contextes exigeants.',
    'Parcourez une sélection de chantiers récents réalisés pour des institutions, entreprises et partenaires au Mali et en Afrique de l\'Ouest.',
  ],
  filtersLabel: 'Filtrer les réalisations',
  yearLabel: 'Année',
  countryLabel: 'Pays',
  allLabel: 'Tous',
  resetLabel: 'Réinitialiser',
  resultsLabel: '{count} réalisation(s)',
  noResultsTitle: 'Aucun projet ne correspond à ces critères',
  noResultsLead: 'Modifiez les filtres ou consultez l\'ensemble du portfolio.',
  viewLabel: 'Voir le projet',
  emptyTitle: 'Réalisations à venir',
  emptyLead:
    'Les projets seront publiés dès validation éditoriale. Contactez-nous pour discuter de vos besoins.',
  emptyCta: 'Nous contacter',
  ctaTitle: 'Un projet à confier ?',
  ctaLead: 'Décrivez votre besoin et nous étudions la faisabilité avec vous.',
  ctaPrimary: 'Demande de devis',
  ctaSecondary: 'Nous contacter',
}

const indexEn: RealisationsIndexContent = {
  heroEyebrow: 'Portfolio',
  heroTitle: 'Our projects',
  heroLead:
    'Projects delivered with rigor in the field, across civil engineering, steel construction and road equipment.',
  introParagraphs: [
    'Each project reflects our ability to mobilize specialized teams and meet deadlines in demanding contexts.',
    'Browse a selection of recent works delivered for institutions, companies and partners in Mali and West Africa.',
  ],
  filtersLabel: 'Filter projects',
  yearLabel: 'Year',
  countryLabel: 'Country',
  allLabel: 'All',
  resetLabel: 'Reset',
  resultsLabel: '{count} project(s)',
  noResultsTitle: 'No projects match these filters',
  noResultsLead: 'Adjust the filters or browse the full portfolio.',
  viewLabel: 'View project',
  emptyTitle: 'Projects coming soon',
  emptyLead:
    'Projects will be published once editorially validated. Contact us to discuss your requirements.',
  emptyCta: 'Contact us',
  ctaTitle: 'Have a project in mind?',
  ctaLead: 'Tell us about your needs and we will review feasibility with you.',
  ctaPrimary: 'Request a quote',
  ctaSecondary: 'Contact us',
}

export function getRealisationsIndexContent(locale: Locale): RealisationsIndexContent {
  return locale === 'fr' ? indexFr : indexEn
}

export function formatResultsCount(template: string, count: number): string {
  return template.replace('{count}', String(count))
}
