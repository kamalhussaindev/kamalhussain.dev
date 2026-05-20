export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Kamal Hussain — DevOps & Cloud Engineer'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'Production-grade DevOps & Cloud Engineering',
    subtitle: 'Kubernetes · CI/CD · AWS · Terraform · Observability',
    type: 'Freelance Engineer',
  })
}
