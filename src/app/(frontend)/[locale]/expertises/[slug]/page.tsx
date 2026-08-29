import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {

  ExpertiseDetailPage,
  generateExpertiseDetailMetadata,
} from '@/components/pages/expertise-detail-page'
import { isLocale } from '@/lib/i18n'
import { withPageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  return generateExpertiseDetailMetadata(locale, slug)
}

export default withPageSuspense(ExpertiseDetailPage)
