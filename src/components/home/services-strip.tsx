import Link from 'next/link'
import { ArrowUpRight, Boxes, GitBranch, Cloud } from 'lucide-react'
import type { LucideProps } from 'lucide-react'

type LucideIcon = React.ForwardRefExoticComponent<
  LucideProps & React.RefAttributes<SVGSVGElement>
>

const TIER1_SERVICES: {
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
    slug: 'cicd-pipeline-engineering',
    title: 'CI/CD Pipeline Engineering',
    description:
      'GitHub Actions and GitLab CI pipelines that deploy in minutes, not hours.',
    Icon: GitBranch,
  },
  {
    slug: 'aws-terraform-infrastructure',
    title: 'AWS Infrastructure with Terraform',
    description:
      'Your AWS estate — reproducible, auditable, cost-visible, and safe to change.',
    Icon: Cloud,
  },
]

export function ServicesStrip() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-accent-primary mb-1 font-mono text-xs font-bold tracking-[0.2em] uppercase">
              Tier 01
            </p>
            <h2 className="text-fg-subtle font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              Cloud & DevOps Engineering
            </h2>
          </div>
          <Link
            href="/services"
            className="text-fg-muted hover:text-foreground flex items-center gap-1 text-sm transition-colors"
          >
            All services <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TIER1_SERVICES.map(({ slug, title, description, Icon }) => (
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

        {/* Compact secondary row — links to full services page for Tier 2 & 3 */}
        <p className="text-fg-dim mt-8 text-sm">
          Also:{' '}
          <Link
            href="/services#tier-2"
            className="text-fg-subtle hover:text-foreground transition-colors"
          >
            web & product development
          </Link>
          {', '}
          <Link
            href="/services#tier-3"
            className="text-fg-subtle hover:text-foreground transition-colors"
          >
            reliability & support
          </Link>{' '}
          <Link
            href="/services"
            className="text-fg-subtle hover:text-accent-primary transition-colors"
            aria-label="View all services"
          >
            →
          </Link>
        </p>
      </div>
    </section>
  )
}
