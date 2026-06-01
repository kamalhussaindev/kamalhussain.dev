import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { SITE_URL, SITE_NAME, AUTHOR } from '@/lib/constants'
import { PLACEHOLDERS } from '@/lib/placeholders'

export const metadata: Metadata = {
  title: 'About Kamal Hussain — DevOps & Cloud Engineer',
  description:
    'DevOps & cloud engineer based in Rawalpindi, Pakistan. I help startups build production-grade infrastructure — Kubernetes, CI/CD, AWS, observability.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: { title: 'About Kamal Hussain', url: `${SITE_URL}/about` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'DevOps & Cloud Engineer',
  url: SITE_URL,
  email: AUTHOR.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Rawalpindi',
    addressCountry: 'PK',
  },
  sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.twitter, AUTHOR.upwork],
  knowsAbout: [
    'Kubernetes',
    'AWS',
    'Terraform',
    'CI/CD',
    'Docker',
    'Prometheus',
    'Grafana',
    'ArgoCD',
    'Next.js',
    'DevOps',
    'Cloud Engineering',
    'Site Reliability Engineering',
  ],
}

const SKILLS = [
  'Kubernetes',
  'EKS / GKE / AKS',
  'Docker',
  'AWS',
  'Terraform',
  'Helm',
  'ArgoCD',
  'GitHub Actions',
  'GitLab CI',
  'Prometheus',
  'Grafana',
  'Loki',
  'OpenTelemetry',
  'HashiCorp Vault',
  'Python',
  'Bash',
  'Go',
  'Next.js',
  'WordPress',
  'Linux',
  'Nginx',
  'PostgreSQL',
  'Redis',
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-fg-subtle mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>

        {/* Full-width mega hero */}
        <div className="border-border mb-16 border-b pb-16">
          <p className="text-fg-subtle mb-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            About
          </p>
          <h1 className="text-hero text-foreground mb-10 max-w-[22ch] font-bold tracking-[-0.04em] [text-wrap:balance]">
            Kamal Hussain
          </h1>
          <div>
            <p className="text-fg-muted mb-2 text-xl tracking-[-0.01em]">
              Freelance DevOps &amp; Cloud Engineer
            </p>
            <p className="text-fg-subtle text-sm">
              Rawalpindi, Pakistan · Remote worldwide · Available for new projects
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="max-w-2xl">
            <div className="text-fg-muted space-y-6 text-lg leading-relaxed">
              <p>
                I&apos;m a freelance DevOps and cloud engineer based in Rawalpindi,
                Pakistan. I work with startups and scale-ups across the US, EU, and MENA
                on the infrastructure that lets them ship confidently — Kubernetes
                platforms, CI/CD pipelines, AWS infrastructure, and observability stacks.
              </p>

              <p>
                My background is a bit of a journey. I started with Python and data
                science, curious about how data moves and gets transformed. That curiosity
                pulled me toward web development — building the systems that serve the
                data, not just analyze it. Then I discovered DevOps and found the work I
                actually wanted to do: the platform layer. The infrastructure that sits
                between code and users. The part that determines whether 2am is a boring
                night or a firefighting disaster.
              </p>

              <p>
                Today I run the full range of DevOps and cloud work: building Kubernetes
                platforms on EKS from scratch, designing CI/CD pipelines that actually
                scale, writing Terraform that a team can maintain, wiring up observability
                so on-call rotations aren&apos;t a nightmare. I also do web development —
                Next.js, WordPress, custom themes, headless CMSs — mostly for clients who
                need both infrastructure and a site, and want one person who can do both
                well.
              </p>

              <h2 className="text-foreground pt-4 text-2xl font-bold tracking-[-0.02em]">
                How I work
              </h2>

              {/* PLACEHOLDER-IMG: Replace with real workspace/desk photo */}
              <div className="border-border relative my-2 h-56 overflow-hidden rounded-xl border">
                <Image
                  src={PLACEHOLDERS.aboutWorkspace}
                  alt="Kamal's workspace"
                  fill
                  className="object-cover"
                />
              </div>

              <p>
                Async-first. I write things down. I document my decisions and the
                alternatives I rejected. I prefer a Notion doc or ADR over a Slack call.
                When I do get on a call, I prepare an agenda and take notes that get
                shared afterward.
              </p>

              <p>
                GitOps by default — everything that matters lives in version control.
                Infrastructure state is not a mystery; it&apos;s a PR. Secrets management
                is not a spreadsheet; it&apos;s a vault. Every change is reviewed, every
                deployment is auditable.
              </p>

              <p>
                I care about handover. When I leave a project, the team should be able to
                run the thing without me. That means runbooks, reasonable README files,
                and infrastructure that isn&apos;t held together by one person&apos;s
                tribal knowledge.
              </p>

              <h2 className="text-foreground pt-4 text-2xl font-bold tracking-[-0.02em]">
                Currently
              </h2>

              <p>
                Open to new projects — Kubernetes platforms, CI/CD work, AWS
                infrastructure, and DevOps consulting. Typical engagement is 2–8 weeks for
                a focused build, or an ongoing retainer for platform engineering support.
                See the{' '}
                <Link
                  href="/now"
                  className="text-accent-primary hover:text-accent-primary/80 transition-colors"
                >
                  /now page
                </Link>{' '}
                for what I&apos;m working on right now.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-all"
              >
                Work with me
              </Link>
              <Link
                href="/work"
                className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                See case studies <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:pt-20">
            {/* PLACEHOLDER-IMG: Replace with real portrait photo of Kamal */}
            <div className="border-border relative aspect-[3/4] overflow-hidden rounded-xl border">
              <Image
                src={PLACEHOLDERS.aboutHeroPortrait}
                alt="Kamal Hussain"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Links */}
            <div>
              <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Find me
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'GitHub', href: AUTHOR.github },
                  { label: 'LinkedIn', href: AUTHOR.linkedin },
                  { label: 'X / Twitter', href: AUTHOR.twitter },
                  { label: 'Upwork', href: AUTHOR.upwork },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg-muted hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
                    >
                      {label}
                      <ExternalLink size={11} className="text-fg-dim" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Tech I use
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="border-border text-fg-muted inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-fg-subtle mb-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Location
              </h3>
              <p className="text-fg-muted text-sm">Rawalpindi, Pakistan</p>
              <p className="text-fg-subtle text-sm">PKT · UTC+5</p>
              <p className="text-fg-muted mt-1.5 text-sm">Remote worldwide</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
