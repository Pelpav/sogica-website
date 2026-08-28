import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { MediaRenderer } from '@/components/media/CmsMedia'
import type { Media as MediaType } from '@/payload-types'
import type { PageBlock } from './BlockRenderer'

function txt(value: unknown): string {
  return value == null ? '' : String(value)
}

function sectionBg(variant?: string | null) {
  if (!variant || variant === 'default') return undefined
  return variant
}

export function HeroBlock({
  block,
  priority,
}: {
  block: PageBlock
  locale: Locale
  priority?: boolean
}) {
  const layout = (block.layout as string) || 'fullscreen'

  return (
    <section
      className={`section-block relative overflow-hidden ${layout === 'fullscreen' ? 'min-h-[70vh]' : ''}`}
      data-bg={sectionBg(block.backgroundVariant as string)}
    >
      {block.media != null && layout === 'fullscreen' ? (
        <div className="absolute inset-0 -z-10">
          <MediaRenderer
            media={block.media as MediaType}
            type={block.mediaType as 'image' | 'video'}
            priority={priority}
            className="h-full min-h-[70vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        </div>
      ) : null}
      <div className={`container-site relative ${layout === 'fullscreen' ? 'flex min-h-[60vh] flex-col justify-end pb-12 text-white' : 'grid gap-8 lg:grid-cols-2 lg:items-center'}`}>
        <div className="max-w-2xl reveal">
          {txt(block.eyebrow) ? <p className="eyebrow text-[var(--color-accent)]">{txt(block.eyebrow)}</p> : null}
          <h1 className="mt-3 text-4xl md:text-6xl">{txt(block.title)}</h1>
          {txt(block.subtitle) ? <p className="mt-4 text-lg text-white/85 md:text-xl">{txt(block.subtitle)}</p> : null}
          {block.cta != null && typeof block.cta === 'object' && (block.cta as { label?: string; url?: string }).label ? (
            <Link href={(block.cta as { url?: string }).url || '#'} className="btn btn-primary mt-8">
              {(block.cta as { label?: string }).label}
            </Link>
          ) : null}
        </div>
        {block.media != null && layout !== 'fullscreen' ? (
          <div className="media-frame aspect-[4/3] relative">
            <MediaRenderer media={block.media as MediaType} type={block.mediaType as 'image' | 'video'} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function IntroBlock({ block }: { block: PageBlock }) {
  const align = block.alignment === 'center' ? 'text-center mx-auto' : ''
  return (
    <section className="section-block" data-bg={sectionBg(block.backgroundVariant as string)}>
      <div className={`container-site max-w-3xl reveal ${align}`}>
        {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
        <h2 className="mt-2 text-3xl md:text-4xl">{txt(block.title)}</h2>
        {txt(block.description) ? <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">{txt(block.description)}</p> : null}
      </div>
    </section>
  )
}

export function RichTextBlock({ block }: { block: PageBlock }) {
  const content = block.content
  if (!content) return null
  return (
    <section className="section-block" data-bg={sectionBg(block.backgroundVariant as string)}>
      <div className="container-site prose prose-neutral max-w-3xl">
        <div dangerouslySetInnerHTML={{ __html: serializeLexical(content) }} />
      </div>
    </section>
  )
}

function serializeLexical(content: unknown): string {
  if (typeof content === 'string') return content
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''
  return root.children
    .map((node) => {
      const n = node as { type?: string; children?: { text?: string }[]; tag?: string }
      if (n.type === 'paragraph') {
        const text = n.children?.map((c) => c.text || '').join('') || ''
        return `<p>${text}</p>`
      }
      if (n.type === 'heading') {
        const text = n.children?.map((c) => c.text || '').join('') || ''
        const tag = n.tag || 'h2'
        return `<${tag}>${text}</${tag}>`
      }
      return ''
    })
    .join('')
}

export function TextMediaBlock({ block }: { block: PageBlock }) {
  const mediaLeft = block.mediaPosition === 'left'
  return (
    <section className="section-block" data-bg={sectionBg(block.backgroundVariant as string)}>
      <div className={`container-site grid items-center gap-10 lg:grid-cols-2 ${mediaLeft ? '' : ''}`}>
        {mediaLeft && block.media != null ? (
          <div className="media-frame"><MediaRenderer media={block.media as MediaType} /></div>
        ) : null}
        <div className="reveal">
          {txt(block.title) ? <h2 className="text-3xl">{txt(block.title)}</h2> : null}
          {txt(block.body) ? <p className="mt-4 text-[var(--color-muted-foreground)] whitespace-pre-line">{txt(block.body)}</p> : null}
        </div>
        {!mediaLeft && block.media != null ? (
          <div className="media-frame"><MediaRenderer media={block.media as MediaType} /></div>
        ) : null}
      </div>
    </section>
  )
}

export function FullWidthMediaBlock({ block }: { block: PageBlock }) {
  return (
    <section className="section-block">
      <div className={block.blockType === 'singleMedia' && block.size === 'contained' ? 'container-site' : ''}>
        <MediaRenderer
          media={block.media as MediaType}
          type={block.blockType === 'fullWidthVideo' ? 'video' : 'image'}
          poster={block.poster as MediaType}
        />
        {txt(block.caption) ? <p className="container-site mt-2 text-sm text-[var(--color-muted-foreground)]">{txt(block.caption)}</p> : null}
      </div>
    </section>
  )
}

export function GalleryBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { media?: MediaType; caption?: string }[]) || []
  const cols = Number(block.columns || 3)
  return (
    <section className="section-block" data-bg={sectionBg(block.backgroundVariant as string)}>
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
        <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {items.map((item, i) => (
            <figure key={i} className="media-frame">
              <MediaRenderer media={item.media} />
              {item.caption && <figcaption className="p-2 text-xs">{item.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MasonryBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { media?: MediaType }[]) || []
  return (
    <section className="section-block">
      <div className="container-site columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <div key={i} className="mb-4 break-inside-avoid media-frame">
            <MediaRenderer media={item.media} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function StatsBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { value?: string; label?: string }[]) || []
  if (!items.length) return null
  return (
    <section className="section-block" data-bg={sectionBg(block.backgroundVariant as string)}>
      <div className="container-site">
        {txt(block.title) ? <h2 className="mb-8 text-3xl">{txt(block.title)}</h2> : null}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="border-l-4 border-[var(--color-primary)] pl-4">
              <p className="text-3xl font-semibold">{item.value}</p>
              <p className="mt-1 text-sm uppercase tracking-wide text-[var(--color-muted-foreground)]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBlock({ block }: { block: PageBlock }) {
  return (
    <section className="section-block" data-bg={sectionBg(block.backgroundVariant as string) || 'dark'}>
      <div className="container-site text-center reveal">
        <h2 className="text-3xl text-white">{String(block.title)}</h2>
        {txt(block.description) ? <p className="mx-auto mt-4 max-w-2xl text-white/75">{txt(block.description)}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {txt(block.primaryLabel) && txt(block.primaryUrl) ? (
            <Link href={txt(block.primaryUrl)} className="btn btn-primary">{txt(block.primaryLabel)}</Link>
          ) : null}
          {txt(block.secondaryLabel) && txt(block.secondaryUrl) ? (
            <Link href={txt(block.secondaryUrl)} className="btn btn-outline border-white/30 text-white">{txt(block.secondaryLabel)}</Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function BeforeAfterBlock({ block }: { block: PageBlock }) {
  return (
    <section className="section-block">
      <div className="container-site grid gap-4 md:grid-cols-2">
        <figure>
          <p className="eyebrow mb-2">Avant</p>
          <div className="media-frame"><MediaRenderer media={block.before as MediaType} /></div>
        </figure>
        <figure>
          <p className="eyebrow mb-2">Après</p>
          <div className="media-frame"><MediaRenderer media={block.after as MediaType} /></div>
        </figure>
        {txt(block.caption) ? <p className="md:col-span-2 text-sm text-[var(--color-muted-foreground)]">{txt(block.caption)}</p> : null}
      </div>
    </section>
  )
}

export function TimelineBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { year?: string; title?: string; description?: string }[]) || []
  return (
    <section className="section-block">
      <div className="container-site max-w-2xl">
        <ol className="relative border-l border-[var(--color-border)] pl-6">
          {items.map((item, i) => (
            <li key={i} className="mb-8">
              <span className="absolute -left-2 mt-1 h-3 w-3 rounded-full bg-[var(--color-primary)]" />
              <p className="eyebrow">{item.year}</p>
              <h3 className="mt-1 text-xl">{item.title}</h3>
              {item.description && <p className="mt-2 text-[var(--color-muted-foreground)]">{item.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function QuoteBlock({ block }: { block: PageBlock }) {
  return (
    <section className="section-block">
      <blockquote className="container-site max-w-3xl border-l-4 border-[var(--color-primary)] pl-6">
        <p className="text-2xl italic">&ldquo;{String(block.quote)}&rdquo;</p>
        {txt(block.attribution) ? (
          <footer className="mt-4 text-sm text-[var(--color-muted-foreground)]">
            — {txt(block.attribution)}
            {txt(block.role) ? `, ${txt(block.role)}` : ''}
          </footer>
        ) : null}
      </blockquote>
    </section>
  )
}

export function SpacerBlock({ block }: { block: PageBlock }) {
  const map = { sm: '2rem', md: '4rem', lg: '6rem' }
  const size = map[(block.size as keyof typeof map) || 'md']
  return <div aria-hidden style={{ height: size }} />
}
