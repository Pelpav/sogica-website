import type { Metadata } from 'next'
import { LegalPage, generateLegalMetadata } from '@/components/pages/legal-page'
import { LegalPageSkeleton } from '@/components/layout/skeletons/legal-page-skeleton'
import { requireLocale } from '@/lib/page-locale'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateLegalMetadata(locale, 'privacy')
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<LegalPageSkeleton />}>
      <LegalPage {...props} variant="privacy" />
    </PageSuspense>
  )
}
