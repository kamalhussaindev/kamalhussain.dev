import Image from 'next/image'

const CATEGORY_GRADIENTS: Record<string, { start: string; mid: string; end: string }> = {
  DevOps: {
    start: 'oklch(0.22 0.06 265)',
    mid: 'oklch(0.17 0.09 255)',
    end: 'oklch(0.13 0.05 280)',
  },
  'Web Dev': {
    start: 'oklch(0.20 0.08 300)',
    mid: 'oklch(0.16 0.07 330)',
    end: 'oklch(0.13 0.05 350)',
  },
  Career: {
    start: 'oklch(0.20 0.07 155)',
    mid: 'oklch(0.16 0.06 140)',
    end: 'oklch(0.12 0.04 170)',
  },
  Tools: {
    start: 'oklch(0.22 0.09 55)',
    mid: 'oklch(0.17 0.08 40)',
    end: 'oklch(0.13 0.05 25)',
  },
}

interface PostHeroImageProps {
  category: string
  className?: string
  src?: string
}

export function PostHeroImage({ category, className = '', src }: PostHeroImageProps) {
  const g = CATEGORY_GRADIENTS[category] ?? CATEGORY_GRADIENTS['DevOps']

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${g.start} 0%, ${g.mid} 50%, ${g.end} 100%)`,
      }}
    >
      {/* PLACEHOLDER-IMG: Real image overlaid on gradient — replace src with actual post image */}
      {src && <Image src={src} alt={category} fill className="object-cover opacity-40" />}
      {/* Accent radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 25% 35%, oklch(0.63 0.24 24 / 0.14) 0%, transparent 65%)',
        }}
      />
      {/* Grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <span className="absolute bottom-4 left-4 font-mono text-xs font-semibold tracking-[0.2em] text-white/40 uppercase select-none">
        {category}
      </span>
    </div>
  )
}
