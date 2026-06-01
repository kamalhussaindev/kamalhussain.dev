import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_URL } from '@/lib/constants'
import { TIERS, type Tier } from '@/lib/tiers-config'
import { ServiceCard } from '@/components/services/service-card'
import {
  KubernetesVisual,
  CicdVisual,
  AwsVisual,
  ObservabilityVisual,
  AiChatVisual,
  CustomWebVisual,
  WordpressVisual,
  TerminalVisual,
  UptimeVisual,
  AuditVisual,
} from '@/components/services/card-visuals'
import { ScopingCalculator } from '@/components/home/scoping-calculator'

export const metadata: Metadata = {
  title: 'Services — DevOps, Cloud, Web & Support',
  description:
    'Three tiers of engineering services: flagship DevOps & cloud infrastructure, web & product development, and ongoing reliability & support.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: { title: 'Services — Kamal Hussain', url: `${SITE_URL}/services` },
}

const CARD_VISUALS: Record<string, React.ReactNode> = {
  'kubernetes-platform-engineering': <KubernetesVisual />,
  'cicd-pipeline-engineering': <CicdVisual />,
  'aws-terraform-infrastructure': <AwsVisual />,
  'observability-engineering': <ObservabilityVisual />,
  'ai-chatbots': <AiChatVisual />,
  'custom-web-saas': <CustomWebVisual />,
  'wordpress-web-development': <WordpressVisual />,
  'server-troubleshooting': <TerminalVisual />,
  'hosting-management': <UptimeVisual />,
  'devops-consulting-audits': <AuditVisual />,
}

const ENGAGEMENT_MODELS = [
  {
    num: '01',
    label: 'Fixed-scope project',
    description:
      'Defined deliverables and timeline, agreed up front. Single invoice on completion. Best for greenfield builds, migrations, and infrastructure work with clear scope.',
    callout: 'Most common',
  },
  {
    num: '02',
    label: 'Day-rate',
    description:
      'Flexible by the day. Right for audits, short engagements, cost reviews, or situations where the scope is still forming.',
    callout: null,
  },
  {
    num: '03',
    label: 'Monthly retainer',
    description:
      'Ongoing platform engineering support — a set number of days per month. Best for teams that want a dedicated DevOps engineer without full-time headcount.',
    callout: null,
  },
]

// ── Tier section headers ───────────────────────────────────────────────────────

function Tier1Header({ tier }: { tier: Tier }) {
  return (
    <div className="mb-10 border-l-2 border-[oklch(0.63_0.24_24)] pl-6">
      <p className="text-accent-primary mb-3 font-mono text-xs font-bold tracking-[0.25em] uppercase">
        Tier {tier.number}
      </p>
      <h2 className="text-foreground text-2xl font-bold tracking-[-0.03em] md:text-3xl">
        {tier.title}
      </h2>
      <p className="text-fg-muted mt-2 max-w-xl text-base leading-relaxed">
        {tier.subtitle}
      </p>
    </div>
  )
}

function Tier2Header({ tier }: { tier: Tier }) {
  return (
    <div className="mb-8">
      <p className="text-fg-subtle mb-3 font-mono text-xs font-semibold tracking-[0.25em] uppercase">
        Tier {tier.number}
      </p>
      <h2 className="text-foreground text-xl font-bold tracking-[-0.025em] md:text-2xl">
        {tier.title}
      </h2>
      <p className="text-fg-muted mt-2 max-w-xl text-sm leading-relaxed">
        {tier.subtitle}
      </p>
    </div>
  )
}

function Tier3Header({ tier }: { tier: Tier }) {
  return (
    <div className="mb-7">
      <p className="text-fg-dim mb-2 font-mono text-xs font-semibold tracking-[0.25em] uppercase">
        Tier {tier.number}
      </p>
      <h2 className="text-fg-subtle text-lg font-bold tracking-[-0.02em] md:text-xl">
        {tier.title}
      </h2>
      <p className="text-fg-dim mt-1.5 max-w-xl text-sm leading-relaxed">
        {tier.subtitle}
      </p>
    </div>
  )
}

