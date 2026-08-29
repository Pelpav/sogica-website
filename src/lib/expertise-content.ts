import type { Locale } from '@/lib/i18n'

export type ExpertiseSlug =
  | 'genie-civil'
  | 'construction-metallique'
  | 'equipements-pesage-controle-routier'

export type ExpertiseIndexContent = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  introParagraphs: string[]
  approachEyebrow: string
  approachTitle: string
  approachLead: string
  steps: { step: string; title: string; description: string }[]
  discoverLabel: string
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaSecondary: string
}

export type ExpertiseDetailFallback = {
  paragraphs: string[]
  capabilities: string[]
}

const indexFr: ExpertiseIndexContent = {
  heroEyebrow: 'Expertises',
  heroTitle: 'Domaines d\'intervention',
  heroLead:
    'Trois pôles complémentaires pour concevoir, réaliser et mettre en service vos ouvrages d\'infrastructure.',
  introParagraphs: [
    'SOGICA mobilise des équipes spécialisées en génie civil, construction métallique et équipements de pesage et de contrôle routier.',
    'Chaque domaine dispose de compétences dédiées, coordonnées pour livrer des solutions adaptées aux contraintes techniques et aux délais de vos chantiers.',
  ],
  approachEyebrow: 'Méthode',
  approachTitle: 'Comment nous menons vos projets',
  approachLead: 'Une démarche structurée, répétable et adaptée aux contraintes de chaque chantier.',
  steps: [
    {
      step: '01',
      title: 'Étude & planification',
      description: 'Analyse du besoin, faisabilité technique et cadrage des livrables.',
    },
    {
      step: '02',
      title: 'Exécution & coordination',
      description: 'Mobilisation des équipes, suivi de chantier et contrôle qualité.',
    },
    {
      step: '03',
      title: 'Livraison & mise en service',
      description: 'Réception des ouvrages, essais et accompagnement opérationnel.',
    },
  ],
  discoverLabel: 'Découvrir ce pôle',
  ctaTitle: 'Besoin d\'un avis technique ?',
  ctaLead: 'Décrivez votre projet, nous étudions la faisabilité et vous proposons une approche adaptée.',
  ctaPrimary: 'Demande de devis',
  ctaSecondary: 'Nous contacter',
}

const indexEn: ExpertiseIndexContent = {
  heroEyebrow: 'Expertise',
  heroTitle: 'Areas of expertise',
  heroLead:
    'Three complementary areas to design, build and commission your infrastructure projects.',
  introParagraphs: [
    'SOGICA brings together specialized teams in civil engineering, steel construction, and road weighing and control systems.',
    'Each area has dedicated capabilities, coordinated to deliver solutions suited to your technical constraints and project timelines.',
  ],
  approachEyebrow: 'Method',
  approachTitle: 'How we deliver your projects',
  approachLead: 'A structured approach, repeatable and adapted to each site\'s constraints.',
  steps: [
    {
      step: '01',
      title: 'Study & planning',
      description: 'Needs analysis, technical feasibility and deliverables scoping.',
    },
    {
      step: '02',
      title: 'Execution & coordination',
      description: 'Team mobilization, site supervision and quality control.',
    },
    {
      step: '03',
      title: 'Handover & commissioning',
      description: 'Works acceptance, testing and operational support.',
    },
  ],
  discoverLabel: 'Explore this area',
  ctaTitle: 'Need a technical assessment?',
  ctaLead: 'Describe your project and we will review feasibility and propose a suitable approach.',
  ctaPrimary: 'Request a quote',
  ctaSecondary: 'Contact us',
}

const detailFallbackFr: Record<ExpertiseSlug, ExpertiseDetailFallback> = {
  'genie-civil': {
    paragraphs: [
      'Le pôle génie civil de SOGICA intervient sur les ouvrages structurels et les infrastructures nécessitant une maîtrise des contraintes de terrain, des matériaux et des délais.',
      'Nos équipes accompagnent les projets depuis la préparation de chantier jusqu\'à la réception des ouvrages.',
    ],
    capabilities: [
      'Ouvrages en béton armé et ouvrages d\'art',
      'Infrastructures routières et voiries',
      'Bâtiments et ouvrages annexes',
      'VRD, plateformes et aménagements connexes',
    ],
  },
  'construction-metallique': {
    paragraphs: [
      'SOGICA conçoit, fabrique et monte des structures métalliques pour des ouvrages industriels, tertiaires et d\'infrastructure.',
      'Nous intervenons sur des projets unitaires ou intégrés à des ouvrages mixtes génie civil / métallique.',
    ],
    capabilities: [
      'Charpentes et structures métalliques',
      'Auvents, couvertures et bardages',
      'Passerelles et supports techniques',
      'Ouvrages mixtes et assemblages spécifiques',
    ],
  },
  'equipements-pesage-controle-routier': {
    paragraphs: [
      'SOGICA fournit et installe des équipements de pesage et de contrôle routier, de la mise en place à la mise en service.',
      'Nos interventions couvrent le dimensionnement, l\'installation, les essais et l\'accompagnement opérationnel.',
    ],
    capabilities: [
      'Ponts-bascule et pèse-essieux',
      'Contrôle de gabarit et de surhauteur',
      'Barrières automatiques et signalisation',
      'Capteurs, accès et logiciels de gestion',
    ],
  },
}

const detailFallbackEn: Record<ExpertiseSlug, ExpertiseDetailFallback> = {
  'genie-civil': {
    paragraphs: [
      'SOGICA\'s civil engineering division works on structural works and infrastructure requiring control of site conditions, materials and schedules.',
      'Our teams support projects from site preparation through to works acceptance.',
    ],
    capabilities: [
      'Reinforced concrete works and art structures',
      'Road infrastructure and utilities',
      'Buildings and ancillary structures',
      'Utilities (VRD), platforms and related developments',
    ],
  },
  'construction-metallique': {
    paragraphs: [
      'SOGICA designs, fabricates and erects metal structures for industrial, commercial and infrastructure projects.',
      'We work on standalone projects or integrated civil/metal mixed works.',
    ],
    capabilities: [
      'Frames and steel structures',
      'Canopies, roofing and cladding',
      'Walkways and technical supports',
      'Mixed works and specific assemblies',
    ],
  },
  'equipements-pesage-controle-routier': {
    paragraphs: [
      'SOGICA supplies and installs road weighing and control equipment, from deployment through commissioning.',
      'Our scope covers sizing, installation, testing and operational support.',
    ],
    capabilities: [
      'Weighbridges and axle weighers',
      'Gauge and height control systems',
      'Automatic barriers and signage',
      'Sensors, access control and management software',
    ],
  },
}

export function getExpertiseIndexContent(locale: Locale): ExpertiseIndexContent {
  return locale === 'fr' ? indexFr : indexEn
}

export function isKnownExpertiseSlug(slug: string): slug is ExpertiseSlug {
  return slug in detailFallbackFr
}

export function getExpertiseDetailFallback(locale: Locale, slug: string): ExpertiseDetailFallback | null {
  if (!isKnownExpertiseSlug(slug)) return null
  const map = locale === 'fr' ? detailFallbackFr : detailFallbackEn
  return map[slug]
}

export function getExpertiseDetailLabels(locale: Locale) {
  return locale === 'fr'
    ? {
        capabilities: 'Prestations & domaines',
        gallery: 'Galerie',
        related: 'Réalisations liées',
        other: 'Autres expertises',
        discover: 'Découvrir',
      }
    : {
        capabilities: 'Services & scope',
        gallery: 'Gallery',
        related: 'Related projects',
        other: 'Other expertise areas',
        discover: 'Discover',
      }
}
