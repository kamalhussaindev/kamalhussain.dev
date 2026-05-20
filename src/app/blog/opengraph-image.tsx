export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Writing by Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'Writing.',
    subtitle: 'DevOps, Kubernetes, cloud infrastructure, and lessons from production.',
    type: 'Blog',
  })
}
