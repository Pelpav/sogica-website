import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { localizedPath, slugRoutes } from '@/lib/i18n'
import { requireLocale } from '@/lib/page-locale'

type Props = { params: Promise<{ locale: string }> }

async function MoyensMaterielsRedirect({ params }: Props): Promise<null> {
  const locale = await requireLocale(params)
  redirect(localizedPath(locale, slugRoutes.expertises[locale]))
  return null
}

export default function MoyensMaterielsRedirectPage(props: Props) {
  return (
    <Suspense fallback={null}>
      <MoyensMaterielsRedirect {...props} />
    </Suspense>
  )
}
