import { fetchExpertises } from '@/lib/cms-queries'

export async function generateStaticParams() {
  const { docs } = await fetchExpertises('en')
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ locale: 'en', slug: doc.slug! }))
}

export { generateMetadata, default } from '../../expertises/[slug]/page'
