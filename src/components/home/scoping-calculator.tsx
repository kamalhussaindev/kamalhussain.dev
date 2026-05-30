'use client'

import type React from 'react'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Calculator, Loader2 } from 'lucide-react'

const SERVICE_TYPES = [
  { id: 'k8s', label: 'Kubernetes Platform', baseLow: 3500, baseHigh: 7000 },
  { id: 'cicd', label: 'CI/CD Pipeline', baseLow: 2000, baseHigh: 4500 },
  { id: 'aws', label: 'AWS Infrastructure', baseLow: 2500, baseHigh: 5500 },
  { id: 'observability', label: 'Observability Stack', baseLow: 2000, baseHigh: 4000 },
  { id: 'wordpress', label: 'WordPress & Web', baseLow: 1000, baseHigh: 3000 },
  { id: 'consulting', label: 'DevOps Consulting', baseLow: 1500, baseHigh: 3500 },
  { id: 'unsure', label: 'Not sure yet', baseLow: 2000, baseHigh: 6000 },
] as const

const URGENCY_OPTIONS = [
  { id: 'standard', label: 'Standard', sub: '4+ weeks', multiplier: 1.0 },
  { id: 'expedited', label: 'Expedited', sub: '2–4 weeks', multiplier: 1.3 },
  { id: 'rush', label: 'Rush', sub: '<2 weeks', multiplier: 1.6 },
] as const

const TEAM_SIZE_OPTIONS = [
  { id: 'solo', label: 'Solo (Kamal only)', multiplier: 1.0 },
  { id: 'small', label: 'Small team (2–3)', multiplier: 1.35 },
  { id: 'full', label: 'Full team (4+)', multiplier: 1.65 },
] as const

const EXTRA_FACTORS = [
  { id: 'docs', label: 'Documentation & runbooks', pct: 0.1 },
  { id: 'training', label: 'Team training sessions', pct: 0.12 },
  { id: 'support', label: 'Ongoing support retainer', pct: 0.2 },
  { id: 'security', label: 'Security audit', pct: 0.15 },
  { id: 'review', label: 'Architecture review', pct: 0.08 },
] as const

type ServiceId = (typeof SERVICE_TYPES)[number]['id']
type UrgencyId = (typeof URGENCY_OPTIONS)[number]['id']
type TeamId = (typeof TEAM_SIZE_OPTIONS)[number]['id']
type ExtraId = (typeof EXTRA_FACTORS)[number]['id']

interface CalcState {
  service: ServiceId | null
  urgency: UrgencyId
  teamSize: TeamId
  extras: ExtraId[]
}

const DEFAULT_STATE: CalcState = {
  service: null,
  urgency: 'standard',
  teamSize: 'solo',
  extras: [],
}

function calcBudget(state: CalcState): { low: number; high: number } | null {
  const svc = SERVICE_TYPES.find((s) => s.id === state.service)
  if (!svc) return null
  const urgencyMult = URGENCY_OPTIONS.find((u) => u.id === state.urgency)?.multiplier ?? 1
  const teamMult = TEAM_SIZE_OPTIONS.find((t) => t.id === state.teamSize)?.multiplier ?? 1
  const extraPct = state.extras.reduce((sum, id) => {
    return sum + (EXTRA_FACTORS.find((f) => f.id === id)?.pct ?? 0)
  }, 0)
  const factor = urgencyMult * teamMult * (1 + extraPct)
  return {
    low: Math.round((svc.baseLow * factor) / 100) * 100,
    high: Math.round((svc.baseHigh * factor) / 100) * 100,
  }
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US')
}

function RadioCard({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
        checked
          ? 'border-accent-primary bg-accent-primary/10 text-foreground'
          : 'border-border bg-bg-raised text-fg-muted hover:border-accent-primary/40'
      }`}
    >
      {children}
    </button>
  )
}

function Pill({
  checked,
  onChange,
  label,
  sub,
}: {
  checked: boolean
  onChange: () => void
  label: string
  sub?: string
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
        checked
          ? 'border-accent-primary bg-accent-primary/10 text-foreground font-medium'
          : 'border-border text-fg-muted hover:border-accent-primary/40'
      }`}
    >
      {label}
      {sub && <span className="ml-1 text-xs opacity-60">· {sub}</span>}
    </button>
  )
}

