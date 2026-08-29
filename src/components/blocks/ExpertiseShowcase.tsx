'use client'

import { SiteLink } from '@/components/ui/SiteLink'
import { useState } from 'react'
import { CmsImage } from '@/components/media/CmsMedia'
import { BtnArrowIcon } from '@/components/ui/BtnArrow'
import type { Media as MediaType } from '@/payload-types'

export type ExpertiseShowcaseItem = {
  id: string
  slug: string
  name: string
  shortDescription?: string | null
  cover?: MediaType | null
  href: string
}

export function ExpertiseShowcase({
  items,
  locale,
}: {
  items: ExpertiseShowcaseItem[]
  locale: 'fr' | 'en'
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const active = items.find((item) => item.id === activeId) ?? items[0]

  if (!items.length) return null

  return (
    <div className="expertise-showcase">
      <div
        className="expertise-showcase__list"
        role="tablist"
        aria-label={locale === 'fr' ? 'Expertises' : 'Expertise'}
      >
        {items.map((item) => {
          const isActive = item.id === active?.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`expertise-showcase__item ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveId(item.id)}
              aria-selected={isActive}
            >
              <span className="expertise-showcase__name">{item.name}</span>
              <span className="expertise-showcase__action" aria-hidden>
                <BtnArrowIcon />
              </span>
            </button>
          )
        })}
      </div>

      {active ? (
        <div className="expertise-showcase__panel" role="tabpanel">
          <div className="expertise-showcase__media-wrap">
            <div className="expertise-showcase__media">
              {active.cover ? (
                <CmsImage
                  media={active.cover}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <div className="expertise-showcase__media-placeholder" aria-hidden />
              )}
            </div>
            <div className="expertise-showcase__media-glow" aria-hidden />
          </div>
          <div className="expertise-showcase__content">
            <h3 className="expertise-showcase__title">{active.name}</h3>
            {active.shortDescription ? (
              <p className="expertise-showcase__desc">{active.shortDescription}</p>
            ) : null}
            <SiteLink href={active.href} className="btn btn-primary mt-6">
              {locale === 'fr' ? 'En savoir plus' : 'Learn more'}
              <BtnArrowIcon />
            </SiteLink>
          </div>
        </div>
      ) : null}
    </div>
  )
}
