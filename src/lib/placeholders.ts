/**
 * Image paths used across the site — all pointing to local /public assets.
 * No external placeholder services (picsum / pravatar) remain.
 */

export const PLACEHOLDERS = {
  // ── Home ──────────────────────────────────────────────────────────────────

  logoStrip: {
    aws: 'https://logo.clearbit.com/aws.amazon.com',
    kubernetes: 'https://logo.clearbit.com/kubernetes.io',
    terraform: 'https://logo.clearbit.com/terraform.io',
    github: 'https://logo.clearbit.com/github.com',
    datadog: 'https://logo.clearbit.com/datadoghq.com',
    vercel: 'https://logo.clearbit.com/vercel.com',
  },

  aboutTeaserPortrait: '/kamal-hussain.png',

  nxtauricTeam: '/hero-devops.png',

  testimonials: {
    jamesCarter: '/kamal-hussain.png',
    priyaNair: '/kamal-hussain.png',
    davidWalsh: '/kamal-hussain.png',
  },

  // ── About ─────────────────────────────────────────────────────────────────

  aboutHeroPortrait: '/kamal-hussain.png',

  aboutWorkspace: '/workspace.png',

  // ── Services ──────────────────────────────────────────────────────────────

  servicesHero: '/services-hero.png',

  serviceHero: (_slug: string) => '/services-hero.png',

  // ── Work ──────────────────────────────────────────────────────────────────

  workThumbnail: (slug: string) =>
    slug === 'pulsehealth-eks' ? '/case-study-hero.png' : '/hero-devops.png',

  workHero: (slug: string) =>
    slug === 'pulsehealth-eks' ? '/case-study-hero.png' : '/hero-devops.png',

  workScreenshot: (slug: string, n: number) =>
    slug === 'pulsehealth-eks' && n === 1
      ? '/pulsehealth-metrics.png'
      : '/hero-devops.png',

  workTestimonialAvatar: (_slug: string) => '/kamal-hussain.png',

  // ── Blog ──────────────────────────────────────────────────────────────────

  blogFeaturedHero: '/hero-devops.png',

  blogCardThumb: (_slug: string) => '/hero-devops.png',

  blogPostHero: (_slug: string) => '/hero-devops.png',

  blogAuthorAvatar: '/kamal-hussain.png',

  // ── Book ──────────────────────────────────────────────────────────────────

  bookPortrait: '/kamal-hussain.png',

  // ── Contact ───────────────────────────────────────────────────────────────

  contactImage: '/contact-hero.png',
} as const
