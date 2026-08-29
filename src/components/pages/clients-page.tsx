import { PageHeroReveal } from '@/components/motion/PageHeroReveal'
import { RevealEach } from '@/components/motion/RevealEach'
import Image from 'next/image'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'
import { LogoCarousel } from '@/components/blocks/LogoCarousel'
import {
  clientTypeOrder,
  getClientsIndexContent,
  type ClientPartnerType,
} from '@/lib/clients-content'
import { fetchClientsPartners } from '@/lib/cms-queries'
import { localizedPath, routeLabels, slugRoutes, type Locale } from '@/lib/i18n'
import { getPartnerLogoPath } from '@/lib/partner-logos'
import { getMediaUrl } from '@/lib/media-url'
import { requireLocale } from '@/lib/page-locale'
import type { ClientsPartner, Media as MediaType } from '@/payload-types'

type Props = { params: Promise<{ locale: string }> }

function resolveLogoSrc(client: ClientsPartner): string {
  const cmsSrc =
    client.logo && typeof client.logo === 'object' ? getMediaUrl(client.logo as MediaType) : ''
  return cmsSrc || getPartnerLogoPath(client.name)
}

function groupClients(docs: ClientsPartner[]) {
  const groups: Record<ClientPartnerType, ClientsPartner[]> = {
    reference: [],
    partner: [],
    client: [],
  }

  for (const doc of docs) {
    const type = (doc.type as ClientPartnerType) || 'reference'
    if (type in groups) {
      groups[type].push(doc)
    } else {
      groups.reference.push(doc)
    }
  }

  return groups
}

export async function generateClientsMetadata(locale: Locale): Promise<Metadata> {
  const content = getClientsIndexContent(locale)
  return buildPageMetadata({
    locale,
    title: routeLabels[locale].clients,
    description: content.heroLead,
    pathname: localizedPath(locale, slugRoutes.clients[locale]),
    ogImageKey: 'clients',
  })
}

export async function ClientsPage({ params }: Props) {
  const locale = await requireLocale(params)
  const content = getClientsIndexContent(locale)
  const { docs } = await fetchClientsPartners(locale, { featuredOnly: false, limit: 48 })

  const carouselItems = docs
    .map((client) => {
      const src = resolveLogoSrc(client)
      if (!src) return null
      return {
        id: String(client.id),
        name: client.name || '',
        src,
        href: client.website || null,
      }
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))

  const grouped = groupClients(docs)
  const hasGroupedItems = clientTypeOrder.some((type) => grouped[type].length > 0)

  return (
    <article className="clients-page">
      <PageHeroReveal className="legal-page__hero clients-page__hero">
        <p className="legal-page__eyebrow">{content.heroEyebrow}</p>
        <h1 className="legal-page__title clients-page__hero-title">{content.heroTitle}</h1>
        <div className="clients-page__hero-copy">
          <p className="legal-page__intro">{content.heroLead}</p>
          {content.introParagraphs.map((paragraph) => (
            <p key={paragraph} className="clients-page__text">
              {paragraph}
            </p>
          ))}
        </div>
      </PageHeroReveal>

      {carouselItems.length ? (
        <section className="clients-page__logos" aria-label={content.logosEyebrow}>
          <div className="container-site">
            <div className="clients-page__section-header">
              <p className="clients-page__eyebrow">{content.logosEyebrow}</p>
              <h2 className="clients-page__title">{content.logosTitle}</h2>
            </div>
            <LogoCarousel items={carouselItems} />
          </div>
        </section>
      ) : null}

      <section className="clients-page__section">
        <div className="container-site">
          {!hasGroupedItems ? (
            <div className="clients-page__empty">
              <h2 className="clients-page__empty-title">{content.emptyTitle}</h2>
              <p className="clients-page__empty-lead">{content.emptyLead}</p>
            </div>
          ) : (
            <div className="clients-page__groups">
              {clientTypeOrder.map((type) => {
                const items = grouped[type]
                if (!items.length) return null

                return (
                  <section key={type} className="clients-page__group">
                    <h2 className="clients-page__group-title">{content.groupLabels[type]}</h2>
                    <RevealEach as="ul" className="clients-page__grid">
                      {items.map((client) => {
                        const logoSrc = resolveLogoSrc(client)

                        return (
                          <li key={client.id} className="clients-page__card">
                            <div className="clients-page__card-logo">
                              {logoSrc ? (
                                <Image
                                  src={logoSrc}
                                  alt={client.name || ''}
                                  width={180}
                                  height={72}
                                  className="clients-page__card-img"
                                  unoptimized={logoSrc.endsWith('.svg')}
                                />
                              ) : (
                                <span className="clients-page__card-fallback" aria-hidden>
                                  {(client.name || '?').slice(0, 1)}
                                </span>
                              )}
                            </div>
                            <div className="clients-page__card-body">
                              <h3 className="clients-page__card-name">
                                {client.website ? (
                                  <a
                                    href={client.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {client.name}
                                  </a>
                                ) : (
                                  client.name
                                )}
                              </h3>
                              {client.description ? (
                                <p className="clients-page__card-desc">{client.description}</p>
                              ) : null}
                            </div>
                          </li>
                        )
                      })}
                    </RevealEach>
                  </section>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </article>
  )
}
