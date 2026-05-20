import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { BLOG_SLUGS, POST_META } from '@/lib/blog-data'
import { FeaturedPost } from '@/components/blog/featured-post'
import { PostCard } from '@/components/blog/post-card'

export const metadata: Metadata = {
  title: 'Writing — DevOps, Kubernetes & Infrastructure',
  description:
    'Long-form articles on Kubernetes, CI/CD, AWS, Terraform, and observability. By Kamal Hussain — things I have actually shipped.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { title: 'Writing | Kamal Hussain', url: `${SITE_URL}/blog` },
}

const CATEGORIES = ['DevOps', 'Web Dev', 'Career', 'Tools']

export default function BlogPage() {
  const posts = BLOG_SLUGS.map((slug) => ({ slug, meta: POST_META[slug] }))
  const [featured, ...rest] = posts

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-fg-subtle mx-2">/</span>
        <span className="text-foreground">Writing</span>
      </nav>

      {/* Hero */}
      <div className="mb-16">
        <p className="text-fg-subtle mb-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
          writing · {BLOG_SLUGS.length} articles
        </p>
        <h1 className="text-hero text-foreground mb-6 max-w-[22ch] font-bold tracking-[-0.04em] [text-wrap:balance]">
          Writing<span className="text-accent-primary">.</span>
        </h1>
        <p className="text-fg-muted max-w-xl text-lg leading-relaxed">
          Long-form on DevOps, cloud infrastructure, and web development. No AI fluff —
          just things I&apos;ve actually shipped.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="border-border text-fg-muted rounded-full border px-3 py-1 text-xs"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Featured / latest post */}
      {featured && (
        <div className="mb-12">
          <FeaturedPost slug={featured.slug} meta={featured.meta} />
        </div>
      )}

      {/* Article grid */}
      {rest.length > 0 && (
        <div>
          <h2 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
            All articles
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.map(({ slug, meta }) => (
              <PostCard key={slug} slug={slug} meta={meta} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
