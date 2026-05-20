import { ExternalLink } from 'lucide-react'
import { AUTHOR } from '@/lib/constants'

// [CONFIRM WITH KAMAL] — verify all four numbers before launch
const NXTAURIC_STATS = [
  { value: '6', label: 'Team members' },
  { value: '8', label: 'Services offered' },
  { value: '30+', label: 'Projects shipped' },
  { value: '3', label: 'Continents served' },
]

export function NxtAuricStrip() {
  return (
    <section className="border-border border-t">
      {/* Dark full-bleed band */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.09 0.008 290) 0%, oklch(0.12 0.015 280) 50%, oklch(0.10 0.012 300) 100%)',
        }}
      >
        {/* Accent glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 90% 50%, oklch(0.63 0.24 24 / 0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <p className="text-fg-subtle mb-14 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            nxtauric · the agency i co-founded
          </p>

          {/* PLACEHOLDER — replace with real NxtAuric brand image when available */}
          <div
            className="border-border/30 relative mb-14 h-48 overflow-hidden rounded-xl border"
            aria-hidden
            style={{
              background:
                'linear-gradient(135deg, oklch(0.11 0.02 280) 0%, oklch(0.15 0.05 270) 45%, oklch(0.10 0.015 300) 100%)',
            }}
          >
            {/* Violet glow left */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 55% 90% at 15% 50%, oklch(0.55 0.22 280 / 0.18) 0%, transparent 70%)',
              }}
            />
            {/* Red glow right */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 40% 80% at 85% 50%, oklch(0.63 0.24 24 / 0.10) 0%, transparent 70%)',
              }}
            />
            {/* Grain texture */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="nxtauric-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#nxtauric-noise)" />
            </svg>
            {/* Watermark */}
            <span className="absolute right-6 bottom-4 font-mono text-sm font-bold tracking-[-0.02em] text-white/8 select-none">
              NxtAuric.
            </span>
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
            {/* Left — wordmark + CTA */}
            <div className="flex flex-col gap-5">
              <div>
                <p
                  className="text-foreground text-4xl leading-none font-bold tracking-[-0.035em]"
                  aria-label="NxtAuric"
                >
                  NxtAuric
                  <span className="text-accent-primary">.</span>
                </p>
                <p className="text-fg-muted mt-3 text-base leading-relaxed">
                  Engineering · Design · Infrastructure
                </p>
              </div>
              <a
                href={AUTHOR.agency}
                target="_blank"
                rel="noopener noreferrer"
                className="border-accent-primary/40 text-accent-primary hover:bg-accent-primary/10 inline-flex items-center gap-2 self-start rounded-md border px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Visit NxtAuric
                <ExternalLink size={13} aria-hidden />
              </a>
            </div>

            {/* Middle — context */}
            <div className="flex flex-col justify-start">
              <p className="text-fg-muted text-lg leading-relaxed">
                When a project needs more than one person — a full team of engineers,
                designers, and infrastructure specialists working under one roof —
                that&apos;s NxtAuric. Engagements longer than six weeks, multi-discipline
                product builds, and teams that want a real agency relationship with a
                single founder accountable for outcomes.
              </p>
              <p className="text-fg-subtle mt-4 text-base leading-relaxed">
                I co-founded NxtAuric to serve clients who had outgrown what a single
                freelancer can deliver — without losing the directness and accountability
                of working with an individual.
              </p>
            </div>

            {/* Right — stats */}
            <div className="border-border/50 grid grid-cols-2 gap-px overflow-hidden rounded-xl border">
              {NXTAURIC_STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-bg-raised/40 flex flex-col gap-1 px-5 py-5"
                >
                  <span className="text-foreground text-2xl font-bold tracking-[-0.02em]">
                    {value}
                  </span>
                  <span className="text-fg-subtle text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
