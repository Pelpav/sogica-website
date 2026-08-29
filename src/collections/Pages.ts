import type { CollectionConfig } from 'payload'
import { isAdmin, isContentEditor, publishedOnly } from '../access/roles'
import { publicationFields, seoFields, slugField, sourceNoteField } from '../fields/common'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pageBuilderBlocks } from '../blocks/pageBuilder'

export const Expertises: CollectionConfig = {
  slug: 'expertises',
  labels: { singular: 'Expertise', plural: 'Expertises' },
  admin: {
    group: 'Pages & contenus',
    description: 'Gérez les domaines d’expertise affichés sur le site.',
    useAsTitle: 'name',
    defaultColumns: ['name', 'featured', 'sortOrder', '_status'],
  },
  versions: { drafts: { autosave: { interval: 300 } } },
  access: {
    read: publishedOnly,
    create: isContentEditor,
    update: isContentEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
      label: 'Nom',
    },
    slugField('name'),
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      label: 'Description courte',
    },
    {
      name: 'fullContent',
      type: 'richText',
      localized: true,
      label: 'Contenu complet',
      editor: lexicalEditor(),
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galerie',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'isPrimary',
      type: 'checkbox',
      label: 'Domaine principal',
      defaultValue: false,
      admin: { position: 'sidebar', condition: (_, __, { user }) => user?.role !== 'owner' },
    },
    ...publicationFields,
    {
      name: 'relatedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Projets liés',
    },
    sourceNoteField,
    ...seoFields,
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    group: 'Pages & contenus',
    description: 'Modifiez les pages du site : accueil, à propos, contact, etc.',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, locale }) => {
        const loc = locale?.code ?? 'fr'
        const slug = data?.slug === 'home' ? '' : `/${data?.slug}`
        return `/${loc}${slug}?livePreview=1`
      },
    },
  },
  versions: { drafts: { autosave: { interval: 300 } } },
  access: {
    read: publishedOnly,
    create: isContentEditor,
    update: isContentEditor,
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
      name: 'pageType',
      type: 'select',
      label: 'Type de page',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Accueil', value: 'home' },
        { label: 'À propos', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Devis', value: 'quote' },
        { label: 'Légal', value: 'legal' },
      ],
      admin: { position: 'sidebar', condition: (_, __, { user }) => user?.role !== 'owner' },
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      label: 'Visible dans la navigation',
      defaultValue: true,
      admin: { position: 'sidebar', condition: (_, __, { user }) => user?.role !== 'owner' },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Contenu',
      blocks: pageBuilderBlocks,
    },
    ...seoFields,
  ],
}
