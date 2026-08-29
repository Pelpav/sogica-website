import { PageHeroReveal } from '@/components/motion/PageHeroReveal'
import { RevealEach } from '@/components/motion/RevealEach'
import { SiteLink } from '@/components/ui/SiteLink'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { CmsImage } from '@/components/media/CmsMedia'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import { IconBadge, expertiseIconVariantFromSlug } from '@/components/ui/IconBadge'
import { fetchExpertises } from '@/lib/cms-queries'
import { resolveExpertiseCover } from '@/lib/cms-media'
import { getExpertiseDetailFallback, getExpertiseIndexContent } from '@/lib/expertise-content'
import { localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { requireLocale } from '@/lib/page-locale'
import type { Media as MediaType } from '@/payload-types'

type Props = { params: Promise<{ locale: string }> }

export async function generateExpertisesMetadata(locale: Locale): Promise<Metadata> {
  const content = getExpertiseIndexContent(locale)
  return buildPageMetadata({
    locale,
    title: routeLabels[locale].expertises,
    description: content.heroLead,
    pathname: localizedPath(locale, slugRoutes.expertises[locale]),
    ogImageKey: 'expertises',
  })
}

export async function ExpertisesPage({ params }: Props) {
  const locale = await requireLocale(params)
  const [{ docs }, content] = await Promise.all([
    fetchExpertises(locale),
    Promise.resolve(getExpertiseIndexContent(locale)),
  ])

  const expertiseBase = slugRoutes.expertises[locale]

  return (
    <article className="expertise-page">
      <PageHeroReveal className="legal-page__hero expertise-page__hero">
        <p className="legal-page__eyebrow">{content.heroEyebrow}</p>
        <h1 className="legal-page__title expertise-page__hero-title">{content.heroTitle}</h1>
        <div className="expertise-page__hero-copy">
          <p className="legal-page__intro">{content.heroLead}</p>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="expertise-page__text">
              {paragraph}
            </p>
          ))}
        </div>
      </PageHeroReveal>

      <section className="expertise-page__section expertise-page__poles">
        <div className="container-site">
          <RevealEach className="expertise-page__pole-list">
            {docs.map((exp, index) => {
              const cover = resolveExpertiseCover(exp)
              const fallback = exp.slug ? getExpertiseDetailFallback(locale, exp.slug) : null
              const href = localizedPath(locale, `${expertiseBase}/${exp.slug}`)
              const poleNumber = String(index + 1).padStart(2, '0')

              return (
                <article
                  key={exp.id}
                  className={`expertise-page__pole ${index % 2 === 1 ? 'expertise-page__pole--reverse' : ''}`}
                >
                  <SiteLink href={href} className="expertise-page__pole-media" tabIndex={-1} aria-hidden>
                    {cover ? (
                      <CmsImage
                        media={cover as MediaType}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="expertise-page__pole-placeholder" aria-hidden />
                    )}
                    <span className="expertise-page__pole-media-overlay" aria-hidden />
                  </SiteLink>

                  <div className="expertise-page__pole-content">
                    <div className="expertise-page__pole-head">
                      <span className="expertise-page__pole-num">{poleNumber}</span>
                      <IconBadge variant={expertiseIconVariantFromSlug(exp.slug)} />
                    </div>

                    <h3 className="expertise-page__pole-title">
                      <SiteLink href={href}>{exp.name}</SiteLink>
                    </h3>

                    {exp.shortDescription ? (
                      <p className="expertise-page__pole-desc">{exp.shortDescription}</p>
                    ) : null}

                    {fallback?.capabilities.length ? (
                      <ul className="expertise-page__pole-tags">
                        {fallback.capabilities.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}

                    <SiteLink href={href} className="link-arrow expertise-page__pole-link">
                      {content.discoverLabel}
                      <BtnArrowIcon />
                    </SiteLink>
                  </div>
                </article>
              )
            })}
          </RevealEach>
        </div>
      </section>

      <section className="expertise-page__section expertise-page__section--muted">
        <div className="container-site">
          <div className="expertise-page__section-header">
            <p className="expertise-page__eyebrow">{content.approachEyebrow}</p>
            <h2 className="expertise-page__title">{content.approachTitle}</h2>
            <p className="expertise-page__lead">{content.approachLead}</p>
          </div>

          <ol className="expertise-page__steps">
            {content.steps.map((step) => (
              <li key={step.step} className="expertise-page__step">
                <p className="expertise-page__step-num">{step.step}</p>
                <h3 className="expertise-page__step-title">{step.title}</h3>
                <p className="expertise-page__step-desc">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  )
}
