export const WORK_SLUGS = ['pulsehealth-eks'] as const

export type WorkSlug = (typeof WORK_SLUGS)[number]

export interface CaseStudy {
  slug: WorkSlug
  headline: string
  client: string
  industry: string
  duration: string
  year: string
  metric: string
  metricLabel: string
  tags: string[]
  summary: string
  tldr: { label: string; value: string }[]
  challenge: string[]
  approach: { title: string; body: string }[]
  results: { metric: string; label: string }[]
  stack: string[]
  testimonial?: { quote: string; role: string }
}

export const WORK_DATA: Record<WorkSlug, CaseStudy> = {
  'pulsehealth-eks': {
    slug: 'pulsehealth-eks',
    headline: 'PulseHealth EKS: production observability platform',
    client: 'Self-directed engineering build',
    industry: 'Engineering case study',
    duration: 'Self-paced',
    year: '2025',
    metric: '$6.50',
    metricLabel: 'Total AWS cost (full build)',
    tags: ['EKS', 'Prometheus', 'Grafana', 'Loki', 'Terraform', 'Kubernetes'],
    summary:
      'A self-directed engineering project to build, instrument, and measure a production-grade EKS observability stack on AWS. Goal: document real costs, latency, and configuration decisions for a minimal-footprint production cluster. All numbers are measured from the running platform — this is not a client engagement.',
    tldr: [
      { label: 'Total AWS cost', value: '$6.50' },
      { label: 'Ingress success rate', value: '96.7%' },
      { label: 'p99 latency', value: '44ms' },
      { label: 'Production K8s checklist', value: '47 items' },
    ],
    challenge: [
      'Most Kubernetes tutorials show you how to get a cluster running. Very few document what it actually costs to build a production-ready observability stack from scratch — the real configuration decisions, the tradeoffs, and the dollar figure at the end of the month.',
      'I wanted to build a reference platform I could document in full: every Terraform resource, every Helm value, every architectural decision. The goal was to produce a methodology I could apply to client platforms and share as educational content — not a toy setup, but something that would survive real traffic patterns and generate honest metrics.',
      'The secondary output was the 47-item production Kubernetes checklist, which came directly from every decision point I hit during the build. Each item represents something that bit me, something I had to look up, or something I consciously chose to skip and documented why.',
    ],
    approach: [
      {
        title: 'Terraform-provisioned EKS cluster',
        body: 'All infrastructure provisioned via Terraform — VPC, subnets, EKS cluster, node groups, IAM roles. Minimal footprint: t3.medium node group, single AZ to keep costs honest during the build. Remote state in S3 with DynamoDB locking from day one. The module structure mirrors what I use for a production multi-AZ cluster, so the patterns transfer directly to client work.',
      },
      {
        title: 'Observability stack: Prometheus, Grafana, Loki',
        body: 'Deployed kube-prometheus-stack via Helm, with Loki for log aggregation and Promtail as the DaemonSet log collector. Custom Grafana dashboards for cluster health, ingress metrics, and application latency. Alertmanager rules configured for the conditions that would matter in production: pod crash loops, persistent volume pressure, ingress error rate above threshold.',
      },
      {
        title: 'NGINX Ingress with TLS and rate limiting',
        body: "NGINX Ingress Controller deployed via Helm with cert-manager handling automatic TLS certificate provisioning via Let's Encrypt. Rate limiting configured at the ingress level. Load tested with k6 to measure real ingress behaviour under concurrent request load — the 96.7% success rate and 44ms p99 latency are from these test runs, not theoretical estimates.",
      },
      {
        title: 'Documentation and production checklist',
        body: 'Every architectural decision was written up as an ADR as I made it. At the end of the build, I synthesised all the decision points, gotchas, and configuration requirements into the 47-item production Kubernetes checklist — now available as a free download. The checklist covers cluster setup, networking, RBAC, secrets management, observability, autoscaling, and disaster recovery.',
      },
    ],
    results: [
      { metric: '$6.50', label: 'Total AWS cost to build and run the platform' },
      { metric: '96.7%', label: 'Ingress success rate under k6 load test' },
      { metric: '44ms', label: 'p99 latency under test load' },
      { metric: '47', label: 'Item production Kubernetes checklist produced' },
    ],
    stack: [
      'EKS',
      'Terraform',
      'Helm',
      'Prometheus',
      'Grafana',
      'Loki',
      'Promtail',
      'NGINX Ingress',
      'cert-manager',
      'Alertmanager',
      'k6',
      'AWS VPC',
      'AWS ECR',
    ],
  },
}
