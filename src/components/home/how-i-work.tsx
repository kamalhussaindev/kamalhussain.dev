import Image from 'next/image'
import Link from 'next/link'
import { AUTHOR } from '@/lib/constants'

const COLUMNS = [
  {
    num: '01',
    heading: 'Solo, when that’s the right call',
    body: 'For scopes under 6 weeks, direct technical work, or situations where you want one person who understands your full stack — I work solo. You get my direct time, no coordination overhead, and a single point of accountability.',
    card: (
      <div className="border-border bg-bg-raised mt-6 flex items-center gap-4 rounded-xl border px-5 py-4">
        <Image
          src="/kamal-hussain.png"
          alt="Kamal Hussain"
          width={48}
          height={48}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover object-top"
        />
        <div>
          <p className="text-foreground text-sm font-semibold">Kamal Hussain</p>
          <p className="text-fg-subtle mt-0.5 text-xs">Founder · DevOps Engineer</p>
        </div>
      </div>
    ),
  },
  {
    num: '02',
    heading: 'With a team, when you need more',
    body: 'Longer engagements, multi-discipline work — design, frontend, backend, DevOps, WordPress — run through NxtAuric. I bring in the right people and stay as the lead. You still deal with one person.',
    card: (
      <a
        href={AUTHOR.agency}
        target="_blank"
        rel="noopener noreferrer"
        className="group border-border bg-bg-raised hover:border-accent-primary/40 mt-6 flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors"
      >
        <div
          className="bg-bg-overlay border-border text-accent-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold tracking-tight"
          aria-hidden
        >
          NA
        </div>
        <div>
          <p className="text-foreground group-hover:text-accent-primary text-sm font-semibold transition-colors">
            NxtAuric
          </p>
          <p className="text-fg-subtle mt-0.5 text-xs">
            Engineering · Design · Infrastructure
          </p>
          <p className="text-accent-primary mt-1 text-xs">Visit nxtauric.com →</p>
        </div>
      </a>
    ),
  },
  {
    num: '03',
    heading: 'Either way, one point of contact',
    body: 'Async-first communication. Written ADRs for every architectural decision. GitOps so every change is in version control. Weekly demo calls. End-of-engagement runbooks. Whatever the scope, the process is the same.',
    card: (
      <ul className="mt-6 space-y-2.5">
        {[
          'Async-first · written over calls',
          'GitOps · every change auditable',
          'Weekly demos + written summaries',
          '30-day handover support window',
        ].map((item) => (
          <li key={item} className="text-fg-muted flex items-center gap-2.5 text-sm">
            <span
              className="bg-accent-primary h-1 w-1 flex-shrink-0 rounded-full"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
] as const

export function HowIWork() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="text-fg-subtle font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            how i work · 03
          </h2>
          <Link
            href="/about"
            className="text-fg-muted hover:text-foreground text-sm transition-colors"
          >
            About me →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.num} className="flex flex-col">
              <span className="text-accent-primary mb-4 font-mono text-xs font-bold tracking-[0.2em]">
                {col.num}
              </span>
              <h3 className="text-foreground mb-3 text-xl leading-snug font-bold tracking-[-0.02em] md:text-2xl">
                {col.heading}
              </h3>
              <p className="text-fg-muted flex-1 text-base leading-relaxed">{col.body}</p>
              {col.card}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
