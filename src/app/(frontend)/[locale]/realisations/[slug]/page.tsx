import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {

  ProjectDetailPage,
  generateProjectDetailMetadata,
} from '@/components/pages/project-detail-page'
import { isLocale } from '@/lib/i18n'
import { withPageSuspense } from '@/lib/page-suspense'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  return generateProjectDetailMetadata(locale, slug)
}

export default withPageSuspense(ProjectDetailPage)
