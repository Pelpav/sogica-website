import { ContactForm } from '@/components/forms/ContactForm'
import { isLocale, type Locale } from '@/lib/i18n'
import { getGlobal } from '@/lib/payload'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ locale: string }> }

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const site = await getGlobal('site-settings', locale)

  return (
    <section className="section-block">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{locale === 'fr' ? 'Contact' : 'Contact'}</p>
          <h1 className="mt-2 text-4xl">{locale === 'fr' ? 'Parlons de votre projet' : 'Let\'s discuss your project'}</h1>
          {site?.address && <p className="mt-6 whitespace-pre-line text-[var(--color-muted-foreground)]">{site.address}</p>}
          <ul className="mt-6 space-y-2 text-sm">
            {site?.phones?.map((p, i) => (
              <li key={i}><a href={`tel:${p.number}`} className="hover:text-[var(--color-primary)]">{p.number}</a></li>
            ))}
            {site?.emails?.map((e, i) => (
              <li key={i}><a href={`mailto:${e.address}`} className="hover:text-[var(--color-primary)]">{e.address}</a></li>
            ))}
          </ul>
        </div>
        <ContactForm locale={locale as Locale} formType="contact" />
      </div>
    </section>
  )
}
