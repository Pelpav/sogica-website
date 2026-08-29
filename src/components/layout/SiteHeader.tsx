'use client'

import Image from 'next/image'
import { SiteLink } from '@/components/ui/SiteLink'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Header as HeaderType, SiteSetting } from '@/payload-types'
import type { Locale } from '@/lib/i18n'
import { localizedPath, resolveLocaleUrl, routeLabels, routePath, switchLocalePath } from '@/lib/i18n'
import { getMediaUrl } from '@/lib/media-url'
import { BRAND_LOGO_UI_PATH } from '@/lib/media-filenames'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'

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
  return <SiteHeaderView locale={locale} header={header} site={site} pathname={pathname} />
}

export function SiteHeaderView({
  locale,
  header,
  site,
  pathname,
}: {
  locale: Locale
  header: HeaderType | null
  site: SiteSetting | null
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkHero, setDarkHero] = useState(false)
  const logoUrl = getMediaUrl(header?.logo) || BRAND_LOGO_UI_PATH
  const primaryPhone = site?.phones?.[0]?.number

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDarkHero(!!document.querySelector('.hero-immersive[data-hero-overlay]'))
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const defaultNav = [
    { label: routeLabels[locale].about, url: routePath(locale, 'about') },
    { label: routeLabels[locale].expertises, url: routePath(locale, 'expertises') },
    { label: routeLabels[locale].realisations, url: routePath(locale, 'realisations') },
    { label: routeLabels[locale].clients, url: routePath(locale, 'clients') },
    { label: routeLabels[locale].contact, url: routePath(locale, 'contact') },
  ]

  const navItems = (header?.navItems?.length ? header.navItems : defaultNav).map((item) => ({
    ...item,
    url: resolveLocaleUrl(item.url ?? undefined, locale, '#'),
  }))
  const cta = header?.cta?.label
    ? { ...header.cta, url: resolveLocaleUrl(header.cta.url ?? undefined, locale, '#') }
    : {
        label: routeLabels[locale].quote,
        url: routePath(locale, 'quote'),
      }

  const frPath = switchLocalePath(pathname, 'fr')
  const enPath = switchLocalePath(pathname, 'en')
  const homePath = localizedPath(locale)
  const overlay = darkHero && !scrolled

  const isNavActive = (url?: string | null) => {
    if (!url || url === '#') return false
    const normalized = url.replace(/\/$/, '') || homePath
    const path = pathname.replace(/\/$/, '') || homePath
    if (normalized === homePath) return path === homePath
    return path === normalized || path.startsWith(`${normalized}/`)
  }

  const headerClass = [
    'site-header',
    overlay ? 'site-header--overlay' : scrolled ? 'site-header--scrolled' : 'site-header--top',
    open ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass} data-sticky={header?.sticky !== false}>
      <div className="site-header__surface">
        <div className="site-header__bar" aria-hidden />
        <div className="site-header__inner container-site">
          <SiteLink href={homePath} className="site-header__brand" aria-label={site?.companyName || 'SOGICA SA'}>
            <Image
              src={logoUrl}
              alt=""
              width={220}
              height={72}
              priority
              className="site-header__logo"
            />
          </SiteLink>

          <nav className="site-header__nav" aria-label="Main">
            {navItems.map((item) => (
              <SiteLink
                key={item.url}
                href={item.url || '#'}
                className={`site-header__nav-link ${isNavActive(item.url) ? 'is-active' : ''}`}
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <div className="site-header__toolbar">
              {primaryPhone ? (
                <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="site-header__phone">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3.2 2h2.4l1.2 2.8-1.5 1.1a7.2 7.2 0 003.4 3.4l1.1-1.5L12.2 9v2.4a1 1 0 01-1 .9 11 11 0 01-4.8-1.1 11 11 0 01-3.3-3.3A11 11 0 012.3 3a1 1 0 01.9-1z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{primaryPhone}</span>
                </a>
              ) : null}

              <div
                className="site-header__lang-switch site-header__lang--desktop"
                role="group"
                aria-label={locale === 'fr' ? 'Langue du site' : 'Site language'}
              >
                <SiteLink
                  href={frPath}
                  hrefLang="fr"
                  className={locale === 'fr' ? 'is-active' : ''}
                  aria-current={locale === 'fr' ? 'true' : undefined}
                >
                  FR
                </SiteLink>
                <span className="site-header__lang-divider" aria-hidden />
                <SiteLink
                  href={enPath}
                  hrefLang="en"
                  className={locale === 'en' ? 'is-active' : ''}
                  aria-current={locale === 'en' ? 'true' : undefined}
                >
                  EN
                </SiteLink>
              </div>
            </div>

            {cta?.label && cta.url ? (
              <SiteLink href={cta.url} className="btn btn-primary btn-sm site-header__cta">
                <span>{cta.label}</span>
                <BtnArrowIcon />
              </SiteLink>
            ) : null}

            <button
              type="button"
              className="site-header__menu-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? (locale === 'fr' ? 'Fermer le menu' : 'Close menu') : locale === 'fr' ? 'Ouvrir le menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
            >
              <span className="site-header__menu-icon" aria-hidden>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className={`site-header__mobile ${open ? 'is-open' : ''}`} id="mobile-nav" aria-hidden={!open}>
        <div className="site-header__mobile-backdrop" onClick={() => setOpen(false)} aria-hidden />
        <nav className="site-header__mobile-panel" aria-label="Mobile">
          <div className="site-header__mobile-head">
            <span className="site-header__mobile-label">{locale === 'fr' ? 'Menu' : 'Menu'}</span>
            <button
              type="button"
              className="site-header__mobile-close"
              onClick={() => setOpen(false)}
              aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div className="site-header__mobile-links">
            {navItems.map((item, index) => (
              <SiteLink
                key={item.url}
                href={item.url || '#'}
                className={`site-header__mobile-link ${isNavActive(item.url) ? 'is-active' : ''}`}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <span className="site-header__mobile-index">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
              </SiteLink>
            ))}
          </div>

          <div className="site-header__mobile-footer">
            {primaryPhone ? (
              <a href={`tel:${primaryPhone.replace(/\s/g, '')}`} className="site-header__mobile-phone">
                {primaryPhone}
              </a>
            ) : null}
            <div className="site-header__mobile-actions">
              <div
                className="site-header__lang-switch site-header__lang--mobile"
                role="group"
                aria-label={locale === 'fr' ? 'Langue du site' : 'Site language'}
              >
                <SiteLink
                  href={frPath}
                  hrefLang="fr"
                  className={locale === 'fr' ? 'is-active' : ''}
                  aria-current={locale === 'fr' ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  FR
                </SiteLink>
                <span className="site-header__lang-divider" aria-hidden />
                <SiteLink
                  href={enPath}
                  hrefLang="en"
                  className={locale === 'en' ? 'is-active' : ''}
                  aria-current={locale === 'en' ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  EN
                </SiteLink>
              </div>
              {cta?.label && cta.url ? (
                <SiteLink href={cta.url} className="btn btn-primary site-header__cta" onClick={() => setOpen(false)}>
                  <span>{cta.label}</span>
                  <BtnArrowIcon />
                </SiteLink>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
