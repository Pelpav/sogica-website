import type { Locale } from '@/lib/i18n'
import {
  HeroBlock,
  IntroBlock,
  RichTextBlock,
  TextMediaBlock,
  GalleryBlock,
  MasonryBlock,
  StatsBlock,
  ExpertiseGridBlock,
  FeaturedProjectsBlock,
  ProjectGridBlock,
  ClientsBlock,
  EquipmentBlock,
  MapBlock,
  CtaBlock,
  BeforeAfterBlock,
  TimelineBlock,
  QuoteBlock,
  FullWidthMediaBlock,
  SpacerBlock,
} from './data-blocks'

export type PageBlock = {
  blockType: string
  hidden?: boolean | null
  id?: string | null
  [key: string]: unknown
}

export async function BlockRenderer({ blocks, locale }: { blocks: PageBlock[] | null | undefined; locale: Locale }) {
  if (!blocks?.length) return null

  const visible = blocks.filter((b) => !b.hidden)

  return (
    <>
      {visible.map((block, index) => {
        const key = block.id || `${block.blockType}-${index}`

        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block} locale={locale} priority={index === 0} />
          case 'intro':
            return <IntroBlock key={key} block={block} />
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
          case 'expertiseGrid':
            return <ExpertiseGridBlock key={key} block={block} locale={locale} />
          case 'featuredProjects':
            return <FeaturedProjectsBlock key={key} block={block} locale={locale} />
          case 'projectGrid':
            return <ProjectGridBlock key={key} block={block} locale={locale} />
          case 'clients':
            return <ClientsBlock key={key} block={block} locale={locale} />
          case 'equipment':
            return <EquipmentBlock key={key} block={block} locale={locale} />
          case 'map':
            return <MapBlock key={key} block={block} locale={locale} />
          case 'cta':
            return <CtaBlock key={key} block={block} />
          case 'beforeAfter':
            return <BeforeAfterBlock key={key} block={block} />
          case 'timeline':
            return <TimelineBlock key={key} block={block} />
          case 'quote':
            return <QuoteBlock key={key} block={block} />
          case 'spacer':
            return <SpacerBlock key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}

