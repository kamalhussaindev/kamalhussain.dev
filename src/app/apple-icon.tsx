import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: '#0A0A0F',
        borderRadius: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 76,
        color: '#E24B4A',
        fontFamily: 'sans-serif',
        letterSpacing: '-0.05em',
        lineHeight: 1,
      }}
    >
      KH
    </div>,
    { ...size },
  )
}
