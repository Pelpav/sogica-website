import type { Metadata } from 'next'
import { routeLabels, type Locale } from '@/lib/i18n'
import {
  getLegalNoticeSections,
  getPrivacySections,
  hasLexicalContent,
} from '@/lib/legal-content'
import { getGlobal } from '@/lib/payload'
import { requireLocale } from '@/lib/page-locale'
import { serializeLexical } from '@/lib/serialize-lexical'

type LegalVariant = 'legal' | 'privacy'

type Props = { params: Promise<{ locale: string }> }

export async function generateLegalMetadata(locale: Locale, variant: LegalVariant): Promise<Metadata> {
  const title = variant === 'legal' ? routeLabels[locale].legal : routeLabels[locale].privacy
  return { title }
}

function LegalSections({ sections }: { sections: ReturnType<typeof getLegalNoticeSections> }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="legal-page__section">
          <h2 className="legal-page__section-title">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
    </>
  )
}

export async function LegalPage({ params, variant }: Props & { variant: LegalVariant }) {
  const locale = await requireLocale(params)
  const legal = await getGlobal('legal-settings', locale)
  const site = await getGlobal('site-settings', locale)

  const title = variant === 'legal' ? routeLabels[locale].legal : routeLabels[locale].privacy
  const richContent = variant === 'legal' ? legal?.legalNoticeContent : legal?.privacyContent
  const sections = variant === 'legal' ? getLegalNoticeSections(locale) : getPrivacySections(locale)
  const cmsHtml = hasLexicalContent(richContent) ? serializeLexical(richContent) : ''

  return (
    <article className="legal-page">
      <header className="legal-page__hero">
        <div className="container-site">
          <p className="legal-page__eyebrow">{locale === 'fr' ? 'Informations légales' : 'Legal information'}</p>
          <h1 className="legal-page__title">{title}</h1>
        </div>
      </header>

      <div className="legal-page__body">
        <div className="container-site legal-page__inner">
          {variant === 'legal' ? (
            <aside className="legal-page__meta">
              <p className="legal-page__meta-label">{locale === 'fr' ? 'Identification' : 'Company details'}</p>
              {site?.companyFullName ? <p>{site.companyFullName}</p> : null}
              {site?.address ? <p>{site.address}</p> : null}
              {site?.emails?.[0]?.address ? <p>{site.emails[0].address}</p> : null}
            </aside>
          ) : null}

          <div className="legal-page__content">
            {cmsHtml ? (
              <div dangerouslySetInnerHTML={{ __html: cmsHtml }} />
            ) : (
              <LegalSections sections={sections} />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
