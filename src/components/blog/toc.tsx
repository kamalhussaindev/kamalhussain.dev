'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('article')
    if (!article) return

    const headings = Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]
    const tocItems: TocItem[] = headings.map((el, i) => {
      if (!el.id) el.id = `heading-${i}`
      return {
        id: el.id,
        text: el.textContent ?? '',
        level: el.tagName === 'H3' ? 3 : 2,
      }
    })
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(tocItems)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0% -65% 0%' },
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
        In this article
      </h3>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? '0.75rem' : '0' }}>
            <a
              href={`#${item.id}`}
              className={`block text-xs leading-relaxed transition-colors ${
                activeId === item.id
                  ? 'text-accent-primary'
                  : 'text-fg-muted hover:text-foreground'
              }`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
