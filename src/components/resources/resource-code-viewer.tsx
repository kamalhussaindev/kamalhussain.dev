'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'

interface HighlightedFile {
  name: string
  html: string
  rawCode: string
}

interface ResourceCodeViewerProps {
  files: HighlightedFile[]
}

export function ResourceCodeViewer({ files }: ResourceCodeViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const code = files[activeIndex]?.rawCode
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API unavailable (non-HTTPS, etc.)
    }
  }, [files, activeIndex])

  const active = files[activeIndex]
  if (!active) return null

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      {/* Tab bar */}
      <div className="bg-bg-raised border-border flex items-center gap-0.5 overflow-x-auto border-b px-3 pt-2">
        {files.map((f, i) => (
          <button
            key={f.name}
            onClick={() => setActiveIndex(i)}
            className={`shrink-0 rounded-t-md px-3 py-1.5 font-mono text-xs transition-colors ${
              i === activeIndex
                ? 'bg-background text-foreground'
                : 'text-fg-muted hover:text-foreground'
            }`}
          >
            {f.name}
          </button>
        ))}

        {/* Copy button pushed to the right */}
        <div className="ml-auto shrink-0 pb-1.5">
          <button
            onClick={handleCopy}
            className="text-fg-muted hover:text-foreground hover:bg-background flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs transition-colors"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={12} className="text-green-500" aria-hidden />
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} aria-hidden />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code pane */}
      <div
        className="[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: active.html }}
      />
    </div>
  )
}
