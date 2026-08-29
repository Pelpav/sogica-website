import type { CollectionConfig } from 'payload'
import { isAdmin, isContentEditor, publishedOnly } from '../access/roles'
import { publicationFields, sourceNoteField } from '../fields/common'
import { revalidateCmsAfterChange, revalidateCmsAfterDelete } from '../hooks/revalidate-cms'

export const ClientsPartners: CollectionConfig = {
  slug: 'clients-partners',
  labels: { singular: 'Client / Partenaire', plural: 'Clients & partenaires' },
  admin: {
    group: 'Pages & contenus',
    description: 'Références clients et partenaires affichés sur le site.',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'featured', '_status'],
  },
  versions: { drafts: true },
  hooks: {
    afterChange: [revalidateCmsAfterChange],
    afterDelete: [revalidateCmsAfterDelete],
  },
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
      required: true,
      label: 'Nom',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (optionnel)',
      admin: { description: 'Uniquement si logo fourni, jamais téléchargé depuis le web' },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Site web',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      options: [
        { label: 'Client', value: 'client' },
        { label: 'Partenaire', value: 'partner' },
        { label: 'Référence / bailleur', value: 'reference' },
      ],
      defaultValue: 'reference',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
    },
    ...publicationFields,
    sourceNoteField,
  ],
}

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  labels: { singular: 'Équipement', plural: 'Moyens matériels' },
  admin: {
    group: 'Pages & contenus',
    description: 'Liste des équipements et moyens matériels de l’entreprise.',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'quantity'],
  },
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
    {
      name: 'category',
      type: 'text',
      localized: true,
      label: 'Catégorie',
    },
    {
      name: 'quantity',
      type: 'number',
      label: 'Quantité',
      min: 0,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
    },
    ...publicationFields,
    sourceNoteField,
  ],
}
