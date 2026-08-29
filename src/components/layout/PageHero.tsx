import { SectionHeader } from '@/components/layout/SectionHeader'
import { SectionShell } from '@/components/layout/SectionShell'
import type { ShellTone } from '@/components/layout/SectionShell'

export function PageHero({
  eyebrow,
  title,
  description,
  tone = 'dark',
}: {
  eyebrow?: string
  title: string
  description?: string
  tone?: ShellTone
}) {
  return (
    <SectionShell tone={tone} compact tightTop>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="sogica-shell__header"
      />
    </SectionShell>
  )
}
