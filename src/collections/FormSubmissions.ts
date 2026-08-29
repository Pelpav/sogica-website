import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel, isAuthenticated, isAuthenticatedFieldLevel } from '../access/roles'

export const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  labels: { singular: 'Soumission', plural: 'Formulaires' },
  admin: {
    group: 'Messages reçus',
    description: 'Demandes de contact et de devis envoyées depuis le site.',
    useAsTitle: 'email',
    defaultColumns: ['formType', 'name', 'email', 'status', 'createdAt'],
  },
  access: {
    read: isAuthenticated,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  timestamps: true,
  fields: [
    {
      name: 'formType',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Devis', value: 'quote' },
      ],
      label: 'Type',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nouveau', value: 'new' },
        { label: 'Contacté', value: 'contacted' },
        { label: 'Qualifié', value: 'qualified' },
        { label: 'Archivé', value: 'closed' },
      ],
      label: 'Statut',
    },
    { name: 'name', type: 'text', required: true, label: 'Nom' },
    { name: 'email', type: 'email', required: true, label: 'E-mail' },
    { name: 'phone', type: 'text', label: 'Téléphone' },
    { name: 'organization', type: 'text', label: 'Organisation' },
    { name: 'subject', type: 'text', label: 'Sujet' },
    { name: 'message', type: 'textarea', label: 'Message' },
    {
      name: 'projectType',
      type: 'relationship',
      relationTo: 'expertises',
      label: 'Type de projet / expertise',
    },
    { name: 'projectLocation', type: 'text', label: 'Lieu du projet' },
    { name: 'budget', type: 'text', label: 'Budget (optionnel)' },
    { name: 'timing', type: 'text', label: 'Délai souhaité' },
    { name: 'description', type: 'textarea', label: 'Description projet' },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'private-media',
      hasMany: true,
      label: 'Pièces jointes',
    },
    {
      name: 'consent',
      type: 'checkbox',
      label: 'Consentement',
      required: true,
    },
    { name: 'locale', type: 'text', label: 'Langue' },
    { name: 'sourcePage', type: 'text', label: 'Page source' },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Notes internes',
      access: { read: isAuthenticatedFieldLevel, update: isAdminFieldLevel },
    },
    {
      name: 'honeypot',
      type: 'text',
      admin: { hidden: true },
    },
  ],
}

export const PrivateMedia: CollectionConfig = {
  slug: 'private-media',
  labels: { singular: 'Fichier privé', plural: 'Fichiers privés' },
  admin: {
    group: 'Photos & fichiers',
    description: 'Fichiers confidentiels (devis, pièces jointes) — accès restreint.',
    hidden: ({ user }) => user?.role === 'owner' || user?.role === 'editor',
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'private-uploads',
    mimeTypes: ['image/*', 'application/pdf', 'application/msword', 'application/vnd.*'],
  },
  fields: [
    {
      name: 'originalFilename',
      type: 'text',
      label: 'Nom original',
    },
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'form-submissions',
      label: 'Soumission liée',
    },
  ],
}
