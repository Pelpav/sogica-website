import {
  CmsHomeRouteContent,
  generateCmsHomeMetadata,
  type CmsHomeRouteProps,
} from '@/lib/cms-page-route'
import { HomePageSkeleton } from '@/components/layout/skeletons/home-page-skeleton'
import { generateStaticParamsForAllLocales } from '@/lib/page-static-params'
import { PageSuspense } from '@/lib/page-suspense'

export function generateStaticParams() {
  return generateStaticParamsForAllLocales()
}

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
