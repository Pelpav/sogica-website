/**
 * Projets attestés par `_source/documents/EXP SOGICA.docx`.
 * Ne pas inventer de faits — mettre à jour uniquement depuis ce document.
 */

export type ProjectClientKey = 'fer' | 'pudtr' | 'undp' | 'expertise-france'

export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

export type SourceProject = {
  slug: string
  sortOrder: number
  featured: boolean
  clientKey: ProjectClientKey
  role: 'Entrepreneur' | 'Groupement'
  contractAmountFcfa: number
  expertiseSlugs: string[]
  country: string
  city: string
  lat: number
  lng: number
  year: number
  projectStatus: ProjectStatus
  dateStart: string
  dateEnd?: string
  workType: string
  fr: {
    title: string
    short: string
    location: string
  }
  en: {
    title: string
    short: string
    location: string
  }
}

/** Noms exacts des clients dans `clients-partners` (seed.ts). */
export const CLIENT_NAMES: Record<ProjectClientKey, string> = {
  fer: "Fonds d'Entretien Routier (FER MALI)",
  pudtr: 'SONATER-PUDTR – Burkina Faso',
  undp: 'PNUD-MLI',
  'expertise-france': 'Expertise France – Groupe AFD',
}

export const SOURCE_PROJECTS: SourceProject[] = [
  {
    slug: 'kati-voies-supplementaires-lot1-terrassement-chaussee',
    sortOrder: 1,
    featured: true,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 497_082_091,
    expertiseSlugs: ['genie-civil'],
    country: 'Mali',
    city: 'Kati',
    lat: 12.7444,
    lng: -8.0722,
    year: 2025,
    projectStatus: 'in-progress',
    dateStart: '2025-12-01',
    workType: 'Terrassement',
    fr: {
      title: 'Voies supplémentaires — poste de péage et de pesage de Kati (Lot 1)',
      short:
        'Travaux de terrassement et revêtement chaussée pour des voies supplémentaires au poste de péage et de pesage de Kati.',
      location: 'Poste de péage et de pesage, Kati',
    },
    en: {
      title: 'Additional lanes — Kati toll and weighing station (Lot 1)',
      short:
        'Earthworks and pavement works for additional lanes at the Kati toll and weighing station.',
      location: 'Kati toll and weighing station',
    },
  },
  {
    slug: 'kati-voies-supplementaires-lot2-cabines-peage-auvents',
    sortOrder: 2,
    featured: true,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 489_140_084,
    expertiseSlugs: ['construction-metallique', 'genie-civil'],
    country: 'Mali',
    city: 'Kati',
    lat: 12.7444,
    lng: -8.0722,
    year: 2025,
    projectStatus: 'in-progress',
    dateStart: '2025-12-01',
    workType: 'Charpente métallique',
    fr: {
      title: 'Voies supplémentaires — poste de péage et de pesage de Kati (Lot 2)',
      short:
        'Cabines de péage et auvents en structure mixte — charpente métallique au poste de péage et de pesage de Kati.',
      location: 'Poste de péage et de pesage, Kati',
    },
    en: {
      title: 'Additional lanes — Kati toll and weighing station (Lot 2)',
      short:
        'Toll booths and mixed-structure canopies — steel framing at the Kati toll and weighing station.',
      location: 'Kati toll and weighing station',
    },
  },
  {
    slug: 'kebila-construction-poste-peage',
    sortOrder: 3,
    featured: true,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 223_927_320,
    expertiseSlugs: ['equipements-pesage-controle-routier', 'genie-civil'],
    country: 'Mali',
    city: 'Kebila',
    lat: 12.85,
    lng: -8.15,
    year: 2025,
    projectStatus: 'in-progress',
    dateStart: '2025-12-01',
    dateEnd: '2026-04-30',
    workType: 'Nouvelle construction',
    fr: {
      title: 'Construction du poste de péage de Kebila',
      short: 'Travaux de construction du poste de péage de Kebila.',
      location: 'Kebila',
    },
    en: {
      title: 'Kebila toll station construction',
      short: 'Construction works for the Kebila toll station.',
      location: 'Kebila',
    },
  },
  {
    slug: 'poni-jardins-maraichers-pudtr-lot8',
    sortOrder: 4,
    featured: true,
    clientKey: 'pudtr',
    role: 'Groupement',
    contractAmountFcfa: 120_319_833,
    expertiseSlugs: ['genie-civil'],
    country: 'Burkina Faso',
    city: 'Poni',
    lat: 10.2992,
    lng: -3.2508,
    year: 2024,
    projectStatus: 'in-progress',
    dateStart: '2024-12-01',
    workType: 'Aménagement',
    fr: {
      title: 'Jardins maraîchers — province de la Poni (PUDTR Lot 8)',
      short:
        'Réalisation de trois (3) hectares de jardins maraîchers dans la province de la Poni, région du Sud-Ouest.',
      location: 'Province de la Poni, région du Sud-Ouest',
    },
    en: {
      title: 'Market gardens — Poni province (PUDTR Lot 8)',
      short:
        'Development of three (3) hectares of market gardens in Poni province, South-West region.',
      location: 'Poni province, South-West region',
    },
  },
  {
    slug: 'bandiagara-aes-shva',
    sortOrder: 5,
    featured: false,
    clientKey: 'undp',
    role: 'Entrepreneur',
    contractAmountFcfa: 90_165_000,
    expertiseSlugs: ['genie-civil'],
    country: 'Mali',
    city: 'Bandiagara',
    lat: 14.35,
    lng: -3.6167,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-12-01',
    dateEnd: '2024-07-30',
    workType: "Adductions d'eau sommaires",
    fr: {
      title: 'Réalisation de 2 AES et 1 SHVA — Bandiagara',
      short: "Travaux de réalisation de deux adductions d'eau sommaires et d'un système d'hygiène villageoise amélioré à Bandiagara.",
      location: 'Bandiagara',
    },
    en: {
      title: '2 simplified water supply systems and 1 SHVA — Bandiagara',
      short:
        'Construction of two simplified water supply systems and one improved village hygiene system in Bandiagara.',
      location: 'Bandiagara',
    },
  },
  {
    slug: 'cloture-postes-peage-sanankoroba-farabana-markala-massala',
    sortOrder: 6,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 328_641_066,
    expertiseSlugs: ['genie-civil'],
    country: 'Mali',
    city: 'Sanankoroba',
    lat: 12.423,
    lng: -7.967,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-12-01',
    dateEnd: '2024-12-31',
    workType: 'Construction des clôtures',
    fr: {
      title: 'Délimitation et clôture — postes de Sanankoroba, Farabana, Markala et Massala',
      short:
        'Travaux de délimitation et de clôture des sites des postes de péage et/ou de pesage routier de Sanankoroba, Farabana, Markala et Massala.',
      location: 'Sanankoroba, Farabana, Markala, Massala',
    },
    en: {
      title: 'Perimeter fencing — Sanankoroba, Farabana, Markala and Massala stations',
      short:
        'Site demarcation and fencing for toll and/or weighing stations at Sanankoroba, Farabana, Markala and Massala.',
      location: 'Sanankoroba, Farabana, Markala, Massala',
    },
  },
  {
    slug: 'rehabilitation-postes-peage-lot3',
    sortOrder: 7,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 140_918_284,
    expertiseSlugs: ['genie-civil', 'equipements-pesage-controle-routier'],
    country: 'Mali',
    city: 'Ségou',
    lat: 13.4317,
    lng: -6.2633,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-12-01',
    dateEnd: '2024-11-30',
    workType: 'Travaux de réhabilitation',
    fr: {
      title: 'Réhabilitation des postes de péage — Lot 3',
      short:
        'Réhabilitation des postes de péage et/ou de pesage de Sienso, Koury, Zangasso, Bla 1, Bla 2 et Konobougou.',
      location: 'Sienso, Koury, Zangasso, Bla 1, Bla 2, Konobougou',
    },
    en: {
      title: 'Toll station rehabilitation — Lot 3',
      short:
        'Rehabilitation of toll and/or weighing stations at Sienso, Koury, Zangasso, Bla 1, Bla 2 and Konobougou.',
      location: 'Sienso, Koury, Zangasso, Bla 1, Bla 2, Konobougou',
    },
  },
  {
    slug: 'rehabilitation-postes-peage-lot4',
    sortOrder: 8,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 149_998_921,
    expertiseSlugs: ['genie-civil', 'equipements-pesage-controle-routier'],
    country: 'Mali',
    city: 'Kati',
    lat: 12.7444,
    lng: -8.0722,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-12-01',
    dateEnd: '2024-11-30',
    workType: 'Travaux de réhabilitation',
    fr: {
      title: 'Réhabilitation des postes de péage — Lot 4',
      short:
        'Réhabilitation des postes de péage et/ou de pesage de Sanankoroba, Kassela, Samanko 2, Kati et Massala.',
      location: 'Sanankoroba, Kassela, Samanko 2, Kati, Massala',
    },
    en: {
      title: 'Toll station rehabilitation — Lot 4',
      short:
        'Rehabilitation of toll and/or weighing stations at Sanankoroba, Kassela, Samanko 2, Kati and Massala.',
      location: 'Sanankoroba, Kassela, Samanko 2, Kati, Massala',
    },
  },
  {
    slug: 'kayes-mopti-salle-polyvalente-etablissements-penitentiaires',
    sortOrder: 9,
    featured: false,
    clientKey: 'expertise-france',
    role: 'Entrepreneur',
    contractAmountFcfa: 129_919_011,
    expertiseSlugs: ['genie-civil'],
    country: 'Mali',
    city: 'Kayes',
    lat: 14.4469,
    lng: -11.4345,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-07-01',
    dateEnd: '2023-12-31',
    workType: 'Construction et assainissement',
    fr: {
      title: 'Salle polyvalente de Kayes et Mopti — réhabilitation d’établissements pénitentiaires',
      short:
        'Construction de salles polyvalentes à Kayes et Mopti, et réhabilitation de 15 établissements pénitentiaires à Bamako et dans les régions du Mali.',
      location: 'Kayes, Mopti, Bamako et régions du Mali',
    },
    en: {
      title: 'Multipurpose halls in Kayes and Mopti — prison facility rehabilitation',
      short:
        'Construction of multipurpose halls in Kayes and Mopti, and rehabilitation of 15 prison facilities in Bamako and across Mali.',
      location: 'Kayes, Mopti, Bamako and regions of Mali',
    },
  },
  {
    slug: 'fer-hangar-metallique-etancheite',
    sortOrder: 10,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 245_995_578,
    expertiseSlugs: ['construction-metallique', 'genie-civil'],
    country: 'Mali',
    city: 'Bamako',
    lat: 12.6392,
    lng: -8.0029,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-08-01',
    dateEnd: '2023-11-30',
    workType: 'Construction de bureaux',
    fr: {
      title: 'Hangar métallique et reprise d’étanchéité — Direction Générale FER',
      short:
        'Construction d’un hangar métallique et reprise d’étanchéité à la Direction Générale du Fonds d’Entretien Routier.',
      location: 'Direction Générale FER, Bamako',
    },
    en: {
      title: 'Steel hangar and waterproofing — FER headquarters',
      short:
        'Construction of a steel hangar and waterproofing works at the FER headquarters in Bamako.',
      location: 'FER headquarters, Bamako',
    },
  },
  {
    slug: 'fer-local-technique',
    sortOrder: 11,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 151_684_886,
    expertiseSlugs: ['genie-civil'],
    country: 'Mali',
    city: 'Bamako',
    lat: 12.6392,
    lng: -8.0029,
    year: 2023,
    projectStatus: 'completed',
    dateStart: '2023-02-01',
    dateEnd: '2023-05-09',
    workType: 'Construction de bureaux',
    fr: {
      title: 'Local technique — Direction Générale FER',
      short: 'Construction d’un local technique à la Direction Générale du Fonds d’Entretien Routier.',
      location: 'Direction Générale FER, Bamako',
    },
    en: {
      title: 'Technical room — FER headquarters',
      short: 'Construction of a technical room at the FER headquarters in Bamako.',
      location: 'FER headquarters, Bamako',
    },
  },
  {
    slug: 'zantiembougou-kolondieba-poste-peage-provisoire',
    sortOrder: 12,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 23_978_686,
    expertiseSlugs: ['equipements-pesage-controle-routier', 'genie-civil'],
    country: 'Mali',
    city: 'Kolondièba',
    lat: 12.883,
    lng: -5.467,
    year: 2021,
    projectStatus: 'completed',
    dateStart: '2021-12-01',
    dateEnd: '2022-01-31',
    workType: 'Aménagement',
    fr: {
      title: 'Poste de péage provisoire — Zantièbougou Kolondièba (frontière RCI)',
      short:
        'Aménagement des plateformes, containers pour bureaux et cabine de péage, fabrication des barrières et panneaux de signalisation, construction des toilettes.',
      location: 'Zantièbougou Kolondièba — frontière Côte d’Ivoire',
    },
    en: {
      title: 'Temporary toll station — Zantièbougou Kolondièba (CI border)',
      short:
        'Platform works, office and toll booth containers, barrier and signage fabrication, toilet construction.',
      location: 'Zantièbougou Kolondièba — Côte d’Ivoire border',
    },
  },
  {
    slug: 'farabana-samanko-blocs-beton-new-jersey',
    sortOrder: 13,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 23_517_625,
    expertiseSlugs: ['genie-civil', 'equipements-pesage-controle-routier'],
    country: 'Mali',
    city: 'Farabana',
    lat: 12.35,
    lng: -7.98,
    year: 2021,
    projectStatus: 'completed',
    dateStart: '2021-08-01',
    dateEnd: '2021-09-30',
    workType: 'Génie civil',
    fr: {
      title: 'Blocs béton New Jersey — Farabana et Samanko 2',
      short:
        'Mise en place de blocs béton type New Jersey aux postes de Farabana et Samanko 2, et réparation des dégâts au poste de Farabana.',
      location: 'Postes de Farabana et Samanko 2',
    },
    en: {
      title: 'New Jersey concrete barriers — Farabana and Samanko 2',
      short:
        'Installation of New Jersey-type concrete barriers at Farabana and Samanko 2 stations, and damage repairs at Farabana.',
      location: 'Farabana and Samanko 2 stations',
    },
  },
  {
    slug: 'postes-peage-bacs-sable-securite',
    sortOrder: 14,
    featured: false,
    clientKey: 'fer',
    role: 'Entrepreneur',
    contractAmountFcfa: 20_929_680,
    expertiseSlugs: ['genie-civil', 'equipements-pesage-controle-routier'],
    country: 'Mali',
    city: 'Kati',
    lat: 12.7444,
    lng: -8.0722,
    year: 2020,
    projectStatus: 'completed',
    dateStart: '2020-06-01',
    dateEnd: '2020-07-31',
    workType: 'Réhabilitation et sécurité',
    fr: {
      title: 'Bacs à sable et sécurité — postes de péage et de pesage',
      short:
        'Construction de hangar pour agents de sécurité, réhabilitation des bâtiments et mise en place de bacs à sable — Kassela, Diéma, Konobougou, Bla 1, Bla 2, Kati, Nioro, Zangasso, Sienso.',
      location: 'Kassela, Diéma, Konobougou, Bla 1, Bla 2, Kati, Nioro, Zangasso, Sienso',
    },
    en: {
      title: 'Sand bins and security upgrades — toll and weighing stations',
      short:
        'Security agent hangar construction, building rehabilitation and sand bin installation — Kassela, Diéma, Konobougou, Bla 1, Bla 2, Kati, Nioro, Zangasso, Sienso.',
      location: 'Kassela, Diéma, Konobougou, Bla 1, Bla 2, Kati, Nioro, Zangasso, Sienso',
    },
  },
]

export function formatFcfa(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} FCFA`
}
