export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Kubernetes Production Checklist — Free PDF | Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'Kubernetes Production Checklist.',
    subtitle:
      '47 items covering everything your cluster needs before going live. Free PDF download.',
    type: 'Free Resource',
  })
}
