import type { Metadata } from 'next'
import { ContactPage, generateContactMetadata } from '@/components/pages/contact-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateContactMetadata(locale)
}

export default withPageSuspense(ContactPage)
