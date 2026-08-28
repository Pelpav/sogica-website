import type { CollectionConfig } from 'payload'
import { canManageUsers, isSuperAdmin, isAdmin } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  access: {
    read: isAdmin,
    create: canManageUsers,
    update: canManageUsers,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Éditeur', value: 'editor' },
        { label: 'Gestionnaire portfolio', value: 'portfolio-manager' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'super-admin',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'Prénom',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Nom',
    },
  ],
}
