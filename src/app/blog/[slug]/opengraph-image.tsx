export const dynamic = 'force-static'

import { buildOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { BLOG_SLUGS, POST_META, type BlogSlug } from '@/lib/blog-data'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = POST_META[slug as BlogSlug]
  if (!meta) return buildOgImage({ title: 'Blog Post', type: 'Article' })
  return buildOgImage({
    title: meta.title,
    subtitle: `${meta.category} · ${meta.readTime} read`,
    type: 'Article',
  })
}
