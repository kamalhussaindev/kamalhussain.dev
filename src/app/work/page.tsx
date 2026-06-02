import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_URL } from '@/lib/constants'
import { WORK_DATA, WORK_SLUGS } from '@/lib/work-data'
import { PORTFOLIO_PROJECTS } from '@/lib/portfolio-data'

export const metadata: Metadata = {
  title: 'Work & Case Studies',
  description:
    'Engineering case studies and web portfolio — EKS observability, Terraform, CI/CD, WordPress sites, and SaaS products. Real metrics, documented decisions.',
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: 'Work & Case Studies | Kamal Hussain',
    url: `${SITE_URL}/work`,
  },
}

export default function WorkPage() {
  const featured = PORTFOLIO_PROJECTS.find((p) => p.featured)
  const rest = PORTFOLIO_PROJECTS.filter((p) => !p.featured)

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
          Selected work
        </p>
        <h1 className="max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
          Engineering & Web Portfolio
        </h1>
        <p className="text-fg-muted mt-5 text-lg leading-relaxed">
          DevOps engineering case studies with real metrics, plus web and SaaS projects
          built for clients and as independent products. Honest framing throughout — no
          inflated numbers.
        </p>
      </div>

      {/* ── Engineering Case Studies ─────────────────────────────── */}
      <section className="mb-20">
        <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          Engineering case studies
        </h2>
        <div className="space-y-3">
          {WORK_SLUGS.map((slug) => {
            const cs = WORK_DATA[slug]
            return (
              <Link
                key={slug}
                href={`/work/${slug}`}
                className="card-surface group flex flex-col gap-4 overflow-hidden rounded-xl transition-all sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="relative h-40 overflow-hidden rounded-t-xl sm:h-auto sm:w-48 sm:flex-shrink-0 sm:rounded-t-none sm:rounded-l-xl">
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
      </section>

      {/* ── Web & SaaS Portfolio ──────────────────────────────────── */}
      <section id="portfolio" className="mb-20 scroll-mt-20">
        <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          Web &amp; SaaS portfolio
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured card — Matrix of Destiny, full-width */}
          {featured && (
            <div className="sm:col-span-2 lg:col-span-3">
              <a
                href={featured.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${featured.title} live site`}
                className="card-surface group focus-visible:ring-accent-primary relative flex flex-col overflow-hidden rounded-xl transition-all focus:outline-none focus-visible:ring-2 sm:flex-row"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden rounded-t-xl sm:h-auto sm:w-80 sm:flex-shrink-0 sm:rounded-t-none sm:rounded-l-xl">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover object-top transition-opacity duration-300 group-hover:opacity-80"
                    style={{ opacity: 0.75 }}
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-accent-primary/20 text-accent-primary border-accent-primary/30 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide backdrop-blur-sm">
                      Featured
                    </span>
                    <span className="bg-bg-overlay/80 text-fg-muted rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide backdrop-blur-sm">
                      {featured.type}
                    </span>
                  </div>
                </div>
                {/* border separates image from body on mobile */}
                <div className="border-border border-t sm:hidden" />

                <div className="flex min-w-0 flex-1 flex-col justify-center p-6">
                  <h3 className="text-foreground group-hover:text-accent-primary mb-2 text-xl leading-snug font-semibold transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-fg-muted mb-4 text-sm leading-relaxed">
                    {featured.summary}
                  </p>
                  <dl className="text-fg-subtle mb-4 text-xs">
                    <div className="flex gap-2">
                      <dt className="font-semibold">Role</dt>
                      <dd>{featured.role}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap gap-1.5">
                    {featured.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-accent-primary mt-5 flex items-center gap-1.5 text-sm font-medium">
                    View live <ArrowUpRight size={13} aria-hidden />
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Standard portfolio cards */}
          {rest.map((project) => (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live site`}
              className="card-surface group focus-visible:ring-accent-primary flex flex-col overflow-hidden rounded-xl transition-all focus:outline-none focus-visible:ring-2"
            >
              {/* Thumbnail */}
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-opacity duration-300 group-hover:opacity-80"
                  style={{ opacity: 0.75 }}
                />
                <span className="bg-bg-overlay/80 text-fg-muted absolute top-3 left-3 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide backdrop-blur-sm">
                  {project.type}
                </span>
              </div>
              {/* separator — clear edge between image and card body in both themes */}
              <div className="border-border border-t" />

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-foreground group-hover:text-accent-primary mb-1.5 text-base leading-snug font-semibold transition-colors">
                  {project.title}
                </h3>
                <p className="text-fg-muted mb-3 flex-1 text-sm leading-relaxed">
                  {project.summary}
                </p>
                <dl className="text-fg-subtle mb-3 text-xs">
                  <div className="flex gap-2">
                    <dt className="font-semibold">Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                </dl>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-border text-fg-subtle rounded-full border px-2 py-0.5 text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-accent-primary flex items-center gap-1.5 text-xs font-medium">
                  View live <ArrowUpRight size={12} aria-hidden />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── More work CTA ─────────────────────────────────────────── */}
      <div className="card-surface mx-auto mt-4 max-w-lg rounded-xl px-6 py-8 text-center">
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
