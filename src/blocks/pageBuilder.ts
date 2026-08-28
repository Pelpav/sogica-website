import type { Block } from 'payload'

const backgroundVariant = {
  name: 'backgroundVariant',
  type: 'select' as const,
  label: 'Fond',
  defaultValue: 'default',
  options: [
    { label: 'Par défaut', value: 'default' },
    { label: 'Muted', value: 'muted' },
    { label: 'Sombre', value: 'dark' },
    { label: 'Accent', value: 'accent' },
  ],
}

const hiddenField = {
  name: 'hidden',
  type: 'checkbox' as const,
  label: 'Masquer',
  defaultValue: false,
}

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'eyebrow', type: 'text', localized: true, label: 'Sur-titre' },
    { name: 'title', type: 'text', localized: true, required: true, label: 'Titre' },
    { name: 'subtitle', type: 'textarea', localized: true, label: 'Sous-titre' },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Image / vidéo',
    },
    {
      name: 'mediaType',
      type: 'select',
      label: 'Type média',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Vidéo', value: 'video' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Disposition',
      options: [
        { label: 'Plein écran', value: 'fullscreen' },
        { label: 'Contenu + média', value: 'split' },
        { label: 'Centré', value: 'centered' },
      ],
      defaultValue: 'fullscreen',
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text', localized: true },
      ],
    },
  ],
}

export const IntroBlock: Block = {
  slug: 'intro',
  labels: { singular: 'Intro / Titre de section', plural: 'Intros' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'eyebrow', type: 'text', localized: true, label: 'Sur-titre' },
    { name: 'title', type: 'text', localized: true, required: true, label: 'Titre' },
    { name: 'description', type: 'textarea', localized: true, label: 'Description' },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignement',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Centre', value: 'center' },
      ],
      defaultValue: 'left',
    },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Texte riche', plural: 'Textes riches' },
  fields: [
    hiddenField,
    backgroundVariant,
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
      label: 'Contenu',
    },
  ],
}

export const TextMediaBlock: Block = {
  slug: 'textMedia',
  labels: { singular: 'Texte + média', plural: 'Texte + média' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'title', type: 'text', localized: true, label: 'Titre' },
    { name: 'body', type: 'textarea', localized: true, label: 'Texte' },
    { name: 'media', type: 'upload', relationTo: 'media', label: 'Média' },
    {
      name: 'mediaPosition',
      type: 'select',
      label: 'Position média',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Droite', value: 'right' },
      ],
      defaultValue: 'right',
    },
  ],
}

export const FullWidthImageBlock: Block = {
  slug: 'fullWidthImage',
  labels: { singular: 'Image pleine largeur', plural: 'Images pleine largeur' },
  fields: [
    hiddenField,
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true, label: 'Légende' },
  ],
}

export const FullWidthVideoBlock: Block = {
  slug: 'fullWidthVideo',
  labels: { singular: 'Vidéo pleine largeur', plural: 'Vidéos pleine largeur' },
  fields: [
    hiddenField,
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'poster', type: 'upload', relationTo: 'media', label: 'Poster' },
    { name: 'caption', type: 'text', localized: true, label: 'Légende' },
  ],
}

export const SingleMediaBlock: Block = {
  slug: 'singleMedia',
  labels: { singular: 'Média unique', plural: 'Médias uniques' },
  fields: [
    hiddenField,
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Contenu', value: 'contained' },
        { label: 'Large', value: 'wide' },
      ],
      defaultValue: 'contained',
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: { singular: 'Galerie', plural: 'Galeries' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'title', type: 'text', localized: true, label: 'Titre' },
    {
      name: 'items',
      type: 'array',
      label: 'Médias',
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
      defaultValue: '3',
    },
  ],
}

