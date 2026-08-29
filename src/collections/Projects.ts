import type { CollectionConfig } from 'payload'
import { isAdmin, isPortfolioManager, publishedOnly } from '../access/roles'
import { publicationFields, seoFields, slugField } from '../fields/common'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { narrativeBlocks } from '../blocks/narrative'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Réalisation', plural: 'Réalisations' },
  admin: {
    group: 'Portfolio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'country', '_status', 'featured'],
    description:
      'Créer une réalisation uniquement si un document source l\'atteste. Ne pas inférer depuis les visuels.',
  },
  versions: { drafts: { autosave: { interval: 300 } } },
  access: {
    read: publishedOnly,
    create: isPortfolioManager,
    update: isPortfolioManager,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Titre',
    },
    slugField('title'),
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      label: 'Résumé court',
    },
    {
      name: 'summary',
      type: 'richText',
      localized: true,
      label: 'Description',
      editor: lexicalEditor(),
    },
    {
      name: 'pageMode',
      type: 'select',
      label: 'Mode de page',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Étude de cas éditoriale', value: 'editorial' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients-partners',
      label: 'Client',
    },
    {
      name: 'expertises',
      type: 'relationship',
      relationTo: 'expertises',
      hasMany: true,
      label: 'Expertises',
    },
    {
      name: 'serviceTags',
      type: 'array',
      label: 'Types de travaux',
      fields: [{ name: 'tag', type: 'text', localized: true }],
    },
    {
      name: 'country',
      type: 'text',
      label: 'Pays',
      index: true,
    },
    {
      name: 'city',
      type: 'text',
      label: 'Ville / zone',
    },
    {
      name: 'locationText',
      type: 'text',
      localized: true,
      label: 'Localisation (texte)',
    },
    {
      name: 'coordinates',
      type: 'group',
      label: 'Coordonnées GPS',
      admin: {
        description: 'Latitude et longitude obligatoires pour afficher le projet sur la carte du site.',
      },
      fields: [
        {
          name: 'lat',
          type: 'number',
          label: 'Latitude',
          required: true,
          min: -90,
          max: 90,
        },
        {
          name: 'lng',
          type: 'number',
          label: 'Longitude',
          required: true,
          min: -180,
          max: 180,
        },
      ],
    },
    {
      name: 'year',
      type: 'number',
      label: 'Année',
      index: true,
      admin: { description: 'Uniquement si attestée par source' },
    },
    {
      name: 'dateRange',
      type: 'group',
      label: 'Période',
      fields: [
        { name: 'start', type: 'date', label: 'Début' },
        { name: 'end', type: 'date', label: 'Fin' },
      ],
    },
    {
      name: 'projectStatus',
      type: 'select',
      label: 'Statut projet',
      options: [
        { label: 'Terminé', value: 'completed' },
        { label: 'En cours', value: 'in-progress' },
        { label: 'Planifié', value: 'planned' },
      ],
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture',
    },
    {
      name: 'coverVideo',
      type: 'upload',
      relationTo: 'media',
      label: 'Vidéo de couverture',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie photos',
      admin: {
        description:
          'Ajoutez une ou plusieurs photos du chantier. L’image de couverture reste la vignette principale sur les listes.',
        initCollapsed: false,
      },
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media', required: true, label: 'Photo' },
        { name: 'caption', type: 'text', localized: true, label: 'Légende' },
      ],
    },
    {
      name: 'videoGallery',
      type: 'array',
      label: 'Galerie vidéo',
      fields: [{ name: 'media', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'servicesPerformed',
      type: 'array',
      label: 'Prestations réalisées',
      fields: [{ name: 'item', type: 'text', localized: true }],
    },
    {
      name: 'keyFacts',
      type: 'array',
      label: 'Faits clés',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'text', localized: true },
      ],
    },
    {
      name: 'challenges',
      type: 'richText',
      localized: true,
      label: 'Défis',
      editor: lexicalEditor(),
    },
    {
      name: 'solutions',
      type: 'richText',
      localized: true,
      label: 'Solutions',
      editor: lexicalEditor(),
    },
    {
      name: 'beforeAfter',
      type: 'array',
      label: 'Avant / Après',
      fields: [
        { name: 'before', type: 'upload', relationTo: 'media' },
        { name: 'after', type: 'upload', relationTo: 'media' },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
    {
      name: 'narrative',
      type: 'blocks',
      label: 'Récit éditorial',
      admin: {
        condition: (_, siblingData) => siblingData?.pageMode === 'editorial',
      },
      blocks: narrativeBlocks,
    },
    ...publicationFields,
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Projets associés',
    },
    ...seoFields,
  ],
}
