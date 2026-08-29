import { SiteLink } from '@/components/ui/SiteLink'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { ContactForm } from '@/components/forms/ContactForm'
import { getQuotePageContent } from '@/lib/quote-content'
import { localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { requireLocale } from '@/lib/page-locale'

type Props = { params: Promise<{ locale: string }> }

export async function generateQuoteMetadata(locale: Locale): Promise<Metadata> {
  const content = getQuotePageContent(locale)
  return buildPageMetadata({
    locale,
    title: routeLabels[locale].quote,
    description: content.heroLead,
    pathname: localizedPath(locale, slugRoutes.quote[locale]),
    ogImageKey: 'quote',
  })
}

export async function QuotePage({ params }: Props) {
  const locale = await requireLocale(params)
  const content = getQuotePageContent(locale)
  const contactPath = localizedPath(locale, slugRoutes.contact[locale])

  return (
    <article className="quote-page">
      <header className="legal-page__hero quote-page__hero">
        <div className="container-site">
          <p className="legal-page__eyebrow">{content.heroEyebrow}</p>
          <h1 className="legal-page__title quote-page__hero-title">{content.heroTitle}</h1>
          <div className="quote-page__hero-copy">
            <p className="legal-page__intro">{content.heroLead}</p>
            {content.introParagraphs.map((paragraph) => (
              <p key={paragraph} className="quote-page__text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </header>

      <section className="quote-page__section">
        <div className="container-site quote-page__grid">
          <aside className="quote-page__aside">
            <h2 className="quote-page__aside-title">{content.asideTitle}</h2>
            <p className="quote-page__aside-lead">{content.tipsTitle}</p>
            <ul className="quote-page__tips">
              {content.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

            <div className="quote-page__contact-card">
              <p className="quote-page__note-title">{content.contactTitle}</p>
              <p className="quote-page__note-text">{content.contactText}</p>
              <SiteLink href={contactPath} className="link-arrow quote-page__contact-link">
                {content.contactLink}
                <BtnArrowIcon />
              </SiteLink>
            </div>
          </aside>

          <div className="quote-page__form-panel">
            <h2 className="quote-page__form-title">{content.formTitle}</h2>
            <ContactForm locale={locale} formType="quote" variant="home" />
          </div>
        </div>
      </section>
    </article>
  )
}
