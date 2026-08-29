import React from 'react'
import type { Payload } from 'payload'
import { Link } from '@payloadcms/ui'
import SogicaOnboardingTour from './SogicaOnboardingTour'
import SogicaReplayTourButton from './SogicaReplayTourButton'
import { quickLinks } from './admin-content'

type Props = {
  user?: {
    firstName?: string | null
    email?: string
  } | null
  payload?: Payload
}

export default function SogicaWelcomePanel({ user }: Props) {
  const firstName = user?.firstName?.trim()
  const greeting = firstName ? `Bonjour ${firstName}` : 'Bonjour'

  return (
    <section className="sogica-admin-welcome">
      <SogicaOnboardingTour />

      <div className="sogica-admin-welcome__hero">
        <div>
          <p className="sogica-admin-welcome__eyebrow">Tableau de bord SOGICA</p>
          <h1 className="sogica-admin-welcome__title">{greeting}</h1>
          <p className="sogica-admin-welcome__lead">
            Gérez le contenu du site en quelques clics : textes, photos, réalisations et messages
            clients. Aucune compétence technique requise.
          </p>
        </div>
        <SogicaReplayTourButton />
      </div>

      <div className="sogica-admin-welcome__grid">
        {quickLinks.map((item) => {
          const isExternal = item.href.startsWith('/fr') || item.href.startsWith('http')
          const className = `sogica-admin-card sogica-admin-card--${item.accent || 'neutral'}`

          if (isExternal) {
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
            const href = item.href.startsWith('http') ? item.href : `${siteUrl.replace(/\/$/, '')}${item.href}`
            return (
              <a key={item.title} className={className} href={href} target="_blank" rel="noreferrer">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <span className="sogica-admin-card__cta">Ouvrir →</span>
              </a>
            )
          }

          return (
            <Link key={item.title} className={className} href={item.href}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="sogica-admin-card__cta">Ouvrir →</span>
            </Link>
          )
        })}
      </div>

      <p className="sogica-admin-welcome__hint">
        Besoin d’aide ? Contactez votre administrateur technique ou consultez les descriptions sous
        chaque section du menu.
      </p>
    </section>
  )
}
