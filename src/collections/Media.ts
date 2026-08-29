import type { CollectionConfig } from 'payload'
import { isAdmin, isAuthenticated, isAuthenticatedFieldLevel, isContentEditor, isStaffFieldLevel, publicRead } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  admin: {
    group: 'Photos & fichiers',
    description: 'Ajoutez et organisez les photos, vidéos et documents du site.',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mediaType', 'assignmentStatus', 'updatedAt'],
  },
  access: {
    read: publicRead,
    create: isAuthenticated,
    update: isContentEditor,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'public/media/uploads',
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      label: 'Texte alternatif',
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
      label: 'Légende',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Crédit / copyright',
    },
    {
      name: 'mediaType',
      type: 'select',
      label: 'Type',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Vidéo', value: 'video' },
        { label: 'Document', value: 'document' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignmentStatus',
      type: 'select',
      label: 'Statut assignation',
      defaultValue: 'unassigned',
      options: [
        { label: 'Non assigné', value: 'unassigned' },
        { label: 'Brouillon', value: 'draft' },
        { label: 'Assigné', value: 'assigned' },
      ],
      admin: { position: 'sidebar' },
      index: true,
    },
    {
      name: 'virtualFolder',
      type: 'text',
      label: 'Dossier virtuel',
      admin: {
        description: 'Organisation technique (ex. non-classe, avec-tampon-kebila)',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      label: 'Projet',
      admin: { description: 'Laisser vide si non assigné' },
    },
    {
      name: 'expertise',
      type: 'relationship',
      relationTo: 'expertises',
      label: 'Expertise',
    },
    {
      name: 'captureDate',
      type: 'date',
      label: 'Date de capture',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lieu (texte libre)',
    },
    {
      name: 'focalPoint',
      type: 'group',
      label: 'Point focal',
      fields: [
        { name: 'x', type: 'number', min: 0, max: 100 },
        { name: 'y', type: 'number', min: 0, max: 100 },
      ],
    },
    {
      name: 'videoPoster',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster vidéo',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Publié',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Notes internes',
      access: { read: isAuthenticatedFieldLevel, update: isStaffFieldLevel },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data?.mimeType?.startsWith('video/')) data.mediaType = 'video'
        else if (data?.mimeType?.startsWith('image/')) data.mediaType = 'image'
        else if (data?.mimeType) data.mediaType = 'document'
        if (!req.user && data) data.published = false
        return data
      },
    ],
  },
}
