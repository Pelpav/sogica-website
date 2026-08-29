'use client'

import React from 'react'

export default function SogicaReplayTourButton() {
  return (
    <button
      type="button"
      className="sogica-admin-welcome__replay"
      onClick={() => window.dispatchEvent(new Event('sogica:replay-onboarding'))}
    >
      Revoir le guide
    </button>
  )
}
