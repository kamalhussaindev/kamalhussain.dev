'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    let gsap: (typeof import('gsap'))['gsap']
    let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']
    let lenis: import('lenis').default

    async function init() {
      const [gsapModule, lenisModule] = await Promise.all([
        import('gsap'),
        import('lenis'),
      ])
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')

      gsap = gsapModule.gsap
      ScrollTrigger = ST
      gsap.registerPlugin(ScrollTrigger)

      lenis = new lenisModule.default({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      })

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      const ticker = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(ticker)
      gsap.ticker.lagSmoothing(0)

      // Expose lenis globally so other components can listen
      ;(window as unknown as Record<string, unknown>).lenis = lenis
    }

    init()

    return () => {
      if (lenis) {
        lenis.destroy()
        ;(window as unknown as Record<string, unknown>).lenis = undefined
      }
    }
  }, [prefersReduced])

  return <>{children}</>
}
