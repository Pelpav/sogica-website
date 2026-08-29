import type { Metadata } from 'next'
import {
  ProjectDetailPage,
  generateProjectDetailMetadata,
} from '@/components/pages/project-detail-page'
import { ProjectDetailPageSkeleton } from '@/components/layout/skeletons/project-detail-skeleton'
import { isLocale } from '@/lib/i18n'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  return generateProjectDetailMetadata(locale, slug)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<ProjectDetailPageSkeleton />}>
      <ProjectDetailPage {...props} />
    </PageSuspense>
  )
}
