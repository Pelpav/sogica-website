import type { Metadata } from 'next'
import { ContactPage, generateContactMetadata } from '@/components/pages/contact-page'
import { ContactPageSkeleton } from '@/components/layout/skeletons/contact-page-skeleton'
import { requireLocale } from '@/lib/page-locale'
import { PageSuspense } from '@/lib/page-suspense'
import { generateStaticParamsForAllLocales } from '@/lib/page-static-params'

type Props = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return generateStaticParamsForAllLocales()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateContactMetadata(locale)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<ContactPageSkeleton />}>
      <ContactPage {...props} />
    </PageSuspense>
  )
}