// ── Tier sections ──────────────────────────────────────────────────────────────

function Tier1Section({ tier }: { tier: Tier }) {
  return (
    <section id="tier-1" className="border-border border-t py-16 md:py-20">
      <Tier1Header tier={tier} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tier.services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.description}
            visual={CARD_VISUALS[service.slug]}
            tier={1}
            href={service.href}
            stack={service.stack}
          />
        ))}
      </div>
    </section>
  )
}

function Tier2Section({ tier }: { tier: Tier }) {
  return (
    <section id="tier-2" className="border-border border-t py-14 md:py-16">
      <Tier2Header tier={tier} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tier.services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.description}
            visual={CARD_VISUALS[service.slug]}
            tier={2}
            href={service.href}
            stack={service.stack}
          />
        ))}
      </div>
    </section>
  )
}

function Tier3Section({ tier }: { tier: Tier }) {
  return (
    <section id="tier-3" className="border-border/60 border-t py-12 md:py-14">
      <Tier3Header tier={tier} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tier.services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.description}
            visual={CARD_VISUALS[service.slug]}
            tier={3}
            href={service.href}
            stack={service.stack}
          />
        ))}
      </div>
    </section>
  )
}

const TIER_SECTIONS = [Tier1Section, Tier2Section, Tier3Section]

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Services</span>
      </nav>

      {/* Hero */}
      <div className="mb-4 max-w-2xl">
        <p className="text-fg-subtle mb-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          services · {TIERS.reduce((n, t) => n + t.services.length, 0)}
        </p>
        <h1 className="text-hero text-foreground mb-7 max-w-[22ch] font-bold tracking-[-0.04em] [text-wrap:balance]">
          Services<span className="text-accent-primary">.</span>
        </h1>
        <p className="text-fg-muted text-lg leading-relaxed">
          Three tiers. Flagship DevOps and cloud engineering first, web & product
          development second, and ongoing reliability & support third. The work that pays
          the bills is infrastructure — the rest hangs off it as a coherent extension.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-all"
          >
            Start a project
          </Link>
          <Link
            href="/book"
            className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Book a scoping call <ArrowRight size={13} aria-hidden />
          </Link>
        </div>
      </div>

      {/* Three tier sections */}
      {TIERS.map((tier, idx) => {
        const TierSection = TIER_SECTIONS[idx]
        return <TierSection key={tier.id} tier={tier} />
      })}

      {/* Engagement models */}
      <section className="mb-24 pt-4">
        <div className="mb-10">
          <p className="text-fg-subtle mb-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            how we work together
          </p>
          <h2 className="text-foreground text-2xl font-bold tracking-[-0.025em] md:text-3xl">
            Engagement models
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((model) => (
            <div
              key={model.num}
              className="card-surface flex flex-col gap-4 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-accent-primary font-mono text-xs font-bold tracking-[0.2em]">
                  {model.num}
                </span>
                {model.callout && (
                  <span className="bg-accent-primary/10 border-accent-primary/20 text-accent-primary rounded-full border px-2.5 py-0.5 text-xs font-medium">
                    {model.callout}
                  </span>
                )}
              </div>
              <h3 className="text-foreground text-lg leading-snug font-bold tracking-[-0.02em]">
                {model.label}
              </h3>
              <p className="text-fg-muted flex-1 text-sm leading-relaxed">
                {model.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ScopingCalculator compact />

      {/* Bottom CTA */}
      <div className="card-surface mt-16 rounded-xl px-8 py-8">
        <h2 className="text-foreground mb-2 text-xl font-bold tracking-[-0.02em] md:text-2xl">
          Not sure which service fits?
        </h2>
        <p className="text-fg-muted mb-5 max-w-lg text-base leading-relaxed">
          Book a free 30-minute call. We&apos;ll talk through what you&apos;re trying to
          solve and I&apos;ll tell you honestly whether I can help — and what that looks
          like.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/book"
            className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-all"
          >
            Book a free call
          </Link>
          <Link
            href="/contact"
            className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
          >
            Send a project brief
          </Link>
        </div>
      </div>
    </div>
  )
}
