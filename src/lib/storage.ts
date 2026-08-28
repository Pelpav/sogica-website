import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'
import { hasPrivateR2, hasR2Storage } from './env'

export function getStoragePlugins(): Plugin[] {
  if (hasR2Storage()) {
    const plugins: Plugin[] = [
      s3Storage({
        collections: {
          media: {
            disablePayloadAccessControl: true,
            generateFileURL: ({ filename, prefix }) => {
              const key = prefix ? `${prefix}/${filename}` : filename
              const base = process.env.R2_PUBLIC_URL?.replace(/\/$/, '') ?? ''
              return `${base}/${key}`
            },
          },
        },
        bucket: process.env.R2_BUCKET!,
        config: {
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
          },
          region: 'auto',
          endpoint: process.env.R2_ENDPOINT,
          forcePathStyle: true,
        },
      }),
    ]

    if (hasPrivateR2()) {
      plugins.push(
        s3Storage({
          collections: {
            'private-media': {
              prefix: 'private',
            },
          },
          bucket: process.env.R2_PRIVATE_BUCKET!,
          config: {
            credentials: {
              accessKeyId: process.env.R2_PRIVATE_ACCESS_KEY_ID!,
              secretAccessKey: process.env.R2_PRIVATE_SECRET_ACCESS_KEY!,
            },
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT,
            forcePathStyle: true,
          },
        }),
      )
    }

    return plugins
  }

  return []
}
