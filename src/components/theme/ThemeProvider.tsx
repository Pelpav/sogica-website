import type { ThemeSetting } from '@/payload-types'

const radiusMap = { sharp: '0px', soft: '4px', round: '8px' } as const
const spacingMap = { compact: 'compact', normal: 'normal', relaxed: 'relaxed' } as const

export function ThemeProvider({ theme }: { theme: ThemeSetting | null }) {
  if (!theme) return null

  const css = `
    :root {
      --color-primary: ${theme.colorPrimary || '#F00080'};
      --color-secondary: ${theme.colorSecondary || '#111111'};
      --color-accent: ${theme.colorAccent || '#D4AF37'};
      --color-background: ${theme.colorBackground || '#FAFAFA'};
      --color-foreground: ${theme.colorForeground || '#111111'};
      --color-muted: ${theme.colorMuted || '#F3F3F3'};
      --color-muted-foreground: ${theme.colorMutedForeground || '#666666'};
      --color-border: ${theme.colorBorder || '#E5E5E5'};
      --color-destructive: ${theme.colorDestructive || '#DC2626'};
      --font-heading: ${theme.fontHeading || 'var(--font-barlow)'};
      --font-body: ${theme.fontBody || 'var(--font-source)'};
      --container-max: ${theme.containerMax || '1280px'};
      --radius-base: ${radiusMap[theme.radiusScale as keyof typeof radiusMap] || '0px'};
      --motion-intensity: ${theme.motionIntensity === 'none' ? '0' : theme.motionIntensity === 'moderate' ? '1' : '0.6'};
    }
    ${theme.advancedCustomCss || ''}
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        hidden
        data-section-spacing={spacingMap[theme.sectionSpacing as keyof typeof spacingMap] || 'normal'}
        data-radius={theme.radiusScale || 'sharp'}
        data-motion={theme.motionIntensity || 'subtle'}
      />
    </>
  )
}
