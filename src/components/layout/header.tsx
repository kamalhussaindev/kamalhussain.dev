'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { StatusPill } from '@/components/ui/status-pill'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/resources', label: 'Resources' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const ThemeIcon = mounted && theme === 'light' ? Moon : Sun

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-border bg-background/70 border-b backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Kamal Hussain — home"
            className="group text-foreground flex items-center gap-1 text-xl font-bold tracking-tighter transition-opacity hover:opacity-80"
          >
            KH
            <span className="text-accent-primary inline-block transition-transform group-hover:scale-110">
              .
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith(link.href)
                    ? 'text-foreground'
                    : 'text-fg-muted hover:text-foreground'
                }`}
              >
                {link.label}
                {pathname.startsWith(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-bg-raised absolute inset-0 rounded-md"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden items-center gap-3 md:flex">
            <StatusPill className="hidden lg:inline-flex" />

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-fg-muted hover:text-foreground hover:bg-bg-raised rounded-md p-2 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon size={16} aria-hidden />
            </button>

            <Link
              href="/book"
              className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 glow-accent-sm rounded-md px-4 py-2 text-sm font-semibold text-white transition-all"
            >
              Book a call
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-fg-muted hover:text-foreground rounded-md p-2 transition-colors"
              aria-label="Toggle theme"
            >
              <ThemeIcon size={16} aria-hidden />
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="text-fg-muted hover:text-foreground rounded-md p-2 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="bg-background fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex h-full flex-col px-6 pt-24 pb-8">
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center rounded-lg px-4 py-3.5 text-lg font-medium transition-colors ${
                        pathname.startsWith(link.href)
                          ? 'bg-bg-raised text-foreground'
                          : 'text-fg-muted hover:bg-bg-raised hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-3">
                <StatusPill className="w-fit" />
                <Link
                  href="/book"
                  className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 block w-full rounded-lg px-4 py-3.5 text-center text-base font-semibold text-white transition-colors"
                >
                  Book a call
                </Link>
                <Link
                  href="/contact"
                  className="border-border text-foreground hover:bg-bg-raised block w-full rounded-lg border px-4 py-3.5 text-center text-base font-medium transition-colors"
                >
                  Send a brief
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
