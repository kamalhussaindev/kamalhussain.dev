'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="border-border bg-bg-raised my-12 rounded-xl border px-7 py-7">
      <p className="text-accent-primary mb-2 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
        Newsletter
      </p>
      <h3 className="text-foreground mb-2 text-xl font-bold tracking-[-0.02em]">
        DevOps dispatches, when I have something worth saying.
      </h3>
      <p className="text-fg-muted mb-5 text-sm leading-relaxed">
        Occasional long-form on Kubernetes, CI/CD, and infrastructure. No filler, no
        cadence commitment.
      </p>
      {submitted ? (
        <p className="text-accent-primary text-sm font-semibold">
          You&apos;re in. I&apos;ll be in touch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 sm:flex-nowrap">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="border-border bg-background text-foreground placeholder:text-fg-dim focus:border-accent-primary/60 min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none"
          />
          <button
            type="submit"
            className="bg-accent-primary hover:bg-accent-primary/90 rounded-lg px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  )
}
