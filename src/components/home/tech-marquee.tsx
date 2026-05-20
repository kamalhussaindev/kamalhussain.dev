import { Marquee } from '@/components/ui/marquee'

const ROW_1 = [
  'Kubernetes',
  'Docker',
  'AWS',
  'Terraform',
  'Helm',
  'ArgoCD',
  'GitHub Actions',
  'Prometheus',
  'Grafana',
  'Loki',
  'OpenTelemetry',
  'Istio',
  'cert-manager',
  'Vault',
  'EKS',
]

const ROW_2 = [
  'Python',
  'Go',
  'Bash',
  'Linux',
  'Nginx',
  'PostgreSQL',
  'Redis',
  'Next.js',
  'WordPress',
  'CloudFormation',
  'Pulumi',
  'Datadog',
  'PagerDuty',
  'GitLab CI',
  'Jenkins',
]

function TechBadge({ label }: { label: string }) {
  return (
    <span className="text-fg-subtle inline-flex items-center gap-3 text-sm font-medium whitespace-nowrap">
      <span className="bg-border h-1 w-1 flex-shrink-0 rounded-full" aria-hidden />
      {label}
    </span>
  )
}

export function TechMarquee() {
  return (
    <section className="border-border border-t py-12">
      <div className="space-y-4">
        <Marquee duration={35} gap={40} copies={3} direction="left">
          {ROW_1.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </Marquee>
        <Marquee duration={30} gap={40} copies={3} direction="right">
          {ROW_2.map((t) => (
            <TechBadge key={t} label={t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
