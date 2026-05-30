export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { RESOURCE_SLUGS, RESOURCES_DATA, type ResourceSlug } from '@/lib/resources-data'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return RESOURCE_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = RESOURCES_DATA[slug as ResourceSlug]
  if (!r) return buildOgImage({ title: 'Free Resource', type: 'Resource' })
  return buildOgImage({
    title: r.title,
    subtitle: `${r.type} · Free — kamalhussain.dev`,
    type: `RESOURCE · ${r.type.toUpperCase()}`,
  })
}
