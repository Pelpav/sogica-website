import { RevealStagger } from '@/components/motion/RevealStagger'

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: {
  index?: string
  eyebrow?: string
  title?: string
  description?: string
  dark?: boolean
  align?: 'left' | 'center'
  className?: string
}) {
  if (!title && !description && !eyebrow) return null

  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <RevealStagger className={`max-w-2xl ${alignClass} ${className}`} stagger={0.1}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className={`section-title ${eyebrow ? 'mt-4' : ''}`}>{title}</h2> : null}
      {description ? (
        <p className={`lead-text ${title || eyebrow ? 'mt-4' : ''} ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      ) : null}
    </RevealStagger>
  )
}
