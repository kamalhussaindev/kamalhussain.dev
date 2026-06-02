'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { SERVICE_SLUGS, SERVICE_LABELS, AUTHOR } from '@/lib/constants'

const BUDGET_OPTIONS = [
  'Under $2,000',
  '$2,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
  'Not sure yet',
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-border bg-bg-raised px-4 py-2.5 text-sm text-foreground placeholder:text-fg-dim focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors'

// Get your free key at web3forms.com — enter your email, they send it instantly
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const fd = new FormData(e.currentTarget)
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New project brief from ${fd.get('name')}`,
      from_name: fd.get('name') as string,
      email: fd.get('email') as string,
      company: fd.get('company') as string,
      service: fd.get('service') as string,
      budget: fd.get('budget') as string,
      message: fd.get('message') as string,
      botcheck: '',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <div className="flex items-center gap-3">
          <CheckCircle
            size={22}
            className="text-accent-primary flex-shrink-0"
            aria-hidden
          />
          <h2 className="text-lg font-semibold">Brief received — thanks!</h2>
        </div>
        <p className="text-fg-muted max-w-md text-sm leading-relaxed">
          I&apos;ve received your project brief and will reply within one business day.
          Check your inbox — you should receive a confirmation shortly.
        </p>
        <a
          href={AUTHOR.calcom}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-primary hover:bg-accent-primary/90 mt-2 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
        >
          Want faster? Book a call <ArrowRight size={14} aria-hidden />
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from humans, catches bots */}
      <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="text-foreground mb-2 block text-sm font-medium"
          >
            Name <span className="text-accent-primary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            disabled={status === 'submitting'}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-foreground mb-2 block text-sm font-medium"
          >
            Email <span className="text-accent-primary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputClass}
            disabled={status === 'submitting'}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="text-foreground mb-2 block text-sm font-medium"
        >
          Company <span className="text-fg-subtle">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your company"
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>

      <div>
        <label
          htmlFor="service"
          className="text-foreground mb-2 block text-sm font-medium"
        >
          Service of interest
        </label>
        <select
          id="service"
          name="service"
          className={inputClass}
          disabled={status === 'submitting'}
        >
          <option value="">Select a service…</option>
          {SERVICE_SLUGS.map((slug) => (
            <option key={slug} value={slug}>
              {SERVICE_LABELS[slug]}
            </option>
          ))}
          <option value="general">General inquiry</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="budget"
          className="text-foreground mb-2 block text-sm font-medium"
        >
          Budget range
        </label>
        <select
          id="budget"
          name="budget"
          className={inputClass}
          disabled={status === 'submitting'}
        >
          <option value="">Select a range…</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-foreground mb-2 block text-sm font-medium"
        >
          Tell me about the project <span className="text-accent-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you building? What's broken or missing? What does success look like?"
          className={`${inputClass} resize-none`}
          disabled={status === 'submitting'}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <AlertCircle
            size={15}
            className="mt-0.5 flex-shrink-0 text-red-400"
            aria-hidden
          />
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={14} className="animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            Send project brief <ArrowRight size={14} aria-hidden />
          </>
        )}
      </button>

      <p className="text-fg-subtle text-center text-xs">
        Or email directly:{' '}
        <a
          href={`mailto:${AUTHOR.email}`}
          className="text-accent-primary hover:text-accent-primary/80 transition-colors"
        >
          {AUTHOR.email}
        </a>
      </p>
    </form>
  )
}
