import { ExternalLink } from 'lucide-react'
import { AUTHOR } from '@/lib/constants'

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

          {/* TODO: replace with NxtAuric brand SVG when supplied */}
          <div
            className="relative mb-14 h-[260px] overflow-hidden rounded-2xl md:h-[320px]"
            style={{
              background:
                'linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 50%, #0a0a1a 100%)',
            }}
          >
            {/* Subtle radial accent */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 50%, rgba(255,77,46,0.08), transparent 60%)',
              }}
            />

            {/* Centered wordmark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight text-white/90 md:text-7xl">
                  NxtAuric
                </span>
                <span className="bg-accent-primary mb-2 h-3 w-3 flex-shrink-0 rounded-sm md:h-4 md:w-4" />
              </div>
            </div>

            {/* Corner mark */}
            <div className="absolute right-4 bottom-4 font-mono text-xs tracking-wide text-white/30">
              NxtAuric.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
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

            {/* Right — context */}
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
          </div>
        </div>
      </div>
    </section>
  )
}
