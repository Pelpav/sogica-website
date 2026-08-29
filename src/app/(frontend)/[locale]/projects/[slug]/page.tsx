import { fetchProjects } from '@/lib/cms-queries'

export async function generateStaticParams() {
  const { docs } = await fetchProjects('en', 100)
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ locale: 'en', slug: doc.slug! }))
}

export { generateMetadata, default } from '../../realisations/[slug]/page'