export const MasonryBlock: Block = {
  slug: 'masonry',
  labels: { singular: 'Galerie masonry', plural: 'Galeries masonry' },
  fields: [
    hiddenField,
    { name: 'title', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      fields: [{ name: 'media', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Statistiques', plural: 'Statistiques' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'title', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      label: 'Chiffres',
      fields: [
        { name: 'value', type: 'text', localized: true, required: true },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
      admin: { description: 'Uniquement des faits attestés — ne pas inventer' },
    },
  ],
}

export const ExpertiseGridBlock: Block = {
  slug: 'expertiseGrid',
  labels: { singular: 'Grille expertises', plural: 'Grilles expertises' },
  fields: [
    hiddenField,
    { name: 'title', type: 'text', localized: true },
    { name: 'showPrimaryOnly', type: 'checkbox', label: 'Domaines principaux uniquement', defaultValue: true },
  ],
}

export const FeaturedProjectsBlock: Block = {
  slug: 'featuredProjects',
  labels: { singular: 'Projets featured', plural: 'Projets featured' },
  fields: [
    hiddenField,
    { name: 'title', type: 'text', localized: true },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Projets (auto si vide)',
    },
    { name: 'limit', type: 'number', defaultValue: 3 },
  ],
}

export const ProjectGridBlock: Block = {
  slug: 'projectGrid',
  labels: { singular: 'Grille projets', plural: 'Grilles projets' },
  fields: [
    hiddenField,
    { name: 'title', type: 'text', localized: true },
    { name: 'showFilters', type: 'checkbox', defaultValue: true, label: 'Afficher filtres' },
    { name: 'limit', type: 'number', defaultValue: 12 },
  ],
}

export const ClientsBlock: Block = {
  slug: 'clients',
  labels: { singular: 'Clients / partenaires', plural: 'Clients' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'title', type: 'text', localized: true },
    { name: 'featuredOnly', type: 'checkbox', defaultValue: true },
  ],
}

export const EquipmentBlock: Block = {
  slug: 'equipment',
  labels: { singular: 'Équipements', plural: 'Équipements' },
  fields: [
    hiddenField,
    { name: 'title', type: 'text', localized: true },
  ],
}

export const MapBlock: Block = {
  slug: 'map',
  labels: { singular: 'Carte', plural: 'Cartes' },
  fields: [
    hiddenField,
    { name: 'title', type: 'text', localized: true },
    { name: 'height', type: 'number', defaultValue: 480, label: 'Hauteur (px)' },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA', plural: 'CTAs' },
  fields: [
    hiddenField,
    backgroundVariant,
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'primaryLabel', type: 'text', localized: true },
    { name: 'primaryUrl', type: 'text', localized: true },
    { name: 'secondaryLabel', type: 'text', localized: true },
    { name: 'secondaryUrl', type: 'text', localized: true },
  ],
}

export const BeforeAfterBlock: Block = {
  slug: 'beforeAfter',
  labels: { singular: 'Avant / Après', plural: 'Avant / Après' },
  fields: [
    hiddenField,
    { name: 'before', type: 'upload', relationTo: 'media', required: true },
    { name: 'after', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}

export const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    hiddenField,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}

export const QuoteBlock: Block = {
  slug: 'quote',
  labels: { singular: 'Citation', plural: 'Citations' },
  fields: [
    hiddenField,
    { name: 'quote', type: 'textarea', localized: true, required: true },
    { name: 'attribution', type: 'text', localized: true },
    { name: 'role', type: 'text', localized: true },
  ],
}

export const SpacerBlock: Block = {
  slug: 'spacer',
  labels: { singular: 'Espacement', plural: 'Espacements' },
  fields: [
    hiddenField,
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'Petit', value: 'sm' },
        { label: 'Moyen', value: 'md' },
        { label: 'Grand', value: 'lg' },
      ],
      defaultValue: 'md',
    },
  ],
}

export const pageBuilderBlocks = [
  HeroBlock,
  IntroBlock,
  RichTextBlock,
  TextMediaBlock,
  FullWidthImageBlock,
  FullWidthVideoBlock,
  SingleMediaBlock,
  GalleryBlock,
  MasonryBlock,
  StatsBlock,
  ExpertiseGridBlock,
  FeaturedProjectsBlock,
  ProjectGridBlock,
  ClientsBlock,
  EquipmentBlock,
  MapBlock,
  CtaBlock,
  BeforeAfterBlock,
  TimelineBlock,
  QuoteBlock,
  SpacerBlock,
]
