export const PARTNER_LOGO_PATHS: Record<string, string> = {
  'PNUD-MLI': '/partners/pnud.svg',
  "Fonds d'Entretien Routier (FER MALI)": '/partners/fer-mali.png',
  'Expertise France – Groupe AFD': '/partners/afd.svg',
  'SONATER-PUDTR – Burkina Faso': '/partners/sonater.png',
  'Union Européenne – Mali': '/partners/eu.svg',
}

export function getPartnerLogoPath(name?: string | null) {
  if (!name) return ''
  return PARTNER_LOGO_PATHS[name] || ''
}
