import { Suspense, type ComponentType, type ReactNode } from 'react'

type PageProps = { params: Promise<Record<string, string | string[] | undefined>> }

export function withPageSuspense<P extends PageProps>(
  Page: ComponentType<P>,
  fallback: ReactNode = null,
) {
  return function PageWithSuspense(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Page {...props} />
      </Suspense>
    )
  }
}
