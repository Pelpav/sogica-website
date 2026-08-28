import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getGlobal } from '@/lib/payload'
import { isLocale, type Locale } from '@/lib/i18n'
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [theme, header, footer, site] = await Promise.all([
    getGlobal('theme-settings', locale),
    getGlobal('header', locale),
    getGlobal('footer', locale),
    getGlobal('site-settings', locale),
  ])

  return (
    <html lang={locale} className={`${barlow.variable} ${sourceSans.variable}`}>
      <body>
        <ThemeProvider theme={theme} />
        <a href="#main" className="skip-link">
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <SiteHeader locale={locale as Locale} header={header} site={site} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale as Locale} footer={footer} site={site} />
      </body>
    </html>
  )
}
