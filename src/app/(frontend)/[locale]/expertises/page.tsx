import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CmsImage } from '@/components/media/CmsMedia'
import { fetchExpertises } from '@/lib/cms-queries'
import { isLocale, localizedPath, type Locale } from '@/lib/i18n'
import type { Media as MediaType } from '@/payload-types'

type Props = { params: Promise<{ locale: string }> }

export default async function ExpertisesIndexPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const { docs } = await fetchExpertises(locale as Locale)
  const base = locale === 'fr' ? 'expertises' : 'expertise'

  return (
    <section className="section-block">
      <div className="container-site">
        <p className="eyebrow">{locale === 'fr' ? 'Expertises' : 'Expertise'}</p>
        <h1 className="mt-2 text-4xl">{locale === 'fr' ? 'Domaines d\'intervention' : 'Areas of expertise'}</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {docs.map((exp) => (
            <Link
              key={exp.id}
              href={localizedPath(locale as Locale, `${base}/${exp.slug}`)}
              className="border border-[var(--color-border)]"
            >
              {exp.cover && typeof exp.cover === 'object' && (
                <CmsImage media={exp.cover as MediaType} className="aspect-[16/10] object-cover" />
              )}
              <div className="p-6">
                <h2 className="text-xl">{exp.name}</h2>
                <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{exp.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
