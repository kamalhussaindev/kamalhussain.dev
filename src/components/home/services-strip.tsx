import Link from 'next/link'
import type { LucideProps } from 'lucide-react'
import { ArrowUpRight, Boxes, GitBranch, BarChart3 } from 'lucide-react'

type LucideIcon = React.ForwardRefExoticComponent<
  LucideProps & React.RefAttributes<SVGSVGElement>
>

const HOMEPAGE_SERVICES: {
  slug: string
  title: string
  description: string
  Icon: LucideIcon
}[] = [
  {
    slug: 'kubernetes-platform-engineering',
    title: 'Kubernetes Platform Engineering',
    description:
      'Production-ready EKS clusters with GitOps, RBAC, autoscaling, and observability baked in.',
    Icon: Boxes,
  },
  {
    slug: 'observability-engineering',
    title: 'Observability Engineering',
    description:
      'Prometheus, Grafana, Loki, and OpenTelemetry stacks that surface problems before your users do.',
    Icon: BarChart3,
  },
  {
    slug: 'cicd-pipeline-engineering',
    title: 'CI/CD Pipeline Engineering',
    description:
      'GitHub Actions and GitLab CI pipelines that deploy in minutes, not hours.',
    Icon: GitBranch,
  },
]

export function ServicesStrip() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-fg-subtle font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            services
          </h2>
          <Link
            href="/services"
            className="text-fg-muted hover:text-foreground flex items-center gap-1 text-sm transition-colors"
          >
            All services <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HOMEPAGE_SERVICES.map(({ slug, title, description, Icon }) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="card-surface group hover:border-accent-primary/40 flex flex-col gap-5 rounded-xl p-6 transition-all"
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-accent-primary"
                aria-hidden
              />
              <div className="flex-1">
                <h3 className="text-foreground group-hover:text-accent-primary text-base leading-snug font-semibold transition-colors">
                  {title}
                </h3>
                <p className="text-fg-muted mt-2 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <ArrowUpRight
                size={14}
                className="text-fg-dim group-hover:text-accent-primary self-end transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
