import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import type { Locale } from '@/lib/i18n'
import type { Page } from '@/payload-types'

type Block = NonNullable<Page['layout']>[number]

export function CmsCustomPage({ page, locale }: { page: Page; locale: Locale }) {
  const blocks = (Array.isArray(page.layout) ? page.layout : []) as Block[]
  const isHome = page.slug === 'home'
  const startsWithHero = blocks[0]?.blockType === 'hero'
  const showPageHero = !isHome && !startsWithHero && Boolean(page.title)

  return (
    <article className="cms-page">
      {showPageHero ? (
        <header className="legal-page__hero cms-page__hero">
          <div className="container-site">
            <p className="legal-page__eyebrow">{locale === 'fr' ? 'Page' : 'Page'}</p>
            <h1 className="legal-page__title">{page.title}</h1>
            {page.seo?.description ? (
              <p className="legal-page__intro">{page.seo.description}</p>
            ) : null}
          </div>
        </header>
      ) : null}

      <BlockRenderer blocks={blocks} locale={locale} />
    </article>
  )
}
