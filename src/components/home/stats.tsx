'use client'

import { useEffect, useRef } from 'react'

type Stat = {
  prefix?: string
  end: number
  suffix: string
  label: string
  decimals?: number
}

// TODO: confirm all numbers with Kamal before publishing.
// "Clients served" omitted until owner supplies the real figure — never publish a fake digit.
const STATS: Stat[] = [
  { end: 10, suffix: '+', label: 'Projects delivered' },
  { end: 3, suffix: '+', label: 'Years of experience' },
  { end: 100, suffix: '%', label: 'On-time delivery' },
]

function fmt(stat: Stat, val: number) {
  return stat.decimals !== undefined
    ? val.toFixed(stat.decimals)
    : String(Math.floor(val))
}

export function Stats() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const numRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const i = Number((entry.target as HTMLElement).dataset.i)
          const stat = STATS[i]
          const el = numRefs.current[i]
          if (!el) return
          observer.unobserve(entry.target)
          ;(async () => {
            const { gsap } = await import('gsap')
            const obj = { val: 0 }
            gsap.fromTo(
              obj,
              { val: 0 },
              {
                val: stat.end,
                duration: 1.8,
                ease: 'power2.out',
                onStart() {
                  el.textContent = fmt(stat, 0)
                },
                onUpdate() {
                  el.textContent = fmt(stat, obj.val)
                },
              },
            )
          })()
        })
      },
      { threshold: 0.3 },
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              data-i={i}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
            >
              <p className="text-foreground text-4xl font-bold tracking-tighter tabular-nums">
                {stat.prefix}
                <span
                  ref={(el) => {
                    numRefs.current[i] = el
                  }}
                >
                  {fmt(stat, stat.end)}
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
