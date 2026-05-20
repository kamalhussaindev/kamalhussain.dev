import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_URL } from '@/lib/constants'

const CATEGORIES = ['devops', 'web-dev', 'career', 'tools'] as const

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) return {}
  const label = category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return {
    title: `${label} Articles`,
    description: `Blog posts about ${label} from Kamal Hussain.`,
    alternates: { canonical: `${SITE_URL}/blog/category/${category}` },
  }
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) notFound()
  const label = category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-muted-foreground mb-8 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{label}</span>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight">{label}</h1>
      <p className="text-muted-foreground mt-3">
        All articles tagged with &ldquo;{label}&rdquo;.
      </p>

      {/* Phase 2: Posts filtered by category will be rendered here */}
      <div className="mt-8">
        <Link
          href="/blog"
          className="text-primary inline-flex items-center gap-1.5 text-sm hover:underline"
        >
          <ArrowRight size={13} className="rotate-180" aria-hidden /> Back to all posts
        </Link>
      </div>
    </div>
  )
}
