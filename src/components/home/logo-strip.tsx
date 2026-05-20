import { Cloud } from 'lucide-react'
import {
  siKubernetes,
  siTerraform,
  siDocker,
  siArgo,
  siGithubactions,
  siPrometheus,
  siGrafana,
  siDatadog,
  siVercel,
  siNextdotjs,
  siWordpress,
} from 'simple-icons'
import type { SimpleIcon } from 'simple-icons'

interface SiEntry {
  kind: 'si'
  icon: SimpleIcon
  label: string
}

interface LucideEntry {
  kind: 'lucide'
  label: string
}

type TechEntry = SiEntry | LucideEntry

// AWS removed from simple-icons v16+ (trademark) — Lucide Cloud used as fallback
const TECH_ICONS: TechEntry[] = [
  { kind: 'lucide', label: 'AWS' },
  { kind: 'si', icon: siKubernetes, label: 'Kubernetes' },
  { kind: 'si', icon: siTerraform, label: 'Terraform' },
  { kind: 'si', icon: siDocker, label: 'Docker' },
  { kind: 'si', icon: siArgo, label: 'ArgoCD' },
  { kind: 'si', icon: siGithubactions, label: 'GitHub Actions' },
  { kind: 'si', icon: siPrometheus, label: 'Prometheus' },
  { kind: 'si', icon: siGrafana, label: 'Grafana' },
  { kind: 'si', icon: siDatadog, label: 'Datadog' },
  { kind: 'si', icon: siVercel, label: 'Vercel' },
  { kind: 'si', icon: siNextdotjs, label: 'Next.js' },
  { kind: 'si', icon: siWordpress, label: 'WordPress' },
]

function TechItem({ entry }: { entry: TechEntry }) {
  return (
    <div className="flex flex-col items-center gap-2 opacity-50 motion-safe:transition-opacity motion-safe:hover:opacity-90">
      {entry.kind === 'si' ? (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="text-foreground h-7 w-7 fill-current"
          aria-label={entry.label}
        >
          <path d={entry.icon.path} />
        </svg>
      ) : (
        <Cloud
          size={28}
          strokeWidth={1.5}
          className="text-foreground"
          aria-label={entry.label}
        />
      )}
      <span className="text-fg-subtle text-xs tracking-wide">{entry.label}</span>
    </div>
  )
}

export function LogoStrip() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-fg-dim mb-8 text-center font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Technologies I work with every day
        </p>
        <div className="flex flex-wrap items-start justify-center gap-8 md:gap-10">
          {TECH_ICONS.map((entry) => (
            <TechItem key={entry.label} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
