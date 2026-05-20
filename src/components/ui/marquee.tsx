'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps {
  children: React.ReactNode
  direction?: 'left' | 'right'
  /** Duration in seconds for one complete pass */
  duration?: number
  gap?: number
  pauseOnHover?: boolean
  className?: string
  /** How many copies to render for seamless loop (min 2) */
  copies?: number
}

export function Marquee({
  children,
  direction = 'left',
  duration = 30,
  gap = 48,
  pauseOnHover = true,
  className,
  copies = 2,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <div
      className={cn('overflow-hidden', className)}
      aria-hidden
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
      }}
    >
      <div
        ref={trackRef}
        className={cn(
          'flex w-max items-center',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
        style={{
          gap: `${gap}px`,
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            className="flex flex-shrink-0 items-center"
            style={{ gap: `${gap}px` }}
            aria-hidden={i > 0}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
