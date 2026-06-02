import type { MetadataRoute } from 'next'
import { SITE_URL, SERVICE_SLUGS } from '@/lib/constants'
import { RESOURCE_SLUGS } from '@/lib/resources-data'

export const dynamic = 'force-static'

const BLOG_SLUGS = [
  'csr-to-ssr-seo',
  'pragmatic-argocd-gitops',
  'terraform-vs-pulumi-2026',
]

const WORK_SLUGS = ['pulsehealth-eks']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${SITE_URL}/about/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/work/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/book/`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/uses/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/now/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/checklist/kubernetes-production/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resources/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}/`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const workPages: MetadataRoute.Sitemap = WORK_SLUGS.map((slug) => ({
    url: `${SITE_URL}/work/${slug}/`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  const resourcePages: MetadataRoute.Sitemap = RESOURCE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/resources/${slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages, ...blogPages, ...workPages, ...resourcePages]
}
