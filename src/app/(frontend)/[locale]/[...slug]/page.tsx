import type { Metadata } from 'next'
import { CmsPageSkeleton } from '@/components/layout/skeletons/cms-page-skeleton'
import {
  CmsPageRouteContent,
  generateCmsRouteMetadata,
  type CmsSlugRouteProps,
} from '@/lib/cms-page-route'
import { PageSuspense } from '@/lib/page-suspense'

// Pas de generateStaticParams ici tant qu'il n'existe pas de page CMS « custom »
// hors routes dédiées (about, contact, etc.). Utiliser generateCmsSlugStaticParams()
// dès qu'une telle page est ajoutée dans Payload.

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
