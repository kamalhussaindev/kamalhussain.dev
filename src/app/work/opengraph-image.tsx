export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Case Studies — Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'Case Studies.',
    subtitle: 'Real infrastructure problems. Real outcomes. No fluff.',
    type: 'Work',
  })
}
