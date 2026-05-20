import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

interface OgProps {
  title: string
  subtitle?: string
  type?: string
}

export function buildOgImage({ title, subtitle, type }: OgProps) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 72px',
        background:
          'linear-gradient(135deg, #0A0A0F 0%, #0f0714 40%, #1a0a1e 70%, #0d0d1f 100%)',
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top bar — wordmark + glow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: '#F5F5F7',
          }}
        >
          KH
          <span style={{ color: '#FF4D2E' }}>.</span>
        </span>
        {type && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#5C5C66',
              borderLeft: '1px solid #1F1F28',
              paddingLeft: '16px',
            }}
          >
            {type}
          </span>
        )}
      </div>

      {/* Accent glow — decorative */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse 60% 50% at 80% 10%, rgba(255, 77, 46, 0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse 50% 60% at 10% 90%, rgba(124, 92, 255, 0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '900px',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: title.length > 50 ? 52 : title.length > 35 ? 60 : 72,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: '#F5F5F7',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 400,
              color: '#8E8E99',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#5C5C66',
            letterSpacing: '-0.01em',
          }}
        >
          kamalhussain.dev
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#FF4D2E',
            border: '1px solid rgba(255,77,46,0.35)',
            borderRadius: '999px',
            padding: '6px 16px',
            letterSpacing: '0.02em',
          }}
        >
          Available for new projects
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background:
            'linear-gradient(to right, #FF4D2E 0%, #7C5CFF 60%, transparent 100%)',
        }}
      />
    </div>,
    OG_SIZE,
  )
}
