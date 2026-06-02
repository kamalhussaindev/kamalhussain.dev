import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/constants'
import { K8sChecklistForm } from '@/components/checklist/k8s-checklist-form'

export const metadata: Metadata = {
  title: 'Kubernetes Production Checklist — Free PDF (47 items)',
  description:
    'Free 47-item checklist: everything your Kubernetes cluster needs before production. Download as PDF.',
  alternates: { canonical: `${SITE_URL}/checklist/kubernetes-production` },
  openGraph: {
    title: 'Kubernetes Production Checklist — Free PDF | Kamal Hussain',
    description:
      'Free 47-item checklist: everything your Kubernetes cluster needs before production. Download as PDF.',
    url: `${SITE_URL}/checklist/kubernetes-production`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kubernetes Production Checklist — Free PDF | Kamal Hussain',
    description:
      'Free 47-item checklist: everything your Kubernetes cluster needs before production. Download as PDF.',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Kubernetes Checklist',
      item: `${SITE_URL}/checklist/kubernetes-production`,
    },
  ],
}

export default function K8sChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <nav className="text-fg-muted mb-10 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="text-fg-subtle mx-2">/</span>
          <span className="text-foreground">Kubernetes Checklist</span>
        </nav>
        <K8sChecklistForm />
      </div>
    </>
  )
}
