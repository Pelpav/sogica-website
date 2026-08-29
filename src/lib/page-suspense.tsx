import { Suspense, type ComponentType, type ReactNode } from 'react'
import { PageContentSkeleton } from '@/components/layout/PageContentSkeleton'

type PageProps = { params: Promise<Record<string, string | string[] | undefined>> }

export function withPageSuspense<P extends PageProps>(
  Page: ComponentType<P>,
  fallback: ReactNode = <PageContentSkeleton />,
) {
  return function PageWithSuspense(props: P) {
    return (
      <Suspense fallback={fallback}>
        <Page {...props} />
      </Suspense>
    )
  }
}
