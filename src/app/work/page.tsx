import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_URL } from '@/lib/constants'
import { WORK_DATA, WORK_SLUGS } from '@/lib/work-data'

export const metadata: Metadata = {
  title: 'Engineering Case Studies — Kamal Hussain',
  description:
    'Self-directed engineering builds and methodology demonstrations — EKS, Kubernetes observability, Terraform, CI/CD, and more. Real metrics, documented decisions.',
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: 'Engineering Case Studies | Kamal Hussain',
    url: `${SITE_URL}/work`,
  },
}

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Work</span>
      </nav>

      <div className="mb-14 max-w-2xl">
        <p className="text-accent-primary mb-4 font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Engineering work
        </p>
        <h1 className="max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
          Engineering Case Studies
        </h1>
        <p className="text-fg-muted mt-5 text-lg leading-relaxed">
          Self-directed engineering builds that demonstrate my methodology for production
          infrastructure. Real metrics, documented decisions, honest framing. Client
          engagements will be added here as work completes and clients permit.
        </p>
      </div>

      <div className="space-y-3">
        {WORK_SLUGS.map((slug) => {
          const cs = WORK_DATA[slug]
          return (
            <Link
              key={slug}
              href={`/work/${slug}`}
              className="card-surface group flex flex-col gap-4 overflow-hidden rounded-xl transition-all sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="relative h-40 overflow-hidden sm:h-auto sm:w-48 sm:flex-shrink-0">
                <Image
                  src="/pulsehealth-metrics.png"
                  alt={cs.headline}
                  fill
                  className="object-cover opacity-50 transition-opacity group-hover:opacity-60"
                />
              </div>
              <div className="flex min-w-0 flex-1 items-start justify-between gap-4 p-6 sm:py-6 sm:pr-6 sm:pl-0">
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="text-fg-subtle font-mono text-xs">{cs.year}</span>
                    <span className="text-fg-subtle text-xs">·</span>
                    <span className="text-fg-subtle text-xs">{cs.industry}</span>
                    <span className="text-fg-subtle text-xs">·</span>
                    <span className="text-fg-subtle text-xs">{cs.duration}</span>
                  </div>
                  <p className="text-accent-primary mb-1 text-2xl font-bold tracking-tighter">
                    {cs.metric}
                  </p>
                  <p className="text-fg-subtle mb-3 font-mono text-xs tracking-wider uppercase">
                    {cs.metricLabel}
                  </p>
                  <h2 className="text-foreground group-hover:text-accent-primary mb-2 text-base leading-snug font-semibold transition-colors">
                    {cs.headline}
                  </h2>
                  <p className="text-fg-muted line-clamp-2 text-sm leading-relaxed">
                    {cs.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cs.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-fg-dim group-hover:text-accent-primary mt-1 flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>
            </Link>
          )
        })}
      </div>

      {/* More work CTA */}
      <div className="card-surface mx-auto mt-16 max-w-lg rounded-xl px-6 py-8 text-center">
        <p className="text-foreground mb-1 text-sm font-medium">
          More case studies in progress
        </p>
        <p className="text-fg-muted mb-5 text-sm">
          Additional engineering builds and real client case studies will be added here as
          engagements complete. Book a call to discuss your specific situation directly.
        </p>
        <Link
          href="/book"
          className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-all"
        >
          Book a 30-min call
        </Link>
      </div>
    </div>
  )
}
