export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'DevOps & Cloud Engineering Services'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'DevOps & Cloud Engineering Services',
    subtitle: 'Kubernetes, CI/CD, AWS infrastructure, observability, and more.',
    type: 'Services',
  })
}
