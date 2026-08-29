import type { Metadata } from 'next'
import { LegalPage, generateLegalMetadata } from '@/components/pages/legal-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateLegalMetadata(locale, 'privacy')
}

export default withPageSuspense(function Page(props: Props) {
  return <LegalPage {...props} variant="privacy" />
})
