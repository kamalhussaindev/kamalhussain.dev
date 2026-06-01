import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const FEATURED_PROJECT = {
  title: 'Matrix of Destiny',
  description:
    'A free numerology SaaS app with six interconnected calculators that generate instant personalized charts from a single date-of-birth input. Real product with custom calculation logic, a content/learn section, and SEO-optimized architecture.',
  tags: ['React', 'Next.js', 'Custom Logic', 'SEO'],
  href: 'https://mymatrixofdestiny.com/',
  image: '/work/matrix-of-destiny.png',
  type: 'SaaS Web App',
  external: true,
}

const CASE_STUDIES = [
  {
    metric: '$6.50',
    metricLabel: 'Total AWS cost (full build)',
    title: 'PulseHealth EKS: production observability platform',
    description:
      'Self-directed engineering build: production EKS cluster with Prometheus, Grafana, and Loki on AWS. Real costs and latency measurements from the running platform — not a client engagement.',
    tags: ['EKS', 'Prometheus', 'Grafana', 'Loki', 'Terraform'],
    slug: 'pulsehealth-eks',
    label: 'Engineering case study',
  },
]

export function WorkBento() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-fg-subtle font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            work · selected
          </h2>
          <Link
            href="/work"
            className="text-fg-muted hover:text-foreground flex items-center gap-1 text-sm transition-colors"
          >
            View all <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {/* Featured: Matrix of Destiny */}
          <a
            href={FEATURED_PROJECT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface group relative flex flex-col overflow-hidden rounded-xl transition-all"
          >
            {/* Taller image area for the featured card */}
            <div className="relative -mx-0 h-52 overflow-hidden rounded-t-xl sm:h-64">
              <Image
                src={FEATURED_PROJECT.image}
                alt={FEATURED_PROJECT.title}
                fill
                className="object-cover object-top transition-opacity duration-300 group-hover:opacity-80"
                style={{ opacity: 0.75 }}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-accent-primary/20 text-accent-primary border-accent-primary/30 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide backdrop-blur-sm">
                  Featured
                </span>
                <span className="bg-bg-overlay/80 text-fg-muted rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide backdrop-blur-sm">
                  {FEATURED_PROJECT.type}
                </span>
              </div>
            </div>
            <div className="border-border border-t" />

            <div className="flex items-start justify-between gap-4 p-6">
              <div className="min-w-0 flex-1">
                <h3 className="text-foreground group-hover:text-accent-primary mb-2 text-lg leading-snug font-semibold transition-colors">
                  {FEATURED_PROJECT.title}
                </h3>
                <p className="text-fg-muted text-sm leading-relaxed">
                  {FEATURED_PROJECT.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {FEATURED_PROJECT.tags.map((tag) => (
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
                size={16}
                className="text-fg-dim group-hover:text-accent-primary mt-1 flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </div>
          </a>

          {/* Engineering case studies */}
          {CASE_STUDIES.map((cs) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className="card-surface group flex flex-col overflow-hidden rounded-xl p-6 transition-all"
            >
              <div className="relative -mx-6 -mt-6 mb-4 h-36 overflow-hidden rounded-t-xl">
                <Image
                  src="/pulsehealth-metrics.png"
                  alt={cs.title}
                  fill
                  className="object-cover opacity-50 transition-opacity group-hover:opacity-60"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 50%, var(--bg-raised) 100%)',
                  }}
                />
                {cs.label && (
                  <span className="bg-bg-overlay/80 text-fg-muted absolute top-3 left-3 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide backdrop-blur-sm">
                    {cs.label}
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-fg-subtle mb-1 font-mono text-xs tracking-[0.2em] uppercase">
                    {cs.metricLabel}
                  </p>
                  <p className="text-accent-primary text-3xl font-bold tracking-tighter">
                    {cs.metric}
                  </p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-fg-dim group-hover:text-accent-primary mt-1 flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </div>

              <div className="mt-4 flex-1">
                <h3 className="text-foreground group-hover:text-accent-primary text-base leading-snug font-semibold transition-colors">
                  {cs.title}
                </h3>
                <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                  {cs.description}
                </p>
              </div>

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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
