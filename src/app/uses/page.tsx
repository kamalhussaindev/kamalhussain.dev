import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Uses — Tools, Stack & Setup',
  description:
    'The hardware, software, CLI tools, and editor config I use daily as a DevOps and cloud engineer.',
  alternates: { canonical: `${SITE_URL}/uses` },
  openGraph: {
    title: 'Uses — Tools, Stack & Setup | Kamal Hussain',
    description:
      'The hardware, software, CLI tools, and editor config I use daily as a DevOps and cloud engineer.',
    url: `${SITE_URL}/uses`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Uses — Tools, Stack & Setup | Kamal Hussain',
    description:
      'The hardware, software, CLI tools, and editor config I use daily as a DevOps and cloud engineer.',
  },
}

const sections = [
  {
    title: 'Terminal & CLI',
    items: [
      {
        name: 'Windows Terminal / WSL2',
        desc: 'Ubuntu on Windows — best of both worlds for DevOps work',
      },
      {
        name: 'Zsh + Oh My Zsh',
        desc: 'Plugins: git, kubectl, z, zsh-autosuggestions, fast-syntax-highlighting',
      },
      {
        name: 'kubectl + k9s',
        desc: 'kubectl for scripting, k9s for interactive cluster navigation',
      },
      {
        name: 'terraform + terragrunt',
        desc: 'IaC — Terragrunt for DRY configuration across environments',
      },
      { name: 'helm + helmfile', desc: 'Kubernetes package management at scale' },
      { name: 'argocd CLI', desc: 'GitOps workflows and sync status from the terminal' },
      {
        name: 'aws CLI v2',
        desc: 'With aws-vault for credential management — no plaintext keys in ~/.aws',
      },
      {
        name: 'gh CLI',
        desc: 'PRs, Actions runs, and repo management without leaving the shell',
      },
      {
        name: 'jq + yq',
        desc: 'JSON/YAML parsing in scripts — indispensable for Kubernetes and AWS work',
      },
      {
        name: 'bat, fd, ripgrep, fzf',
        desc: 'Modern replacements for cat, find, grep — fzf especially for git log/branch switching',
      },
      {
        name: 'lazygit',
        desc: 'TUI for Git — faster than a GUI, more visual than the CLI',
      },
    ],
  },
  {
    title: 'Editor',
    items: [
      {
        name: 'VS Code',
        desc: 'Primary editor — fast startup, great extension ecosystem for DevOps/web work',
      },
      { name: 'GitLens', desc: 'Essential — inline blame, code history, PR integration' },
      {
        name: 'Docker + Kubernetes extensions',
        desc: 'Container and cluster management without leaving the editor',
      },
      {
        name: 'Prettier + ESLint',
        desc: 'Format on save, zero argument about code style',
      },
      {
        name: 'Tailwind CSS IntelliSense',
        desc: 'Class completion and hover preview — must-have for Tailwind projects',
      },
      {
        name: 'HashiCorp Terraform',
        desc: 'Syntax highlighting, validation, and module completion for .tf files',
      },
      {
        name: 'Geist Mono',
        desc: 'Editor font — clean, readable at small sizes, good ligatures',
      },
    ],
  },
  {
    title: 'DevOps Stack',
    items: [
      {
        name: 'AWS EKS',
        desc: 'Managed Kubernetes — go-to for AWS-native infrastructure',
      },
      {
        name: 'Terraform',
        desc: 'Infrastructure as code — modules, remote state, CI with Atlantis',
      },
      { name: 'Helm + ArgoCD', desc: 'Package management + GitOps continuous delivery' },
      {
        name: 'GitHub Actions',
        desc: 'CI/CD pipelines — OIDC auth, reusable workflows, matrix builds',
      },
      {
        name: 'Prometheus + Grafana',
        desc: 'Metrics and dashboards — kube-prometheus-stack as baseline',
      },
      {
        name: 'Loki + Promtail',
        desc: 'Log aggregation — label-based indexing keeps storage costs sane',
      },
      {
        name: 'External Secrets Operator',
        desc: 'Syncs secrets from AWS Secrets Manager into Kubernetes — no secrets in Git',
      },
      {
        name: 'cert-manager',
        desc: 'Automatic TLS certificate provisioning and rotation',
      },
      {
        name: 'Cloudflare',
        desc: 'DNS, CDN, WAF, DDoS protection — for both personal and client projects',
      },
      {
        name: 'Docker + ECR',
        desc: 'Container builds with Buildx multi-platform, ECR for registry',
      },
    ],
  },
  {
    title: 'Web Stack',
    items: [
      {
        name: 'Next.js 16 + TypeScript',
        desc: 'App Router, SSG/ISR, Server Components — best-in-class DX',
      },
      {
        name: 'Tailwind CSS v4',
        desc: 'CSS-based config, OKLCH color system, no config file overhead',
      },
      {
        name: 'Framer Motion',
        desc: 'Animation library — spring physics, layout animations, scroll-driven',
      },
      {
        name: 'GSAP + Lenis',
        desc: 'Complex scroll-triggered animations and smooth scroll',
      },
      {
        name: 'shadcn/ui',
        desc: 'Accessible component primitives — own the code, not a dependency',
      },
      { name: 'Resend', desc: 'Transactional email — clean API, React email templates' },
      {
        name: 'Vercel',
        desc: 'Deployment — zero-config Next.js hosting with preview deployments',
      },
      {
        name: 'WordPress + ACF',
        desc: 'CMS for client brochure sites and WooCommerce stores',
      },
    ],
  },
  {
    title: 'Productivity',
    items: [
      { name: 'Notion', desc: 'Notes, project docs, client onboarding templates' },
      {
        name: 'Linear',
        desc: 'Issue tracking on team projects — clean UI, good keyboard shortcuts',
      },
      {
        name: 'Excalidraw',
        desc: 'Quick architecture diagrams — hand-drawn aesthetic avoids bikeshedding',
      },
      {
        name: 'draw.io (diagrams.net)',
        desc: 'Formal architecture diagrams for client deliverables',
      },
      { name: 'Loom', desc: 'Async video walkthroughs for handover and code review' },
      {
        name: 'Cal.com',
        desc: 'Booking page for client intro calls — self-hosted on Vercel',
      },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Uses</span>
      </nav>

      <div className="mb-12 max-w-2xl">
        <p className="text-accent-primary mb-4 font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Setup
        </p>
        <h1 className="text-4xl font-bold tracking-[-0.03em]">Uses</h1>
        <p className="text-fg-muted mt-5 text-base leading-relaxed">
          The software, CLI tools, and stack I use daily. Updated when things change.
          Inspired by{' '}
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-primary hover:text-accent-primary/80 transition-colors"
          >
            uses.tech
          </a>
          .
        </p>
      </div>

      <div className="max-w-2xl space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-fg-subtle border-border mb-5 border-b pb-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              {section.title}
            </h2>
            <dl className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-1 gap-0.5 sm:grid-cols-[240px_1fr] sm:gap-6"
                >
                  <dt className="text-foreground text-sm font-medium">{item.name}</dt>
                  {item.desc && <dd className="text-fg-muted text-sm">{item.desc}</dd>}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  )
}
