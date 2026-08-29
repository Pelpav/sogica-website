'use client'

import { usePathname } from 'next/navigation'
import { NotFoundPage } from '@/components/pages/not-found-page'
import { defaultLocale, isLocale } from '@/lib/i18n'

export function LocaleNotFoundClient() {
  const pathname = usePathname()
  const segment = pathname.split('/').filter(Boolean)[0]
  const locale = isLocale(segment) ? segment : defaultLocale

  return <NotFoundPage locale={locale} />
}
