import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, AUTHOR } from '@/lib/constants'
import { PLACEHOLDERS } from '@/lib/placeholders'
import { CalEmbed } from '@/components/book/cal-embed'

export const metadata: Metadata = {
  title: 'Book a Call — 30-Minute Intro Call',
  description:
    'Schedule a free 30-minute intro call with Kamal Hussain. Discuss your DevOps or cloud infrastructure needs and find out if we are a good fit.',
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: { title: 'Book a Call | Kamal Hussain', url: `${SITE_URL}/book` },
}

const TRUST_SIGNALS = [
  { value: '< 24h', label: 'Response time' },
  { value: 'Free', label: 'No charge, ever' },
  { value: '30 min', label: 'No fluff, no pitch' },
  { value: 'Async', label: 'Works if you prefer email' },
]

const WHAT_TO_BRING = [
  "A rough description of what you're building or what's broken",
  "Your stack — even if it's messy or partially defined",
  'Your timeline and budget range (ballpark is fine)',
]

const FAQS = [
  {
    q: 'What happens after the call?',
    a: "If there's a fit, I'll send a written scope document within 48 hours — what I'd deliver, roughly how long it takes, and a fixed price or day-rate estimate. No pressure, no follow-up cadence. You reply when you're ready.",
  },
  {
    q: 'Do I need to prep anything?',
    a: "No deck required. Just know roughly what problem you're trying to solve. I'll ask the right questions. If you have existing architecture docs, Terraform code, or a CI/CD setup you want me to review, sharing those before the call is useful but not required.",
  },
  {
    q: 'What if my project is too small? Or too big?',
    a: "I'll tell you honestly. For very small one-off tasks (a single Terraform module, a quick security review), I'll tell you whether a short engagement makes sense or whether you'd be better served by documentation and doing it yourself. For large projects that need a full team, I'll be direct about whether that's better run through NxtAuric.",
  },
  {
    q: 'Is this really free?',
    a: "Yes. I don't charge for discovery calls. My time is the investment — if we figure out quickly that we're not a fit, that's fine. I'd rather you know that before any money changes hands.",
  },
  {
    q: 'I prefer async. Can I just email you?',
    a: "Absolutely. Use the contact form to send a project brief — describe what you're building, your stack, and your rough timeline. I'll reply within 24 hours with questions or a proposed scope.",
  },
]

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Book a call</span>
      </nav>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_480px]">
        {/* Left — pitch + trust */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="text-fg-subtle mb-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              free · 30 minutes · no pitch
            </p>
            <h1 className="mb-6 max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
              Book a 30-minute intro call
            </h1>
            <p className="text-fg-muted text-lg leading-relaxed">
              Come with your problem — what you&apos;re building, what&apos;s breaking,
              what you need to scale. I&apos;ll come with questions. If we&apos;re a good
              fit, I&apos;ll send a written scope within 48 hours.
            </p>
          </div>

          {/* Trust signal stats */}
          <div className="border-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border">
            {TRUST_SIGNALS.map(({ value, label }) => (
              <div key={label} className="bg-bg-raised px-5 py-4">
                <p className="text-foreground text-xl font-bold tracking-[-0.02em]">
                  {value}
                </p>
                <p className="text-fg-subtle mt-0.5 text-xs">{label}</p>
              </div>
            ))}
          </div>

          {/* What to bring */}
          <div>
            <h2 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              What to bring
            </h2>
            <ul className="space-y-3">
              {WHAT_TO_BRING.map((item) => (
                <li key={item} className="text-fg-muted flex items-start gap-3 text-sm">
                  <span
                    className="bg-accent-primary mt-1.5 h-1 w-1 flex-shrink-0 rounded-full"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Async fallback */}
          <div className="card-surface rounded-xl px-6 py-5">
            <p className="text-foreground mb-1 text-sm font-semibold">Prefer async?</p>
            <p className="text-fg-muted mb-3 text-sm leading-relaxed">
              Skip the call — send a written brief and I&apos;ll respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="text-accent-primary hover:text-accent-primary/80 text-sm font-medium transition-colors"
            >
              Send a project brief →
            </Link>
          </div>
        </div>

        {/* Right — Cal embed */}
        <div>
          {/* PLACEHOLDER-IMG: Replace with real portrait of Kamal */}
          <div className="border-border relative mb-6 h-52 overflow-hidden rounded-xl border">
            <Image
              src={PLACEHOLDERS.bookPortrait}
              alt="Kamal Hussain"
              fill
              className="object-cover object-top"
            />
          </div>
          <CalEmbed />
          <noscript>
            <div className="card-surface mt-4 rounded-xl p-8 text-center">
              <p className="text-fg-muted mb-4 text-sm">
                JavaScript is required to load the booking calendar.
              </p>
              <a
                href={AUTHOR.calcom}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-colors"
              >
                Book on Cal.com
              </a>
            </div>
          </noscript>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-24 max-w-3xl">
        <h2 className="text-fg-subtle mb-8 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          Common questions
        </h2>
        <div className="space-y-1">
          {FAQS.map((faq) => (
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
  )
}
