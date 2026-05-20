'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  className?: string
  as?: string
  href?: string
  target?: string
  rel?: string
  onClick?: React.MouseEventHandler
  type?: 'button' | 'submit' | 'reset'
}

const SPRING = { damping: 20, stiffness: 200, mass: 0.3 }
const INNER_SPRING = { damping: 25, stiffness: 300, mass: 0.2 }

export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  as,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const outerX = useMotionValue(0)
  const outerY = useMotionValue(0)
  const innerX = useMotionValue(0)
  const innerY = useMotionValue(0)

  const springOuterX = useSpring(outerX, SPRING)
  const springOuterY = useSpring(outerY, SPRING)
  const springInnerX = useSpring(innerX, INNER_SPRING)
  const springInnerY = useSpring(innerY, INNER_SPRING)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    outerX.set(dx * strength)
    outerY.set(dy * strength)
    innerX.set(dx * strength * 0.4)
    innerY.set(dy * strength * 0.4)
  }

  function onMouseLeave() {
    outerX.set(0)
    outerY.set(0)
    innerX.set(0)
    innerY.set(0)
  }

  const Tag = (as ?? 'div') as unknown as React.FC<{
    className?: string
    children?: React.ReactNode
    href?: string
    target?: string
    rel?: string
    onClick?: React.MouseEventHandler
    type?: string
  }>

  return (
    <motion.div
      ref={ref}
      style={{ x: springOuterX, y: springOuterY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex"
    >
      <motion.div style={{ x: springInnerX, y: springInnerY }} className="inline-flex">
        <Tag className={className} {...rest}>
          {children}
        </Tag>
      </motion.div>
    </motion.div>
  )
}
