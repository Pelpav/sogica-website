import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { DeferredLayoutClient } from '@/components/layout/DeferredLayoutClient'
import { PageTransitionShell } from '@/components/theme/PageTransitionShell'
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

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const locale = await resolveLayoutLocale(params)

  return (
    <html lang={locale} className={fontClasses} data-scroll-behavior="smooth">
      <head>
        <MediaPreconnect />
      </head>
      <body>
        <DeferredLayoutClient>
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
        </DeferredLayoutClient>
      </body>
    </html>
  )
}
