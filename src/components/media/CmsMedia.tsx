import Image from 'next/image'
import type { Media as MediaType } from '@/payload-types'
import { getMediaAlt, getMediaUrl, isVideoMedia } from '@/lib/media-url'

export function CmsImage({
  media,
  alt,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  media: MediaType | string | number | null | undefined
  alt?: string
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}) {
  const url = getMediaUrl(media as MediaType)
  if (!url) return null

  const resolvedAlt = alt ?? getMediaAlt(media as MediaType, '')

  if (fill) {
    return (
      <Image
        src={url}
        alt={resolvedAlt}
        fill
        className={`object-cover ${className}`}
        sizes={sizes}
        priority={priority}
      />
    )
  }

  const w = typeof media === 'object' && media?.width ? media.width : 1200
  const h = typeof media === 'object' && media?.height ? media.height : 800

  return (
    <Image
      src={url}
      alt={resolvedAlt}
      width={w}
      height={h}
      className={`h-auto w-full ${className}`}
      sizes={sizes}
      priority={priority}
    />
  )
}

export function CmsVideo({
  media,
  poster,
  className = '',
}: {
  media: MediaType | string | number | null | undefined
  poster?: MediaType | string | number | null
  className?: string
}) {
  const url = getMediaUrl(media as MediaType)
  if (!url) return null
  const posterUrl = getMediaUrl(poster as MediaType)

  return (
    <video
      className={`w-full ${className}`}
      controls
      preload="metadata"
      playsInline
      poster={posterUrl || undefined}
    >
      <source src={url} type={(media as MediaType)?.mimeType || 'video/mp4'} />
    </video>
  )
}

export function MediaRenderer({
  media,
  type,
  poster,
  priority,
  className,
}: {
  media: MediaType | string | number | null | undefined
  type?: 'image' | 'video'
  poster?: MediaType | string | number | null
  priority?: boolean
  className?: string
}) {
  const resolvedType = type || (isVideoMedia(media as MediaType) ? 'video' : 'image')
  if (resolvedType === 'video') {
    return <CmsVideo media={media} poster={poster} className={className} />
  }
  return <CmsImage media={media} priority={priority} className={className} />
}
