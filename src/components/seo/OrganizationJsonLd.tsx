import { JsonLd } from '@/components/seo/JsonLd'
import { buildOrganizationJsonLd, buildWebSiteJsonLd, getSiteUrl } from '@/lib/seo'
import { getGlobal } from '@/lib/payload'
import type { Locale } from '@/lib/i18n'

export async function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const site = await getGlobal('site-settings', locale)
  const siteUrl = getSiteUrl()

  const organization = buildOrganizationJsonLd({
    name: site?.companyName || 'SOGICA SA',
    legalName: site?.companyFullName,
    description: site?.tagline,
    url: siteUrl,
    logo: `${siteUrl}/brand/sogica-logo.png`,
    address: site?.address,
    phones: site?.phones,
    emails: site?.emails,
    foundingYear: site?.foundedYear,
  })

  const website = buildWebSiteJsonLd(siteUrl, locale)

  return <JsonLd data={[organization, website]} />
}