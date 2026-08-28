import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ChapterHeadingBlock: Block = {
  slug: 'chapterHeading',
  labels: { singular: 'Chapitre', plural: 'Chapitres' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', localized: true, required: true },
  ],
}

export const NarrativeRichTextBlock: Block = {
  slug: 'narrativeRichText',
  labels: { singular: 'Texte', plural: 'Textes' },
  fields: [{ name: 'content', type: 'richText', localized: true, editor: lexicalEditor() }],
}

export const LargeImageBlock: Block = {
  slug: 'largeImage',
  labels: { singular: 'Grande image', plural: 'Grandes images' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}

export const FullBleedImageBlock: Block = {
  slug: 'fullBleedImage',
  labels: { singular: 'Image plein écran', plural: 'Images plein écran' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}

export const ImagePairBlock: Block = {
  slug: 'imagePair',
  labels: { singular: 'Paire d\'images', plural: 'Paires' },
  fields: [
    { name: 'left', type: 'upload', relationTo: 'media', required: true },
    { name: 'right', type: 'upload', relationTo: 'media', required: true },
  ],
}

export const EditorialGalleryBlock: Block = {
  slug: 'editorialGallery',
  labels: { singular: 'Galerie éditoriale', plural: 'Galeries' },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'media', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', localized: true },
      ],
    },
  ],
}

export const NarrativeVideoBlock: Block = {
  slug: 'narrativeVideo',
  labels: { singular: 'Vidéo', plural: 'Vidéos' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}

export const MetricBlock: Block = {
  slug: 'metric',
  labels: { singular: 'Métrique', plural: 'Métriques' },
  fields: [
    { name: 'value', type: 'text', localized: true, required: true },
    { name: 'label', type: 'text', localized: true, required: true },
  ],
}

export const TechnicalFactsBlock: Block = {
  slug: 'technicalFacts',
  labels: { singular: 'Faits techniques', plural: 'Faits techniques' },
  fields: [
    {
      name: 'facts',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'value', type: 'text', localized: true },
      ],
    },
  ],
}

export const NarrativeQuoteBlock: Block = {
  slug: 'narrativeQuote',
  labels: { singular: 'Citation', plural: 'Citations' },
  fields: [
    { name: 'quote', type: 'textarea', localized: true, required: true },
    { name: 'attribution', type: 'text', localized: true },
  ],
}

export const NarrativeBeforeAfterBlock: Block = {
  slug: 'narrativeBeforeAfter',
  labels: { singular: 'Avant / Après', plural: 'Avant / Après' },
  fields: [
    { name: 'before', type: 'upload', relationTo: 'media' },
    { name: 'after', type: 'upload', relationTo: 'media' },
  ],
}

export const NarrativeTextMediaBlock: Block = {
  slug: 'narrativeTextMedia',
  labels: { singular: 'Texte + média', plural: 'Texte + média' },
  fields: [
    { name: 'title', type: 'text', localized: true },
    { name: 'body', type: 'textarea', localized: true },
    { name: 'media', type: 'upload', relationTo: 'media' },
  ],
}

export const NarrativeMapBlock: Block = {
  slug: 'narrativeMap',
  labels: { singular: 'Carte', plural: 'Cartes' },
  fields: [{ name: 'height', type: 'number', defaultValue: 400 }],
}

export const NarrativeSpacerBlock: Block = {
  slug: 'narrativeSpacer',
  labels: { singular: 'Espacement', plural: 'Espacements' },
  fields: [
    {
      name: 'size',
      type: 'select',
      options: [
        { label: 'SM', value: 'sm' },
        { label: 'MD', value: 'md' },
        { label: 'LG', value: 'lg' },
      ],
      defaultValue: 'md',
    },
  ],
}

export const narrativeBlocks = [
  ChapterHeadingBlock,
  NarrativeRichTextBlock,
  LargeImageBlock,
  FullBleedImageBlock,
  ImagePairBlock,
  EditorialGalleryBlock,
  NarrativeVideoBlock,
  MetricBlock,
  TechnicalFactsBlock,
  NarrativeQuoteBlock,
  NarrativeBeforeAfterBlock,
  NarrativeTextMediaBlock,
  NarrativeMapBlock,
  NarrativeSpacerBlock,
]
