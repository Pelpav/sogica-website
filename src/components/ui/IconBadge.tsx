export type IconBadgeVariant = 'expertise' | 'equipment' | 'civil' | 'metal' | 'road'

const EXPERTISE_SLUG_ICONS: Record<string, IconBadgeVariant> = {
  'genie-civil': 'civil',
  'construction-metallique': 'metal',
  'equipements-pesage-controle-routier': 'road',
}

export function expertiseIconVariantFromSlug(slug?: string | null): IconBadgeVariant {
  if (!slug) return 'expertise'
  return EXPERTISE_SLUG_ICONS[slug] ?? 'expertise'
}

function CivilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3.5 16.5V8.2L10 4.5l6.5 3.7v8.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.5 16.5v-4h5v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 8.2 10 11.5l6.5-3.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 4.5V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MetalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 6.5h14M3 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 6.5v7M13.5 6.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M8.5 10h3M10 8.5v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function RoadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M2.5 14.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M5.5 14.5V9.2c0-.6.3-1.1.8-1.4l3.7-2.1c.5-.3 1.2-.3 1.7 0l3.7 2.1c.5.3.8.8.8 1.4v5.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="6.2" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7.8v1.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ExpertiseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2L17 6v8l-7 4-7-4V6l7-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 10v6M3 6l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function EquipmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BadgeIcon({ variant }: { variant: IconBadgeVariant }) {
  switch (variant) {
    case 'civil':
      return <CivilIcon />
    case 'metal':
      return <MetalIcon />
    case 'road':
      return <RoadIcon />
    case 'equipment':
      return <EquipmentIcon />
    default:
      return <ExpertiseIcon />
  }
}

export function IconBadge({ variant }: { variant: IconBadgeVariant }) {
  return (
    <span className={`icon-badge icon-badge--${variant}`} aria-hidden>
      <BadgeIcon variant={variant} />
    </span>
  )
}
