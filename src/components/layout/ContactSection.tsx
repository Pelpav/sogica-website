import { SiteLink } from '@/components/ui/SiteLink'
import { ContactForm } from '@/components/forms/ContactForm'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { getContactPageContent } from '@/lib/contact-content'
import { localizedPath, slugRoutes, type Locale } from '@/lib/i18n'
import type { SiteSetting } from '@/payload-types'

export function ContactSectionContent({
  locale,
  site,
  formType = 'contact',
  eyebrow,
  title,
  description,
  showHeader = true,
  showAsideTitle = false,
}: {
  locale: Locale
  site: SiteSetting | null
  formType?: 'contact' | 'quote'
  eyebrow?: string
  title?: string
  description?: string
  showHeader?: boolean
  showAsideTitle?: boolean
}) {
  const content = getContactPageContent(locale)
  const quotePath = localizedPath(locale, slugRoutes.quote[locale])

  const formTitle =
    formType === 'quote'
      ? locale === 'fr'
        ? 'Demande de devis'
        : 'Request a quote'
      : content.formTitle

  return (
    <div className="contact-section__grid">
      <aside className="contact-section__aside">
        {showHeader && eyebrow ? <p className="contact-section__eyebrow">{eyebrow}</p> : null}
        {showHeader && title ? <h2 className="contact-section__title">{title}</h2> : null}
        {showHeader && description ? <p className="contact-section__lead">{description}</p> : null}
        {!showHeader && showAsideTitle ? (
          <h2 className="contact-section__aside-title">{content.asideTitle}</h2>
        ) : null}

        <ul className="contact-section__details">
          {site?.address ? (
            <li>
              <span className="contact-section__label">{content.addressLabel}</span>
              <p className="contact-section__value">{site.address}</p>
            </li>
          ) : null}
          {site?.phones?.map((phone, index) =>
            phone.number ? (
              <li key={index}>
                <span className="contact-section__label">{content.phoneLabel}</span>
                <a className="contact-section__value" href={`tel:${phone.number.replace(/\s/g, '')}`}>
                  {phone.number}
                </a>
              </li>
            ) : null,
          )}
          {site?.emails?.map((email, index) =>
            email.address ? (
              <li key={index}>
                <span className="contact-section__label">{content.emailLabel}</span>
                <a className="contact-section__value" href={`mailto:${email.address}`}>
                  {email.address}
                </a>
              </li>
            ) : null,
          )}
        </ul>

        <div className="contact-section__note">
          <p className="contact-section__note-title">{content.responseTitle}</p>
          <p className="contact-section__note-text">{content.responseText}</p>
        </div>

        {formType === 'contact' ? (
          <div className="contact-section__quote-card">
            <p className="contact-section__note-title">{content.quoteTitle}</p>
            <p className="contact-section__note-text">{content.quoteText}</p>
            <SiteLink href={quotePath} className="link-arrow contact-section__quote-link">
              {content.quoteLink}
              <BtnArrowIcon />
            </SiteLink>
          </div>
        ) : null}
      </aside>

      <div className="contact-section__form-panel">
        <h3 className="contact-section__form-title">{formTitle}</h3>
        <ContactForm locale={locale} formType={formType} variant="home" />
      </div>
    </div>
  )
}
