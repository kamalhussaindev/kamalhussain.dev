import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR } from '@/lib/constants'
import { Hero } from '@/components/home/hero'
import { Stats } from '@/components/home/stats'
import { ServicesStrip } from '@/components/home/services-strip'
import { HowIWork } from '@/components/home/how-i-work'
import { ScopingCalculator } from '@/components/home/scoping-calculator'
import { WorkBento } from '@/components/home/work-bento'
import { TechMarquee } from '@/components/home/tech-marquee'
import { Testimonials } from '@/components/home/testimonials'
import { LogoStrip } from '@/components/home/logo-strip'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Reveal } from '@/components/ui/reveal'

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — Freelance DevOps & Cloud Engineer` },
  description:
    'I build production-grade Kubernetes platforms and CI/CD pipelines for startups that need infrastructure to scale. Based in Pakistan, working globally.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Freelance DevOps & Cloud Engineer`,
    description:
      'I build production-grade Kubernetes platforms and CI/CD pipelines for startups that need infrastructure to scale. Based in Pakistan, working globally.',
    url: SITE_URL,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'DevOps & Cloud Engineer',
  url: SITE_URL,
  email: AUTHOR.email,
  sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.twitter, AUTHOR.upwork],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  areaServed: 'Worldwide',
  founder: { '@type': 'Person', name: SITE_NAME },
  sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.upwork],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <LogoStrip />
      <Stats />
      <ServicesStrip />
      <HowIWork />
      <ScopingCalculator />
      <WorkBento />
      <TechMarquee />
      <Testimonials />

      {/* About teaser */}
      <section className="border-border border-t">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_280px]">
            <Reveal>
              <h2 className="text-fg-subtle mb-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                about
              </h2>
              <p className="text-fg-muted text-lg leading-relaxed">
                I started in Python and data science, moved into full-stack web
                development, and eventually found my home in DevOps and cloud engineering.
                Today I work with startups and scale-ups across the US, EU, and MENA —
                helping them build the infrastructure platforms they need to move fast
                without breaking things.
              </p>
              <Link
                href="/about"
                className="text-accent-primary hover:text-accent-primary/80 mt-5 inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                More about me <ArrowRight size={13} aria-hidden />
              </Link>
            </Reveal>
            <Reveal delay={0.15} className="flex justify-center lg:block">
              <div className="border-border relative aspect-[3/4] w-full max-w-[200px] overflow-hidden rounded-xl border lg:max-w-none">
                <Image
                  src="/kamal-hussain.png"
                  alt="Kamal Hussain"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 200px, 280px"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-border border-t">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
          <div className="card-surface rounded-xl px-8 py-12 text-center">
            <p className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
              Let&apos;s work together
            </p>
            <h2 className="max-w-[22ch] text-3xl font-bold tracking-[-0.025em] [text-wrap:balance]">
              Your infrastructure problem has a solution.
            </h2>
            <p className="text-fg-muted mx-auto mt-4 max-w-md leading-relaxed">
              CI/CD overhaul, Kubernetes platform from scratch, AWS cost audit, or an
              architecture review before your next scale event — send a brief and
              I&apos;ll respond within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-all"
                >
                  Send a project brief
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <Link
                  href="/book"
                  className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium transition-colors"
                >
                  Book a free 30-min call
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Slim checklist callout */}
      <div className="border-border bg-bg-raised/30 border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <p className="text-fg-muted text-sm">
            <span className="text-fg-subtle font-mono text-xs tracking-widest uppercase">
              Free download
            </span>{' '}
            · The Production Kubernetes Checklist (47 items)
          </p>
          <Link
            href="/checklist/kubernetes-production"
            className="text-accent-primary hover:text-accent-primary/80 flex flex-shrink-0 items-center gap-1 text-sm font-medium transition-colors"
          >
            Get the PDF <ArrowRight size={13} aria-hidden />
          </Link>
        </div>
      </div>
    </>
  )
}
