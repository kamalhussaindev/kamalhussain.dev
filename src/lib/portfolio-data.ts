export interface PortfolioProject {
  id: string
  title: string
  summary: string
  role: string
  stack: string[]
  image: string
  type: string
  featured?: boolean
  liveUrl: string
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'matrix-of-destiny',
    title: 'Matrix of Destiny',
    summary:
      'A free numerology web app with six interconnected calculators (personal matrix, compatibility, child matrix, arcana, karmic) that generate instant personalized charts from a single date-of-birth input, plus a content/learn section and SEO-optimized architecture.',
    role: 'Design & full-stack build',
    stack: ['React', 'Next.js', 'Custom calculation logic', 'Content system', 'SEO'],
    image: '/work/matrix-of-destiny.png',
    type: 'SaaS Web App',
    featured: true,
    liveUrl: 'https://mymatrixofdestiny.com/',
  },
  {
    id: 'blogsyra',
    title: 'BlogSyra',
    summary:
      'A digital-services business website with a custom WordPress theme — services, portfolio, pricing, team, and blog sections with integrated contact and maps.',
    role: 'WordPress development, custom theme work, full site build',
    stack: ['WordPress', 'Custom theme', 'Bootstrap'],
    image: '/work/blogsyra.png',
    type: 'WordPress',
    liveUrl: 'https://blogsyra.com/',
  },
  {
    id: 'ejaz-khan',
    title: 'Ejaz Khan',
    summary:
      'A personal-brand / CEO portfolio site — one-page design with an animated hero, services, portfolio grid, and blog.',
    role: 'Design & build',
    stack: ['WordPress', 'Slider Revolution'],
    image: '/work/ejaz-khan.png',
    type: 'WordPress',
    liveUrl: 'https://ejazkhan.com/',
  },
  {
    id: 'webnexy',
    title: 'Webnexy',
    summary:
      'A digital-agency website — services, portfolio, team, and blog with a custom slider-driven hero.',
    role: 'WordPress development & customization',
    stack: ['WordPress', 'Elementor', 'RS Elements'],
    image: '/work/webnexy.png',
    type: 'WordPress',
    liveUrl: 'https://webnexy.com/',
  },
  {
    id: 'zia-shamshary',
    title: 'Zia Shamshary',
    summary:
      'A personal portfolio site — animated hero, services, project showcase, and testimonials.',
    role: 'Design & build',
    stack: ['WordPress', 'Elementor'],
    image: '/work/zia-shamshary.png',
    type: 'WordPress',
    liveUrl: 'https://ziashamshary.com/',
  },
  {
    id: 'nxtauric',
    title: 'NxtAuric',
    summary:
      'A digital-agency website — multi-section layout presenting an IT-solutions business (services, projects, team, blog, testimonials, contact).',
    role: 'Build',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/work/nxtauric.png',
    type: 'Static HTML/CSS/JS',
    liveUrl: 'https://nxtauric.com/',
  },
]
