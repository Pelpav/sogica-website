import Link from 'next/link'
import type { Footer as FooterType, SiteSetting } from '@/payload-types'
import type { Locale } from '@/lib/i18n'
import { localizedPath, routeLabels } from '@/lib/i18n'

export function SiteFooter({
  locale,
  footer,
  site,
}: {
  locale: Locale
  footer: FooterType | null
  site: SiteSetting | null
}) {
  const year = new Date().getFullYear()
  const copyright =
    footer?.copyright ||
    `© ${year} ${site?.companyName || 'SOGICA SA'}. ${locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}`

  const defaultColumns = [
    {
      title: locale === 'fr' ? 'Navigation' : 'Navigation',
      links: [
        { label: routeLabels[locale].about, url: localizedPath(locale, locale === 'fr' ? 'a-propos' : 'about') },
        { label: routeLabels[locale].expertises, url: localizedPath(locale, locale === 'fr' ? 'expertises' : 'expertise') },
        { label: routeLabels[locale].realisations, url: localizedPath(locale, locale === 'fr' ? 'realisations' : 'projects') },
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
        { label: routeLabels[locale].legal, url: localizedPath(locale, locale === 'fr' ? 'mentions-legales' : 'legal-notice') },
        { label: routeLabels[locale].privacy, url: localizedPath(locale, locale === 'fr' ? 'confidentialite' : 'privacy') },
      ],
    },
  ]

  const columns = footer?.columns?.length ? footer.columns : defaultColumns

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-secondary)] text-white">
      <div className="container-site section-block grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="text-lg font-semibold uppercase tracking-wide">{site?.companyName || 'SOGICA SA'}</p>
          {site?.companyFullName && <p className="mt-2 text-sm text-white/70">{site.companyFullName}</p>}
          {site?.address && <p className="mt-4 text-sm text-white/70 whitespace-pre-line">{site.address}</p>}
        </div>
        {columns.map((col, i) => (
          <div key={i}>
            {col.title && <p className="eyebrow text-white/50">{col.title}</p>}
            <ul className="mt-3 space-y-2">
              {col.links?.map((link, j) => (
                <li key={j}>
                  <Link href={link.url || '#'} className="text-sm text-white/80 hover:text-[var(--color-accent)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-site py-4 text-xs text-white/50">{copyright}</div>
      </div>
    </footer>
  )
}
