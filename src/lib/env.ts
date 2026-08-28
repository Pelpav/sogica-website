import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(['fr', 'en']).default('fr'),
  DATABASE_URL: z.string().min(1).optional(),
  PAYLOAD_SECRET: z.string().min(16).optional(),
  PREVIEW_SECRET: z.string().optional(),
  R2_BUCKET: z.string().optional(),
  R2_ACCESS_KEY_ID: z.string().optional(),
  R2_SECRET_ACCESS_KEY: z.string().optional(),
  R2_ENDPOINT: z.string().optional(),
  R2_PUBLIC_URL: z.string().optional(),
  R2_PRIVATE_BUCKET: z.string().optional(),
  USE_LOCAL_MEDIA: z
    .string()
    .optional()
    .transform((v) => v === 'true' || v === '1'),
  MAP_STYLE_URL: z.string().optional(),
  SMTP_HOST: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

let cached: Env | null = null

export function getEnv(): Env {
  if (!cached) {
    cached = envSchema.parse(process.env)
  }
  return cached
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.length > 5)
}

export function hasR2Storage(): boolean {
  const env = getEnv()
  return Boolean(
    !env.USE_LOCAL_MEDIA &&
      env.R2_BUCKET &&
      env.R2_ACCESS_KEY_ID &&
      env.R2_SECRET_ACCESS_KEY &&
      env.R2_ENDPOINT,
  )
}

export function hasPrivateR2(): boolean {
  return Boolean(process.env.R2_PRIVATE_BUCKET && process.env.R2_PRIVATE_ACCESS_KEY_ID)
}
