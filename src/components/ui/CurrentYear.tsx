'use client'

import { useEffect, useState } from 'react'

const FALLBACK_YEAR = '2026'

export function CurrentYear() {
  const [year, setYear] = useState(FALLBACK_YEAR)

  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

  return <span suppressHydrationWarning>{year}</span>
}
