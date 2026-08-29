import { PageHeroReveal } from '@/components/motion/PageHeroReveal'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { ContactSectionContent } from '@/components/layout/ContactSection'
import { getContactPageContent } from '@/lib/contact-content'
import { localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { getGlobal } from '@/lib/payload'
import { requireLocale } from '@/lib/page-locale'

type Props = { params: Promise<{ locale: string }> }

export async function generateContactMetadata(locale: Locale): Promise<Metadata> {
  const content = getContactPageContent(locale)
  return buildPageMetadata({
    locale,
    title: routeLabels[locale].contact,
    description: content.heroLead,
    pathname: localizedPath(locale, slugRoutes.contact[locale]),
    ogImageKey: 'contact',
  })
}

export async function ContactPage({ params }: Props) {
  const locale = await requireLocale(params)
  const [site, content] = await Promise.all([
    getGlobal('site-settings', locale),
    Promise.resolve(getContactPageContent(locale)),
  ])

  return (
    <article className="contact-page">
      <PageHeroReveal className="legal-page__hero contact-page__hero">
        <p className="legal-page__eyebrow">{content.heroEyebrow}</p>
        <h1 className="legal-page__title contact-page__hero-title">{content.heroTitle}</h1>
        <div className="contact-page__hero-copy">
          <p className="legal-page__intro">{content.heroLead}</p>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="contact-page__text">
              {paragraph}
            </p>
          ))}
        </div>
      </PageHeroReveal>

      <section className="contact-page__section contact-section">
        <div className="container-site">
          <ContactSectionContent
            locale={locale}
            site={site}
            formType="contact"
            showHeader={false}
            showAsideTitle
          />
        </div>
      </section>
    </article>
  )
}
