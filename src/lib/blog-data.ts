export const BLOG_SLUGS = [
  'csr-to-ssr-seo',
  'pragmatic-argocd-gitops',
  'terraform-vs-pulumi-2026',
] as const

export type BlogSlug = (typeof BLOG_SLUGS)[number]

export interface PostMeta {
  title: string
  date: string
  description: string
  category: string
  readTime: string
}

export const POST_META: Record<BlogSlug, PostMeta> = {
  'csr-to-ssr-seo': {
    title:
      'From CSR to SSR: Why Your Portfolio Is Invisible to Google (and How I Fixed Mine)',
    date: '2026-04-01',
    description:
      'My old portfolio was a Create React App. Googlebot saw a blank div. Here is what the CSR problem actually looks like, and how switching to Next.js SSG fixed it.',
    category: 'Web Dev',
    readTime: '8 min',
  },
  'pragmatic-argocd-gitops': {
    title: 'A Pragmatic GitOps Setup with ArgoCD: What I Actually Use in Production',
    date: '2026-03-15',
    description:
      'Most ArgoCD tutorials set you up to fail at scale. Here is the app-of-apps pattern, repo structure, and sync policies I use across 30+ microservice environments.',
    category: 'DevOps',
    readTime: '11 min',
  },
  'terraform-vs-pulumi-2026': {
    title:
      'Terraform vs Pulumi in 2026: Which One Should You Pick for a Greenfield Project?',
    date: '2026-03-01',
    description:
      'After running both in production, an honest comparison of Terraform and Pulumi — when to use each, and the one thing that matters more than which tool you choose.',
    category: 'DevOps',
    readTime: '9 min',
  },
}
