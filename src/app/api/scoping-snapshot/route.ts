import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export const dynamic = 'force-static'

// In-memory rate limiter: 1 email per IP per 5 minutes
// For multi-instance deployments, replace with Upstash Redis (env vars already in .env.example)
const rateLimitStore = new Map<string, number>()
const RATE_LIMIT_MS = 5 * 60 * 1000

function cleanupStale() {
  const now = Date.now()
  for (const [ip, ts] of rateLimitStore) {
    if (now - ts > RATE_LIMIT_MS) rateLimitStore.delete(ip)
  }
}

export async function POST(req: NextRequest) {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown'

  cleanupStale()

  const lastSent = rateLimitStore.get(ip)
  if (lastSent && Date.now() - lastSent < RATE_LIMIT_MS) {
    return Response.json(
      { error: 'Rate limited. Try again in 5 minutes.' },
      { status: 429 },
    )
  }

  rateLimitStore.set(ip, Date.now())

  let body: {
    service?: string
    urgency?: string
    teamSize?: string
    extras?: string[]
    budgetLow?: number
    budgetHigh?: number
    redirectTo?: string
  }

  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid body' }, { status: 400 })
  }

  const { service, urgency, teamSize, extras, budgetLow, budgetHigh, redirectTo } = body

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const toEmail = process.env.RESEND_TO_EMAIL ?? 'hello@kamalhussain.dev'
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'no-reply@kamalhussain.dev'

      const rangeStr =
        budgetLow && budgetHigh
          ? `$${budgetLow.toLocaleString()} – $${budgetHigh.toLocaleString()}`
          : 'not calculated'

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `Scoping snapshot — ${service ?? 'unknown service'}`,
        html: `
          <h2 style="font-family:monospace">New Scoping Calculator Snapshot</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
            <tr><td style="padding:6px 12px 6px 0;color:#888">Service</td><td style="padding:6px 0">${service ?? '—'}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Urgency</td><td style="padding:6px 0">${urgency ?? '—'}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Team size</td><td style="padding:6px 0">${teamSize ?? '—'}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Extras</td><td style="padding:6px 0">${extras?.join(', ') || 'none'}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Budget range</td><td style="padding:6px 0;font-weight:bold">${rangeStr}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Next step</td><td style="padding:6px 0">${redirectTo ?? '—'}</td></tr>
          </table>
        `,
      })
    } catch (err) {
      console.error('[scoping-snapshot] email failed:', err)
    }
  }

  return Response.json({ success: true })
}
