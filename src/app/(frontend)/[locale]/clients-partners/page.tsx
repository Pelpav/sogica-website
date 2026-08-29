import type { Metadata } from 'next'
import { ClientsPage, generateClientsMetadata } from '@/components/pages/clients-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateClientsMetadata(locale)
}

export default withPageSuspense(ClientsPage)
