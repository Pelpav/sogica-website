import { ContactForm } from '@/components/forms/ContactForm'
import { isLocale, type Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ locale: string }> }

export default async function QuotePage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <section className="section-block">
      <div className="container-site max-w-2xl">
        <p className="eyebrow">{locale === 'fr' ? 'Devis' : 'Quote'}</p>
        <h1 className="mt-2 text-4xl">{locale === 'fr' ? 'Demande de devis' : 'Request a quote'}</h1>
        <p className="mt-4 text-[var(--color-muted-foreground)]">
          {locale === 'fr'
            ? 'Décrivez votre besoin. Notre équipe vous recontactera.'
            : 'Describe your requirements. Our team will get back to you.'}
        </p>
        <div className="mt-8">
          <ContactForm locale={locale as Locale} formType="quote" />
        </div>
      </div>
    </section>
  )
}
