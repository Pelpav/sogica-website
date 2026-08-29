import type { Metadata } from 'next'
import { AboutPage, generateAboutMetadata } from '@/components/pages/about-page'
import { requireLocale } from '@/lib/page-locale'
import { withPageSuspense } from '@/lib/page-suspense'


type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await requireLocale(params)
  return generateAboutMetadata(locale)
}

export default withPageSuspense(AboutPage)
