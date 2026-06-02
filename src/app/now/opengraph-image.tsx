export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = "Now — What I'm Working On | Kamal Hussain"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: "What I'm working on right now.",
    subtitle: 'Current projects, focus areas, and what I am learning. Updated monthly.',
    type: 'Now',
  })
}
