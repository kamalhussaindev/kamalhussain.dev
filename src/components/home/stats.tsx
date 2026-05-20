'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { end: 5, suffix: '+', label: 'Years in DevOps' },
  { end: 30, suffix: '+', label: 'Projects shipped' },
  { end: 3, suffix: '', label: 'Continents served' },
  { end: 99.97, suffix: '%', label: 'Avg uptime SLO', decimals: 2 },
] as const

export function Stats() {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.end,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate() {
            el.textContent =
              'decimals' in stat
                ? obj.val.toFixed(stat.decimals)
                : String(Math.floor(obj.val))
          },
        })
      })
    }
    init()
  }, [])

  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label}>
              <p className="text-foreground text-4xl font-bold tracking-tighter tabular-nums">
                <span
                  ref={(el) => {
                    numRefs.current[i] = el
                  }}
                >
                  0
                </span>
                {stat.suffix}
              </p>
              <p className="text-fg-muted mt-2 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
