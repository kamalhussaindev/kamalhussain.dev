'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SERVICE_SLUGS, SERVICE_LABELS } from '@/lib/constants'

const SERVICE_DESCRIPTIONS: Record<(typeof SERVICE_SLUGS)[number], string> = {
  'kubernetes-platform-engineering':
    'Production-ready EKS/GKE clusters with GitOps, RBAC, autoscaling, and observability baked in.',
  'cicd-pipeline-engineering':
    'GitHub Actions, GitLab CI, and Jenkins pipelines that deploy in minutes, not hours.',
  'aws-terraform-infrastructure':
    'Reproducible, auditable AWS infrastructure built with Terraform and security best practices.',
  'observability-engineering':
    'Prometheus, Grafana, Loki, and OTel stacks that surface problems before your users do.',
  'wordpress-web-development':
    'High-performance WordPress on managed hosting with CDN, caching, and proper CI/CD.',
  'devops-consulting-audits':
    'Infrastructure audits, incident post-mortems, and actionable roadmaps for engineering teams.',
}

const NUMS = ['01', '02', '03', '04', '05', '06'] as const

export function ServicesStrip() {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!listRef.current) return
      const items = listRef.current.querySelectorAll('li')
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%', once: true },
        },
      )
    }
    init()
  }, [])

  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-fg-subtle font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            services · 06
          </h2>
          <Link
            href="/services"
            className="text-fg-muted hover:text-foreground flex items-center gap-1 text-sm transition-colors"
          >
            All services <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>

        <ul ref={listRef} className="divide-border divide-y">
          {SERVICE_SLUGS.map((slug, i) => (
            <li key={slug}>
              <Link
                href={`/services/${slug}`}
                className="group hover:bg-bg-raised/50 -mx-4 flex items-center gap-6 rounded-lg px-4 py-5 transition-colors"
              >
                <span className="text-fg-dim w-6 flex-shrink-0 font-mono text-xs">
                  {NUMS[i]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground group-hover:text-accent-primary text-base font-medium transition-colors">
                    {SERVICE_LABELS[slug]}
                  </p>
                  <p className="text-fg-muted mt-0.5 truncate text-sm">
                    {SERVICE_DESCRIPTIONS[slug]}
                  </p>
                </div>
                <ArrowUpRight
                  size={15}
                  className="text-fg-dim group-hover:text-accent-primary flex-shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
