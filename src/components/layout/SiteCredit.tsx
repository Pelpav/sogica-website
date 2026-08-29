import { SITE_AUTHOR } from '@/lib/site-credits'
import type { Locale } from '@/lib/i18n'

export function SiteCredit({ locale }: { locale: Locale }) {
  return (
    <span className="site-footer__credit">
      {locale === 'fr' ? 'Site réalisé par' : 'Built by'}{' '}
      <a
        href={SITE_AUTHOR.url}
        target="_blank"
        rel="noopener noreferrer author"
        className="site-footer__credit-link"
      >
        {SITE_AUTHOR.name}
      </a>
    </span>
  )
}
