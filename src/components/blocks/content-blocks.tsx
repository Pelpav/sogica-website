import { SiteLink } from '@/components/ui/SiteLink'
import Image from 'next/image'
import { Suspense } from 'react'
import type { Locale } from '@/lib/i18n'
import { localizedPath, resolveLocaleUrl, routePath } from '@/lib/i18n'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { SectionShell } from '@/components/layout/SectionShell'
import { MediaRenderer } from '@/components/media/CmsMedia'
import { getMediaAlt, getMediaUrl } from '@/lib/media-url'
import { MarqueeStrip } from '@/components/blocks/MarqueeStrip'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { ContactSectionContent } from '@/components/layout/ContactSection'
import { getGlobal } from '@/lib/payload'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { IconBadge } from '@/components/ui/IconBadge'
import { isLogoMedia } from '@/lib/cms-media'
import type { Media as MediaType } from '@/payload-types'
import type { PageBlock } from './BlockRenderer'
import { serializeLexical } from '@/lib/serialize-lexical'

import { HERO_FALLBACK_IMAGE } from '@/lib/media-filenames'

function txt(value: unknown): string {
  return value == null ? '' : String(value)
}

function sectionBg(variant?: string | null) {
  if (!variant || variant === 'default') return undefined
  if (variant === 'dark') return 'muted'
  return variant
}

function resolveUrl(url: string | undefined, locale: Locale, fallback = '') {
  return resolveLocaleUrl(url, locale, fallback)
}

