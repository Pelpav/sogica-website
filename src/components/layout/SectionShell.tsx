import type { ReactNode } from 'react'

export type ShellTone = 'dark' | 'light' | 'brand' | 'muted'

export function SectionShell({
  children,
  tone = 'dark',
  className = '',
  shellClassName = '',
  id,
  compact = false,
  tightTop = false,
}: {
  children: ReactNode
  tone?: ShellTone
  className?: string
  shellClassName?: string
  id?: string
  compact?: boolean
  tightTop?: boolean
}) {
  return (
    <section
      id={id}
      className={[
        'sogica-section',
        'sogica-shell',
        `sogica-shell--${tone}`,
        compact ? 'sogica-section--compact sogica-shell--compact' : '',
        tightTop ? 'sogica-section--tight-top' : '',
        className,
        shellClassName,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container-site">{children}</div>
    </section>
  )
}

export function SectionShellFooter({
  children,
  className = '',
  align = 'center',
}: {
  children: ReactNode
  className?: string
  align?: 'center' | 'start' | 'end'
}) {
  const alignClass =
    align === 'start' ? 'sogica-shell__footer--start' : align === 'end' ? 'sogica-shell__footer--end' : ''

  return <div className={`sogica-shell__footer ${alignClass} ${className}`.trim()}>{children}</div>
}
