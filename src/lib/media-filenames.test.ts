import { describe, expect, it } from 'vitest'
import {
  BRAND_LOGO_FILENAME,
  BRAND_LOGO_WHITE_FILENAME,
  buildWhatsAppRenameMap,
  buildWhatsAppRepairMap,
  resolveRenamedFilename,
} from './media-filenames'

describe('media-filenames', () => {
  it('renomme les photos WhatsApp de façon séquentielle', () => {
    const map = buildWhatsAppRenameMap([
      'WhatsApp Image 2026-08-26 at 19.05.19.jpeg',
      'WhatsApp Image 2026-08-26 at 19.02.42.jpeg',
    ])

    expect(map.get('WhatsApp Image 2026-08-26 at 19.02.42.jpeg')).toBe('sogica-chantier-001.jpeg')
    expect(map.get('WhatsApp Image 2026-08-26 at 19.05.19.jpeg')).toBe('sogica-chantier-002.jpeg')
  })

  it('renomme les variantes redimensionnées', () => {
    const map = buildWhatsAppRenameMap(['WhatsApp Image 2026-08-26 at 19.02.42.jpeg'])
    const renamed = resolveRenamedFilename(
      'WhatsApp Image 2026-08-26 at 19.02.42-400x400.jpg',
      map,
    )
    expect(renamed).toBe('sogica-chantier-001-400x400.jpg')
  })

  it('répare le mapping via les originaux déjà renommés', () => {
    const repairMap = buildWhatsAppRepairMap([
      'sogica-chantier-005.jpeg',
      'WhatsApp Image 2026-08-26 at 19.02.42-400x400.jpg',
    ])
    expect(repairMap.get('WhatsApp Image 2026-08-26 at 19.02.42.jpeg')).toBe('sogica-chantier-005.jpeg')
  })

  it('renomme les logos et leurs tailles', () => {
    const map = new Map<string, string>()
    expect(resolveRenamedFilename('logo.png', map)).toBe(BRAND_LOGO_FILENAME)
    expect(resolveRenamedFilename('logo-400x400.png', map)).toBe('sogica-logo-400x400.png')
    expect(resolveRenamedFilename('logo_transparent.png', map)).toBe(BRAND_LOGO_WHITE_FILENAME)
  })
})
