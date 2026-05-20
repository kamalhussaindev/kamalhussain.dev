import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_SLUGS, POST_META, type BlogSlug } from '@/lib/blog-data'

interface RelatedPostsProps {
  currentSlug: BlogSlug
}

export function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  const slugs = BLOG_SLUGS.filter((s) => s !== currentSlug).slice(0, 2)
  if (slugs.length === 0) return null

  return (
    <div className="border-border mt-16 border-t pt-10">
      <h3 className="text-fg-subtle mb-6 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
        More writing
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {slugs.map((slug) => {
          const meta = POST_META[slug]
          return (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group border-border bg-bg-raised hover:border-accent-primary/30 rounded-xl border px-5 py-5 transition-all"
            >
              <span className="border-border text-fg-subtle mb-3 inline-block rounded-full border px-2.5 py-0.5 text-xs">
                {meta.category}
              </span>
              <h4 className="text-foreground group-hover:text-accent-primary mb-3 text-sm leading-snug font-semibold transition-colors">
                {meta.title}
              </h4>
              <span className="text-accent-primary inline-flex items-center gap-1 text-xs font-medium">
                Read <ArrowRight size={11} aria-hidden />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
