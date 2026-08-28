'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/i18n'

export function ContactForm({ locale, formType = 'contact' }: { locale: Locale; formType?: 'contact' | 'quote' }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    const body = Object.fromEntries(data.entries())

    try {
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, formType, locale }),
      })
      if (!res.ok) throw new Error(await res.text())
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  if (status === 'success') {
    return (
      <p className="rounded border border-green-600 bg-green-50 p-4 text-green-900" role="status">
        {locale === 'fr' ? 'Message envoyé. Nous vous recontacterons.' : 'Message sent. We will get back to you.'}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="formStartedAt" value={String(Date.now())} />

      <label className="grid gap-1">
        <span>{locale === 'fr' ? 'Nom' : 'Name'} *</span>
        <input name="name" required className="min-h-11 border border-[var(--color-border)] px-3" />
      </label>

      <label className="grid gap-1">
        <span>E-mail *</span>
        <input name="email" type="email" required className="min-h-11 border border-[var(--color-border)] px-3" />
      </label>

      <label className="grid gap-1">
        <span>{locale === 'fr' ? 'Téléphone' : 'Phone'}</span>
        <input name="phone" type="tel" className="min-h-11 border border-[var(--color-border)] px-3" />
      </label>

      {formType === 'quote' && (
        <>
          <label className="grid gap-1">
            <span>{locale === 'fr' ? 'Organisation' : 'Organization'}</span>
            <input name="organization" className="min-h-11 border border-[var(--color-border)] px-3" />
          </label>
          <label className="grid gap-1">
            <span>{locale === 'fr' ? 'Lieu du projet' : 'Project location'}</span>
            <input name="projectLocation" className="min-h-11 border border-[var(--color-border)] px-3" />
          </label>
          <label className="grid gap-1">
            <span>{locale === 'fr' ? 'Description' : 'Description'} *</span>
            <textarea name="description" required rows={5} className="border border-[var(--color-border)] px-3 py-2" />
          </label>
        </>
      )}

      {formType === 'contact' && (
        <>
          <label className="grid gap-1">
            <span>{locale === 'fr' ? 'Sujet' : 'Subject'}</span>
            <input name="subject" className="min-h-11 border border-[var(--color-border)] px-3" />
          </label>
          <label className="grid gap-1">
            <span>{locale === 'fr' ? 'Message' : 'Message'} *</span>
            <textarea name="message" required rows={5} className="border border-[var(--color-border)] px-3 py-2" />
          </label>
        </>
      )}

      <label className="flex items-start gap-2 text-sm">
        <input name="consent" type="checkbox" required value="true" className="mt-1" />
        <span>
          {locale === 'fr'
            ? 'J\'accepte que mes données soient utilisées pour répondre à ma demande.'
            : 'I agree that my data may be used to respond to my request.'}
        </span>
      </label>

      {error && <p className="text-[var(--color-destructive)]" role="alert">{error}</p>}

      <button type="submit" className="btn btn-primary w-fit" disabled={status === 'loading'}>
        {status === 'loading'
          ? locale === 'fr' ? 'Envoi…' : 'Sending…'
          : locale === 'fr' ? 'Envoyer' : 'Send'}
      </button>
    </form>
  )
}
