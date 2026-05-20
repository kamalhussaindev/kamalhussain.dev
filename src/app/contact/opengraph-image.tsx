export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Contact Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'Start a conversation.',
    subtitle: "Got a project in mind? Send a brief and I'll get back within 24 hours.",
    type: 'Contact',
  })
}
