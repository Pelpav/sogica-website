import Image from 'next/image'
import { Suspense } from 'react'
import { SiteLink } from '@/components/ui/SiteLink'
import { SiteCredit } from '@/components/layout/SiteCredit'
import { CurrentYear } from '@/components/ui/CurrentYear'
import type { Footer as FooterType, Header as HeaderType, SiteSetting } from '@/payload-types'
import type { Locale } from '@/lib/i18n'
import { localizedPath, resolveLocaleUrl, routeLabels, routePath } from '@/lib/i18n'
import { getFooterLogoUrl } from '@/lib/media-url'

export function SiteFooter({
  locale,
  footer,
  header,
  site,
}: {
  locale: Locale
  footer: FooterType | null
  header: HeaderType | null
  site: SiteSetting | null
}) {
  const rightsReserved = locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'

  const quotePath = routePath(locale, 'quote')
  const contactPath = routePath(locale, 'contact')
  const homePath = localizedPath(locale)
  const logoUrl = getFooterLogoUrl(header?.logo)

  const defaultColumns = [
    {
      title: locale === 'fr' ? 'Navigation' : 'Navigation',
      links: [
        { label: routeLabels[locale].about, url: routePath(locale, 'about') },
        { label: routeLabels[locale].expertises, url: routePath(locale, 'expertises') },
        { label: routeLabels[locale].realisations, url: routePath(locale, 'realisations') },
        { label: routeLabels[locale].contact, url: contactPath },
      ],
    },
    {
      title: locale === 'fr' ? 'Services' : 'Services',
      links: [
        { label: locale === 'fr' ? 'Génie civil' : 'Civil engineering', url: routePath(locale, 'expertises') },
        { label: locale === 'fr' ? 'Construction métallique' : 'Steel construction', url: routePath(locale, 'expertises') },
        { label: locale === 'fr' ? 'Demande de devis' : 'Request a quote', url: quotePath },
      ],
    },
    {
      title: locale === 'fr' ? 'Contact' : 'Contact',
      links: [
        ...(site?.phones?.map((p) => ({ label: p.number || '', url: `tel:${p.number}` })) || []),
        ...(site?.emails?.map((e) => ({ label: e.address || '', url: `mailto:${e.address}` })) || []),
      ],
    },
    {
      title: locale === 'fr' ? 'Légal' : 'Legal',
      links: [
        { label: routeLabels[locale].legal, url: routePath(locale, 'legal') },
        { label: routeLabels[locale].privacy, url: routePath(locale, 'privacy') },
      ],
    },
  ]

  const columns = (footer?.columns?.length ? footer.columns : defaultColumns).map((col) => ({
    ...col,
    links: col.links?.map((link) => ({
      ...link,
      url: resolveLocaleUrl(link.url ?? undefined, locale, '#'),
    })),
  }))
  const socialLinks = site?.socialLinks?.filter((s) => s.url) || []
  const footerCta = footer?.footerCta

  return (
    <footer className="site-footer">
      <div className="site-footer__cta-band">
        <div className="container-site site-footer__cta-inner">
          <div>
            <p className="site-footer__cta-title">
              {footerCta?.enabled && footerCta.title
                ? footerCta.title
                : locale === 'fr'
                  ? 'Un projet d\'infrastructure à confier ?'
                  : 'Have an infrastructure project?'}
            </p>
            <p className="site-footer__cta-desc">
              {locale === 'fr'
                ? 'Parlons de vos besoins : devis, études ou mise en œuvre.'
                : 'Let\'s discuss your needs: quote, studies or delivery.'}
            </p>
          </div>
          <SiteLink
            href={footerCta?.enabled && footerCta.url ? resolveLocaleUrl(footerCta.url, locale, quotePath) : quotePath}
            className="btn btn-white"
          >
            {locale === 'fr' ? 'Demande de devis' : 'Request a quote'}
          </SiteLink>
        </div>
      </div>

      <div className="site-footer__main section-watermark" data-watermark="SOGICA">
        <div className="container-site py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SiteLink href={homePath} className="site-footer__brand" aria-label={site?.companyName || 'SOGICA SA'}>
                <Image
                  src={logoUrl}
                  alt=""
                  width={280}
                  height={92}
                  className="site-footer__logo"
                />
              </SiteLink>
              {site?.companyFullName ? (
                <p className="mt-3 text-sm leading-relaxed text-white/75">{site.companyFullName}</p>
              ) : null}
              {site?.tagline ? (
                <p className="mt-3 text-sm leading-relaxed text-white/70">{site.tagline}</p>
              ) : null}
              {site?.address ? (
                <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-white/70">{site.address}</p>
              ) : null}
              {socialLinks.length ? (
                <nav className="site-footer__social" aria-label={locale === 'fr' ? 'Réseaux sociaux' : 'Social media'}>
                  {socialLinks.map((link, i) => (
                    <a key={i} href={link.url || '#'} target="_blank" rel="noopener noreferrer">
                      {link.platform || (locale === 'fr' ? 'Réseau' : 'Social')}
                    </a>
                  ))}
                </nav>
              ) : null}
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
              {columns.map((col, i) => (
                <nav key={i} aria-label={col.title || (locale === 'fr' ? 'Liens du pied de page' : 'Footer links')}>
                  {col.title ? (
                    <p className="text-xs font-semibold tracking-widest text-[var(--color-accent)] uppercase">{col.title}</p>
                  ) : null}
                  <ul className="mt-4 space-y-2.5">
                    {col.links?.map((link, j) => (
                      <li key={j}>
                        <SiteLink href={link.url || '#'} className="site-footer__link text-sm text-white/80 transition-colors hover:text-white">
                          {link.label}
                        </SiteLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {footer?.copyright ? (
                footer.copyright
              ) : (
                <>
                  © <Suspense fallback={<span>2026</span>}><CurrentYear /></Suspense> {site?.companyName || 'SOGICA SA'}. {rightsReserved}
                </>
              )}
            </p>
            <SiteCredit locale={locale} />
            <p>Bamako, Mali</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
