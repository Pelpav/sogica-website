'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import type { Locale } from '@/lib/i18n'
import { alternateLocale, localizedPath, routeLabels } from '@/lib/i18n'
import { getMediaUrl } from '@/lib/media-url'

export function SiteHeader({
  locale,
  header,
  site,
}: {
  locale: Locale
  header: HeaderType | null
  site: SiteSetting | null
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const logoUrl = getMediaUrl(header?.logo) || '/brand/logo_transparent.png'
  const altLocale = alternateLocale(locale)

  const defaultNav = [
    { label: routeLabels[locale].about, url: localizedPath(locale, locale === 'fr' ? 'a-propos' : 'about') },
    { label: routeLabels[locale].expertises, url: localizedPath(locale, locale === 'fr' ? 'expertises' : 'expertise') },
    { label: routeLabels[locale].realisations, url: localizedPath(locale, locale === 'fr' ? 'realisations' : 'projects') },
    { label: routeLabels[locale].equipment, url: localizedPath(locale, locale === 'fr' ? 'moyens-materiels' : 'equipment') },
    { label: routeLabels[locale].clients, url: localizedPath(locale, locale === 'fr' ? 'clients-partenaires' : 'clients-partners') },
    { label: routeLabels[locale].contact, url: localizedPath(locale, 'contact') },
  ]

  const navItems = header?.navItems?.length ? header.navItems : defaultNav
  const cta = header?.cta?.label
    ? header.cta
    : {
        label: routeLabels[locale].quote,
        url: localizedPath(locale, locale === 'fr' ? 'demande-de-devis' : 'request-quote'),
      }

  const switchPath = pathname.replace(`/${locale}`, `/${altLocale}`) || localizedPath(altLocale)

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-sm"
      data-sticky={header?.sticky !== false}
    >
      <div className="container-site flex min-h-[var(--header-height)] items-center justify-between gap-4">
        <Link href={localizedPath(locale)} className="relative flex shrink-0 items-center gap-3">
          <Image src={logoUrl} alt={site?.companyName || 'SOGICA SA'} width={140} height={48} priority className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url || '#'}
              className="text-sm font-semibold uppercase tracking-wide hover:text-[var(--color-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={switchPath}
            className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)]"
            hrefLang={altLocale}
          >
            {altLocale.toUpperCase()}
          </Link>
          {cta?.label && cta.url && (
            <Link href={cta.url} className="btn btn-primary">
              {cta.label}
            </Link>
          )}
        </div>

        <button
          type="button"
          className="btn btn-outline px-3 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-[var(--color-border)] lg:hidden" aria-label="Mobile">
          <div className="container-site flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link key={item.url} href={item.url || '#'} className="py-2 text-sm font-semibold uppercase" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href={switchPath} className="py-2 text-xs uppercase text-[var(--color-muted-foreground)]">
              {altLocale.toUpperCase()}
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
