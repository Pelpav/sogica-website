function getMediaOrigin(url: string | undefined): string | null {
  if (!url) return null

  try {
    return new URL(url).origin
  } catch {
    return null
  }
}

/** Preconnect vers l'origine R2 pour accélérer le LCP des images CMS. */
export function MediaPreconnect() {
  const origin = getMediaOrigin(process.env.R2_PUBLIC_URL)
  if (!origin) return null

  return (
    <>
      <link rel="dns-prefetch" href={origin} />
      <link rel="preconnect" href={origin} crossOrigin="" />
    </>
  )
}
