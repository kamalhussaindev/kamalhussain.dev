import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PostHeroImage } from './post-hero-image'
import type { PostMeta, BlogSlug } from '@/lib/blog-data'
import { PLACEHOLDERS } from '@/lib/placeholders'

interface FeaturedPostProps {
  slug: BlogSlug
  meta: PostMeta
}

export function FeaturedPost({ slug, meta }: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group border-border bg-bg-raised hover:border-accent-primary/30 grid grid-cols-1 overflow-hidden rounded-xl border transition-all md:grid-cols-[1fr_360px]"
    >
      {/* Text side */}
      <div className="order-2 flex flex-col justify-center gap-5 p-8 md:order-1 md:p-10">
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <span className="text-accent-primary font-semibold tracking-[0.15em] uppercase">
            Latest
          </span>
          <span className="text-fg-subtle">·</span>
          <span className="border-border text-fg-subtle rounded-full border px-2.5 py-0.5">
            {meta.category}
          </span>
          <span className="text-fg-subtle">·</span>
          <span className="text-fg-subtle">{meta.readTime} read</span>
        </div>
        <h2 className="text-foreground group-hover:text-accent-primary text-2xl leading-snug font-bold tracking-[-0.025em] transition-colors md:text-3xl">
          {meta.title}
        </h2>
        <p className="text-fg-muted text-base leading-relaxed">{meta.description}</p>
        <div className="text-accent-primary flex items-center gap-1.5 text-sm font-semibold">
          Read article{' '}
          <ArrowRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </div>
      </div>

      {/* Image side */}
      <div className="order-1 md:order-2">
        <PostHeroImage
          category={meta.category}
          src={PLACEHOLDERS.blogCardThumb(slug)}
          className="h-48 w-full md:h-full md:min-h-[280px]"
        />
      </div>
    </Link>
  )
}
