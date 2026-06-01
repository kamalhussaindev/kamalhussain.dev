import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'

const LAST_UPDATED = '2026-05-19'

export const metadata: Metadata = {
  title: "Now — What I'm Working On",
  description:
    'What Kamal Hussain is working on, learning, and reading right now. Updated monthly.',
  alternates: { canonical: `${SITE_URL}/now` },
  openGraph: { title: 'Now | Kamal Hussain', url: `${SITE_URL}/now` },
}

export default function NowPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Now</span>
      </nav>

      <div className="max-w-2xl">
        <p className="text-accent-primary mb-4 font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Now
        </p>
        <h1 className="max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
          What I&apos;m doing now
        </h1>
        <p className="text-fg-subtle mt-3 font-mono text-sm">
          Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time> · Rawalpindi,
          Pakistan
        </p>

        <div className="text-fg-muted mt-10 space-y-10 text-base leading-relaxed">
          <section>
            <h2 className="text-fg-subtle mb-4 font-mono text-sm font-semibold tracking-[0.2em] uppercase">
              Working on
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  This site — rebuilding from a basic SPA to a proper portfolio + services
                  site optimised for search and conversion. SSG, structured data,
                  performance budget.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  A multi-AZ EKS platform build for a logistics startup — ArgoCD GitOps,
                  KEDA for event-driven autoscaling, Loki + Tempo for full observability.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-fg-subtle mb-4 font-mono text-sm font-semibold tracking-[0.2em] uppercase">
              Learning
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  eBPF and Cilium — replacing traditional CNIs and kube-proxy with a
                  kernel-native networking layer. The observability you get from eBPF
                  probes is remarkable.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  OpenTelemetry native pipelines — moving away from Prometheus-only to a
                  proper OTel collector setup that handles metrics, logs, and traces
                  through a unified pipeline.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  Karpenter — AWS&apos;s node provisioner. The bin-packing and spot
                  interruption handling is significantly better than the Cluster
                  Autoscaler for mixed workloads.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-fg-subtle mb-4 font-mono text-sm font-semibold tracking-[0.2em] uppercase">
              Reading
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  <em className="text-foreground">The Phoenix Project</em> by Gene Kim,
                  Kevin Behr, and George Spafford — still the best narrative introduction
                  to DevOps culture, a decade on. Re-reading it as context shifts from
                  &ldquo;DevOps is new&rdquo; to &ldquo;DevOps is the baseline.&rdquo;
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  <em className="text-foreground">Platform Engineering on Kubernetes</em>{' '}
                  by Mauricio Salatino — practical guide to building internal developer
                  platforms on top of Kubernetes. Good real-world patterns for multi-team
                  cluster setups.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent-primary mt-0.5 flex-shrink-0">·</span>
                <span>
                  CNCF landscape deep-dives — the ecosystem keeps expanding faster than
                  any one person can track. Focusing on the observability and security
                  quadrants right now.
                </span>
              </li>
            </ul>
          </section>
        </div>

        <p className="text-fg-subtle mt-12 text-sm">
          Inspired by{' '}
          <a
            href="https://nownownow.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary hover:text-accent-primary/80 transition-colors"
          >
            nownownow.com
          </a>
        </p>
      </div>
    </div>
  )
}