export function HeroBlock({
  block,
  locale,
  priority,
}: {
  block: PageBlock
  locale: Locale
  priority?: boolean
}) {
  const layout = (block.layout as string) || 'construktion'
  const cta = block.cta as { label?: string; url?: string } | undefined
  const secondaryCta = block.secondaryCta as { label?: string; url?: string } | undefined
  const ctaUrl = resolveUrl(cta?.url, locale)
  const secondaryUrl = resolveUrl(
    secondaryCta?.url,
    locale,
    routePath(locale, 'about'),
  )
  const heroMedia = block.media as MediaType | null | undefined
  const useFallbackHero = !heroMedia || isLogoMedia(heroMedia)
  const imageSrc = useFallbackHero
    ? HERO_FALLBACK_IMAGE
    : getMediaUrl(heroMedia as MediaType) || HERO_FALLBACK_IMAGE
  const imageAlt = useFallbackHero ? '' : getMediaAlt(heroMedia as MediaType, '')

  if (layout === 'construktion') {
    return (
      <section className="hero-construktion" data-hero-overlay>
        <div className="container-site hero-construktion__grid">
          <div className="hero-construktion__copy">
            {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
            <h1 className="display-title mt-4">{txt(block.title)}</h1>
            {txt(block.subtitle) ? <p className="lead-text mt-5 max-w-xl">{txt(block.subtitle)}</p> : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {cta?.label && ctaUrl ? (
                <SiteLink href={ctaUrl} className="btn btn-primary">
                  {cta.label}
                  <BtnArrowIcon />
                </SiteLink>
              ) : null}
              <SiteLink href={secondaryUrl} className="btn btn-outline">
                {secondaryCta?.label || (locale === 'fr' ? 'En savoir plus' : 'Learn more')}
              </SiteLink>
            </div>
          </div>
          <div className="hero-construktion__media card overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={900}
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        <a href="#trusted" className="hero-construktion__scroll" aria-label={locale === 'fr' ? 'Défiler' : 'Scroll'}>
          <span aria-hidden>↓</span>
        </a>
      </section>
    )
  }

  if (layout !== 'fullscreen') {
    return (
      <section className="section-block" data-tone={sectionBg(block.backgroundVariant as string)}>
        <div className="container-site grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal">
            {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
            <h1 className="display-title mt-4">{txt(block.title)}</h1>
            {txt(block.subtitle) ? <p className="lead-text mt-5">{txt(block.subtitle)}</p> : null}
          </div>
          {block.media != null ? (
            <div className="card overflow-hidden">
              <MediaRenderer media={block.media as MediaType} type={block.mediaType as 'image' | 'video'} priority={priority} />
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section className="hero-immersive" data-hero-overlay>
      <div className="hero-immersive__media">
        {useFallbackHero ? (
          <Image
            src={HERO_FALLBACK_IMAGE}
            alt=""
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <Image
            src={getMediaUrl(heroMedia as MediaType) || HERO_FALLBACK_IMAGE}
            alt={getMediaAlt(heroMedia as MediaType, '')}
            fill
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>
      <div className="hero-immersive__overlay" aria-hidden />
      <div className="hero-immersive__scrim" aria-hidden />
      <div className="hero-immersive__content container-site">
        <div className="hero-immersive__copy max-w-3xl">
          {txt(block.eyebrow) ? <p className="eyebrow eyebrow--light">{txt(block.eyebrow)}</p> : null}
          <h1 className="display-title display-title--light mt-4">{txt(block.title)}</h1>
          {txt(block.subtitle) ? (
            <p className="lead-text lead-text--light mt-5 max-w-2xl">{txt(block.subtitle)}</p>
          ) : null}
          <div className="mt-8">
            {cta?.label && ctaUrl ? (
              <SiteLink href={ctaUrl} className="btn btn-primary">
                {cta.label}
                <BtnArrowIcon />
              </SiteLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function IntroBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  const variant = (block.variant as string) || 'simple'
  const featuredStat = block.featuredStat as { value?: string; label?: string } | undefined
  const watermark = txt(block.watermark) || 'SOGICA'

  if (variant === 'composed' && txt(featuredStat?.value)) {
    const aboutPath = localizedPath(locale, locale === 'fr' ? 'a-propos' : 'about')

    return (
      <SectionShell tone="light">
        <div className="intro-composed__grid section-watermark" data-watermark={watermark}>
          <div className="intro-composed__stat">
            <div className="intro-composed__stat-card">
              <p className="intro-composed__stat-value">{txt(featuredStat?.value)}</p>
              <p className="intro-composed__stat-label">{txt(featuredStat?.label)}</p>
            </div>
          </div>

          <div className="intro-composed__content">
            {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
            <h2 className="section-title mt-4">{txt(block.title)}</h2>
            {txt(block.description) ? <p className="lead-text mt-5">{txt(block.description)}</p> : null}
            <SiteLink href={aboutPath} className="btn btn-primary mt-8">
              {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
              <BtnArrowIcon />
            </SiteLink>
          </div>

          {block.media != null ? (
            <div className="intro-composed__media card overflow-hidden">
              <MediaRenderer media={block.media as MediaType} className="aspect-[4/5] w-full object-cover" />
            </div>
          ) : null}
        </div>
      </SectionShell>
    )
  }

  const align = block.alignment === 'center' ? 'center' : 'left'

  return (
    <SectionShell tone="light">
      <div className="intro-about__grid">
        {block.media != null ? (
          <div className="intro-about__media card overflow-hidden">
            <MediaRenderer media={block.media as MediaType} className="aspect-[4/3] w-full object-cover" />
          </div>
        ) : null}
        <div className={align === 'center' ? 'text-center' : ''}>
          {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
          <h2 className="section-title mt-4">{txt(block.title)}</h2>
          {txt(block.description) ? <p className="lead-text mt-5">{txt(block.description)}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <SiteLink href={localizedPath(locale, locale === 'fr' ? 'demande-de-devis' : 'request-quote')} className="btn btn-primary">
              {locale === 'fr' ? 'Demande de devis' : 'Get a quote'}
              <BtnArrowIcon />
            </SiteLink>
            <SiteLink href={localizedPath(locale, locale === 'fr' ? 'a-propos' : 'about')} className="btn btn-outline">
              {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
            </SiteLink>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export function RichTextBlock({ block }: { block: PageBlock }) {
  const content = block.content
  if (!content) return null
  return (
    <section className="section-block">
      <div className="container-site prose prose-neutral max-w-3xl">
        <div dangerouslySetInnerHTML={{ __html: serializeLexical(content) }} />
      </div>
    </section>
  )
}

export function TextMediaBlock({ block }: { block: PageBlock }) {
  const mediaLeft = block.mediaPosition === 'left'
  return (
    <section className="section-block">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        {mediaLeft && block.media != null ? (
          <div className="card overflow-hidden">
            <MediaRenderer media={block.media as MediaType} />
          </div>
        ) : null}
        <div className="reveal">
          {txt(block.title) ? <h2 className="section-title">{txt(block.title)}</h2> : null}
          {txt(block.body) ? <p className="lead-text mt-5 whitespace-pre-line">{txt(block.body)}</p> : null}
        </div>
        {!mediaLeft && block.media != null ? (
          <div className="card overflow-hidden">
            <MediaRenderer media={block.media as MediaType} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function FullWidthMediaBlock({ block }: { block: PageBlock }) {
  return (
    <section className="py-8">
      <div className={block.blockType === 'singleMedia' && block.size === 'contained' ? 'container-site card overflow-hidden' : ''}>
        <MediaRenderer
          media={block.media as MediaType}
          type={block.blockType === 'fullWidthVideo' ? 'video' : 'image'}
          poster={block.poster as MediaType}
        />
        {txt(block.caption) ? (
          <p className="container-site mt-3 text-sm text-[var(--color-muted-foreground)]">{txt(block.caption)}</p>
        ) : null}
      </div>
    </section>
  )
}

export function GalleryBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { media?: MediaType; caption?: string }[]) || []
  const cols = Number(block.columns || 3)
  return (
    <section className="section-block" data-tone="muted">
      <div className="container-site">
        {txt(block.title) ? <h2 className="section-title mb-8">{txt(block.title)}</h2> : null}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {items.map((item, i) => (
            <figure key={i} className="card overflow-hidden">
              <MediaRenderer media={item.media} />
              {item.caption ? <figcaption className="p-3 text-sm text-[var(--color-muted-foreground)]">{item.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MasonryBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { media?: MediaType }[]) || []
  if (!items.length) return null

  return (
    <section className="section-block">
      <div className="container-site mb-8">
        <SectionHeader title={txt(block.title) || 'Sur le terrain'} align="center" className="mx-auto" />
      </div>
      <div className="container-site columns-2 gap-4 sm:columns-3">
        {items.map((item, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <div className="card overflow-hidden">
              <MediaRenderer media={item.media} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function StatsBlock({ block }: { block: PageBlock }) {
  const items = (block.items as { value?: string; label?: string }[]) || []
  if (!items.length) return null

  const variant = (block.variant as string) || 'grid'

  if (variant === 'featured') {
    return (
      <section className="sogica-section stats-featured stats-featured--flat">
        <div className="container-site">
          <div className="stats-featured__grid">
            {items.map((item, i) => (
              <div key={i} className="stats-featured__item">
                <p className="stats-featured__value">{item.value}</p>
                <p className="stats-featured__label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'band') {
    return (
      <section className="stats-band">
        <div className="container-site">
          <div className="stats-band__inner">
            {items.map((item, i) => (
              <div key={i} className="stats-band__item">
                <p className="stats-band__value">{item.value}</p>
                <p className="stats-band__label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="border-y border-[var(--color-border)] bg-white py-10">
      <div className="container-site">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MarqueeBlock({ block }: { block: PageBlock }) {
  const items =
    (block.items as { label?: string }[] | undefined)?.map((item) => txt(item.label)).filter(Boolean) ||
    txt(block.text)
      .split('•')
      .map((s) => s.trim())
      .filter(Boolean)

  if (!items.length) return null
  const variant = (block.variant as string) === 'accent' ? 'accent' : 'default'
  return <MarqueeStrip items={items} variant={variant} />
}

export function WhyChooseUsBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  const items = (block.items as { text?: string }[]) || []
  const variant = (block.variant as string) || 'features'

  if (variant === 'features') {
    return (
      <section className="section-block why-choose why-choose--features" data-tone="dark">
        <div className="container-site why-choose__grid">
          {block.media != null ? (
            <div className="why-choose__media">
              <MediaRenderer media={block.media as MediaType} className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div>
            {txt(block.eyebrow) ? <p className="eyebrow eyebrow--light">{txt(block.eyebrow)}</p> : null}
            <h2 className="section-title mt-4 text-white">{txt(block.title)}</h2>
            {txt(block.description) ? <p className="lead-text lead-text--light mt-4">{txt(block.description)}</p> : null}
            {items.length ? (
              <div className="why-choose__features">
                {items.map((item, i) => (
                  <div key={i} className="why-choose__feature-card">
                    <span className="why-choose__feature-icon" aria-hidden>
                      <IconBadge variant="expertise" />
                    </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {txt(block.ctaLabel) && txt(block.ctaUrl) ? (
              <SiteLink href={resolveUrl(txt(block.ctaUrl), locale)} className="btn btn-primary mt-8">
                {txt(block.ctaLabel)}
                <BtnArrowIcon />
              </SiteLink>
            ) : null}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-block why-choose" data-tone="muted">
      <div className="container-site why-choose__grid">
        <div>
          {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
          <h2 className="section-title mt-4">{txt(block.title)}</h2>
          {txt(block.description) ? <p className="lead-text mt-4">{txt(block.description)}</p> : null}
          {items.length ? (
            <ul className="why-choose__list">
              {items.map((item, i) => (
                <li key={i} className="why-choose__item">
                  <span className="why-choose__check" aria-hidden>
                    ✓
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {txt(block.ctaLabel) && txt(block.ctaUrl) ? (
            <SiteLink href={resolveUrl(txt(block.ctaUrl), locale)} className="btn btn-primary mt-8">
              {txt(block.ctaLabel)}
            </SiteLink>
          ) : null}
        </div>
        {block.media != null ? (
          <div className="why-choose__media">
            <MediaRenderer media={block.media as MediaType} className="aspect-[4/3] w-full object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function CtaBlock({ block, locale }: { block: PageBlock; locale?: Locale }) {
  const resolvedPrimary = locale ? resolveUrl(txt(block.primaryUrl), locale) : txt(block.primaryUrl)
  const resolvedSecondary = locale ? resolveUrl(txt(block.secondaryUrl), locale) : txt(block.secondaryUrl)
  const isDark = block.backgroundVariant === 'dark'
  const isBanner = (block.variant as string) === 'banner'

  if (isBanner) {
    const bg = block.backgroundVariant as string | undefined
    const toneClass = bg === 'dark' ? 'cta-banner--dark' : 'cta-banner--brand'

    return (
      <section className={`sogica-section cta-banner cta-banner--flat ${toneClass}`}>
        <div className="container-site cta-banner__inner">
          <div className="cta-banner__copy">
            <h2 className="cta-banner__title">{String(block.title)}</h2>
            {txt(block.description) ? <p className="cta-banner__lead">{txt(block.description)}</p> : null}
          </div>
          <div className="cta-banner__actions">
            {txt(block.primaryLabel) && resolvedPrimary ? (
              <SiteLink href={resolvedPrimary} className="btn btn-primary">
                {txt(block.primaryLabel)}
                <BtnArrowIcon />
              </SiteLink>
            ) : null}
            {txt(block.secondaryLabel) && resolvedSecondary ? (
              <SiteLink href={resolvedSecondary} className="btn btn-outline-light">
                {txt(block.secondaryLabel)}
              </SiteLink>
            ) : null}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="section-block cta-section"
      data-tone={isDark ? 'dark' : block.backgroundVariant === 'accent' ? 'accent' : 'default'}
    >
      <div className="container-site text-center">
        <div className="reveal mx-auto max-w-2xl">
          <p className={`eyebrow justify-center ${isDark ? 'eyebrow--light' : ''}`}>
            {locale === 'en' ? 'Contact us' : 'Contactez-nous'}
          </p>
          <h2 className={`section-title mt-4 ${isDark ? 'text-white' : ''}`}>{String(block.title)}</h2>
          {txt(block.description) ? (
            <p className={`lead-text mt-4 ${isDark ? 'lead-text--light' : ''}`}>{txt(block.description)}</p>
          ) : null}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {txt(block.primaryLabel) && resolvedPrimary ? (
              <SiteLink href={resolvedPrimary} className="btn btn-primary">
                {txt(block.primaryLabel)}
                <BtnArrowIcon />
              </SiteLink>
            ) : null}
            {txt(block.secondaryLabel) && resolvedSecondary ? (
              <SiteLink href={resolvedSecondary} className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline'}`}>
                {txt(block.secondaryLabel)}
              </SiteLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export function BeforeAfterBlock({ block }: { block: PageBlock }) {
  return (
    <section className="section-block">
      <div className="container-site grid gap-6 md:grid-cols-2">
        <figure className="card overflow-hidden">
          <p className="p-4 text-sm font-semibold">Avant</p>
          <MediaRenderer media={block.before as MediaType} />
        </figure>
        <figure className="card overflow-hidden">
          <p className="p-4 text-sm font-semibold">Après</p>
          <MediaRenderer media={block.after as MediaType} />
        </figure>
      </div>
    </section>
  )
}

export function TimelineBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  const items = (block.items as { year?: string; title?: string; description?: string }[]) || []
  const variant = (block.variant as string) || 'process'

  if (variant === 'process') {
    return (
      <SectionShell tone="dark">
        <div className="process-section">
          <div className="process-section__intro sogica-shell__header">
            {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
            <h2 className="section-title mt-4">
              {txt(block.title) || (locale === 'fr' ? 'Notre méthode de travail' : 'How we work')}
            </h2>
            {txt(block.description) ? (
              <p className="lead-text lead-text--light mt-4">{txt(block.description)}</p>
            ) : null}
          </div>
          <ol className="process-steps">
            {items.map((item, i) => (
              <li key={i} className="process-steps__item">
                <p className="process-steps__step">{txt(item.year)}</p>
                <h3 className="process-steps__title">{txt(item.title)}</h3>
                {txt(item.description) ? (
                  <p className="process-steps__desc process-steps__desc--on-dark">{txt(item.description)}</p>
                ) : null}
              </li>
            ))}
          </ol>
          {block.media != null ? (
            <div className="process-section__media">
              <MediaRenderer media={block.media as MediaType} className="aspect-[4/3] w-full object-cover" />
            </div>
          ) : null}
        </div>
      </SectionShell>
    )
  }

  return (
    <section className="section-block" data-tone="muted">
      <div className="container-site max-w-2xl">
        <ol className="space-y-6">
          {items.map((item, i) => (
            <li key={i} className="card-flat p-6">
              <p className="text-sm font-semibold text-[var(--color-primary)]">{item.year}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              {item.description ? <p className="lead-text mt-2">{item.description}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function QuoteBlock({ block }: { block: PageBlock }) {
  const variant = (block.variant as string) || 'simple'

  if (variant === 'testimonial') {
    return (
      <section className="section-block testimonial-section section-watermark" data-tone="dark" data-watermark="SOGICA">
        <div className="container-site testimonial-section__grid">
          <div className="testimonial-card">
            <p className="testimonial-card__quote">&ldquo;{String(block.quote)}&rdquo;</p>
            {txt(block.attribution) ? (
              <footer className="testimonial-card__footer">
                <strong>{txt(block.attribution)}</strong>
                {txt(block.role) ? <span>, {txt(block.role)}</span> : null}
              </footer>
            ) : null}
          </div>
          {block.media != null ? (
            <div className="testimonial-section__media">
              <MediaRenderer media={block.media as MediaType} className="h-full w-full object-cover" />
            </div>
          ) : null}
        </div>
      </section>
    )
  }

  return (
    <section className="section-block" data-tone="muted">
      <blockquote className="container-site card-flat mx-auto max-w-3xl p-8 text-center">
        <p className="text-xl leading-relaxed md:text-2xl">&ldquo;{String(block.quote)}&rdquo;</p>
        {txt(block.attribution) ? (
          <footer className="mt-4 text-sm text-[var(--color-muted-foreground)]">
            {txt(block.attribution)}
            {txt(block.role) ? `, ${txt(block.role)}` : ''}
          </footer>
        ) : null}
      </blockquote>
    </section>
  )
}

export function FaqBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  const items =
    (block.items as { question?: string; answer?: string }[] | undefined)
      ?.map((item) => ({
        question: txt(item.question),
        answer: txt(item.answer),
      }))
      .filter((item) => item.question && item.answer) || []

  if (!items.length) return null

  const phone = txt(block.supportPhone)

  return (
    <section className="section-block faq-section">
      <div className="container-site faq-section__grid">
        <div className="faq-section__support">
          {block.supportMedia != null ? (
            <div className="faq-section__support-media">
              <MediaRenderer media={block.supportMedia as MediaType} className="h-full w-full object-cover" />
            </div>
          ) : null}
          <div className="faq-section__support-card">
            <p className="eyebrow">{locale === 'fr' ? 'Support' : 'Support'}</p>
            <h3 className="section-title mt-3 text-xl">
              {locale === 'fr' ? 'Une question sur votre projet ?' : 'Questions about your project?'}
            </h3>
            {phone ? (
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="btn btn-primary mt-6">
                {locale === 'fr' ? 'Appeler' : 'Call now'}
                <BtnArrowIcon />
              </a>
            ) : (
              <SiteLink href={localizedPath(locale, locale === 'fr' ? 'contact' : 'contact')} className="btn btn-primary mt-6">
                {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
                <BtnArrowIcon />
              </SiteLink>
            )}
          </div>
        </div>
        <div>
          {txt(block.eyebrow) ? <p className="eyebrow">{txt(block.eyebrow)}</p> : null}
          <h2 className="section-title mt-4">{txt(block.title)}</h2>
          {txt(block.description) ? <p className="lead-text mt-4">{txt(block.description)}</p> : null}
          <div className="mt-8">
            <FaqAccordion items={items} />
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContactSectionBlock({ block, locale }: { block: PageBlock; locale: Locale }) {
  return (
    <Suspense fallback={null}>
      <ContactSectionInner block={block} locale={locale} />
    </Suspense>
  )
}

async function ContactSectionInner({ block, locale }: { block: PageBlock; locale: Locale }) {
  const site = await getGlobal('site-settings', locale)
  const formType = (block.formType as 'contact' | 'quote') || 'contact'

  return (
    <section className="contact-section" id="contact">
      <div className="container-site">
        <ContactSectionContent
          locale={locale}
          site={site}
          formType={formType}
          eyebrow={txt(block.eyebrow) || undefined}
          title={txt(block.title) || undefined}
          description={txt(block.description) || undefined}
        />
      </div>
    </section>
  )
}

export function SpacerBlock({ block }: { block: PageBlock }) {
  const map = { sm: '2rem', md: '4rem', lg: '6rem' }
  const size = map[(block.size as keyof typeof map) || 'md']
  return <div aria-hidden style={{ height: size }} />
}
