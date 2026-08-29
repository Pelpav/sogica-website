import type { Metadata } from 'next'
import { ExpertisesPage, generateExpertisesMetadata } from '@/components/pages/expertises-page'
import { ExpertisesPageSkeleton } from '@/components/layout/skeletons/expertises-page-skeleton'
import { requireLocale } from '@/lib/page-locale'
import { PageSuspense } from '@/lib/page-suspense'
import { generateStaticParamsForLocale } from '@/lib/page-static-params'

type Props = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return generateStaticParamsForLocale('fr')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateExpertisesMetadata(locale)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<ExpertisesPageSkeleton />}>
      <ExpertisesPage {...props} />
    </PageSuspense>
  )
}
