import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import { WORK_DATA, WORK_SLUGS, type WorkSlug } from '@/lib/work-data'
import { PLACEHOLDERS } from '@/lib/placeholders'

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = WORK_DATA[slug as WorkSlug]
  if (!cs) return {}
  return {
    title: `${cs.headline} — Case Study`,
    description: cs.summary.slice(0, 160),
    alternates: { canonical: `${SITE_URL}/work/${slug}` },
    openGraph: {
      title: cs.headline,
      description: cs.summary.slice(0, 160),
      type: 'article',
      url: `${SITE_URL}/work/${slug}`,
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = WORK_DATA[slug as WorkSlug]
  if (!cs) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.headline,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/work/${slug}`,
    description: cs.summary.slice(0, 160),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* PLACEHOLDER-IMG: Replace picsum with real project hero screenshot */}
        <div className="border-border relative mb-12 h-64 overflow-hidden rounded-xl border">
          <Image
            src={PLACEHOLDERS.workHero(slug)}
            alt={cs.headline}
            fill
            className="object-cover opacity-60"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 50%, var(--background) 100%)',
            }}
          />
        </div>

        <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-fg-subtle mx-2">/</span>
          <Link href="/work" className="hover:text-foreground transition-colors">
            Work
          </Link>
          <span className="text-fg-subtle mx-2">/</span>
          <span className="text-foreground">{cs.client}</span>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_260px]">
          <div>
            {/* Hero */}
            <div className="mb-14">
              <div className="text-fg-subtle mb-5 flex flex-wrap items-center gap-3 font-mono text-xs">
                <span>{cs.year}</span>
                <span>·</span>
                <span>{cs.industry}</span>
                <span>·</span>
                <span>{cs.duration}</span>
              </div>
              <h1 className="mb-6 max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
                {cs.headline}
              </h1>
              <p className="text-fg-muted max-w-2xl text-lg leading-relaxed">
                {cs.summary}
              </p>
            </div>

            {/* TL;DR strip */}
            <div className="card-surface mb-16 grid grid-cols-2 gap-4 rounded-xl p-6 sm:grid-cols-4">
              {cs.tldr.map((item) => (
                <div key={item.label}>
                  <p className="text-accent-primary text-xl font-bold tracking-tighter">
                    {item.value}
                  </p>
                  <p className="text-fg-subtle mt-0.5 text-xs">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Challenge */}
            <section className="mb-14">
              <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                The challenge
              </h2>
              <div className="space-y-4">
                {cs.challenge.map((para, i) => (
                  <p key={i} className="text-fg-muted text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* Approach */}
            <section className="mb-14">
              <h2 className="text-fg-subtle mb-8 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                The approach
              </h2>
              <div className="relative">
                <div
                  className="bg-border absolute top-0 bottom-0 left-[19px] w-px"
                  aria-hidden
                />
                <div className="space-y-8">
                  {cs.approach.map((step, i) => (
                    <div key={step.title} className="relative flex gap-6">
                      <div className="border-border bg-background z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border">
                        <span className="text-accent-primary font-mono text-xs font-bold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="min-w-0 pb-2">
                        <h3 className="text-foreground mb-2 text-base font-semibold">
                          {step.title}
                        </h3>
                        <p className="text-fg-muted text-sm leading-relaxed">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Results */}
            <section className="mb-14">
              <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Results
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {cs.results.map((r) => (
                  <div key={r.label} className="card-surface rounded-lg p-4">
                    <p className="text-accent-primary text-2xl font-bold tracking-tighter">
                      {r.metric}
                    </p>
                    <p className="text-fg-subtle mt-1 text-xs leading-snug">{r.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PLACEHOLDER-IMG: Replace picsum with real project screenshot / dashboard */}
            <div className="border-border relative mb-14 h-56 overflow-hidden rounded-xl border">
              <Image
                src={PLACEHOLDERS.workScreenshot(slug, 1)}
                alt={`${cs.headline} — result screenshot`}
                fill
                className="object-cover opacity-70"
              />
            </div>

            {/* Testimonial */}
            {cs.testimonial && (
              <section className="mb-14">
                <blockquote className="border-accent-primary border-l-2 pl-6">
                  <p className="text-fg-muted text-base leading-relaxed italic">
                    &ldquo;{cs.testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-4 flex items-center gap-3">
                    {/* PLACEHOLDER-IMG: Replace pravatar with real client photo */}
                    <Image
                      src={PLACEHOLDERS.workTestimonialAvatar(slug)}
                      alt={cs.testimonial.role}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="text-fg-subtle font-mono text-xs">
                      — {cs.testimonial.role}
                    </span>
                  </footer>
                </blockquote>
              </section>
            )}

            {/* CTA */}
            <div className="card-surface rounded-xl px-6 py-8">
              <h3 className="mb-2 text-lg font-bold tracking-tighter">
                Need something similar?
              </h3>
              <p className="text-fg-muted mb-5 text-sm leading-relaxed">
                Every engagement starts with a 30-minute call to understand your specific
                situation. No pitch — just an honest conversation about what you need and
                whether I&apos;m the right fit.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-all"
                >
                  Book a 30-min call
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

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <Link
                href="/work"
                className="text-fg-muted hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <ArrowLeft size={13} aria-hidden /> All case studies
              </Link>

              <div className="card-surface mt-6 rounded-xl p-5">
                <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                  Project details
                </h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-fg-subtle">Client</dt>
                    <dd className="text-foreground">{cs.client}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Industry</dt>
                    <dd className="text-foreground">{cs.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Duration</dt>
                    <dd className="text-foreground">{cs.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-fg-subtle">Year</dt>
                    <dd className="text-foreground">{cs.year}</dd>
                  </div>
                </dl>
              </div>

              <div className="card-surface rounded-xl p-5">
                <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cs.stack.map((tech) => (
                    <span
                      key={tech}
                      className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
