import {
  CmsHomeRouteContent,
  generateCmsHomeMetadata,
  type CmsHomeRouteProps,
} from '@/lib/cms-page-route'
import { generateStaticParamsForAllLocales } from '@/lib/page-static-params'

export function generateStaticParams() {
  return generateStaticParamsForAllLocales()
}

export async function generateMetadata({ params }: CmsHomeRouteProps) {
  return generateCmsHomeMetadata(params)
}

export default function HomePage(props: CmsHomeRouteProps) {
  return <CmsHomeRouteContent {...props} />
}
