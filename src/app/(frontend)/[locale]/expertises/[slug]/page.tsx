import { notFound } from 'next/navigation'
import { CmsImage } from '@/components/media/CmsMedia'
import { getPayloadClient } from '@/lib/payload'
import { isLocale, type Locale } from '@/lib/i18n'
import type { Media as MediaType } from '@/payload-types'

type Props = { params: Promise<{ locale: string; slug: string }> }

export default async function ExpertiseDetailPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'expertises',
    locale: locale as Locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })
  const expertise = result.docs[0]
  if (!expertise) notFound()

  return (
    <>
      <section className="section-block">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">{locale === 'fr' ? 'Expertise' : 'Expertise'}</p>
          <h1 className="mt-2 text-4xl">{expertise.name}</h1>
          {expertise.shortDescription && (
            <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">{expertise.shortDescription}</p>
          )}
        </div>
      </section>
      {expertise.gallery?.length ? (
        <section className="section-block" data-bg="muted">
          <div className="container-site grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.gallery.map((item, i) =>
              item.media && typeof item.media === 'object' ? (
                <div key={i} className="media-frame">
                  <CmsImage media={item.media as MediaType} alt="" />
                </div>
              ) : null,
            )}
          </div>
        </section>
      ) : null}
    </>
  )
}
