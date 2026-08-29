import { Suspense, type ReactNode } from 'react'

type PageSuspenseProps = {
  fallback: ReactNode
  children: ReactNode
}

export function PageSuspense({ fallback, children }: PageSuspenseProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
