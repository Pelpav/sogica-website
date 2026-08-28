import type { GlobalConfig } from 'payload'
import { isAdmin, canManageThemeCSS, publicRead } from '../access/roles'

export const ThemeSettings: GlobalConfig = {
  slug: 'theme-settings',
  label: 'Thème & design',
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'colorPrimary', type: 'text', label: 'Primary', defaultValue: '#F00080' },
        { name: 'colorSecondary', type: 'text', label: 'Secondary', defaultValue: '#111111' },
        { name: 'colorAccent', type: 'text', label: 'Accent', defaultValue: '#D4AF37' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'colorBackground', type: 'text', defaultValue: '#FAFAFA' },
        { name: 'colorForeground', type: 'text', defaultValue: '#111111' },
        { name: 'colorMuted', type: 'text', defaultValue: '#F3F3F3' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'colorMutedForeground', type: 'text', defaultValue: '#666666' },
        { name: 'colorBorder', type: 'text', defaultValue: '#E5E5E5' },
        { name: 'colorDestructive', type: 'text', defaultValue: '#DC2626' },
      ],
    },
    { name: 'fontHeading', type: 'text', label: 'Police titres', defaultValue: 'var(--font-barlow)' },
    { name: 'fontBody', type: 'text', label: 'Police corps', defaultValue: 'var(--font-source)' },
    { name: 'typeScale', type: 'number', label: 'Échelle typo (%)', defaultValue: 100, min: 90, max: 120 },
    { name: 'containerMax', type: 'text', defaultValue: '1280px' },
    { name: 'sectionSpacing', type: 'select', defaultValue: 'normal', options: [
      { label: 'Compact', value: 'compact' },
      { label: 'Normal', value: 'normal' },
      { label: 'Aéré', value: 'relaxed' },
    ]},
    { name: 'radiusScale', type: 'select', defaultValue: 'sharp', options: [
      { label: 'Net (0)', value: 'sharp' },
      { label: 'Léger', value: 'soft' },
      { label: 'Arrondi', value: 'round' },
    ]},
    { name: 'buttonStyle', type: 'select', defaultValue: 'solid', options: [
      { label: 'Plein', value: 'solid' },
      { label: 'Contour', value: 'outline' },
    ]},
    { name: 'headerStyle', type: 'select', defaultValue: 'solid', options: [
      { label: 'Solide', value: 'solid' },
      { label: 'Transparent', value: 'transparent' },
    ]},
    { name: 'motionIntensity', type: 'select', defaultValue: 'subtle', options: [
      { label: 'Aucune', value: 'none' },
      { label: 'Subtile', value: 'subtle' },
      { label: 'Modérée', value: 'moderate' },
    ]},
    {
      name: 'advancedCustomCss',
      type: 'textarea',
      label: 'CSS avancé (Super Admin)',
      access: { update: canManageThemeCSS },
      admin: {
        description: 'CSS injecté sur le site public. Pas de JavaScript.',
      },
    },
  ],
}

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'En-tête',
  access: { read: publicRead, update: isAdmin },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
    { name: 'logoAlt', type: 'upload', relationTo: 'media', label: 'Logo alternatif' },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation',
      fields: [
        { name: 'label', type: 'text', localized: true, required: true },
        { name: 'url', type: 'text', localized: true, required: true },
        { name: 'highlight', type: 'checkbox', label: 'CTA' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Bouton CTA',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text', localized: true },
      ],
    },
    { name: 'sticky', type: 'checkbox', defaultValue: true, label: 'Navigation fixe' },
    {
      name: 'layoutVariant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Standard', value: 'default' },
        { label: 'Centré', value: 'centered' },
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Pied de page',
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Colonnes',
      fields: [
        { name: 'title', type: 'text', localized: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'url', type: 'text', localized: true },
          ],
        },
      ],
    },
    { name: 'copyright', type: 'text', localized: true, label: 'Copyright' },
    {
      name: 'footerCta',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox' },
        { name: 'title', type: 'text', localized: true },
        { name: 'url', type: 'text', localized: true },
      ],
    },
  ],
}
