'use client'

type MarqueeStripProps = {
  items: string[]
  variant?: 'default' | 'accent'
}

export function MarqueeStrip({ items, variant = 'default' }: MarqueeStripProps) {
  if (!items.length) return null

  const text = items.join('  •  ')
  const repeated = `${text}  •  ${text}  •  ${text}`

  return (
    <div className={`marquee-strip ${variant === 'accent' ? 'marquee-strip--accent' : ''}`} aria-hidden>
      <div className="marquee-strip__track">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  )
}
