import type { Locale } from '@/lib/i18n'

export function generateStaticParamsForLocale(locale: Locale) {
  return [{ locale }]
}
