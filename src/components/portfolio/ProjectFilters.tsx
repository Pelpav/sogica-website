'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Project } from '@/payload-types'
import type { Locale } from '@/lib/i18n'

export function ProjectFilters({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort((a, b) => (b as number) - (a as number))
  const countries = [...new Set(projects.map((p) => p.country).filter(Boolean))]

  if (!years.length && !countries.length) return null

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`?${params.toString()}`)
  }

  return (
    <form className="mt-8 flex flex-wrap gap-4" aria-label={locale === 'fr' ? 'Filtres' : 'Filters'}>
      {years.length > 0 && (
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wide">
          {locale === 'fr' ? 'Année' : 'Year'}
          <select
            className="min-h-11 border border-[var(--color-border)] bg-white px-3 text-sm normal-case"
            defaultValue={searchParams.get('year') || ''}
            onChange={(e) => update('year', e.target.value)}
          >
            <option value="">{locale === 'fr' ? 'Toutes' : 'All'}</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>
        </label>
      )}
      {countries.length > 0 && (
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wide">
          {locale === 'fr' ? 'Pays' : 'Country'}
          <select
            className="min-h-11 border border-[var(--color-border)] bg-white px-3 text-sm normal-case"
            defaultValue={searchParams.get('country') || ''}
            onChange={(e) => update('country', e.target.value)}
          >
            <option value="">{locale === 'fr' ? 'Tous' : 'All'}</option>
            {countries.map((c) => (
              <option key={c} value={c!}>{c}</option>
            ))}
          </select>
        </label>
      )}
      <button
        type="button"
        className="btn btn-outline self-end"
        onClick={() => router.push('?')}
      >
        {locale === 'fr' ? 'Réinitialiser' : 'Reset'}
      </button>
    </form>
  )
}
