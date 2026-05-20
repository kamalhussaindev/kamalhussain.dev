export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { WORK_SLUGS, WORK_DATA, type WorkSlug } from '@/lib/work-data'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = WORK_DATA[slug as WorkSlug]
  if (!data) return buildOgImage({ title: 'Case Study', type: 'Case Study' })
  return buildOgImage({
    title: data.headline,
    subtitle: `${data.client} · ${data.industry} · ${data.year}`,
    type: 'Case Study',
  })
}
