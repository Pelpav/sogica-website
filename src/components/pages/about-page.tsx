import { SiteLink } from '@/components/ui/SiteLink'
import type { Metadata } from 'next'
import { CmsImage } from '@/components/media/CmsMedia'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { IconBadge, expertiseIconVariantFromSlug } from '@/components/ui/IconBadge'
import { fetchExpertises } from '@/lib/cms-queries'
import { getCachedGalleryMediaIds, getCachedMediaById } from '@/lib/cms-media'
import { getAboutContent } from '@/lib/about-content'
import { localizedPath, slugRoutes, type Locale } from '@/lib/i18n'
import { getGlobal } from '@/lib/payload'
import { requireLocale } from '@/lib/page-locale'
import type { Media as MediaType } from '@/payload-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateAboutMetadata(locale: Locale): Promise<Metadata> {
  const site = await getGlobal('site-settings', locale)
  const content = getAboutContent(locale)
  return {
    title: locale === 'fr' ? 'À propos' : 'About',
    description: site?.tagline || content.heroLead,
  }
}

export async function AboutPage({ params }: Props) {
  const locale = await requireLocale(params)
  const [site, { docs: expertises }] = await Promise.all([
    getGlobal('site-settings', locale),
    fetchExpertises(locale, true),
  ])

  const content = getAboutContent(locale)
  const galleryIds = await getCachedGalleryMediaIds(4)
  const introMediaId = galleryIds[1] ?? galleryIds[0] ?? null
  let introMedia: MediaType | null = null

  if (introMediaId != null) {
    introMedia = (await getCachedMediaById(introMediaId)) as MediaType
  }

  const expertiseBase = slugRoutes.expertises[locale]
  const foundedYear = site?.foundedYear ? String(site.foundedYear) : '2016'

  return (
    <article className="about-page">
      <header className="legal-page__hero">
        <div className="container-site">
          <p className="legal-page__eyebrow">{content.heroEyebrow}</p>
          <h1 className="legal-page__title">{site?.companyName || content.heroTitle}</h1>
          <p className="legal-page__intro">{site?.tagline || content.heroLead}</p>
        </div>
      </header>

      <section className="about-page__intro">
        <div className="container-site about-page__intro-grid">
          <div className="about-page__intro-copy">
            <p className="about-page__eyebrow">{content.introEyebrow}</p>
            <h2 className="about-page__title">{content.introTitle}</h2>
            {content.introParagraphs.map((paragraph) => (
              <p key={paragraph} className="about-page__text">
                {paragraph}
              </p>
            ))}
            <p className="about-page__meta">
              {locale === 'fr' ? 'Fondée en' : 'Founded in'}{' '}
              <strong>{foundedYear}</strong>
            </p>
          </div>

          <div className="about-page__intro-aside">
            {introMedia ? (
              <div className="about-page__media">
                <CmsImage
                  media={introMedia}
                  alt={introMedia.alt || 'SOGICA'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            ) : null}
            <div className="about-page__stat">
              <p className="about-page__stat-value">{foundedYear}</p>
              <p className="about-page__stat-label">{content.foundedLabel}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sogica-section stats-featured stats-featured--flat" aria-label={content.stats[0].label}>
        <div className="container-site">
          <div className="stats-featured__grid">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <p className="stats-featured__value">{stat.value}</p>
                <p className="stats-featured__label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page__section">
        <div className="container-site">
          <div className="about-page__section-header">
            <p className="about-page__eyebrow">{content.expertisesEyebrow}</p>
            <h2 className="about-page__title">{content.expertisesTitle}</h2>
            <p className="about-page__lead">{content.expertisesLead}</p>
          </div>

          <div className="about-page__expertises">
            {expertises.map((exp) => (
              <SiteLink
                key={exp.id}
                href={localizedPath(locale, `${expertiseBase}/${exp.slug}`)}
                className="about-page__expertise-card"
              >
                <span className="about-page__expertise-icon" aria-hidden>
                  <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                </span>
                <div>
                  <h3 className="about-page__expertise-title">{exp.name}</h3>
                  {exp.shortDescription ? (
                    <p className="about-page__expertise-desc">{exp.shortDescription}</p>
                  ) : null}
                </div>
                <span className="about-page__expertise-arrow" aria-hidden>
                  <BtnArrowIcon />
                </span>
              </SiteLink>
            ))}
          </div>
        </div>
      </section>

      <section className="about-page__section about-page__section--muted">
        <div className="container-site">
          <div className="about-page__section-header">
            <p className="about-page__eyebrow">{content.approachEyebrow}</p>
            <h2 className="about-page__title">{content.approachTitle}</h2>
            <p className="about-page__lead">{content.approachLead}</p>
          </div>

          <ol className="about-page__steps">
            {content.steps.map((step) => (
              <li key={step.step} className="about-page__step">
                <p className="about-page__step-num">{step.step}</p>
                <h3 className="about-page__step-title">{step.title}</h3>
                <p className="about-page__step-desc">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-page__section">
        <div className="container-site about-page__values-grid">
          <div>
            <p className="about-page__eyebrow">{content.valuesEyebrow}</p>
            <h2 className="about-page__title">{content.valuesTitle}</h2>
          </div>
          <ul className="about-page__values">
            {content.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}
