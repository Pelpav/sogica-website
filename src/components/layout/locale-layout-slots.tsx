import { notFound } from 'next/navigation'
import { SiteHeader, SiteHeaderView } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { OrganizationJsonLd } from '@/components/seo/OrganizationJsonLd'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getGlobal } from '@/lib/payload'
import { isLocale, localizedPath, type Locale } from '@/lib/i18n'

type LocaleParams = Promise<{ locale: string }>

async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return locale
}

export async function LocaleThemeSlot({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params)
  const theme = await getGlobal('theme-settings', locale)
  return <ThemeProvider theme={theme} />
}

export async function LocaleJsonLdSlot({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params)
  return <OrganizationJsonLd locale={locale} />
}

export async function LocaleHeaderSlot({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params)
  const [header, site] = await Promise.all([
    getGlobal('header', locale),
    getGlobal('site-settings', locale),
  ])

  return <SiteHeader locale={locale} header={header} site={site} />
}

export function LocaleHeaderFallback({ locale }: { locale: Locale }) {
  return (
    <SiteHeaderView
      locale={locale}
      header={null}
      site={null}
      pathname={localizedPath(locale)}
    />
  )
}

export async function LocaleFooterSlot({ params }: { params: LocaleParams }) {
  const locale = await resolveLocale(params)
  const [footer, header, site] = await Promise.all([
    getGlobal('footer', locale),
    getGlobal('header', locale),
    getGlobal('site-settings', locale),
  ])

  return <SiteFooter locale={locale} footer={footer} header={header} site={site} />
}

export async function resolveLayoutLocale(params: LocaleParams): Promise<Locale> {
  return resolveLocale(params)
}
