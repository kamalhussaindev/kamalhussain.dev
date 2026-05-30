import type { NextRequest } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

// API routes are not available on static (Hostinger shared) hosting.
// To restore: remove output: 'export' from next.config.ts and deploy to a Node.js host.
export const dynamic = 'force-static'

const SECRET = process.env.CHECKLIST_SECRET ?? 'dev-checklist-secret-change-in-production'
const TOKEN_TTL_MS = 48 * 60 * 60 * 1000 // 48-hour download window

export function createDownloadToken(email: string): string {
  const ts = Date.now().toString()
  const payload = `${email}:${ts}`
  const sig = createHmac('sha256', SECRET).update(payload).digest('hex')
  return Buffer.from(`${payload}:${sig}`).toString('base64url')
}

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString()
    const lastColon = decoded.lastIndexOf(':')
    if (lastColon === -1) return false
    const payload = decoded.slice(0, lastColon)
    const sig = decoded.slice(lastColon + 1)

    const colonIdx = payload.indexOf(':')
    if (colonIdx === -1) return false
    const ts = parseInt(payload.slice(colonIdx + 1), 10)
    if (isNaN(ts) || Date.now() - ts > TOKEN_TTL_MS) return false

    const expectedSig = createHmac('sha256', SECRET).update(payload).digest('hex')
    const sigBuf = Buffer.from(sig, 'hex')
    const expBuf = Buffer.from(expectedSig, 'hex')
    if (sigBuf.length !== expBuf.length) return false
    return timingSafeEqual(sigBuf, expBuf)
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get('token')

  if (!token || !verifyToken(token)) {
    return new Response('Invalid or expired download link.', { status: 403 })
  }

  try {
    const { renderToBuffer } = await import('@react-pdf/renderer')
    const { createElement } = await import('react')
    const { K8sChecklistPDF } = await import('@/lib/k8s-checklist-pdf')

    const buffer = await renderToBuffer(createElement(K8sChecklistPDF))

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="k8s-production-checklist.pdf"',
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (err) {
    console.error('[checklist-download] PDF generation failed:', err)
    return new Response('PDF generation failed. Please contact hello@kamalhussain.dev.', {
      status: 500,
    })
  }
}
