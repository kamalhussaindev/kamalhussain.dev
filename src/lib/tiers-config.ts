export interface TierService {
  slug: string
  title: string
  description: string
  stack: string[]
  href: string
  hasDetailPage: boolean
}

export interface Tier {
  id: string
  number: string
  title: string
  subtitle: string
  services: TierService[]
}

export const TIERS: Tier[] = [
  {
    id: 'tier-1',
    number: '01',
    title: 'Cloud & DevOps Engineering',
    subtitle:
      "What I'm known for — production infrastructure for teams that can't afford downtime.",
    services: [
      {
        slug: 'kubernetes-platform-engineering',
        title: 'Kubernetes Platform Engineering',
        description:
          'Production-ready EKS clusters with GitOps, RBAC, autoscaling, and observability baked in from day one.',
        stack: ['Kubernetes', 'EKS', 'ArgoCD', 'Terraform'],
        href: '/services/kubernetes-platform-engineering',
        hasDetailPage: true,
      },
      {
        slug: 'cicd-pipeline-engineering',
        title: 'CI/CD Pipeline Engineering',
        description:
          'GitHub Actions and GitLab CI pipelines that deploy in minutes, not hours — and stay green.',
        stack: ['GitHub Actions', 'ArgoCD', 'Helm', 'OIDC'],
        href: '/services/cicd-pipeline-engineering',
        hasDetailPage: true,
      },
      {
        slug: 'aws-terraform-infrastructure',
        title: 'AWS Infrastructure with Terraform',
        description:
          'Your AWS estate — reproducible, auditable, cost-visible, and safe to change.',
        stack: ['Terraform', 'AWS', 'Atlantis', 'Infracost'],
        href: '/services/aws-terraform-infrastructure',
        hasDetailPage: true,
      },
      {
        slug: 'observability-engineering',
        title: 'Observability Engineering',
        description:
          'See everything. Alert on what matters. Prometheus, Grafana, Loki, and OpenTelemetry — configured for your stack.',
        stack: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry'],
        href: '/services/observability-engineering',
        hasDetailPage: true,
      },
    ],
  },
  {
    id: 'tier-2',
    number: '02',
    title: 'Web & Product Development',
    subtitle: 'Build the product: apps, sites, and automation.',
    services: [
      {
        slug: 'custom-web-saas',
        title: 'Custom Web & SaaS',
        description:
          'From landing page to full SaaS product — Next.js, APIs, auth, payments, and deployment in a single engagement.',
        stack: ['Next.js', 'React', 'PostgreSQL', 'Stripe'],
        href: '/contact',
        hasDetailPage: false,
      },
      {
        slug: 'ai-chatbots',
        title: 'AI Chatbots',
        description:
          'LLM-powered assistants trained on your docs, CRM, or knowledge base. Deployed as a real product feature, not a demo.',
        stack: ['OpenAI API', 'LangChain', 'RAG', 'Next.js'],
        href: '/contact',
        hasDetailPage: false,
      },
      {
        slug: 'wordpress-web-development',
        title: 'WordPress Sites',
        description:
          'Fast, secure WordPress sites with CI/CD, caching, CDN, and SEO foundations built in — by an engineer, not a page builder.',
        stack: ['WordPress', 'WooCommerce', 'Cloudflare', 'ACF'],
        href: '/contact',
        hasDetailPage: false,
      },
    ],
  },
  {
    id: 'tier-3',
    number: '03',
    title: 'Reliability & Support',
    subtitle: 'Keep it running: support and hosting on a retainer.',
    services: [
      {
        slug: 'server-troubleshooting',
        title: 'Server Troubleshooting',
        description:
          'Production incident response — Linux, Docker, Kubernetes, AWS. Fixed fast, root-cause writeup included.',
        stack: ['Linux', 'Docker', 'AWS', 'Kubernetes'],
        href: '/contact',
        hasDetailPage: false,
      },
      {
        slug: 'hosting-management',
        title: 'Hosting Management',
        description:
          'Managed hosting operations on retainer: updates, backups, uptime monitoring, and scaling — handled for you.',
        stack: ['AWS', 'DigitalOcean', 'Cloudflare', 'Nginx'],
        href: '/contact',
        hasDetailPage: false,
      },
      {
        slug: 'devops-consulting-audits',
        title: 'DevOps Consulting & Audits',
        description:
          'An independent eye on your infrastructure — findings ranked by risk with a phased remediation roadmap.',
        stack: ['AWS', 'Kubernetes', 'Terraform', 'tfsec'],
        href: '/contact',
        hasDetailPage: false,
      },
    ],
  },
]

/** The 3 Tier 1 slugs shown on the home page (flagship teaser) */
export const HOME_TIER1_SLUGS = [
  'kubernetes-platform-engineering',
  'cicd-pipeline-engineering',
  'aws-terraform-infrastructure',
] as const
