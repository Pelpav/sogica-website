import type { Metadata } from 'next'
import {
  ExpertiseDetailPage,
  generateExpertiseDetailMetadata,
} from '@/components/pages/expertise-detail-page'
import { ExpertiseDetailPageSkeleton } from '@/components/layout/skeletons/expertise-detail-skeleton'
import { fetchExpertises } from '@/lib/cms-queries'
import { isLocale } from '@/lib/i18n'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  const { docs } = await fetchExpertises('fr')
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ locale: 'fr', slug: doc.slug! }))
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
