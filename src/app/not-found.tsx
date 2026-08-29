import type { Metadata } from 'next'
import { defaultLocale } from '@/lib/i18n'
import { LocaleNotFoundClient } from '@/components/pages/locale-not-found-client'
import { SITE_NAME } from '@/lib/seo'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: `404 · ${SITE_NAME}`,
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="error-page-root">
        <LocaleNotFoundClient />
      </body>
    </html>
  )
}
