/** Noms de fichiers média normalisés pour SOGICA. */

export const BRAND_LOGO_FILENAME = 'sogica-logo.png'
export const BRAND_LOGO_WHITE_FILENAME = 'sogica-logo-white.png'
export const BRAND_LOGO_PATH = `/brand/${BRAND_LOGO_FILENAME}`
export const BRAND_LOGO_WHITE_PATH = `/brand/${BRAND_LOGO_WHITE_FILENAME}`

export const HERO_FALLBACK_FILENAMES = [
  'sogica-hero-reference-01.png',
  'sogica-hero-reference-02.png',
  'sogica-hero-reference-03.png',
  'sogica-hero-reference-04.png',
] as const

export const HERO_FALLBACK_IMAGE = `/brand/${HERO_FALLBACK_FILENAMES[0]}`
export const SITE_PRELOADER_PATH = '/media/sogica-site-preloader.mp4'

const LEGACY_BRAND_RENAMES: Record<string, string> = {
  'logo.png': BRAND_LOGO_FILENAME,
  'logo_transparent.png': BRAND_LOGO_WHITE_FILENAME,
}

const LEGACY_STATIC_RENAMES: Record<string, string> = {
  'example1.png': HERO_FALLBACK_FILENAMES[0],
  'example2.png': HERO_FALLBACK_FILENAMES[1],
  'example3.png': HERO_FALLBACK_FILENAMES[2],
  'example4.png': HERO_FALLBACK_FILENAMES[3],
  'loader.mp4': 'sogica-site-preloader.mp4',
  ...LEGACY_BRAND_RENAMES,
}

function parseWhatsAppSortKey(filename: string): string {
  const match = filename.match(/(\d{4}-\d{2}-\d{2}) at (\d{2})\.(\d{2})\.(\d{2})/)
  if (!match) return filename
  const duplicate = filename.includes('(1)') ? '1' : '0'
  const kind = /video/i.test(filename) ? 'v' : 'i'
  return `${match[1]}T${match[2]}${match[3]}${match[4]}${duplicate}${kind}`
}

function padIndex(index: number): string {
  return String(index).padStart(3, '0')
}

function isWhatsAppOriginal(filename: string): boolean {
  return /whatsapp (image|video)/i.test(filename) && !/-\d+x\d+\./i.test(filename)
}

/** Génère le mapping ancien nom → nouveau nom pour les photos WhatsApp. */
export function buildWhatsAppRenameMap(filenames: string[]): Map<string, string> {
  const unique = [...new Set(filenames.filter(isWhatsAppOriginal))]

  const photos = unique
    .filter((name) => /whatsapp image/i.test(name))
    .sort((a, b) => parseWhatsAppSortKey(a).localeCompare(parseWhatsAppSortKey(b)))

  const videos = unique
    .filter((name) => /whatsapp video/i.test(name))
    .sort((a, b) => parseWhatsAppSortKey(a).localeCompare(parseWhatsAppSortKey(b)))

  const map = new Map<string, string>()

  photos.forEach((oldName, index) => {
    const ext = oldName.match(/\.[^.]+$/)?.[0] ?? '.jpeg'
    map.set(oldName, `sogica-chantier-${padIndex(index + 1)}${ext}`)
  })

  videos.forEach((oldName, index) => {
    const ext = oldName.match(/\.[^.]+$/)?.[0] ?? '.mp4'
    map.set(oldName, `sogica-chantier-video-${padIndex(index + 1)}${ext}`)
  })

  return map
}

/** Répare le mapping quand les originaux sont déjà renommés mais pas les variantes. */
export function buildWhatsAppRepairMap(filenames: string[]): Map<string, string> {
  const map = new Map<string, string>()

  const waImages = new Set<string>()
  const waVideos = new Set<string>()

  for (const file of filenames) {
    if (!/whatsapp/i.test(file) || isWhatsAppOriginal(file)) continue
    const base = file.replace(/-\d+x\d+\.[^.]+$/, '')
    if (/whatsapp video/i.test(file)) {
      waVideos.add(`${base}.mp4`)
    } else {
      waImages.add(`${base}.jpeg`)
    }
  }

  const sortedWaImages = [...waImages].sort((a, b) =>
    parseWhatsAppSortKey(a).localeCompare(parseWhatsAppSortKey(b)),
  )
  const sortedWaVideos = [...waVideos].sort((a, b) =>
    parseWhatsAppSortKey(a).localeCompare(parseWhatsAppSortKey(b)),
  )

  const sogicaImages = [...new Set(filenames)]
    .filter((f) => /^sogica-chantier-\d+\.jpe?g$/i.test(f))
    .sort((a, b) => parseInt(a.match(/(\d+)/)?.[1] ?? '0', 10) - parseInt(b.match(/(\d+)/)?.[1] ?? '0', 10))

  const sogicaVideos = [...new Set(filenames)]
    .filter((f) => /^sogica-chantier-video-\d+\.mp4$/i.test(f))
    .sort((a, b) => parseInt(a.match(/(\d+)/)?.[1] ?? '0', 10) - parseInt(b.match(/(\d+)/)?.[1] ?? '0', 10))

  sortedWaImages.forEach((waName, index) => {
    if (sogicaImages[index]) map.set(waName, sogicaImages[index])
  })

  sortedWaVideos.forEach((waName, index) => {
    if (sogicaVideos[index]) map.set(waName, sogicaVideos[index])
  })

  return map
}

export function resolveRenamedFilename(filename: string, whatsAppMap: Map<string, string>): string {
  if (LEGACY_STATIC_RENAMES[filename]) return LEGACY_STATIC_RENAMES[filename]

  for (const [oldName, newName] of Object.entries(LEGACY_STATIC_RENAMES)) {
    const oldStem = oldName.replace(/\.[^.]+$/, '')
    if (filename.startsWith(`${oldStem}-`)) {
      const newStem = newName.replace(/\.[^.]+$/, '')
      return filename.replace(oldStem, newStem)
    }
  }

  const stripped = filename.replace(/-\d+x\d+\.[^.]+$/, '')
  const sizeSuffix = filename.slice(stripped.length)

  const lookupKeys = stripped === filename
    ? [filename]
    : [stripped, `${stripped}.jpeg`, `${stripped}.jpg`, `${stripped}.mp4`]

  for (const key of lookupKeys) {
    if (!whatsAppMap.has(key)) continue
    const newBase = whatsAppMap.get(key)!
    const newBaseStem = newBase.replace(/\.[^.]+$/, '')
    if (sizeSuffix) return `${newBaseStem}${sizeSuffix}`
    return newBase
  }

  return filename
}

export function isLegacyMediaFilename(filename: string): boolean {
  return (
    /whatsapp/i.test(filename) ||
    filename in LEGACY_STATIC_RENAMES ||
    filename in LEGACY_BRAND_RENAMES
  )
}
