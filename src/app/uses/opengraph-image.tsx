export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'Uses — Tools, Stack & Setup | Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'My tools, stack & setup.',
    subtitle:
      'The hardware, CLI tools, and editor config I use every day as a DevOps engineer.',
    type: 'Uses',
  })
}
