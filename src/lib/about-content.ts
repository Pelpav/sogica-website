import type { Locale } from '@/lib/i18n'

export type AboutStep = {
  step: string
  title: string
  description: string
}

export type AboutContent = {
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  introEyebrow: string
  introTitle: string
  introParagraphs: string[]
  foundedLabel: string
  expertisesEyebrow: string
  expertisesTitle: string
  expertisesLead: string
  approachEyebrow: string
  approachTitle: string
  approachLead: string
  steps: AboutStep[]
  valuesEyebrow: string
  valuesTitle: string
  values: string[]
  ctaTitle: string
  ctaLead: string
  ctaPrimary: string
  ctaSecondary: string
  stats: { value: string; label: string }[]
}

const contentFr: AboutContent = {
  heroEyebrow: 'Entreprise',
  heroTitle: 'SOGICA SA',
  heroLead:
    'Entreprise de BTP spécialisée en génie civil, construction métallique et équipements de pesage et de contrôle routier au Mali et en Afrique de l\'Ouest.',
  introEyebrow: 'Notre identité',
  introTitle: 'Modernité et rigueur au service de vos ouvrages',
  introParagraphs: [
    'SOGICA SA (Société Générale d\'Ingénieurs de Construction et d\'Aménagement) réunit des compétences complémentaires pour concevoir, réaliser et mettre en service des infrastructures fiables.',
    'Nous intervenons sur le génie civil, la construction métallique et les équipements spécialisés, en tenant compte des contraintes techniques, des délais et des réalités du terrain.',
    'Fondée en 2016, SOGICA accompagne des maîtres d\'ouvrage publics et privés sur des projets d\'envergure au Mali et dans la sous-région.',
  ],
  foundedLabel: 'Année de création',
  expertisesEyebrow: 'Expertises',
  expertisesTitle: 'Trois pôles complémentaires',
  expertisesLead:
    'Une organisation intégrée pour couvrir l\'ensemble de la chaîne de valeur, de l\'étude à la mise en service.',
  approachEyebrow: 'Méthode',
  approachTitle: 'Une démarche structurée, chantier après chantier',
  approachLead:
    'Chaque projet est conduit avec une méthode claire, des jalons définis et un suivi rigoureux.',
  steps: [
    {
      step: '01',
      title: 'Étude & planification',
      description:
        'Analyse du besoin, faisabilité technique et cadrage des livrables avec vos équipes.',
    },
    {
      step: '02',
      title: 'Exécution & coordination',
      description:
        'Mobilisation des équipes, suivi de chantier, coordination des corps de métier et contrôle qualité.',
    },
    {
      step: '03',
      title: 'Livraison & mise en service',
      description:
        'Réception des ouvrages, essais, formation et accompagnement opérationnel.',
    },
  ],
  valuesEyebrow: 'Engagements',
  valuesTitle: 'Ce qui guide notre action',
  values: [
    'Trois pôles d\'expertise intégrés : génie civil, construction métallique et équipements routiers',
    'Références institutionnelles au Mali et en Afrique de l\'Ouest',
    'Méthode structurée, de la prise de brief à la mise en service',
    'Rigueur technique et adaptabilité aux contraintes du terrain',
  ],
  ctaTitle: 'Un projet d\'infrastructure à confier ?',
  ctaLead: 'Échangeons sur vos objectifs, vos contraintes techniques et votre calendrier.',
  ctaPrimary: 'Demande de devis',
  ctaSecondary: 'Nos expertises',
  stats: [
    { value: '2016', label: 'Année de création' },
    { value: '3', label: "Pôles d'expertise" },
    { value: 'ML', label: 'Mali & Afrique de l\'Ouest' },
  ],
}

const contentEn: AboutContent = {
  heroEyebrow: 'Company',
  heroTitle: 'SOGICA SA',
  heroLead:
    'Construction company specializing in civil engineering, metal construction, and road weighing and control systems in Mali and West Africa.',
  introEyebrow: 'Who we are',
  introTitle: 'Modernity and rigor at the service of your projects',
  introParagraphs: [
    'SOGICA SA (Société Générale d\'Ingénieurs de Construction et d\'Aménagement) brings together complementary skills to design, build and commission reliable infrastructure.',
    'We work across civil engineering, steel construction and specialized equipment, taking into account technical constraints, timelines and field conditions.',
    'Founded in 2016, SOGICA supports public and private clients on large-scale projects in Mali and across the sub-region.',
  ],
  foundedLabel: 'Year founded',
  expertisesEyebrow: 'Expertise',
  expertisesTitle: 'Three complementary areas',
  expertisesLead:
    'An integrated organization covering the full value chain, from studies through commissioning.',
  approachEyebrow: 'Method',
  approachTitle: 'A structured approach, project after project',
  approachLead:
    'Every project is delivered with a clear methodology, defined milestones and rigorous follow-up.',
  steps: [
    {
      step: '01',
      title: 'Study & planning',
      description:
        'Needs analysis, technical feasibility and deliverables scoping with your teams.',
    },
    {
      step: '02',
      title: 'Execution & coordination',
      description:
        'Team mobilization, site supervision, trade coordination and quality control.',
    },
    {
      step: '03',
      title: 'Handover & commissioning',
      description:
        'Works acceptance, testing, training and operational support.',
    },
  ],
  valuesEyebrow: 'Commitments',
  valuesTitle: 'What guides our work',
  values: [
    'Three integrated expertise areas: civil engineering, steel construction and road systems',
    'Institutional references in Mali and West Africa',
    'Structured methodology from briefing through commissioning',
    'Technical rigor and adaptability to field constraints',
  ],
  ctaTitle: 'Have an infrastructure project?',
  ctaLead: 'Let\'s discuss your goals, technical constraints and timeline.',
  ctaPrimary: 'Request a quote',
  ctaSecondary: 'Our expertise',
  stats: [
    { value: '2016', label: 'Year founded' },
    { value: '3', label: 'Expertise areas' },
    { value: 'ML', label: 'Mali & West Africa' },
  ],
}

export function getAboutContent(locale: Locale): AboutContent {
  return locale === 'fr' ? contentFr : contentEn
}
