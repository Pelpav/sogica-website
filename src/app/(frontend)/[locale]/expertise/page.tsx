import { generateStaticParamsForLocale } from '@/lib/page-static-params'

export function generateStaticParams() {
  return generateStaticParamsForLocale('en')
}

export { generateMetadata, default } from '../expertises/page'
