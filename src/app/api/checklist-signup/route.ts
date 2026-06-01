import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { createDownloadToken } from '../checklist-download/route'

export const dynamic = 'force-static'

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
      { error: 'Too many requests. Try again in 5 minutes.' },
      { status: 429 },
    )
  }
  rateLimitStore.set(ip, Date.now())

  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid body' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'A valid email is required.' }, { status: 422 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kamalhussain.dev'
  const token = createDownloadToken(email)
  const downloadUrl = `${siteUrl}/api/checklist-download?token=${token}`

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      const toEmail = process.env.RESEND_TO_EMAIL ?? 'kamal@kamalhussain.dev'
      const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'no-reply@kamalhussain.dev'

      // Notification to Kamal
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New checklist download — ${email}`,
        html: `<p>New lead magnet signup:</p><p><strong>${email}</strong></p><p>Download link sent to their inbox.</p>`,
      })

      // Download link to the submitter
      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'Your Kubernetes Production Checklist',
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0f0f0f;color:#e5e5e5;border-radius:12px">
            <p style="font-family:monospace;font-size:11px;color:#ff4d2e;letter-spacing:2px;margin:0 0 16px">KAMALHUSSAIN.DEV</p>
            <h1 style="font-size:22px;margin:0 0 12px;color:#fff">Your checklist is ready.</h1>
            <p style="font-size:14px;color:#aaa;line-height:1.6;margin:0 0 24px">
              Click below to download the Production Kubernetes Checklist (47 items). The link is valid for 48 hours.
            </p>
            <a href="${downloadUrl}" style="display:inline-block;background:#ff4d2e;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">
              Download PDF →
            </a>
            <p style="font-size:12px;color:#555;margin:24px 0 0;line-height:1.5">
              Built something interesting with it? Reply to this email — I read everything.<br>
              — Kamal Hussain · <a href="https://kamalhussain.dev" style="color:#ff4d2e">kamalhussain.dev</a>
            </p>
          </div>
        `,
      })
    } catch (err) {
      console.error('[checklist-signup] email failed:', err)
      // Return success anyway — the token is still valid for manual retry
    }
  }

  // Return the download URL so the client can also offer an immediate download button
  return Response.json({ success: true, downloadUrl })
}