export function ScopingCalculator({ compact = false }: { compact?: boolean }) {
  const router = useRouter()
  const [state, setState] = useState<CalcState>(() => {
    if (typeof window === 'undefined') return DEFAULT_STATE
    try {
      const saved = sessionStorage.getItem('scoping-calculator')
      return saved ? (JSON.parse(saved) as CalcState) : DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem('scoping-calculator', JSON.stringify(state))
    } catch {}
  }, [state])

  const budget = calcBudget(state)

  const fireSnapshot = useCallback(
    async (redirectTo: string) => {
      setSending(true)
      try {
        await fetch('/api/scoping-snapshot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service: state.service,
            urgency: state.urgency,
            teamSize: state.teamSize,
            extras: state.extras,
            budgetLow: budget?.low,
            budgetHigh: budget?.high,
            redirectTo,
          }),
        })
      } catch {
        // fire-and-forget — don't block navigation
      }
      router.push(redirectTo)
    },
    [state, budget, router],
  )

  function toggleExtra(id: ExtraId) {
    setState((prev) => ({
      ...prev,
      extras: prev.extras.includes(id)
        ? prev.extras.filter((e) => e !== id)
        : [...prev.extras, id],
    }))
  }

  const inner = (
    <div
      className={
        compact
          ? 'py-16'
          : 'mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40'
      }
    >
      <div className="mb-12">
        <p className="text-fg-subtle mb-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          project scoping
        </p>
        <h2 className="text-foreground text-2xl font-bold tracking-[-0.025em] md:text-3xl">
          Get a rough budget range.
        </h2>
        <p className="text-fg-muted mt-3 max-w-lg text-base leading-relaxed">
          Four questions. Live estimate. No sign-up required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        {/* ── Inputs ─────────────────────────────────────────────────── */}
        <div className="space-y-10">
          {/* Service type */}
          <div>
            <p className="text-foreground mb-3 text-sm font-semibold">
              01 — What do you need?
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {SERVICE_TYPES.map((svc) => (
                <RadioCard
                  key={svc.id}
                  checked={state.service === svc.id}
                  onChange={() => setState((p) => ({ ...p, service: svc.id }))}
                >
                  {svc.label}
                </RadioCard>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div>
            <p className="text-foreground mb-3 text-sm font-semibold">
              02 — How soon do you need it?
            </p>
            <div className="flex flex-wrap gap-2">
              {URGENCY_OPTIONS.map((opt) => (
                <Pill
                  key={opt.id}
                  checked={state.urgency === opt.id}
                  onChange={() => setState((p) => ({ ...p, urgency: opt.id }))}
                  label={opt.label}
                  sub={opt.sub}
                />
              ))}
            </div>
          </div>

          {/* Team size */}
          <div>
            <p className="text-foreground mb-3 text-sm font-semibold">
              03 — Preferred team size?
            </p>
            <div className="flex flex-wrap gap-2">
              {TEAM_SIZE_OPTIONS.map((opt) => (
                <Pill
                  key={opt.id}
                  checked={state.teamSize === opt.id}
                  onChange={() => setState((p) => ({ ...p, teamSize: opt.id }))}
                  label={opt.label}
                />
              ))}
            </div>
          </div>

          {/* Extras */}
          <div>
            <p className="text-foreground mb-3 text-sm font-semibold">
              04 — Any extras?{' '}
              <span className="text-fg-subtle font-normal">(optional)</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {EXTRA_FACTORS.map((factor) => (
                <button
                  key={factor.id}
                  type="button"
                  onClick={() => toggleExtra(factor.id)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                    state.extras.includes(factor.id)
                      ? 'border-accent-primary bg-accent-primary/10 text-foreground font-medium'
                      : 'border-border text-fg-muted hover:border-accent-primary/40'
                  }`}
                >
                  {factor.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Live output ────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-24">
          <div className="card-surface rounded-xl p-6">
            <div className="mb-1 flex items-center gap-2">
              <Calculator size={14} className="text-accent-primary" aria-hidden />
              <p className="text-fg-subtle text-xs font-semibold tracking-[0.15em] uppercase">
                Estimate
              </p>
            </div>

            {budget ? (
              <>
                <p className="text-foreground mt-4 text-4xl font-bold tracking-[-0.03em]">
                  {fmt(budget.low)}
                  <span className="text-fg-subtle text-2xl"> – </span>
                  {fmt(budget.high)}
                </p>
                <p className="text-fg-subtle mt-1 text-xs">
                  Rough estimate based on your inputs · USD
                </p>

                <div className="border-border my-5 border-t" />

                <div className="space-y-2.5">
                  <button
                    onClick={() => fireSnapshot('/book')}
                    disabled={sending}
                    className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60"
                  >
                    {sending ? (
                      <Loader2 size={13} className="animate-spin" aria-hidden />
                    ) : (
                      <ArrowRight size={13} aria-hidden />
                    )}
                    Book a call to refine this
                  </button>
                  <button
                    onClick={() => fireSnapshot('/contact')}
                    disabled={sending}
                    className="border-border text-foreground hover:bg-bg-raised flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors disabled:opacity-60"
                  >
                    Send a brief instead
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="bg-bg-overlay h-10 w-3/4 animate-pulse rounded-lg" />
                <p className="text-fg-subtle text-sm">
                  Select a service type above to see your estimate.
                </p>
                <div className="border-border my-4 border-t" />
                <Link
                  href="/book"
                  className="border-border text-foreground hover:bg-bg-raised flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
                >
                  Or just book a call <ArrowRight size={13} aria-hidden />
                </Link>
              </div>
            )}

            <p className="text-fg-dim mt-4 text-xs leading-relaxed">
              Estimates are directional — not quotes. Actual scope and pricing discussed
              on a call.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (compact) return inner
  return <section className="border-border border-t">{inner}</section>
}
