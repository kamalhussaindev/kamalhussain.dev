import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#0A0A0F',
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 15,
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
