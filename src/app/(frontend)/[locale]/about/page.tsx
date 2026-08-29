import type { Metadata } from 'next'
import { AboutPage, generateAboutMetadata } from '@/components/pages/about-page'
import { AboutPageSkeleton } from '@/components/layout/skeletons/about-page-skeleton'
import { requireLocale } from '@/lib/page-locale'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateAboutMetadata(locale)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<AboutPageSkeleton />}>
      <AboutPage {...props} />
    </PageSuspense>
  )
}
