import Link from 'next/link'
import { PostHeroImage } from './post-hero-image'
import type { PostMeta, BlogSlug } from '@/lib/blog-data'
import { PLACEHOLDERS } from '@/lib/placeholders'

interface PostCardProps {
  slug: BlogSlug
  meta: PostMeta
}

export function PostCard({ slug, meta }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group border-border bg-bg-raised hover:border-accent-primary/30 flex flex-col overflow-hidden rounded-xl border transition-all"
    >
      <PostHeroImage
        category={meta.category}
        src={PLACEHOLDERS.blogCardThumb(slug)}
        className="aspect-video w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="text-fg-subtle flex items-center gap-2 font-mono text-xs">
          <span className="border-border rounded-full border px-2.5 py-0.5">
            {meta.category}
          </span>
          <span>·</span>
          <time dateTime={meta.date}>{meta.date}</time>
          <span>·</span>
          <span>{meta.readTime}</span>
        </div>
        <h3 className="text-foreground group-hover:text-accent-primary flex-1 text-base leading-snug font-semibold transition-colors">
          {meta.title}
        </h3>
        <p className="text-fg-muted line-clamp-3 text-sm leading-relaxed">
          {meta.description}
        </p>
        <span className="text-accent-primary mt-1 text-xs font-medium">
          Read article →
        </span>
      </div>
    </Link>
  )
}
