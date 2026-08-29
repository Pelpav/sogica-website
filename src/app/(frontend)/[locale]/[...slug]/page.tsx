import type { Metadata } from 'next'
import { CmsPageSkeleton } from '@/components/layout/skeletons/cms-page-skeleton'
import {
  CmsPageRouteContent,
  generateCmsRouteMetadata,
  type CmsSlugRouteProps,
} from '@/lib/cms-page-route'
import { PageSuspense } from '@/lib/page-suspense'

export async function generateMetadata({ params }: CmsSlugRouteProps): Promise<Metadata> {
  return generateCmsRouteMetadata(params)
}

export default function CmsSlugPage(props: CmsSlugRouteProps) {
  return (
    <PageSuspense fallback={<CmsPageSkeleton />}>
      <CmsPageRouteContent {...props} />
    </PageSuspense>
  )
}
