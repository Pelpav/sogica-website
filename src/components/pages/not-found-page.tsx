import { SiteLink } from '@/components/ui/SiteLink'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { getNotFoundContent } from '@/lib/error-page-content'
import { localizedPath, slugRoutes, type Locale } from '@/lib/i18n'

export function NotFoundPage({ locale }: { locale: Locale }) {
  const content = getNotFoundContent(locale)
  const homePath = localizedPath(locale)
  const contactPath = localizedPath(locale, slugRoutes.contact[locale])
  const projectsPath = localizedPath(locale, slugRoutes.realisations[locale])

  return (
    <article className="error-page">
      <header className="error-page__hero">
        <div className="error-page__hero-bg" aria-hidden>
          <span className="error-page__code">404</span>
        </div>
        <div className="container-site error-page__hero-inner">
          <p className="legal-page__eyebrow">{content.eyebrow}</p>
          <h1 className="error-page__title">{content.title}</h1>
          <p className="error-page__lead">{content.lead}</p>
          <div className="error-page__actions">
            <SiteLink href={homePath} className="btn btn-primary">
              {content.homeCta}
              <BtnArrowIcon />
            </SiteLink>
            <SiteLink href={projectsPath} className="btn btn-secondary">
              {content.exploreCta}
              <BtnArrowIcon />
            </SiteLink>
            <SiteLink href={contactPath} className="link-arrow error-page__contact-link">
              {content.contactCta}
              <BtnArrowIcon />
            </SiteLink>
          </div>
        </div>
      </header>
    </article>
  )
}
