import { generateProjectSlugStaticParams } from '@/lib/page-static-params'

export async function generateStaticParams() {
  return generateProjectSlugStaticParams('en')
}

export { generateMetadata, default } from '../../realisations/[slug]/page'
