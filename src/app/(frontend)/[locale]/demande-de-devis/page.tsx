import type { Metadata } from 'next'
import { QuotePage, generateQuoteMetadata } from '@/components/pages/quote-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateQuoteMetadata(locale)
}

export default withPageSuspense(QuotePage)
