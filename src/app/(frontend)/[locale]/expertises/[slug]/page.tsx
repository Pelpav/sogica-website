import type { Metadata } from 'next'
import {
  ExpertiseDetailPage,
  generateExpertiseDetailMetadata,
} from '@/components/pages/expertise-detail-page'
import { ExpertiseDetailPageSkeleton } from '@/components/layout/skeletons/expertise-detail-skeleton'
import { isLocale } from '@/lib/i18n'
import { generateExpertiseSlugStaticParams } from '@/lib/page-static-params'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return generateExpertiseSlugStaticParams('fr')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  return generateExpertiseDetailMetadata(locale, slug)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<ExpertiseDetailPageSkeleton />}>
      <ExpertiseDetailPage {...props} />
    </PageSuspense>
  )
}
