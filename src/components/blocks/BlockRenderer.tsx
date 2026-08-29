import type { Locale } from '@/lib/i18n'
import { Suspense, type ReactNode } from 'react'
import {
  HeroBlock,
  IntroBlock,
  RichTextBlock,
  TextMediaBlock,
  GalleryBlock,
  MasonryBlock,
  StatsBlock,
  MarqueeBlock,
  WhyChooseUsBlock,
  ExpertiseGridBlock,
  FeaturedProjectsBlock,
  ProjectGridBlock,
  ClientsBlock,
  MapBlock,
  CtaBlock,
  BeforeAfterBlock,
  TimelineBlock,
  QuoteBlock,
  FullWidthMediaBlock,
  SpacerBlock,
  FaqBlock,
  ContactSectionBlock,
} from './data-blocks'

export type PageBlock = {
  blockType: string
  hidden?: boolean | null
  id?: string | null
  [key: string]: unknown
}

function BlockDataFallback() {
  return <div className="block-skeleton page-skeleton__block" data-page-skeleton aria-hidden />
}

function withDataSuspense(node: ReactNode, key: string) {
  return (
    <Suspense key={key} fallback={<BlockDataFallback />}>
      {node}
    </Suspense>
  )
}

/** Évite CTA + contact + footer CTA en triple avant le pied de page. */
function dedupeTrailingConversionBlocks(blocks: PageBlock[]): PageBlock[] {
  const visible = blocks.filter((block) => !block.hidden)
  const contactIndex = visible.findIndex((block) => block.blockType === 'contactSection')
  if (contactIndex === -1) return visible

  return visible.filter((block, index) => {
    if (block.blockType !== 'cta') return true
    return index > contactIndex
  })
}

export async function BlockRenderer({ blocks, locale }: { blocks: PageBlock[] | null | undefined; locale: Locale }) {
  if (!blocks?.length) return null

  const visible = dedupeTrailingConversionBlocks(blocks)

  return (
    <>
      {visible.map((block, index) => {
        const key = block.id || `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} locale={locale} priority />
          case 'intro':
            return <IntroBlock key={key} block={block} locale={locale} />
          case 'richText':
            return <RichTextBlock key={key} block={block} />
          case 'textMedia':
            return <TextMediaBlock key={key} block={block} />
          case 'fullWidthImage':
          case 'fullWidthVideo':
          case 'singleMedia':
            return <FullWidthMediaBlock key={key} block={block} />
          case 'gallery':
            return <GalleryBlock key={key} block={block} />
          case 'masonry':
            return <MasonryBlock key={key} block={block} />
          case 'stats':
            return <StatsBlock key={key} block={block} />
          case 'marquee':
            return <MarqueeBlock key={key} block={block} />
          case 'whyChooseUs':
            return <WhyChooseUsBlock key={key} block={block} locale={locale} />
          case 'expertiseGrid':
            return withDataSuspense(<ExpertiseGridBlock block={block} locale={locale} />, key)
          case 'featuredProjects':
            return withDataSuspense(<FeaturedProjectsBlock block={block} locale={locale} />, key)
          case 'projectGrid':
            return withDataSuspense(<ProjectGridBlock block={block} locale={locale} />, key)
          case 'clients':
            return withDataSuspense(<ClientsBlock block={block} locale={locale} />, key)
          case 'equipment':
            return null
          case 'map':
            return withDataSuspense(<MapBlock block={block} locale={locale} />, key)
          case 'cta':
            return <CtaBlock key={key} block={block} locale={locale} />
          case 'beforeAfter':
            return <BeforeAfterBlock key={key} block={block} />
          case 'timeline':
            return <TimelineBlock key={key} block={block} locale={locale} />
          case 'quote':
            return <QuoteBlock key={key} block={block} />
          case 'faq':
            return <FaqBlock key={key} block={block} locale={locale} />
          case 'contactSection':
            return <ContactSectionBlock key={key} block={block} locale={locale} />
          case 'spacer':
            return <SpacerBlock key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}

