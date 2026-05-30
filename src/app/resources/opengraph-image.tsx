export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Free DevOps Resources by Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'Free DevOps Resources.',
    subtitle:
      'Helm charts, Terraform modules, GitHub Actions templates, ArgoCD patterns.',
    type: 'Resources',
  })
}
