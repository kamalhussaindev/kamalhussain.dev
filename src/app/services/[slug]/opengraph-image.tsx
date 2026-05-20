export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { SERVICE_SLUGS } from '@/lib/constants'
import { SERVICES_DATA, type ServiceSlug } from '@/lib/services-data'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = SERVICES_DATA[slug as ServiceSlug]
  if (!data) return buildOgImage({ title: 'DevOps Service', type: 'Service' })
  return buildOgImage({
    title: data.title,
    subtitle: data.tagline,
    type: 'Service',
  })
}
