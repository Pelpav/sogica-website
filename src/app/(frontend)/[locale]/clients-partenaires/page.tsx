import type { Metadata } from 'next'
import { ClientsPage, generateClientsMetadata } from '@/components/pages/clients-page'
import { ClientsPageSkeleton } from '@/components/layout/skeletons/clients-page-skeleton'
import { requireLocale } from '@/lib/page-locale'
import { PageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateClientsMetadata(locale)
}

export default function Page(props: Props) {
  return (
    <PageSuspense fallback={<ClientsPageSkeleton />}>
      <ClientsPage {...props} />
    </PageSuspense>
  )
}
