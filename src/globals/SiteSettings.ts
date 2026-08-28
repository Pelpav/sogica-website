import type { GlobalConfig } from 'payload'
import { isAdmin, publicRead } from '../access/roles'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  access: { read: publicRead, update: isAdmin },
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
  label: 'Informations légales',
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
