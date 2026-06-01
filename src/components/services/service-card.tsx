import Link from 'next/link'

export interface ServiceCardProps {
  title: string
  description: string
  visual?: React.ReactNode
  icon?: React.ReactNode
  tier: 1 | 2 | 3
  href: string
  stack?: string[]
  ctaLabel?: string
}

const CARD_STYLES = {
  1: 'group card-surface border-border hover:border-accent-primary/40 flex flex-col gap-4 rounded-xl border p-6 transition-all',
  2: 'group card-surface border-border hover:border-accent-primary/30 flex flex-col gap-4 rounded-xl border p-5 transition-all',
  3: 'group card-surface border-border/60 hover:border-accent-primary/20 flex flex-col gap-3 rounded-xl border p-4 transition-all',
} as const

const VISUAL_HEIGHT = {
  1: 'h-40',
  2: 'h-32',
  3: 'h-24',
} as const

const VISUAL_BORDER = {
  1: 'border-white/10',
  2: 'border-white/[0.06]',
  3: 'border-white/[0.04]',
} as const

const TITLE_STYLES = {
  1: 'text-foreground group-hover:text-accent-primary text-sm leading-snug font-medium tracking-[-0.01em] transition-colors',
  2: 'text-foreground text-sm leading-snug font-medium',
  3: 'text-fg-muted text-sm leading-snug font-medium',
} as const

const DESC_STYLES = {
  1: 'text-fg-muted mt-1.5 text-xs leading-relaxed',
  2: 'text-fg-muted mt-1.5 text-xs leading-relaxed',
  3: 'text-fg-dim mt-1.5 text-xs leading-relaxed',
} as const

const BADGE_STYLES = {
  1: 'border-border text-fg-subtle rounded-full border px-2.5 py-0.5 text-xs font-medium',
  2: 'border-border/50 text-fg-dim rounded-full border px-2 py-0.5 text-xs',
  3: 'border-border/30 text-fg-dim rounded-full border px-1.5 py-0.5 text-xs',
} as const

const CTA_STYLES = {
  1: 'text-accent-primary text-xs font-semibold transition-transform group-hover:translate-x-0.5 inline-block',
  2: 'text-fg-subtle hover:text-accent-primary text-xs font-medium transition-colors',
  3: 'text-fg-dim hover:text-fg-subtle text-xs transition-colors',
} as const

export function ServiceCard({
  title,
  description,
  visual,
  icon,
  tier,
  href,
  stack,
  ctaLabel,
}: ServiceCardProps) {
  const cta = ctaLabel ?? (tier === 1 ? 'View details →' : 'Discuss a project →')

  return (
    <Link href={href} className={CARD_STYLES[tier]}>
      {icon && !visual && <div className="text-accent-primary">{icon}</div>}

      {visual && !icon && (
        <div
          className={`overflow-hidden rounded-lg border ${VISUAL_HEIGHT[tier]} ${VISUAL_BORDER[tier]}`}
        >
          {visual}
        </div>
      )}

      <div className="flex-1">
        <h3 className={TITLE_STYLES[tier]}>{title}</h3>
        <p className={DESC_STYLES[tier]}>{description}</p>
      </div>

      {stack && stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span key={tech} className={BADGE_STYLES[tier]}>
              {tech}
            </span>
          ))}
        </div>
      )}

      <span className={CTA_STYLES[tier]}>{cta}</span>
    </Link>
  )
}
