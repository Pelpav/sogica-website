export const ONBOARDING_STORAGE_KEY = 'sogica-admin-onboarding-v2'

export type QuickLink = {
  title: string
  description: string
  href: string
  accent?: 'primary' | 'accent' | 'neutral'
}

export const quickLinks: QuickLink[] = [
  {
    title: 'Page d’accueil',
    description: 'Modifier le hero, les textes et les blocs de la page principale.',
    href: '/admin/collections/pages',
    accent: 'primary',
  },
  {
    title: 'Photos & vidéos',
    description: 'Ajouter des images de chantier et les organiser par projet.',
    href: '/admin/collections/media',
    accent: 'accent',
  },
  {
    title: 'Nos réalisations',
    description: 'Publier ou mettre à jour les projets du portfolio.',
    href: '/admin/collections/projects',
    accent: 'neutral',
  },
  {
    title: 'Coordonnées',
    description: 'Téléphones, adresse, e-mails et informations de contact.',
    href: '/admin/globals/site-settings',
    accent: 'neutral',
  },
  {
    title: 'Messages reçus',
    description: 'Consulter les demandes de devis et formulaires de contact.',
    href: '/admin/collections/form-submissions',
    accent: 'neutral',
  },
  {
    title: 'Voir le site',
    description: 'Ouvrir le site public dans un nouvel onglet.',
    href: '/fr',
    accent: 'primary',
  },
]

export type TourStep = {
  title: string
  body: string
  target?: string
  padding?: number
}

export const tourSteps: TourStep[] = [
  {
    title: 'Bienvenue dans votre espace SOGICA',
    body: 'Cet outil vous permet de mettre à jour le site sans connaissances techniques. Nous allons vous montrer les zones clés en quelques étapes.',
  },
  {
    title: 'Vos raccourcis',
    body: 'Ces cartes mènent directement aux actions les plus courantes : page d’accueil, photos, réalisations, coordonnées.',
    target: '.sogica-admin-welcome__grid',
    padding: 12,
  },
  {
    title: 'Pages & contenus',
    body: 'Ici vous modifiez les pages du site : accueil, à propos, contact et leurs blocs de contenu.',
    target: 'nav a[href*="/collections/pages"], nav a[href*="/collections/expertises"]',
    padding: 8,
  },
  {
    title: 'Photos & fichiers',
    body: 'Ajoutez vos images et vidéos de chantier. Cliquez sur « Créer » pour importer de nouveaux fichiers.',
    target: 'nav a[href*="/collections/media"]',
    padding: 8,
  },
  {
    title: 'Nos réalisations',
    body: 'Publiez vos projets avec titre, description et galerie photo.',
    target: 'nav a[href*="/collections/projects"]',
    padding: 8,
  },
  {
    title: 'Voir le site en direct',
    body: 'Ce lien ouvre le site public. Utilisez aussi « Aperçu en direct » lors de l’édition d’une page pour prévisualiser vos changements.',
    target: '.sogica-admin-view-site',
    padding: 10,
  },
]
