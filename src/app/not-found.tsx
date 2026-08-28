import Link from 'next/link'
import { defaultLocale } from '@/lib/i18n'

export default function NotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-4xl font-semibold">404</h1>
        <p>Page introuvable / Page not found</p>
        <Link href={`/${defaultLocale}`} className="underline">
          Accueil / Home
        </Link>
      </body>
    </html>
  )
}
