import type { Metadata } from 'next'
import { ExpertisesPage, generateExpertisesMetadata } from '@/components/pages/expertises-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateExpertisesMetadata(locale)
}

export default withPageSuspense(ExpertisesPage)
