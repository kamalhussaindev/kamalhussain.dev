import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_URL, SERVICE_SLUGS, SERVICE_LABELS } from '@/lib/constants'
import { SERVICES_DATA, type ServiceSlug } from '@/lib/services-data'
import { PLACEHOLDERS } from '@/lib/placeholders'
import { ScopingCalculator } from '@/components/home/scoping-calculator'

export const metadata: Metadata = {
  title: 'Services — DevOps, Kubernetes, CI/CD & AWS',
  description:
    'Freelance DevOps engineering services: Kubernetes platform setup, CI/CD pipelines, AWS Terraform infrastructure, observability stacks, and WordPress development.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: { title: 'Services — Kamal Hussain', url: `${SITE_URL}/services` },
}

const SERVICE_KEY_STACK: Record<ServiceSlug, string[]> = {
  'kubernetes-platform-engineering': ['Kubernetes', 'EKS', 'ArgoCD', 'Terraform'],
  'cicd-pipeline-engineering': ['GitHub Actions', 'ArgoCD', 'Helm', 'OIDC'],
  'aws-terraform-infrastructure': ['Terraform', 'AWS', 'Atlantis', 'Infracost'],
  'observability-engineering': ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry'],
  'wordpress-web-development': ['WordPress', 'Next.js', 'Cloudflare', 'WooCommerce'],
  'devops-consulting-audits': ['AWS', 'Kubernetes', 'tfsec', 'kube-bench'],
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

      {/* PLACEHOLDER-IMG: Replace picsum with a real hero shot (infrastructure/terminal/team) */}
      <div className="border-border relative mb-12 h-52 overflow-hidden rounded-xl border">
        <Image
          src={PLACEHOLDERS.servicesHero}
          alt="DevOps engineering services"
          fill
          className="object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, transparent 40%, var(--background) 100%)',
          }}
        />
      </div>

      {/* Hero */}
      <div className="mb-20 max-w-2xl">
        <p className="text-fg-subtle mb-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          services · {SERVICE_SLUGS.length}
        </p>
        <h1 className="text-hero text-foreground mb-7 max-w-[22ch] font-bold tracking-[-0.04em] [text-wrap:balance]">
          Services<span className="text-accent-primary">.</span>
        </h1>
        <p className="text-fg-muted text-lg leading-relaxed">
          I work with early-stage and growth-stage companies on the infrastructure layer —
          from greenfield Kubernetes clusters to CI/CD pipelines to observability stacks.
          Fixed-scope and day-rate engagements. Remote, async-first.
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

      {/* Stacked service list */}
      <div className="border-border mb-28 border-t">
        {SERVICE_SLUGS.map((slug, i) => (
          <Link
            key={slug}
            href={`/services/${slug}`}
            className="group border-border hover:border-accent-primary/20 flex items-start gap-6 border-b py-8 transition-colors"
          >
            <span className="text-accent-primary w-8 flex-shrink-0 pt-0.5 font-mono text-xs font-bold">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="text-foreground group-hover:text-accent-primary mb-1.5 text-xl font-bold tracking-[-0.02em] transition-colors md:text-2xl">
                {SERVICE_LABELS[slug]}
              </h2>
              <p className="text-fg-muted mb-3 max-w-xl text-sm leading-relaxed">
                {SERVICES_DATA[slug].tagline}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SERVICE_KEY_STACK[slug].map((tech) => (
                  <span
                    key={tech}
                    className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <ArrowRight
              size={15}
              className="text-fg-dim group-hover:text-accent-primary mt-1.5 hidden flex-shrink-0 transition-all group-hover:translate-x-0.5 sm:block"
              aria-hidden
            />
          </Link>
        ))}
      </div>

      {/* Engagement models */}
      <section className="mb-24">
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
      <div className="card-surface rounded-xl px-8 py-8">
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
