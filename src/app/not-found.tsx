import { defaultLocale } from '@/lib/i18n'
import { LocaleNotFoundClient } from '@/components/pages/locale-not-found-client'
import '@/app/globals.css'

export default function NotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="error-page-root">
        <LocaleNotFoundClient />
      </body>
    </html>
  )
}
