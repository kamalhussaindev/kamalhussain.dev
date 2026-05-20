'use client'

import { useReducedMotion } from 'framer-motion'

const SVG_NOISE =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export function Grain() {
  const prefersReduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-[-200%] z-[9997] h-[400%] w-[400%]"
      style={{
        backgroundImage: `url("${SVG_NOISE}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
        opacity: 0.032,
        mixBlendMode: 'overlay',
        animation: prefersReduced ? 'none' : 'grain 0.4s steps(1) infinite',
      }}
    />
  )
}
