import Link from 'next/link'
import { SHOW_PLACEHOLDER_TESTIMONIALS } from '@/lib/site-config'

interface Testimonial {
  quote: string
  role: string
  context: string
  service: string
  caseStudyLink: string
  flag: 'REAL' | 'PLACEHOLDER'
}

// [CONFIRM WITH CLIENT — entry is anonymized pending written permission]
// When Kamal gets sign-off from the fintech CTO, replace role with their
// real name and update flag to 'REAL' if desired.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Kamal took our 45-minute CI pipeline down to under 6 minutes and rebuilt the EKS cluster on proper GitOps rails. We haven't had a production incident in four months. The runbooks he left us are something the on-call team actually uses.",
    role: 'CTO',
    context: 'Series-A Fintech · 8-week engagement',
    service: 'CI/CD Overhaul',
    caseStudyLink: '/work/fintech-cicd-overhaul/',
    flag: 'REAL',
  },
  {
    // [PLACEHOLDER — hidden by default until real quote confirmed with client]
    quote:
      'Async-first, documented every architectural decision, delivered exactly on scope. The Terraform codebase he left us is clean, modular, and something the team can actually maintain.',
    role: 'VP of Engineering',
    context: 'B2B SaaS · 12-week engagement',
    service: 'AWS Cost Optimization',
    caseStudyLink: '/work/aws-cost-optimization/',
    flag: 'PLACEHOLDER',
  },
  {
    // [PLACEHOLDER — hidden by default until real quote confirmed with client]
    quote:
      'Needed someone who could handle both the AWS infrastructure and the WordPress rebuild without coordination overhead. Kamal did both, solo. Infrastructure costs dropped 30%.',
    role: 'Founder',
    context: 'DevTool Startup · 6-week engagement',
    service: 'EKS Platform',
    caseStudyLink: '/work/aws-cost-optimization/',
    flag: 'PLACEHOLDER',
  },
]

function ServicePill({ label }: { label: string }) {
  return (
    <span className="text-fg-subtle border-border inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs">
      {label}
    </span>
  )
}

function TestimonialCard({ t, draft }: { t: Testimonial; draft?: boolean }) {
  return (
    <figure className="card-surface relative flex flex-col gap-5 rounded-xl p-6">
      {draft && (
        <span className="bg-accent-primary/15 text-accent-primary absolute top-4 right-4 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider uppercase">
          Draft
        </span>
      )}
      <span className="text-accent-primary/40 font-serif text-3xl leading-none select-none">
        &ldquo;
      </span>
      <blockquote className="text-fg-muted -mt-3 flex-1 text-sm leading-relaxed">
        {t.quote}
      </blockquote>
      <figcaption className="border-border flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-foreground text-xs font-semibold">{t.role}</p>
          <p className="text-fg-subtle mt-0.5 text-xs">{t.context}</p>
        </div>
        <ServicePill label={t.service} />
      </figcaption>
      <Link
        href={t.caseStudyLink}
        className="text-accent-primary hover:text-accent-primary/80 self-start text-xs transition-colors"
      >
        View case study →
      </Link>
    </figure>
  )
}

export function Testimonials() {
  const real = TESTIMONIALS.filter((t) => t.flag === 'REAL')
  const placeholders = TESTIMONIALS.filter((t) => t.flag === 'PLACEHOLDER')

  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <h2 className="text-fg-subtle mb-14 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          what clients say
        </h2>

        {SHOW_PLACEHOLDER_TESTIMONIALS ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {real.map((t) => (
              <TestimonialCard key={t.context} t={t} />
            ))}
            {placeholders.map((t) => (
              <TestimonialCard key={t.context} t={t} draft />
            ))}
          </div>
        ) : (
          // Single confirmed testimonial, full-width hero layout
          <div className="max-w-2xl">
            {real.map((t) => (
              <figure key={t.context} className="card-surface rounded-xl p-8">
                <span className="text-accent-primary/40 font-serif text-5xl leading-none select-none">
                  &ldquo;
                </span>
                <blockquote className="text-fg-muted -mt-2 text-base leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="border-border mt-6 flex items-center justify-between border-t pt-5">
                  <div>
                    <p className="text-foreground text-sm font-semibold">{t.role}</p>
                    <p className="text-fg-subtle mt-0.5 text-xs">{t.context}</p>
                  </div>
                  <ServicePill label={t.service} />
                </figcaption>
                <Link
                  href={t.caseStudyLink}
                  className="text-accent-primary hover:text-accent-primary/80 mt-4 inline-block text-sm transition-colors"
                >
                  View case study →
                </Link>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
