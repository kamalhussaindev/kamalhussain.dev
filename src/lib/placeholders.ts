/**
 * Placeholder image URLs used across the site.
 * Search for PLACEHOLDER-IMG to find every usage site.
 * Replace each URL with a real asset before launch.
 */

export const PLACEHOLDERS = {
  // ── Home ──────────────────────────────────────────────────────────────────

  /** Home / LogoStrip — trust strip logos (replace with actual client/partner SVGs) */
  logoStrip: {
    aws: 'https://logo.clearbit.com/aws.amazon.com',
    kubernetes: 'https://logo.clearbit.com/kubernetes.io',
    terraform: 'https://logo.clearbit.com/terraform.io',
    github: 'https://logo.clearbit.com/github.com',
    datadog: 'https://logo.clearbit.com/datadoghq.com',
    vercel: 'https://logo.clearbit.com/vercel.com',
  },

  /** Home / AboutTeaser — portrait in the right column */
  aboutTeaserPortrait: 'https://picsum.photos/seed/kamal-about/600/700',

  /** Home / NxtAuricStrip — team photo */
  nxtauricTeam: 'https://picsum.photos/seed/nxtauric-team/800/500',

  /** Home / Testimonials — reviewer avatars (replace initials with real photos or remove) */
  testimonials: {
    jamesCarter: 'https://i.pravatar.cc/160?img=11',
    priyaNair: 'https://i.pravatar.cc/160?img=47',
    davidWalsh: 'https://i.pravatar.cc/160?img=53',
  },

  // ── About ─────────────────────────────────────────────────────────────────

  /** About / Hero — large portrait in the right column */
  aboutHeroPortrait: 'https://picsum.photos/seed/kamal-hero/800/900',

  /** About / Body — workspace/desk shot between paragraphs */
  aboutWorkspace: 'https://picsum.photos/seed/kamal-workspace/1200/600',

  // ── Services ──────────────────────────────────────────────────────────────

  /** Services index — hero visual */
  servicesHero: 'https://picsum.photos/seed/services-hero/1200/500',

  /** Services [slug] — per-service hero (append slug as seed suffix) */
  serviceHero: (slug: string) => `https://picsum.photos/seed/service-${slug}/1200/500`,

  // ── Work ──────────────────────────────────────────────────────────────────

  /** Work index — case study thumbnails (append slug as seed suffix) */
  workThumbnail: (slug: string) => `https://picsum.photos/seed/work-${slug}/800/500`,

  /** Work [slug] — full-width hero */
  workHero: (slug: string) => `https://picsum.photos/seed/workhero-${slug}/1600/700`,

  /** Work [slug] — inline screenshots / result images */
  workScreenshot: (slug: string, n: number) =>
    `https://picsum.photos/seed/workshot-${slug}-${n}/1200/700`,

  /** Work [slug] — case study testimonial avatar */
  workTestimonialAvatar: (slug: string) =>
    `https://picsum.photos/seed/workavatar-${slug}/160/160`,

  // ── Blog ──────────────────────────────────────────────────────────────────

  /** Blog index — featured post hero */
  blogFeaturedHero: 'https://picsum.photos/seed/blog-featured/1200/600',

  /** Blog index — article card thumbnails (append slug as seed suffix) */
  blogCardThumb: (slug: string) => `https://picsum.photos/seed/blog-${slug}/800/450`,

  /** Blog [slug] — full-width post hero (replaces gradient PostHeroImage) */
  blogPostHero: (slug: string) => `https://picsum.photos/seed/posthero-${slug}/1600/700`,

  /** Blog [slug] — author avatar */
  blogAuthorAvatar: 'https://i.pravatar.cc/160?img=12',

  // ── Book ──────────────────────────────────────────────────────────────────

  /** Book page — portrait in right column */
  bookPortrait: 'https://picsum.photos/seed/kamal-book/600/700',

  // ── Contact ───────────────────────────────────────────────────────────────

  /** Contact page — right column image */
  contactImage: 'https://picsum.photos/seed/kamal-contact/600/700',
} as const
