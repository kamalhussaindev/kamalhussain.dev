export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const alt = 'About Kamal Hussain'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  return buildOgImage({
    title: 'About Kamal Hussain',
    subtitle: 'DevOps & Cloud Engineer based in Rawalpindi, Pakistan.',
    type: 'About',
  })
}
