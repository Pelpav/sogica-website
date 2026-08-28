import { CmsImage, CmsVideo } from '@/components/media/CmsMedia'
import type { Locale } from '@/lib/i18n'
import type { Media as MediaType } from '@/payload-types'

type NarrativeBlock = {
  blockType: string
  [key: string]: unknown
}

export function NarrativeRenderer({ blocks }: { blocks: NarrativeBlock[]; locale: Locale }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'chapterHeading':
            return (
              <section key={i} className="section-block">
                <div className="container-site max-w-3xl">
                  {block.eyebrow ? <p className="eyebrow">{String(block.eyebrow)}</p> : null}
                  <h2 className="mt-2 text-3xl">{String(block.title)}</h2>
                </div>
              </section>
            )
          case 'largeImage':
          case 'fullBleedImage':
            return (
              <section key={i} className={block.blockType === 'fullBleedImage' ? '' : 'section-block container-site'}>
                <CmsImage media={block.media as MediaType} />
              </section>
            )
          case 'narrativeVideo':
            return (
              <section key={i} className="section-block container-site">
                <CmsVideo media={block.media as MediaType} />
              </section>
            )
          case 'narrativeQuote':
            return (
              <blockquote key={i} className="container-site section-block max-w-3xl border-l-4 border-[var(--color-primary)] pl-6 text-xl italic">
                {String(block.quote)}
              </blockquote>
            )
          default:
            return null
        }
      })}
    </>
  )
}
