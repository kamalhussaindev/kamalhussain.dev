'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface StatusPillProps {
  className?: string
}

export function StatusPill({ className }: StatusPillProps) {
  const [time, setTime] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className={cn(
        'border-border bg-bg-raised/80 text-fg-muted inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm',
        className,
      )}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>
        Available · Rawalpindi
        {mounted && <> · {time}</>}
      </span>
    </div>
  )
}
