'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Project } from '@/payload-types'
import type { Locale } from '@/lib/i18n'

type FilterLabels = {
  filters: string
  year: string
  country: string
  all: string
  reset: string
}

const defaultLabels: Record<Locale, FilterLabels> = {
  fr: {
    filters: 'Filtrer les réalisations',
    year: 'Année',
    country: 'Pays',
    all: 'Tous',
    reset: 'Réinitialiser',
  },
  en: {
    filters: 'Filter projects',
    year: 'Year',
    country: 'Country',
    all: 'All',
    reset: 'Reset',
  },
}

export function ProjectFilters({
  locale,
  projects,
  labels,
}: {
  locale: Locale
  projects: Project[]
  labels?: FilterLabels
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const copy = labels ?? defaultLabels[locale]

  const years = [...new Set(projects.map((p) => p.year).filter(Boolean))].sort(
    (a, b) => (b as number) - (a as number),
  )
  const countries = [...new Set(projects.map((p) => p.country).filter(Boolean))]

  if (!years.length && !countries.length) return null

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`?${params.toString()}`)
  }

  return (
    <form className="realisations-page__filters" aria-label={copy.filters}>
      {years.length > 0 && (
        <label className="realisations-page__filter">
          <span className="realisations-page__filter-label">{copy.year}</span>
          <select
            className="realisations-page__filter-select"
            defaultValue={searchParams.get('year') || ''}
            onChange={(e) => update('year', e.target.value)}
          >
            <option value="">{copy.all}</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </label>
      )}
      {countries.length > 0 && (
        <label className="realisations-page__filter">
          <span className="realisations-page__filter-label">{copy.country}</span>
          <select
            className="realisations-page__filter-select"
            defaultValue={searchParams.get('country') || ''}
            onChange={(e) => update('country', e.target.value)}
          >
            <option value="">{copy.all}</option>
            {countries.map((country) => (
              <option key={country} value={country!}>
                {country}
              </option>
            ))}
          </select>
        </label>
      )}
      <button
        type="button"
        className="btn btn-outline realisations-page__filter-reset"
        onClick={() => router.push('?')}
      >
        {copy.reset}
      </button>
    </form>
  )
}
