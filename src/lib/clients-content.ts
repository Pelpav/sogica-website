import type { Locale } from '@/lib/i18n'

export type ClientPartnerType = 'reference' | 'partner' | 'client'

export type ClientsIndexContent = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  introParagraphs: string[]
  logosEyebrow: string
  logosTitle: string
  groupLabels: Record<ClientPartnerType, string>
  emptyTitle: string
  emptyLead: string
}

const indexFr: ClientsIndexContent = {
  heroEyebrow: 'Références',
  heroTitle: 'Clients & partenaires',
  heroLead:
    'Des institutions, bailleurs et entreprises qui nous font confiance pour leurs projets d\'infrastructure.',
  introParagraphs: [
    'SOGICA intervient aux côtés d\'acteurs publics et privés au Mali et en Afrique de l\'Ouest, sur des chantiers exigeants en génie civil, construction métallique et équipements routiers.',
    'Nos références témoignent de notre capacité à tenir les engagements techniques et les délais sur le terrain.',
  ],
  logosEyebrow: 'Ils nous font confiance',
  logosTitle: 'Un réseau de partenaires solides',
  groupLabels: {
    reference: 'Références & bailleurs',
    partner: 'Partenaires',
    client: 'Clients',
  },
  emptyTitle: 'Références à venir',
  emptyLead:
    'Les logos et références seront publiés dès validation éditoriale.',
}

const indexEn: ClientsIndexContent = {
  heroEyebrow: 'References',
  heroTitle: 'Clients & partners',
  heroLead:
    'Institutions, funders and companies who trust us with their infrastructure projects.',
  introParagraphs: [
    'SOGICA works alongside public and private stakeholders in Mali and West Africa on demanding civil engineering, steel construction and road equipment projects.',
    'Our references reflect our ability to meet technical commitments and deadlines in the field.',
  ],
  logosEyebrow: 'Trusted by',
  logosTitle: 'A strong partner network',
  groupLabels: {
    reference: 'References & funders',
    partner: 'Partners',
    client: 'Clients',
  },
  emptyTitle: 'References coming soon',
  emptyLead: 'Logos and references will be published once editorially validated.',
}

export function getClientsIndexContent(locale: Locale): ClientsIndexContent {
  return locale === 'fr' ? indexFr : indexEn
}

export const clientTypeOrder: ClientPartnerType[] = ['reference', 'partner', 'client']
