'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const prefersReduced = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  if (prefersReduced) return null

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[100] h-px origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #FF4D2E, #7C5CFF)',
      }}
    />
  )
}
