'use client'

import { ThemeProvider } from 'next-themes'
import { LenisProvider } from '@/components/lenis-provider'
import { Cursor } from '@/components/ui/cursor'
import { Grain } from '@/components/ui/grain'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>
        <Cursor />
        <Grain />
        <ScrollProgress />
        {children}
      </LenisProvider>
    </ThemeProvider>
  )
}
