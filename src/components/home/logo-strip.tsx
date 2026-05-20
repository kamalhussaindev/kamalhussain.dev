import Image from 'next/image'
import { PLACEHOLDERS } from '@/lib/placeholders'

const LOGOS = [
  { name: 'AWS', src: PLACEHOLDERS.logoStrip.aws },
  { name: 'Kubernetes', src: PLACEHOLDERS.logoStrip.kubernetes },
  { name: 'Terraform', src: PLACEHOLDERS.logoStrip.terraform },
  { name: 'GitHub', src: PLACEHOLDERS.logoStrip.github },
  { name: 'Datadog', src: PLACEHOLDERS.logoStrip.datadog },
  { name: 'Vercel', src: PLACEHOLDERS.logoStrip.vercel },
]

export function LogoStrip() {
  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-fg-dim mb-6 text-center font-mono text-xs font-medium tracking-[0.2em] uppercase">
          Technologies I work with every day
        </p>
        {/* PLACEHOLDER-IMG: Replace clearbit logos with real SVG logos or a proper logo lockup */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="relative h-7 w-20 opacity-40 grayscale transition-opacity hover:opacity-70"
            >
              <Image src={logo.src} alt={logo.name} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
