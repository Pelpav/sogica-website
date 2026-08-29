import type { Metadata } from 'next'
import { QuotePage, generateQuoteMetadata } from '@/components/pages/quote-page'
import { QuotePageSkeleton } from '@/components/layout/skeletons/quote-page-skeleton'
import { requireLocale } from '@/lib/page-locale'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateQuoteMetadata(locale)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<QuotePageSkeleton />}>
      <QuotePage {...props} />
    </PageSuspense>
  )
}
