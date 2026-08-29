'use client'

import React from 'react'

export default function SogicaViewSiteLink() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return (
    <a
      className="sogica-admin-view-site"
      href={`${siteUrl.replace(/\/$/, '')}/fr`}
      target="_blank"
      rel="noreferrer"
    >
      Voir le site
    </a>
  )
}
