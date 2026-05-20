import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PLACEHOLDERS } from '@/lib/placeholders'

const CASE_STUDIES = [
  {
    metric: '47 min → 4 min',
    metricLabel: 'Deploy time',
    title: 'CI/CD overhaul for a Series-A fintech',
    description:
      'Replaced a brittle Jenkins monolith with GitHub Actions + ArgoCD. Multi-environment promotion gates, automated smoke tests, zero-downtime deploys.',
    tags: ['GitHub Actions', 'ArgoCD', 'Kubernetes'],
    slug: 'fintech-cicd-overhaul',
  },
  {
    metric: '−42%',
    metricLabel: 'Infrastructure cost',
    title: 'AWS cost optimization & Terraform IaC migration',
    description:
      'Audited and right-sized a $14k/month AWS estate. Migrated all resources to Terraform, introduced spot instances and savings plans.',
    tags: ['AWS', 'Terraform', 'Cost Optimization'],
    slug: 'aws-cost-optimization',
  },
  {
    metric: '99.97%',
    metricLabel: 'Uptime SLO achieved',
    title: 'EKS production platform with full observability',
    description:
      'Designed and deployed a multi-AZ EKS cluster with Prometheus, Grafana, and Loki. Custom dashboards and PagerDuty alert routing.',
    tags: ['EKS', 'Prometheus', 'Grafana'],
    slug: 'eks-production-platform',
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

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/work/${cs.slug}`}
              className={`card-surface group flex flex-col overflow-hidden rounded-xl p-6 transition-all ${
                i === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* PLACEHOLDER-IMG: Replace picsum with real project screenshots */}
              <div className="relative -mx-6 -mt-6 mb-4 h-36 overflow-hidden rounded-t-xl">
                <Image
                  src={PLACEHOLDERS.workThumbnail(cs.slug)}
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
                <p className="text-fg-muted mt-2 line-clamp-2 text-sm leading-relaxed">
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
