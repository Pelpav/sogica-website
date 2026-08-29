import Link from 'next/link'
import type { ComponentProps } from 'react'

type SiteLinkProps = ComponentProps<typeof Link>

export function SiteLink({ prefetch = true, ...props }: SiteLinkProps) {
  return <Link prefetch={prefetch} {...props} />
}
