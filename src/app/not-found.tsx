import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-40 text-center sm:px-6 lg:px-8">
      <p className="text-accent-primary font-mono text-xs font-medium tracking-[0.2em] uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em]">Page not found</h1>
      <p className="text-fg-muted mt-4 max-w-sm leading-relaxed">
        This page doesn&apos;t exist. It might have moved, or you may have followed a
        broken link.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-white transition-all"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="border-border text-foreground hover:bg-bg-raised inline-flex items-center gap-2 rounded-md border px-6 py-3 text-sm font-medium transition-colors"
        >
          Read the blog <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </div>
  )
}
