'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type CursorState = 'default' | 'link' | 'button' | 'view' | 'drag'

const RING_SIZES: Record<CursorState, number> = {
  default: 32,
  link: 56,
  button: 10,
  view: 88,
  drag: 88,
}

const SPRING = { damping: 28, stiffness: 280, mass: 0.4 }

export function Cursor() {
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)
  const rafRef = useRef<number>(0)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const ringX = useSpring(rawX, SPRING)
  const ringY = useSpring(rawY, SPRING)

  // Center the elements
  const dotX = useTransform(rawX, (v) => v - 3)
  const dotY = useTransform(rawY, (v) => v - 3)
  const ringCX = useTransform(ringX, (v) => v - RING_SIZES[state] / 2)
  const ringCY = useTransform(ringY, (v) => v - RING_SIZES[state] / 2)

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFinePointer(mq.matches)
    if (!mq.matches) return

    document.documentElement.classList.add('custom-cursor')

    function onMove(e: MouseEvent) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        rawX.set(e.clientX)
        rawY.set(e.clientY)
        setVisible(true)
      })
    }

    function onLeave() {
      setVisible(false)
    }

    function onOver(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="drag"]')) setState('drag')
      else if (el.closest('[data-cursor="view"]')) setState('view')
      else if (
        el.closest('button') ||
        el.closest('[role="button"]') ||
        el.closest('input') ||
        el.closest('textarea') ||
        el.closest('select')
      )
        setState('button')
      else if (el.closest('a')) setState('link')
      else setState('default')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [rawX, rawY])

  if (!isFinePointer) return null

  const ringSize = RING_SIZES[state]
  const label = state === 'view' ? 'VIEW' : state === 'drag' ? 'DRAG' : null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Inner dot — instant */}
      <motion.div
        className="bg-accent-primary absolute top-0 left-0 rounded-full"
        style={{
          width: 6,
          height: 6,
          x: dotX,
          y: dotY,
          opacity: visible ? (state === 'button' ? 0 : 1) : 0,
          scale: state === 'link' ? 1.5 : 1,
        }}
        transition={{ scale: { type: 'spring', ...SPRING } }}
      />

      {/* Outer ring — lagged spring */}
      <motion.div
        className="border-accent-primary absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{ x: ringCX, y: ringCY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          scale: state === 'button' ? 0.4 : 1,
        }}
        transition={{ type: 'spring', ...SPRING }}
      >
        {label && (
          <span className="text-accent-primary text-[9px] font-semibold tracking-[0.15em]">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  )
}
