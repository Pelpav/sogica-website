import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { InstantNavigation } from '@/components/theme/InstantNavigation'
import { RouteProgressBar } from '@/components/theme/RouteProgressBar'
import { SitePreloader } from '@/components/theme/SitePreloader'
import { RefreshRouteOnSave } from '@/components/cms/RefreshRouteOnSave'
import { PageTransitionShell } from '@/components/theme/PageTransitionShell'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { MotionScrollEnhancerLazy } from '@/components/motion/MotionScrollEnhancerLazy'
import { MediaPreconnect } from '@/components/seo/MediaPreconnect'
import {
  LocaleFooterSlot,
  LocaleHeaderFallback,
  LocaleHeaderSlot,
  LocaleJsonLdSlot,
  LocaleThemeSlot,
  resolveLayoutLocale,
} from '@/components/layout/locale-layout-slots'
import { locales } from '@/lib/i18n'
import { getMetadataBase, SITE_NAME } from '@/lib/seo'
import { SITE_AUTHOR } from '@/lib/site-credits'
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  authors: [{ name: SITE_AUTHOR.name, url: SITE_AUTHOR.url }],
  creator: SITE_AUTHOR.name,
  publisher: SITE_NAME,
  icons: {
    icon: '/brand/sogica-logo.png',
    apple: '/brand/sogica-logo.png',
  },
}

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

async function LocaleLayoutShell({ children, params }: LayoutProps) {
  const locale = await resolveLayoutLocale(params)

  return (
    <html lang={locale} className={fontClasses} data-scroll-behavior="smooth">
      <head>
        <MediaPreconnect />
      </head>
      <body>
        <Suspense fallback={null}>
          <InstantNavigation />
        </Suspense>
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <SitePreloader />
        <MotionProvider>
          <MotionScrollEnhancerLazy />
        <RefreshRouteOnSave />
        <Suspense fallback={null}>
          <LocaleJsonLdSlot params={params} />
        </Suspense>
        <Suspense fallback={null}>
          <LocaleThemeSlot params={params} />
        </Suspense>
        <a href="#main" className="skip-link">
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <Suspense fallback={<LocaleHeaderFallback locale={locale} />}>
          <LocaleHeaderSlot params={params} />
        </Suspense>
        <main id="main" className="site-main">
          <PageTransitionShell>{children}</PageTransitionShell>
        </main>
        <Suspense fallback={null}>
          <LocaleFooterSlot params={params} />
        </Suspense>
        </MotionProvider>
      </body>
    </html>
  )
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={<LocaleLayoutFallback>{children}</LocaleLayoutFallback>}>
      <LocaleLayoutShell params={params}>{children}</LocaleLayoutShell>
    </Suspense>
  )
}
