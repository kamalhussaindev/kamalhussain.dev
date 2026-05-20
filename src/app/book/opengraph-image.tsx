export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Book a Call with Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: "Let's talk about your infrastructure.",
    subtitle: '30-minute intro call. No pressure. Honest assessment.',
    type: 'Book a Call',
  })
}
