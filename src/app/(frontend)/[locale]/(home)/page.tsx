import {
  CmsHomeRouteContent,
  generateCmsHomeMetadata,
  type CmsHomeRouteProps,
} from '@/lib/cms-page-route'
import { HomePageSkeleton } from '@/components/layout/skeletons/home-page-skeleton'
import { PageSuspense } from '@/lib/page-suspense'

export async function generateMetadata({ params }: CmsHomeRouteProps) {
  return generateCmsHomeMetadata(params)
}

export default function HomePage(props: CmsHomeRouteProps) {
  return (
    <PageSuspense fallback={<HomePageSkeleton />}>
      <CmsHomeRouteContent {...props} />
    </PageSuspense>
  )
}
