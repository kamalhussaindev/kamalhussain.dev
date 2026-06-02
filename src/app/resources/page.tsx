import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { SITE_URL } from '@/lib/constants'
import { RESOURCE_SLUGS, RESOURCES_DATA } from '@/lib/resources-data'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Free DevOps Resources',
  description:
    'Free Helm charts, Terraform modules, GitHub Actions templates, and ArgoCD patterns from real production engagements. Clone or copy.',
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: 'Free DevOps Resources | Kamal Hussain',
    description:
      'Templates, modules, and patterns from real production engagements. Free. Clone or copy.',
    url: `${SITE_URL}/resources`,
  },
}

const TYPE_COLORS: Record<string, string> = {
  'Helm chart': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Terraform module': 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'CI/CD template': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'ArgoCD pattern': 'text-green-400 bg-green-400/10 border-green-400/20',
}

export default function ResourcesPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: `${SITE_URL}/resources`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="text-fg-muted mb-10 flex items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Resources</span>
        </nav>

        {/* Header */}
        <div className="mb-14">
          <p className="text-accent-primary mb-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            Free · Open Source
          </p>
          <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Resources
          </h1>
          <p className="text-fg-muted max-w-2xl text-lg leading-relaxed">
            Templates, modules, and patterns from real production engagements. Free. Clone
            or copy.
          </p>
        </div>

        {/* 4-card grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {RESOURCE_SLUGS.map((slug) => {
            const r = RESOURCES_DATA[slug]
            const typeColor =
              TYPE_COLORS[r.type] ?? 'text-fg-muted bg-bg-raised border-border'
            return (
              <Link
                key={slug}
                href={`/resources/${slug}`}
                className="card-surface group flex flex-col gap-4 rounded-xl border p-6 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium ${typeColor}`}
                  >
                    {r.type.toUpperCase()}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-fg-dim group-hover:text-accent-primary mt-0.5 shrink-0 transition-colors"
                    aria-hidden
                  />
                </div>

                <div>
                  <h2 className="text-foreground mb-2 text-base leading-snug font-semibold">
                    {r.title}
                  </h2>
                  <p className="text-fg-muted text-sm leading-relaxed">{r.description}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {r.techBadges.slice(0, 3).map((badge) => (
                    <span
                      key={badge}
                      className="bg-bg-raised text-fg-subtle border-border rounded border px-2 py-0.5 font-mono text-xs"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>

        {/* "Why these exist" callout */}
        <div className="border-border bg-bg-raised rounded-xl border p-8">
          <h2 className="text-foreground mb-4 text-lg font-semibold">Why these exist</h2>
          <div className="text-fg-muted space-y-3 text-sm leading-relaxed sm:text-base">
            <p>
              Every resource here started as something I built for a client engagement and
              then generalised. A fintech team needed a Helm chart that would pass their
              security review on the first try. A Series-A startup needed an EKS module
              they could hand to a new infrastructure engineer without a week of
              onboarding. A SaaS company needed a CI/CD pipeline that didn&apos;t have AWS
              long-lived credentials hardcoded anywhere. These resources are the result of
              solving those problems in production — not theoretical examples written for
              a blog post.
            </p>
            <p>
              They&apos;re free to use, fork, and adapt. If you want them customised for
              your stack — your ECR registry, your VPC CIDR ranges, your team&apos;s
              specific security requirements — the easiest way to discuss that is a{' '}
              <Link
                href="/book"
                className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
              >
                30-minute call
              </Link>
              .
            </p>
          </div>

          <div className="border-border mt-6 flex flex-col gap-3 border-t pt-6 sm:flex-row">
            <Link
              href="/book"
              className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
            >
              Book a call
            </Link>
            <Link
              href="/services"
              className="border-border text-foreground hover:bg-bg-overlay flex items-center gap-1.5 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              See services
              <ExternalLink size={13} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
