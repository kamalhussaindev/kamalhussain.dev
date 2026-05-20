import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Mail } from 'lucide-react'
import { SITE_URL, AUTHOR } from '@/lib/constants'
import { PLACEHOLDERS } from '@/lib/placeholders'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata: Metadata = {
  title: 'Contact — Start a Project',
  description:
    'Get in touch with Kamal Hussain. Send a project brief or book a 30-minute intro call to discuss your DevOps and cloud engineering needs.',
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: { title: 'Contact | Kamal Hussain', url: `${SITE_URL}/contact` },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Contact</span>
      </nav>

      <div className="mb-12 max-w-2xl">
        <p className="text-accent-primary mb-4 font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Get in touch
        </p>
        <h1 className="max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
          Let&apos;s talk about your project.
        </h1>
        <p className="text-fg-muted mt-5 text-lg leading-relaxed">
          Tell me what you&apos;re building and what&apos;s broken. I reply within one
          business day. Or skip the form and book a call directly — 30 minutes, no
          obligation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:col-span-2">
          {/* PLACEHOLDER-IMG: Replace with real photo of Kamal or office/working shot */}
          <div className="border-border relative h-48 overflow-hidden rounded-xl border">
            <Image
              src={PLACEHOLDERS.contactImage}
              alt="Kamal Hussain"
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="card-surface rounded-xl p-5">
            <div className="mb-3 flex items-center gap-2">
              <Calendar size={15} className="text-accent-primary" aria-hidden />
              <h3 className="text-sm font-semibold">Book a call instead</h3>
            </div>
            <p className="text-fg-muted mb-4 text-sm leading-relaxed">
              Prefer to talk? Book a free 30-minute intro call. Come with your problem;
              I&apos;ll come with questions.
            </p>
            <Link
              href="/book"
              className="bg-accent-primary hover:bg-accent-primary/90 block w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors"
            >
              Book 30-min call
            </Link>
          </div>

          <div className="card-surface rounded-xl p-5">
            <div className="mb-3 flex items-center gap-2">
              <Mail size={15} className="text-accent-primary" aria-hidden />
              <h3 className="text-sm font-semibold">Direct email</h3>
            </div>
            <a
              href={`mailto:${AUTHOR.email}`}
              className="text-accent-primary hover:text-accent-primary/80 text-sm break-all transition-colors"
            >
              {AUTHOR.email}
            </a>
          </div>

          <div className="card-surface rounded-xl p-5">
            <h3 className="mb-3 text-sm font-semibold">What happens next</h3>
            <ol className="text-fg-muted space-y-2.5 text-sm">
              {[
                'I read your brief and reply within one business day',
                'I send clarifying questions or a rough scope outline',
                '30-min call to align on scope and fit',
                'Fixed-price or day-rate proposal',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-accent-primary mt-0.5 flex-shrink-0 font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="card-surface rounded-xl p-5">
            <h3 className="mb-2 text-sm font-semibold">Response time</h3>
            <p className="text-fg-muted text-sm">
              Within 1 business day · PKT (UTC+5) · Mon–Fri
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
