/**
 * Photos exclues du site — revue visuelle SOGICA (sécurité / image professionnelle).
 * Ne pas réimporter ni assigner aux projets.
 */
export type RejectedPhotoReason =
  | 'barefoot'
  | 'open-footwear'
  | 'missing-ppe'
  | 'off-topic'
  | 'low-quality'

export type RejectedPhoto = {
  filename: string
  reason: RejectedPhotoReason
  note: string
}

/** Fichiers originaux (sans suffixe de variante Payload). */
export const REJECTED_PHOTOS: RejectedPhoto[] = [
  { filename: 'sogica-chantier-015.jpeg', reason: 'open-footwear', note: 'Sandales type Crocs, pas de casque' },
  { filename: 'sogica-chantier-024.jpeg', reason: 'open-footwear', note: 'Sandales et shorts sur chantier' },
  { filename: 'sogica-chantier-036.jpeg', reason: 'open-footwear', note: 'Tongs sur chantier' },
  { filename: 'sogica-chantier-040.jpeg', reason: 'open-footwear', note: 'Sandales et shorts' },
  { filename: 'sogica-chantier-044.jpeg', reason: 'open-footwear', note: 'Sandales et shorts' },
  { filename: 'sogica-chantier-048.jpeg', reason: 'open-footwear', note: 'Tongs / sandales' },
  { filename: 'sogica-chantier-062.jpeg', reason: 'open-footwear', note: 'Tongs / sandales' },
  { filename: 'sogica-chantier-066.jpeg', reason: 'open-footwear', note: 'Sandales, gilet absent' },
  { filename: 'sogica-chantier-070.jpeg', reason: 'open-footwear', note: 'Sandales, tongs posées sur la route' },
  { filename: 'sogica-chantier-075.jpeg', reason: 'barefoot', note: 'Talons nus / sandales' },
  { filename: 'sogica-chantier-080.jpeg', reason: 'open-footwear', note: 'Tongs sur chantier' },
  { filename: 'sogica-chantier-089.jpeg', reason: 'low-quality', note: 'Photo floue inutilisable' },
  { filename: 'sogica-chantier-128.jpeg', reason: 'open-footwear', note: 'Sandales sur chantier' },
  { filename: 'sogica-chantier-132.jpeg', reason: 'open-footwear', note: 'Tongs sur chantier' },
  { filename: 'sogica-chantier-140.jpeg', reason: 'open-footwear', note: 'Tongs malgré gilet' },
  { filename: 'sogica-chantier-148.jpeg', reason: 'barefoot', note: 'Employé pieds nus' },
  { filename: 'sogica-chantier-166.jpeg', reason: 'open-footwear', note: 'Tongs, sans EPI' },
  { filename: 'sogica-chantier-184.jpeg', reason: 'open-footwear', note: 'Sandales sur chantier' },
  { filename: 'sogica-chantier-194.jpeg', reason: 'off-topic', note: 'Cuisine résidentielle, hors portfolio' },
  { filename: 'sogica-chantier-213.jpeg', reason: 'off-topic', note: 'Cuisine résidentielle, hors portfolio' },
  { filename: 'sogica-chantier-227.jpeg', reason: 'open-footwear', note: 'Personnes en tongs sur site' },
  { filename: 'sogica-chantier-248.jpeg', reason: 'open-footwear', note: 'Tongs, sans EPI' },
  { filename: 'sogica-chantier-252.jpeg', reason: 'open-footwear', note: 'Chaussettes + sandales' },
]

export const REJECTED_PHOTO_FILENAMES = new Set(REJECTED_PHOTOS.map((p) => p.filename))

export function isRejectedPhotoFilename(filename: string | null | undefined): boolean {
  if (!filename) return false
  const base = filename.replace(/-\d+x\d+\.(jpe?g|webp|png)$/i, (_, ext) => `.${ext}`)
  return REJECTED_PHOTO_FILENAMES.has(base)
}

export function filterApprovedPhotoFilenames(filenames: string[]): string[] {
  return filenames.filter((name) => !isRejectedPhotoFilename(name))
}
