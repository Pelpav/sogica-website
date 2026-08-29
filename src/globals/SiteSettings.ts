import type { GlobalConfig } from 'payload'
import { isAdmin, isOwnerOrAdmin, publicRead } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Coordonnées & SEO',
  admin: {
    group: 'Réglages du site',
    description: 'Nom, adresse, téléphones, e-mails et référencement par défaut.',
  },
  access: { read: publicRead, update: isOwnerOrAdmin },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      localized: true,
      required: true,
      label: 'Nom commercial',
    },
    {
      name: 'companyFullName',
      type: 'text',
      localized: true,
      label: 'Raison sociale complète',
    },
    {
      name: 'tagline',
      type: 'textarea',
      localized: true,
      label: 'Description courte',
    },
    {
      name: 'foundedYear',
      type: 'number',
      label: 'Année de création',
    },
    {
      name: 'address',
      type: 'textarea',
      localized: true,
      label: 'Adresse',
    },
    {
      name: 'phones',
      type: 'array',
      label: 'Téléphones',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'number', type: 'text', required: true },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      label: 'E-mails',
      fields: [{ name: 'address', type: 'email', required: true }],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Réseaux sociaux',
      fields: [
        { name: 'platform', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'SEO par défaut',
      admin: {
        condition: (_, __, { user }) => user?.role !== 'owner',
      },
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'siteNotice',
      type: 'textarea',
      localized: true,
      label: 'Bandeau / notice',
    },
  ],
}

export const LegalSettings: GlobalConfig = {
  slug: 'legal-settings',
  label: 'Mentions légales',
  admin: {
    group: 'Réglages du site',
    description: 'Textes juridiques affichés sur le site.',
  },
  access: { read: publicRead, update: isAdmin },
  fields: [
    { name: 'registrationNumber', type: 'text', label: 'Registre du Commerce' },
    { name: 'taxNumber', type: 'text', label: 'NIF' },
    { name: 'legalForm', type: 'text', localized: true, label: 'Forme juridique' },
    { name: 'capital', type: 'text', localized: true, label: 'Capital' },
    { name: 'approval', type: 'textarea', localized: true, label: 'Agrément' },
    {
      name: 'legalNoticeContent',
      type: 'richText',
      localized: true,
      label: 'Mentions légales (contenu)',
    },
    {
      name: 'privacyContent',
      type: 'richText',
      localized: true,
      label: 'Politique de confidentialité',
    },
  ],
}
