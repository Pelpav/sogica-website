import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { z } from 'zod'
import { hasR2Storage } from '@/lib/env'

const schema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().positive(),
  collection: z.enum(['media', 'private-media']).default('media'),
})

export async function POST(request: Request) {
  if (!hasR2Storage()) {
    return NextResponse.json(
      { error: 'Direct upload requires R2 configuration. Use local upload in dev (USE_LOCAL_MEDIA=true).' },
      { status: 503 },
    )
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = schema.parse(await request.json())
  const maxSize = body.collection === 'private-media' ? 50 * 1024 * 1024 : 500 * 1024 * 1024
  if (body.size > maxSize) {
    return NextResponse.json({ error: 'File too large' }, { status: 400 })
  }

  const bucket =
    body.collection === 'private-media' ? process.env.R2_PRIVATE_BUCKET : process.env.R2_BUCKET

  const client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId:
        body.collection === 'private-media'
          ? process.env.R2_PRIVATE_ACCESS_KEY_ID!
          : process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey:
        body.collection === 'private-media'
          ? process.env.R2_PRIVATE_SECRET_ACCESS_KEY!
          : process.env.R2_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  })

  const key = `${body.collection}/${Date.now()}-${body.filename.replace(/[^a-zA-Z0-9._-]/g, '_')}`

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: body.contentType,
    ContentLength: body.size,
  })

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 })

  return NextResponse.json({ uploadUrl, key })
}
