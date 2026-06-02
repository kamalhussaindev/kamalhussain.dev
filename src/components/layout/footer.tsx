import Link from 'next/link'
import { Marquee } from '@/components/ui/marquee'
import { AUTHOR, SERVICE_SLUGS, SERVICE_LABELS } from '@/lib/constants'
import { RESOURCE_SLUGS, RESOURCE_LABELS } from '@/lib/resources-data'

const pages = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/uses', label: 'Uses' },
  { href: '/now', label: 'Now' },
  { href: '/contact', label: 'Contact' },
]

const marqueItems = [
  'Available for new projects',
  'Remote',
  'Global clients',
  'Kubernetes',
  'AWS',
  'Terraform',
  'CI/CD',
  'Observability',
  'Next.js',
  'WordPress',
]

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-border bg-background mt-auto border-t">
      {/* Available-for-hire marquee */}
      <div className="border-border border-b py-6 md:py-8">
        <Marquee duration={25} gap={64} copies={2}>
          {marqueItems.map((item) => (
            <span
              key={item}
              className="flex items-center gap-4 text-base font-medium tracking-[0.2em] whitespace-nowrap text-white/70 uppercase md:text-lg"
            >
              <span
                className="bg-accent-primary h-1 w-1 flex-shrink-0 rounded-full"
                aria-hidden
              />
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-foreground text-2xl font-bold tracking-tighter transition-opacity hover:opacity-80"
            >
              KH<span className="text-accent-primary">.</span>
            </Link>
            <p className="text-fg-muted mt-3 text-sm leading-relaxed">
              DevOps & Cloud Engineer based in Rawalpindi, Pakistan. Working with clients
              in the US, EU, and MENA.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <a
                href={AUTHOR.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-subtle hover:text-foreground inline-flex h-10 w-10 items-center justify-center rounded transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={AUTHOR.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-subtle hover:text-foreground inline-flex h-10 w-10 items-center justify-center rounded transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={AUTHOR.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-subtle hover:text-foreground inline-flex min-h-[40px] items-center px-2 text-xs font-medium transition-colors"
              >
                Upwork
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-fg-subtle mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="text-fg-muted hover:text-foreground block py-1.5 text-sm leading-snug transition-colors sm:py-0"
                  >
                    {SERVICE_LABELS[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-fg-subtle mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Pages
            </h3>
            <ul className="space-y-2.5">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fg-muted hover:text-foreground block py-1.5 text-sm transition-colors sm:py-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hire */}
          <div>
            <h3 className="text-fg-subtle mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Work with me
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/book"
                  className="text-fg-muted hover:text-foreground block py-1.5 text-sm transition-colors sm:py-0"
                >
                  Book a 30-min call
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-fg-muted hover:text-foreground block py-1.5 text-sm transition-colors sm:py-0"
                >
                  Send a project brief
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${AUTHOR.email}`}
                  className="text-fg-muted hover:text-foreground block py-1.5 text-sm break-all transition-colors sm:py-0"
                >
                  {AUTHOR.email}
                </a>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-fg-subtle mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Free Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/checklist/kubernetes-production"
                  className="text-fg-muted hover:text-foreground block py-1.5 text-sm leading-snug transition-colors sm:py-0"
                >
                  Kubernetes Production Checklist (47 items)
                </Link>
              </li>
              {RESOURCE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/resources/${slug}`}
                    className="text-fg-muted hover:text-foreground block py-1.5 text-sm leading-snug transition-colors sm:py-0"
                  >
                    {RESOURCE_LABELS[slug]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big wordmark + copyright */}
        <div className="border-border mt-12 border-t pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p
                className="text-fg-dim text-[clamp(48px,8vw,96px)] leading-none font-bold tracking-tighter select-none"
                aria-hidden
              >
                KH.
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-fg-subtle text-xs">
                © {year} Kamal Hussain. All rights reserved.
              </p>
              <p className="text-fg-subtle text-xs">
                Rawalpindi, Pakistan · Remote worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
