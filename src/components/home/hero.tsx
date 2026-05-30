'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/magnetic-button'

const HeroScene = dynamic(() => import('./hero-scene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => null,
})

export function Hero() {
  const tagRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { default: SplitType } = await import('split-type')
      if (!headlineRef.current || !subRef.current || !ctaRef.current || !tagRef.current)
        return

      const split = new SplitType(headlineRef.current, { types: 'lines' })
      if (!split.lines?.length) return

      gsap.set([tagRef.current, subRef.current, ctaRef.current], { opacity: 0, y: 14 })
      gsap.set(split.lines, { yPercent: 110 })

      gsap
        .timeline({ delay: 0.1 })
        .to(tagRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' })
        .to(
          split.lines,
          { yPercent: 0, duration: 0.95, stagger: 0.1, ease: 'expo.out' },
          '-=0.25',
        )
        .to(
          subRef.current,
          { opacity: 1, y: 0, duration: 0.65, ease: 'expo.out' },
          '-=0.5',
        )
        .to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' },
          '-=0.35',
        )
    }
    init()
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* R3F scene */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <HeroScene />
      </div>

      {/* Accent glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 65% 50%, oklch(0.63 0.24 24 / 0.05) 0%, transparent 65%)',
        }}
      />

      {/* Bottom fade to background */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-52"
        aria-hidden
        style={{
          background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-36 pb-24 sm:px-6 lg:px-8">
        <p
          ref={tagRef}
          className="text-accent-primary mb-6 font-mono text-xs font-medium tracking-[0.2em] uppercase"
        >
          Available for new projects · Rawalpindi, Pakistan
        </p>

        <div className="overflow-hidden">
          <h1
            ref={headlineRef}
            className="text-hero text-foreground font-bold tracking-[-0.025em]"
          >
            Hi, I&apos;m Kamal Hussain.
          </h1>
        </div>

        <p ref={subRef} className="text-fg-muted mt-8 max-w-2xl text-lg leading-relaxed">
          I&apos;m a freelance DevOps &amp; cloud engineer. I help startups and
          engineering teams ship faster, cut their cloud bill, and stop firefighting their
          infrastructure — so they can focus on building product, not putting out fires.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-3">
          <MagneticButton>
            <Link
              href="/book"
              className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-all"
            >
              Book a 30-min call
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="/work"
              className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium transition-colors"
            >
              See case studies <ArrowRight size={14} aria-hidden />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
