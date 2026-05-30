'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { K8S_CHECKLIST, TOTAL_ITEMS } from '@/lib/k8s-checklist'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const PREVIEW_CATEGORIES = K8S_CHECKLIST.slice(0, 2)

export function K8sChecklistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/checklist-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setDownloadUrl(data.downloadUrl ?? '')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
      {/* ── Left — checklist preview ───────────────────────────────── */}
      <div>
        <p className="text-accent-primary mb-4 font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Free Download
        </p>
        <h1 className="mb-5 max-w-[22ch] text-4xl font-bold tracking-[-0.03em] [text-wrap:balance]">
          The Production Kubernetes Checklist
        </h1>
        <p className="text-fg-muted mb-8 max-w-lg text-lg leading-relaxed">
          {TOTAL_ITEMS} items your cluster needs before it touches production — compiled
          from real-world engagements. Download as a PDF and work through it with your
          team.
        </p>

        <div className="space-y-8">
          {PREVIEW_CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <p className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                {cat.title}
              </p>
              <ul className="space-y-2.5">
                {cat.items.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={15}
                      className="text-accent-primary mt-0.5 flex-shrink-0"
                      aria-hidden
                    />
                    <span className="text-fg-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
                {cat.items.length > 4 && (
                  <li className="text-fg-subtle pl-6 text-sm">
                    +{cat.items.length - 4} more in this section…
                  </li>
                )}
              </ul>
            </div>
          ))}

          <p className="text-fg-subtle border-border border-l-2 pl-4 text-sm leading-relaxed">
            Plus {K8S_CHECKLIST.length - PREVIEW_CATEGORIES.length} more sections —
            Security, Access Control, Storage, Workload Reliability, Observability, and
            CI/CD & GitOps.
          </p>
        </div>
      </div>

      {/* ── Right — signup card ────────────────────────────────────── */}
      <div className="lg:sticky lg:top-24">
        <div className="card-surface rounded-xl p-6">
          <div className="mb-1 flex items-center gap-2">
            <Download size={14} className="text-accent-primary" aria-hidden />
            <p className="text-fg-subtle text-xs font-semibold tracking-[0.15em] uppercase">
              Free PDF Download
            </p>
          </div>
          <p className="text-foreground mt-3 text-lg font-bold">Get the checklist →</p>
          <p className="text-fg-muted mt-1 text-sm leading-relaxed">
            Enter your email. I&apos;ll send you a download link instantly — no spam,
            unsubscribe any time.
          </p>

          <div className="border-border my-5 border-t" />

          {status === 'success' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2
                  size={18}
                  className="text-accent-primary flex-shrink-0"
                  aria-hidden
                />
                <p className="text-foreground font-semibold">Check your inbox!</p>
              </div>
              <p className="text-fg-muted text-sm leading-relaxed">
                A download link has been sent to{' '}
                <span className="text-foreground">{email}</span>. Check your spam folder
                if it doesn&apos;t arrive in a minute.
              </p>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all"
                >
                  <Download size={13} aria-hidden /> Download PDF now
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="checklist-email"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Email address
                </label>
                <input
                  id="checklist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={status === 'submitting'}
                  className="border-border bg-bg-raised text-foreground placeholder:text-fg-dim focus:border-accent-primary focus:ring-accent-primary w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:ring-1 focus:outline-none disabled:opacity-60"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <AlertCircle
                    size={14}
                    className="mt-0.5 flex-shrink-0 text-red-400"
                    aria-hidden
                  />
                  <p className="text-sm text-red-400">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={13} className="animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    <Download size={13} aria-hidden /> Send me the PDF
                  </>
                )}
              </button>

              <p className="text-fg-dim text-center text-xs">
                No spam. Unsubscribe any time.
              </p>
            </form>
          )}
        </div>

        {/* About blurb */}
        <div className="border-border bg-bg-raised/40 mt-4 rounded-xl border p-5">
          <p className="text-fg-muted text-sm leading-relaxed">
            Built by{' '}
            <Link
              href="/about"
              className="text-accent-primary hover:text-accent-primary/80 transition-colors"
            >
              Kamal Hussain
            </Link>
            , freelance DevOps engineer. 5+ years running Kubernetes in production for
            startups across US, EU, and MENA.
          </p>
          <Link
            href="/services/kubernetes-platform-engineering"
            className="text-accent-primary hover:text-accent-primary/80 mt-3 inline-flex items-center gap-1 text-sm transition-colors"
          >
            See Kubernetes services <ArrowRight size={12} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  )
}
