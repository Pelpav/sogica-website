import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { SITE_NAME } from '@/lib/seo'

const WIDTH = 1200
const HEIGHT = 630

function clampText(value: string | null, max: number): string {
  if (!value) return ''
  return value.length > max ? `${value.slice(0, max - 1)}…` : value
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const title = clampText(searchParams.get('title'), 90) || SITE_NAME
  const subtitle = clampText(searchParams.get('subtitle'), 140)
  const locale = searchParams.get('locale') === 'en' ? 'en' : 'fr'
  const background = new URL('/brand/sogica-hero-reference-01.png', origin).toString()

  const tagline =
    locale === 'fr'
      ? 'Génie civil · Construction métallique · Mali'
      : 'Civil engineering · Metal construction · Mali'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          position: 'relative',
          backgroundColor: '#111111',
          color: '#ffffff',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(17,17,17,0.35) 0%, rgba(17,17,17,0.72) 55%, rgba(17,17,17,0.92) 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            padding: '72px 80px',
          }}
        >
          <div style={{ width: 112, height: 8, background: '#F00080' }} />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 6,
              color: '#D4AF37',
            }}
          >
            SOGICA SA
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 28, lineHeight: 1.35, maxWidth: 920, color: 'rgba(255,255,255,0.88)' }}>
              {subtitle}
            </div>
          ) : null}
          <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.82)' }}>{tagline}</div>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    },
  )
}
