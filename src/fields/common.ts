import type { Field } from 'payload'
import { hideFromOwnerField } from '../access/roles'

export const seoFields: Field[] = [
  {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    access: {
      read: hideFromOwnerField,
      update: hideFromOwnerField,
    },
    fields: [
      { name: 'title', type: 'text', localized: true, label: 'Titre SEO' },
      { name: 'description', type: 'textarea', localized: true, label: 'Description SEO' },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        label: 'Image Open Graph',
      },
      { name: 'noindex', type: 'checkbox', label: 'Noindex', defaultValue: false },
    ],
  },
]

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  localized: true,
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL de la page',
    condition: (_, __, { user }) => user?.role !== 'owner',
  },
  hooks: {
    beforeValidate: [
      ({ value, data, originalDoc }) => {
        if (value) return value
        const source = data?.[fieldToUse] ?? originalDoc?.[fieldToUse]
        if (typeof source === 'string') {
          return source
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return value
      },
    ],
  },
})

export const publicationFields: Field[] = [
  {
    name: 'featured',
    type: 'checkbox',
    defaultValue: false,
    admin: { position: 'sidebar' },
    label: 'Mis en avant',
  },
  {
    name: 'sortOrder',
    type: 'number',
    defaultValue: 0,
    admin: { position: 'sidebar' },
    label: 'Ordre',
  },
]

export const sourceNoteField: Field = {
  name: 'sourceNote',
  type: 'text',
  admin: {
    position: 'sidebar',
    description: 'Provenance interne (ex. corporate-presentation)',
    readOnly: true,
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    update: () => false,
  },
}
