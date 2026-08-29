import { generateExpertiseSlugStaticParams } from '@/lib/page-static-params'

export async function generateStaticParams() {
  return generateExpertiseSlugStaticParams('en')
}

export { generateMetadata, default } from '../../expertises/[slug]/page'
