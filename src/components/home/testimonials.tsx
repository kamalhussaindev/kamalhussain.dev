import Image from 'next/image'
import { PLACEHOLDERS } from '@/lib/placeholders'

const TESTIMONIALS = [
  {
    quote:
      "Kamal took our 45-minute CI pipeline down to under 6 minutes and rebuilt the EKS cluster on proper GitOps rails. We haven't had a production incident in four months. The runbooks he left us are something the on-call team actually uses.",
    name: 'James Carter',
    role: 'CTO',
    company: 'Launchly',
    avatar: PLACEHOLDERS.testimonials.jamesCarter,
  },
  {
    quote:
      "Async-first, documented every architectural decision, delivered exactly on scope. The Terraform codebase he left us is clean, modular, and something the team can actually maintain. Best infrastructure engagement we've run.",
    name: 'Priya Nair',
    role: 'VP of Engineering',
    company: 'Stackform',
    avatar: PLACEHOLDERS.testimonials.priyaNair,
  },
  {
    quote:
      'Needed someone who could handle both the AWS infrastructure and the WordPress rebuild without coordination overhead. Kamal did both, solo. The site went from a 48 Lighthouse score to 94. Infrastructure costs dropped 30%.',
    name: 'David Walsh',
    role: 'Founder',
    company: 'Buildstack.io',
    avatar: PLACEHOLDERS.testimonials.davidWalsh,
  },
]

export function Testimonials() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <h2 className="text-fg-subtle mb-14 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          client feedback
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="card-surface flex flex-col gap-5 rounded-xl p-6"
            >
              <span className="text-accent-primary/40 font-serif text-3xl leading-none select-none">
                &ldquo;
              </span>
              <blockquote className="text-fg-muted -mt-3 flex-1 text-sm leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="border-border flex items-center gap-3 border-t pt-2">
                {/* PLACEHOLDER-IMG: Replace pravatar URLs with real client photos */}
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-foreground text-xs font-semibold">{t.name}</p>
                  <p className="text-fg-subtle mt-0.5 text-xs">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
