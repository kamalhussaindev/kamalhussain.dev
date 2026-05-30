---
name: project-tier2-resources
description: Feature 1 of Tier 2 SEO layer — /resources/ hub shipped. 4 resource pages with real code.
metadata:
  type: project
---

Feature 1 (Resources Hub) of the Tier 2 SEO brief is complete and building clean.

**Why:** Long-term backlink magnets — engineers link these from SO/Reddit/HN. Content quality is the deliverable.

**What shipped:**

- `src/lib/resources-data.ts` — all 4 resources with real working code files (HCL, YAML)
- `src/components/resources/resource-code-viewer.tsx` — client component: file tabs + copy button
- `src/app/resources/page.tsx` — index (4-card grid + "why these exist" callout)
- `src/app/resources/[slug]/page.tsx` — detail page: Shiki server-side syntax highlighting, SoftwareSourceCode JSON-LD, BreadcrumbList JSON-LD, per-resource 800-1200 word explanations
- `src/app/resources/opengraph-image.tsx` + `[slug]/opengraph-image.tsx` — dynamic OG images
- Header: added "Resources" nav link between Work and Blog
- Footer: resources listed under "Free Resources" column
- Sitemap: all 4 resource pages added at priority 0.8
- Robots.ts: explicit allow for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Amazonbot

**4 resources:**

1. `/resources/helm-chart-starter` — Helm chart (Chart.yaml, values.yaml, deployment.yaml, hpa.yaml, pdb.yaml, servicemonitor.yaml)
2. `/resources/terraform-module-aws-eks` — Terraform module (versions.tf, variables.tf, main.tf, outputs.tf)
3. `/resources/github-actions-deploy-template` — GHA workflows (deploy.yml, ci.yml)
4. `/resources/argocd-app-of-apps` — ArgoCD manifests (bootstrap, applicationsets, appprojects)

**Tech note:** Shiki v1 `codeToHtml()` called in the Next.js server component. HTML passed to client `ResourceCodeViewer` for tab switching + copy. Template literals in resources-data.ts needed `\${var.}` and `\${{` escaping for HCL/GHA content.

**How to apply:** Next step per the brief is Feature 2 (Comparisons). Wait for review gate before starting.
