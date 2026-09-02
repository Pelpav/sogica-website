/**
 * Assignation photo → projet (revue visuelle + filtre media-curation).
 * Source : analyse chantier WhatsApp 2026-08-26 ; watermark KEBILA = haute confiance.
 */
import { filterApprovedPhotoFilenames, isRejectedPhotoFilename } from './media-curation'

export type ProjectPhotoAssignment = {
  cover: string
  gallery: string[]
}

/** Slugs EXP SOGICA avec au moins une photo approuvée identifiée. */
export const PROJECT_PHOTO_MAP: Record<string, ProjectPhotoAssignment> = {
  'kebila-construction-poste-peage': {
    cover: 'sogica-chantier-112.jpeg',
    gallery: [
      'sogica-chantier-116.jpeg',
      'sogica-chantier-120.jpeg',
      'sogica-chantier-124.jpeg',
      'sogica-chantier-136.jpeg',
      'sogica-chantier-052.jpeg',
      'sogica-chantier-057.jpeg',
      'sogica-chantier-085.jpeg',
      'sogica-chantier-232.jpeg',
      'sogica-chantier-236.jpeg',
      'sogica-chantier-144.jpeg',
    ],
  },
  'kati-voies-supplementaires-lot1-terrassement-chaussee': {
    cover: 'sogica-chantier-189.jpeg',
    gallery: [
      'sogica-chantier-161.jpeg',
      'sogica-chantier-171.jpeg',
      'sogica-chantier-175.jpeg',
      'sogica-chantier-179.jpeg',
      'sogica-chantier-005.jpeg',
      'sogica-chantier-010.jpeg',
    ],
  },
  'kati-voies-supplementaires-lot2-cabines-peage-auvents': {
    cover: 'sogica-chantier-223.jpeg',
    gallery: ['sogica-chantier-218.jpeg'],
  },
  'kayes-mopti-salle-polyvalente-etablissements-penitentiaires': {
    cover: 'sogica-chantier-098.jpeg',
    gallery: [
      'sogica-chantier-094.jpeg',
      'sogica-chantier-103.jpeg',
      'sogica-chantier-108.jpeg',
      'sogica-chantier-240.jpeg',
      'sogica-chantier-256.jpeg',
    ],
  },
  'fer-local-technique': {
    cover: 'sogica-chantier-199.jpeg',
    gallery: ['sogica-chantier-204.jpeg', 'sogica-chantier-209.jpeg'],
  },
  'rehabilitation-postes-peage-lot4': {
    cover: 'sogica-chantier-244.jpeg',
    gallery: [],
  },
  'rehabilitation-postes-peage-lot3': {
    cover: 'sogica-chantier-244.jpeg',
    gallery: [],
  },
  'zantiembougou-kolondieba-poste-peage-provisoire': {
    cover: 'sogica-chantier-028.jpeg',
    gallery: ['sogica-chantier-032.jpeg'],
  },
  'farabana-samanko-blocs-beton-new-jersey': {
    cover: 'sogica-chantier-171.jpeg',
    gallery: ['sogica-chantier-175.jpeg'],
  },
  'postes-peage-bacs-sable-securite': {
    cover: 'sogica-chantier-152.jpeg',
    gallery: ['sogica-chantier-156.jpeg', 'sogica-chantier-020.jpeg'],
  },
}

function sanitizeAssignment(assignment: ProjectPhotoAssignment): ProjectPhotoAssignment | null {
  const gallery = filterApprovedPhotoFilenames(
    assignment.gallery.filter((file) => file !== assignment.cover),
  )
  const cover = isRejectedPhotoFilename(assignment.cover)
    ? gallery.shift()
    : assignment.cover

  if (!cover) return gallery.length ? { cover: gallery[0]!, gallery: gallery.slice(1) } : null

  return { cover, gallery }
}

export function resolveProjectPhotoFilenames(slug: string): ProjectPhotoAssignment | null {
  const raw = PROJECT_PHOTO_MAP[slug]
  if (!raw) return null
  return sanitizeAssignment(raw)
}

export function resolveProjectPhotoIds(
  slug: string,
  filenameToId: Map<string, number>,
): { cover?: number; gallery: { media: number }[] } {
  const assignment = resolveProjectPhotoFilenames(slug)
  if (!assignment) return { gallery: [] }

  const cover = filenameToId.get(assignment.cover)
  const gallery = assignment.gallery
    .map((file) => filenameToId.get(file))
    .filter((id): id is number => id !== undefined)
    .map((media) => ({ media }))

  return {
    ...(cover ? { cover } : {}),
    gallery: cover
      ? [{ media: cover }, ...gallery.filter((g) => g.media !== cover)]
      : gallery,
  }
}
