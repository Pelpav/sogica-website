import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import {
  getOgImageLabel,
  OG_BACKGROUND_FILES,
  type OgImageKey,
} from '../lib/og-images'
import { locales } from '../lib/i18n'

const WIDTH = 1200
const HEIGHT = 630
const BRAND_DIR = path.resolve('public/brand')
const OUTPUT_DIR = path.resolve('public/brand/og')

const OG_KEYS: OgImageKey[] = [
  'default',
  'about',
  'expertises',
  'realisations',
  'clients',
  'contact',
  'quote',
  'legal',
  'privacy',
]

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function wrapText(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxCharsPerLine) {
      current = candidate
      continue
    }

    if (current) lines.push(current)
    current = word
    if (lines.length >= maxLines) break
  }

  if (current && lines.length < maxLines) lines.push(current)
  return lines.slice(0, maxLines)
}

function buildOverlaySvg(title: string, locale: 'fr' | 'en'): Buffer {
  const lines = wrapText(title, 22, 2)
  const titleY = lines.length > 1 ? 430 : 455
  const titleLines = lines
    .map((line, index) => {
      const y = titleY + index * 72
      return `<text x="80" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#FFFFFF">${escapeXml(line)}</text>`
    })
    .join('')

  const tagline =
    locale === 'fr'
      ? 'Génie civil · Construction métallique · Mali'
      : 'Civil engineering · Metal construction · Mali'

  return Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(17,17,17,0.35)"/>
      <stop offset="55%" stop-color="rgba(17,17,17,0.72)"/>
      <stop offset="100%" stop-color="rgba(17,17,17,0.92)"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#overlay)"/>
  <rect x="80" y="72" width="112" height="8" fill="#F00080"/>
  <text x="80" y="150" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#D4AF37">SOGICA SA</text>
  ${titleLines}
  <text x="80" y="560" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="rgba(255,255,255,0.82)">${escapeXml(tagline)}</text>
</svg>`)
}

async function generateImage(
  key: OgImageKey,
  locale: 'fr' | 'en',
  backgroundFile: string,
): Promise<void> {
  const backgroundPath = path.join(BRAND_DIR, backgroundFile)
  const outputPath = path.join(OUTPUT_DIR, `${key}-${locale}.png`)
  const title = getOgImageLabel(key, locale)

  const background = await sharp(backgroundPath)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .toBuffer()

  await sharp(background)
    .composite([{ input: buildOverlaySvg(title, locale), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(outputPath)

  console.log(`Generated ${path.relative(process.cwd(), outputPath)}`)
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  let index = 0
  for (const key of OG_KEYS) {
    for (const locale of locales) {
      const background = OG_BACKGROUND_FILES[index % OG_BACKGROUND_FILES.length]
      await generateImage(key, locale, background)
      index += 1
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
