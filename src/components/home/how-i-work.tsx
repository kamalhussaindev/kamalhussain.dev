import Link from 'next/link'

const PRINCIPLES = [
  'Async-first — written over calls',
  'GitOps — every change auditable',
  'Weekly demos + written summaries',
  '30-day handover support window',
] as const

export function HowIWork() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="text-fg-subtle font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            how i work
          </h2>
          <Link
            href="/about"
            className="text-fg-muted hover:text-foreground text-sm transition-colors"
          >
            About me →
          </Link>
        </div>

        <div className="max-w-2xl">
          <h3 className="text-foreground mb-6 text-2xl leading-snug font-bold tracking-[-0.02em] md:text-3xl">
            You work directly with me — no account managers, no handoffs.
          </h3>
          <p className="text-fg-muted mb-10 text-lg leading-relaxed">
            One engineer who understands your whole stack, from the Terraform up to the
            dashboards, and stays accountable start to finish.
          </p>

          <ul className="mb-10 space-y-3">
            {PRINCIPLES.map((item) => (
              <li key={item} className="text-fg-muted flex items-center gap-3 text-base">
                <span
                  className="bg-accent-primary h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
