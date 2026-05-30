import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { K8sChecklistForm } from '@/components/checklist/k8s-checklist-form'

export const metadata: Metadata = {
  title: 'Production Kubernetes Checklist (47 items) — Free Download',
  description:
    'Free 47-item checklist: everything your Kubernetes cluster needs before production. Download as PDF.',
  alternates: { canonical: `${SITE_URL}/checklist/kubernetes-production` },
  openGraph: {
    title: 'Production Kubernetes Checklist — Kamal Hussain',
    url: `${SITE_URL}/checklist/kubernetes-production`,
  },
}

export default function K8sChecklistPage() {
  return (
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
  )
}
