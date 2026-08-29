import type { Metadata } from 'next'
import { LocaleNotFoundClient } from '@/components/pages/locale-not-found-client'
import { SITE_NAME } from '@/lib/seo'

export const metadata: Metadata = {
  title: `404 · ${SITE_NAME}`,
  robots: { index: false, follow: false },
}

export default function LocaleNotFound() {
  return <LocaleNotFoundClient />
}
