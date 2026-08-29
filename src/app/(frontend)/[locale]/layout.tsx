import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { SiteHeader, SiteHeaderView } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { InstantNavigation } from '@/components/theme/InstantNavigation'
import { RouteProgressBar } from '@/components/theme/RouteProgressBar'
import { SitePreloader } from '@/components/theme/SitePreloader'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getGlobal } from '@/lib/payload'
import { localizedPath, isLocale, type Locale } from '@/lib/i18n'
import { Barlow_Condensed, Source_Sans_3 } from 'next/font/google'
import '@/app/globals.css'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-source',
  display: 'swap',
})

const fontClasses = `${barlow.variable} ${sourceSans.variable}`

type LayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

function LocaleLayoutFallback({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={fontClasses} data-scroll-behavior="smooth">
      <body>
        <main id="main" className="site-main">
          {children}
        </main>
      </body>
    </html>
  )
}

async function LocaleLayoutContent({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [theme, header, footer, site] = await Promise.all([
    getGlobal('theme-settings', locale),
    getGlobal('header', locale),
    getGlobal('footer', locale),
    getGlobal('site-settings', locale),
  ])

  const typedLocale = locale as Locale

  return (
    <html lang={locale} className={fontClasses} data-scroll-behavior="smooth">
      <body>
        <Suspense fallback={null}>
          <InstantNavigation />
        </Suspense>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <SitePreloader />
        <ThemeProvider theme={theme} />
        <a href="#main" className="skip-link">
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <Suspense
          fallback={
            <SiteHeaderView
              locale={typedLocale}
              header={header}
              site={site}
              pathname={localizedPath(typedLocale)}
            />
          }
        >
          <SiteHeader locale={typedLocale} header={header} site={site} />
        </Suspense>
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter locale={typedLocale} footer={footer} header={header} site={site} />
      </body>
    </html>
  )
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={<LocaleLayoutFallback>{children}</LocaleLayoutFallback>}>
      <LocaleLayoutContent params={params}>{children}</LocaleLayoutContent>
    </Suspense>
  )
}
