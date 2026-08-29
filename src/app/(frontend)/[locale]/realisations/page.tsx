import type { Metadata } from 'next'
import {

  RealisationsPage,
  generateRealisationsMetadata,
} from '@/components/pages/realisations-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateRealisationsMetadata(locale)
}

export default withPageSuspense(RealisationsPage)
