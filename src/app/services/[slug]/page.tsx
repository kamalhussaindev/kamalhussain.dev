import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Download } from 'lucide-react'
import { SITE_URL, SERVICE_SLUGS, SERVICE_LABELS } from '@/lib/constants'
import { SERVICES_DATA, type ServiceSlug } from '@/lib/services-data'

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {}
  const data = SERVICES_DATA[slug as ServiceSlug]
  return {
    title: `${data.title} — Kamal Hussain`,
    description: data.lede.slice(0, 160),
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      title: `${data.title} | Kamal Hussain`,
      url: `${SITE_URL}/services/${slug}`,
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound()

  const data = SERVICES_DATA[slug as ServiceSlug]

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.lede.slice(0, 160),
    provider: { '@type': 'Person', name: 'Kamal Hussain', url: SITE_URL },
    areaServed: 'Worldwide',
    serviceType: data.title,
    url: `${SITE_URL}/services/${slug}`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-fg-subtle mx-2">/</span>
          <Link href="/services" className="hover:text-foreground transition-colors">
            Services
          </Link>
          <span className="text-fg-subtle mx-2">/</span>
          <span className="text-foreground">{data.title}</span>
        </nav>

        {/* Service hero band — dark gradient, no stock photos */}
        <div
          className="border-border relative mb-12 h-52 overflow-hidden rounded-xl border"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.09 0.008 290) 0%, oklch(0.12 0.015 280) 50%, oklch(0.10 0.012 300) 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 100% 50%, oklch(0.63 0.24 24 / 0.07) 0%, transparent 70%)',
            }}
          />
          <div className="absolute bottom-6 left-6">
            <p className="text-accent-primary font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              {data.title}
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-20 max-w-3xl">
          <p className="text-accent-primary mb-4 font-mono text-xs font-medium tracking-[0.2em] uppercase">
            Service
          </p>
          <h1 className="mb-5 max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
            {data.title}
          </h1>
          <p className="text-fg-muted mb-6 text-xl tracking-tight">{data.tagline}</p>
          <p className="text-fg-muted text-lg leading-relaxed">{data.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-all"
            >
              Start a project
            </Link>
            <Link
              href="/book"
              className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium transition-colors"
            >
              Book a call first <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-[1fr_280px]">
          <div className="space-y-20">
            {/* Who this is for */}
            <section>
              <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Who this is for
              </h2>
              <ul className="space-y-3">
                {data.whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-accent-primary mt-0.5 flex-shrink-0"
                      aria-hidden
                    />
                    <span className="text-fg-muted text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Deliverables */}
            <section>
              <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                What you get
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.deliverables.map((d) => (
                  <div key={d.title} className="card-surface rounded-lg p-5">
                    <h3 className="text-foreground mb-2 text-sm font-semibold">
                      {d.title}
                    </h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section>
              <h2 className="text-fg-subtle mb-8 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                How it works
              </h2>
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="bg-border absolute top-0 bottom-0 left-[19px] w-px"
                  aria-hidden
                />
                <div className="space-y-8">
                  {data.process.map((step) => (
                    <div key={step.step} className="relative flex gap-6">
                      <div className="border-border bg-background z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
                        <span className="text-accent-primary font-mono text-xs font-bold">
                          {String(step.step).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="min-w-0 pb-2">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <h3 className="text-foreground text-base font-semibold">
                            {step.title}
                          </h3>
                          <span className="text-fg-subtle border-border rounded-full border px-2.5 py-0.5 font-mono text-xs">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-fg-muted text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Pricing
              </h2>
              <div className="card-surface rounded-xl p-6">
                <p className="text-fg-muted text-lg leading-relaxed">
                  {data.pricingNote}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-all"
                  >
                    Get a quote
                  </Link>
                  <Link
                    href="/book"
                    className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
                  >
                    Book a scoping call
                  </Link>
                </div>
              </div>
            </section>

            {/* Kubernetes checklist callout — only on the K8s service page */}
            {slug === 'kubernetes-platform-engineering' && (
              <div className="border-accent-primary/20 bg-accent-primary/5 flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Download size={13} className="text-accent-primary" aria-hidden />
                    <p className="text-accent-primary text-xs font-semibold tracking-[0.15em] uppercase">
                      Free resource
                    </p>
                  </div>
                  <p className="text-foreground text-sm font-semibold">
                    Production Kubernetes Checklist (47 items)
                  </p>
                  <p className="text-fg-muted mt-0.5 text-sm">
                    Everything your cluster needs before it touches production.
                  </p>
                </div>
                <Link
                  href="/checklist/kubernetes-production"
                  className="border-accent-primary/40 text-accent-primary hover:bg-accent-primary/10 flex-shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors"
                >
                  Download PDF →
                </Link>
              </div>
            )}

            {/* FAQ */}
            <section>
              <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Frequently asked questions
              </h2>
              <div className="space-y-1">
                {data.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-border overflow-hidden rounded-lg border"
                  >
                    <summary className="text-foreground hover:bg-bg-raised flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium transition-colors select-none">
                      {faq.q}
                      <span className="text-fg-subtle flex-shrink-0 text-lg leading-none transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="text-fg-muted border-border border-t px-5 pt-2 pb-5 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="card-surface rounded-xl p-5">
                <h3 className="mb-4 text-sm font-semibold">Ready to start?</h3>
                <div className="space-y-2.5">
                  <Link
                    href="/contact"
                    className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white transition-all"
                  >
                    Start a project
                  </Link>
                  <Link
                    href="/book"
                    className="border-border text-foreground hover:bg-bg-raised block w-full rounded-lg border px-4 py-2.5 text-center text-sm font-medium transition-colors"
                  >
                    Book a 30-min call
                  </Link>
                </div>
              </div>

              {/* Tech stack */}
              <div className="card-surface rounded-xl p-5">
                <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Other services */}
              <div className="card-surface rounded-xl p-5">
                <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                  Other services
                </h3>
                <ul className="space-y-2">
                  {SERVICE_SLUGS.filter((s) => s !== slug).map((s) => (
                    <li key={s}>
                      <Link
                        href={`/services/${s}`}
                        className="text-fg-muted hover:text-foreground text-sm transition-colors"
                      >
                        {SERVICE_LABELS[s]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
