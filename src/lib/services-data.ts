import { SERVICE_SLUGS } from './constants'

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export interface Deliverable {
  title: string
  description: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  duration: string
}

export interface FAQ {
  q: string
  a: string
}

export interface ServiceData {
  slug: ServiceSlug
  title: string
  tagline: string
  lede: string
  whoFor: string[]
  deliverables: Deliverable[]
  process: ProcessStep[]
  stack: string[]
  pricingNote: string
  faqs: FAQ[]
}

export const SERVICES_DATA: Record<ServiceSlug, ServiceData> = {
  'kubernetes-platform-engineering': {
    slug: 'kubernetes-platform-engineering',
    title: 'Kubernetes Platform Engineering',
    tagline: 'Production-ready clusters — built to last, not just to demo.',
    lede: `Running Kubernetes in production is not the same as running it on your laptop. The distance between a working cluster and a reliable platform is measured in RBAC policies, network policies, pod disruption budgets, autoscaling configurations, secrets management, certificate renewal, GitOps workflows, and a hundred small decisions that don't show up in tutorials. I design and build Kubernetes platforms that engineering teams can actually operate — with runbooks, alerts that mean something, and infrastructure that doesn't require a specialist to keep alive.`,
    whoFor: [
      'Startups moving from Docker Compose or bare EC2 to Kubernetes for the first time',
      'Engineering teams with a Kubernetes cluster that grew organically and now needs a proper foundation',
      'Companies preparing for SOC 2, ISO 27001, or enterprise customer security reviews',
      'Teams that have an incident every time they touch the cluster',
      "CTOs who want Kubernetes but don't have the bandwidth to build it right internally",
    ],
    deliverables: [
      {
        title: 'Cluster architecture document',
        description:
          'Node groups, networking model (CNI choice), storage classes, ingress strategy, and upgrade plan — documented before a single resource is provisioned.',
      },
      {
        title: 'GitOps-driven provisioning',
        description:
          'All cluster state declared in Git via Helm + ArgoCD (or Flux). No manual kubectl apply in production. Full audit trail on every change.',
      },
      {
        title: 'RBAC and namespace strategy',
        description:
          'Least-privilege service accounts, namespace isolation, and network policies so teams can deploy without stepping on each other.',
      },
      {
        title: 'Autoscaling configuration',
        description:
          'Horizontal Pod Autoscaler, Vertical Pod Autoscaler (where appropriate), and Cluster Autoscaler or Karpenter — tuned for your workload patterns.',
      },
      {
        title: 'Secrets and certificate management',
        description:
          'External Secrets Operator pulling from AWS Secrets Manager or HashiCorp Vault. cert-manager for automatic TLS certificate rotation.',
      },
      {
        title: 'Observability integration',
        description:
          'Prometheus, Grafana, and Loki deployed and pre-configured with kubernetes-specific dashboards and alert rules.',
      },
      {
        title: 'Runbooks and handover docs',
        description:
          'Written documentation covering day-2 operations: upgrades, node replacements, disaster recovery, and common failure modes.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & audit',
        description:
          'We map your current infrastructure, workload requirements, team structure, and compliance constraints. If you already have a cluster, I audit what exists.',
        duration: '3–5 days',
      },
      {
        step: 2,
        title: 'Architecture design',
        description:
          'I produce an architecture document covering cluster topology, networking, storage, security boundaries, and tooling choices. We align on this before any provisioning.',
        duration: '3–5 days',
      },
      {
        step: 3,
        title: 'Cluster provisioning',
        description:
          'EKS, GKE, or AKS provisioned via Terraform. Core platform components installed: ingress controller, cert-manager, external-secrets, ArgoCD, monitoring stack.',
        duration: '1–2 weeks',
      },
      {
        step: 4,
        title: 'Application migration',
        description:
          'Workloads containerised (if needed) and migrated with Helm charts. Health checks, resource requests/limits, and pod disruption budgets configured for each service.',
        duration: '1–2 weeks',
      },
      {
        step: 5,
        title: 'Hardening & testing',
        description:
          'Network policies applied, RBAC reviewed, Trivy/Falco for image and runtime security scanning. Load testing and chaos engineering to verify resilience.',
        duration: '3–5 days',
      },
      {
        step: 6,
        title: 'Handover & documentation',
        description:
          'Runbooks written, team walkthroughs delivered, and a 30-day support window for questions as your team gets comfortable.',
        duration: '2–3 days + 30-day window',
      },
    ],
    stack: [
      'Kubernetes (EKS / GKE / AKS)',
      'Terraform',
      'Helm',
      'ArgoCD',
      'Flux',
      'Kustomize',
      'cert-manager',
      'External Secrets Operator',
      'HashiCorp Vault',
      'KEDA',
      'Karpenter',
      'Prometheus',
      'Grafana',
      'Loki',
      'Trivy',
      'Falco',
      'Cilium',
    ],
    pricingNote:
      'Greenfield cluster builds are quoted as fixed-price projects — typically £4,000–£12,000 depending on complexity, number of workloads, and compliance requirements. Existing cluster remediation or ongoing platform engineering retainers are available at a day rate. I provide a detailed scope document before any work begins so there are no surprises.',
    faqs: [
      {
        q: 'Which Kubernetes distribution do you recommend?',
        a: "For most startups on AWS, EKS is the right choice — managed control plane, tight IAM integration, and a large support ecosystem. GKE is excellent if you're already on GCP. AKS if Azure is your primary cloud. I'll recommend based on your existing cloud footprint and team familiarity, not on a preference.",
      },
      {
        q: "Do I need Kubernetes? My team is small and we're on Docker Compose.",
        a: "Probably not yet. I'll tell you honestly if Kubernetes is premature for your scale. The threshold I use: if you're running more than 8–10 services, need zero-downtime deploys, or have auto-scaling requirements, Kubernetes starts to pay for itself. Below that, ECS Fargate or a well-structured Docker Compose setup on EC2 is often simpler and cheaper.",
      },
      {
        q: 'How long does a Kubernetes platform build take?',
        a: 'A greenfield EKS cluster with a standard platform stack (ArgoCD, cert-manager, external-secrets, Prometheus/Grafana, ingress controller) takes 2–4 weeks end-to-end. Migrating existing workloads adds time depending on how containerized they already are.',
      },
      {
        q: 'Will my team be able to operate it after you leave?',
        a: "That's the goal. I write runbooks covering the most common day-2 operations: upgrading the cluster, replacing nodes, rolling back a bad deploy, investigating a crash-loop. I also do a handover session where I walk your team through the architecture and tooling. The 30-day support window means questions don't get answered by a stack trace.",
      },
      {
        q: 'Do you provide ongoing support after the build?',
        a: 'Yes. I offer monthly retainers covering on-call escalation, cluster upgrades, and ongoing platform improvements. I also do one-off engagements for specific problems — upgrading a stuck cluster, adding a new tool, fixing a production issue.',
      },
      {
        q: 'Can you work with our existing Terraform/Helm setup?',
        a: "Always. I'd rather improve what you have than rewrite it. I'll audit the existing code, identify risks, and refactor incrementally rather than doing a big-bang replacement.",
      },
    ],
  },

  'cicd-pipeline-engineering': {
    slug: 'cicd-pipeline-engineering',
    title: 'CI/CD Pipeline Engineering',
    tagline: 'Pipelines that deploy in minutes, not hours — and stay green.',
    lede: `Slow CI is a morale tax. A pipeline that takes 45 minutes per run, fails intermittently, or requires manual steps before production is a pipeline that engineers work around — not with. I design and build CI/CD pipelines that are fast, reliable, and opinionated about keeping main deployable. That means parallelised test suites, multi-environment promotion gates, secret injection that doesn't involve spreadsheets, and deployment strategies that make rollbacks boring. The goal is a pipeline your team trusts enough to actually use on every commit.`,
    whoFor: [
      'Teams with a Jenkins setup that "works" but nobody wants to touch',
      'Startups still doing manual deployments or running ad-hoc deploy scripts',
      'Engineering teams where CI flakiness has become a running joke',
      'Companies where production deploys require a senior engineer to babysit',
      "Teams that want GitHub Actions but aren't sure how to structure it well",
    ],
    deliverables: [
      {
        title: 'Pipeline architecture design',
        description:
          'Documented strategy covering trigger model, environment promotion flow (dev → staging → production), rollback approach, and secrets management.',
      },
      {
        title: 'CI workflow implementation',
        description:
          'Build, lint, test, security scan — all parallelised where possible. Caching configured for dependencies and Docker layers to minimise build times.',
      },
      {
        title: 'CD deployment strategy',
        description:
          'ArgoCD GitOps or direct deployment pipelines with blue/green or canary rollout, automated smoke tests, and automatic rollback on failure metrics.',
      },
      {
        title: 'Secrets management integration',
        description:
          'OIDC-based cloud authentication (no long-lived credentials in CI). Secrets pulled from Vault, AWS Secrets Manager, or GitHub Secrets — scoped to the minimum necessary.',
      },
      {
        title: 'Multi-environment configuration',
        description:
          'Environment-specific configuration via Helm values, Kustomize overlays, or environment files — with clear promotion gates between environments.',
      },
      {
        title: 'Notifications and observability',
        description:
          'Slack/PagerDuty alerts on deploy failures, duration regressions, and security scan findings. Deploy frequency and lead time tracked from day one.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Pipeline audit',
        description:
          "I map your current deployment process — what's automated, what's manual, where failures happen, and where engineers lose time. I measure current deploy frequency, lead time, and MTTR.",
        duration: '1–2 days',
      },
      {
        step: 2,
        title: 'Architecture design',
        description:
          'I produce a pipeline design covering tooling choice, trigger model, environment strategy, secrets approach, and rollback mechanism. We align on this before writing code.',
        duration: '2–3 days',
      },
      {
        step: 3,
        title: 'CI implementation',
        description:
          'Build, test, lint, and security scan jobs built and optimised. Caching layers configured. Flaky tests identified and quarantined or fixed.',
        duration: '1–2 weeks',
      },
      {
        step: 4,
        title: 'CD implementation',
        description:
          'Deployment workflows built for each environment. Promotion gates configured. Smoke tests and automatic rollback conditions defined.',
        duration: '1–2 weeks',
      },
      {
        step: 5,
        title: 'Dry-run and validation',
        description:
          'Full pipeline run with a real deployment to staging and production. Rollback tested. Deploy times measured against targets.',
        duration: '2–3 days',
      },
      {
        step: 6,
        title: 'Handover',
        description:
          'Team walkthrough of the pipeline logic, troubleshooting guide for common failures, and documentation of the secrets model and promotion flow.',
        duration: '1–2 days',
      },
    ],
    stack: [
      'GitHub Actions',
      'GitLab CI',
      'Jenkins',
      'ArgoCD',
      'Tekton',
      'Docker',
      'Docker Buildx',
      'Helm',
      'Kustomize',
      'AWS OIDC',
      'HashiCorp Vault',
      'Trivy',
      'Snyk',
      'Slack',
      'PagerDuty',
    ],
    pricingNote:
      'Most pipeline builds are scoped as fixed-price projects: £2,500–£7,000 depending on the number of services, environments, and whether legacy CI needs to be replaced or rebuilt. Ongoing retainers available for teams that want a dedicated DevOps engineer without the headcount cost.',
    faqs: [
      {
        q: 'GitHub Actions or Jenkins — which should I use?',
        a: "GitHub Actions for almost everything new. It's cheaper to run, easier to maintain, has a large ecosystem of actions, and integrates natively with your repository. Jenkins makes sense if you have significant existing pipeline investment, need to run on-premise, or have very complex build graphs that benefit from the plugin ecosystem. I'll recommend based on your situation.",
      },
      {
        q: 'Our CI takes 40 minutes. How fast can you make it?',
        a: "Depends on what's slow. Common wins: parallelising test suites (often 60–70% reduction), fixing Docker layer caching, removing redundant steps, and splitting slow integration tests into a separate job that only runs on main. Sub-10-minute CI is achievable for most web/backend codebases without architectural changes.",
      },
      {
        q: 'We have flaky tests that cause CI failures. Is that a pipeline problem?',
        a: "Usually a test problem, but the pipeline can mask or expose it. I'll identify flaky tests during the audit, and depending on scope, either fix them, quarantine them, or give you a report of which tests need attention from your team.",
      },
      {
        q: 'How do you handle secrets in CI/CD?',
        a: "No long-lived credentials, ever. For AWS, I configure OIDC federation so GitHub Actions authenticates directly to AWS with a short-lived token tied to the specific repository and branch. For other secrets, I use Vault or the platform's native secrets management with the minimum required scope.",
      },
      {
        q: 'Do you support monorepos?',
        a: "Yes. Monorepo CI is mostly about affected-path detection — only building and testing what changed. I've implemented this with Nx, Turborepo, and custom path-filter logic in GitHub Actions and GitLab CI.",
      },
    ],
  },

  'aws-terraform-infrastructure': {
    slug: 'aws-terraform-infrastructure',
    title: 'AWS Cloud Infrastructure with Terraform',
    tagline: 'Your AWS estate — reproducible, auditable, and safe to change.',
    lede: `Click-ops infrastructure is technical debt with a production blast radius. When your AWS estate is a mix of manually created resources, one engineer's tribal knowledge, and a bill that surprises you every month, you're one mistake away from a very bad day. I migrate AWS infrastructure to Terraform — properly, not just wrapping existing resources in HCL. That means a modular structure your team can maintain, remote state with locking, CI/CD for infrastructure changes, a security baseline that passes audits, and cost visibility so you know what you're spending and why.`,
    whoFor: [
      'Startups with AWS infrastructure that was "just spun up quickly" and never formalised',
      'Engineering teams where only one person knows how the infrastructure was set up',
      'Companies receiving AWS bills that are higher than expected with no clear breakdown',
      'Teams preparing for SOC 2, ISO 27001, or enterprise customer security questionnaires',
      'CTOs who want to move faster on infrastructure without breaking production',
    ],
    deliverables: [
      {
        title: 'Terraform codebase',
        description:
          'Modular Terraform code in a structure your team can navigate — environment directories, reusable modules, and clear variable boundaries. No Terraform anti-patterns.',
      },
      {
        title: 'Remote state and locking',
        description:
          'S3 backend with DynamoDB locking. State encryption at rest. Separate state files per environment to isolate blast radius.',
      },
      {
        title: 'Infrastructure CI/CD',
        description:
          'Atlantis or GitHub Actions workflow for infrastructure PRs: terraform plan on every PR, apply on merge. No manual terraform apply in production.',
      },
      {
        title: 'Security baseline',
        description:
          'VPC with private subnets, security groups scoped to minimum required, IAM roles with least-privilege policies, CloudTrail enabled, S3 public access blocked, GuardDuty active.',
      },
      {
        title: 'Cost dashboard',
        description:
          'AWS Cost Explorer configured with tags for cost allocation. Budget alerts for unexpected spend spikes. Right-sizing recommendations for over-provisioned resources.',
      },
      {
        title: 'Architecture documentation',
        description:
          'Network topology diagram, service dependency map, and runbooks for common operations (scaling, rotating credentials, disaster recovery).',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Infrastructure audit',
        description:
          "I inventory your existing AWS resources, identify what's manually managed, review IAM policies for over-permissive roles, and produce a risk assessment.",
        duration: '2–4 days',
      },
      {
        step: 2,
        title: 'Architecture design',
        description:
          'VPC design, account structure recommendations, module architecture, and migration strategy — documented before any Terraform is written.',
        duration: '3–5 days',
      },
      {
        step: 3,
        title: 'Terraform import and codification',
        description:
          'Existing resources imported into Terraform state. New resources created in code. Drift between code and reality eliminated.',
        duration: '1–3 weeks',
      },
      {
        step: 4,
        title: 'Security hardening',
        description:
          'IAM policies reviewed and tightened. Security groups audited. Encryption at rest and in transit verified. AWS Config rules deployed for continuous compliance.',
        duration: '3–5 days',
      },
      {
        step: 5,
        title: 'CI/CD for infrastructure',
        description:
          'Terraform workflow automated. Plan on PRs, apply on merge. Notifications for apply failures and drift detection.',
        duration: '2–3 days',
      },
      {
        step: 6,
        title: 'Cost optimisation',
        description:
          'Reserved instances and savings plans analysis. Right-sizing recommendations. Unused resources identified and removed.',
        duration: '2–3 days',
      },
    ],
    stack: [
      'Terraform',
      'Terragrunt',
      'AWS (EKS, ECS, RDS, ElastiCache, S3, CloudFront, Route 53, VPC, IAM, SES)',
      'AWS Config',
      'AWS CloudTrail',
      'AWS GuardDuty',
      'AWS Cost Explorer',
      'Atlantis',
      'GitHub Actions',
      'tfsec',
      'Checkov',
      'Infracost',
    ],
    pricingNote:
      'Infrastructure migrations are scoped per-project: a typical AWS estate codification with security hardening runs £3,500–£9,000. Cost optimisation engagements are often day-rate (2–5 days) since the scope depends heavily on what we find. I provide Infracost estimates so you can see the projected cost impact before committing.',
    faqs: [
      {
        q: "We already have Terraform but it's a mess. Can you fix it?",
        a: "Yes, this is most of my work. Common problems: all resources in one flat directory with no modules, state stored locally, no CI/CD for infrastructure changes, and hardcoded values everywhere. I'll refactor incrementally — prioritising the highest-risk areas first — rather than rewriting everything at once.",
      },
      {
        q: 'How do you handle importing existing AWS resources without breaking anything?',
        a: 'Carefully. I use terraform import to bring existing resources under management, then verify with terraform plan that no changes are proposed before applying. I start with read-only resources (S3 buckets, security groups) and work up to stateful resources (RDS, ElastiCache). Nothing gets deleted or recreated without explicit sign-off.',
      },
      {
        q: 'Terragrunt or vanilla Terraform?',
        a: "Vanilla Terraform for most teams — it's simpler to onboard and easier to debug. Terragrunt makes sense when you have a large multi-account, multi-region estate and need to avoid repeating backend and provider configuration across dozens of modules. I'll recommend based on your scale.",
      },
      {
        q: 'Can you help reduce our AWS bill?',
        a: 'Often, yes. The most common wins: right-sizing over-provisioned EC2 and RDS instances, moving suitable workloads to spot instances or Fargate Spot, purchasing savings plans for predictable baseline compute, and eliminating forgotten resources (old snapshots, idle load balancers, unused Elastic IPs). A cost audit typically pays for itself within 2–3 months.',
      },
      {
        q: 'Do you work with multiple AWS accounts?',
        a: "Yes. Multi-account setups via AWS Organizations are the recommended approach for production workloads — separate accounts for production, staging, shared services, and sandbox. I'll design the account structure and set up cross-account IAM roles and resource sharing.",
      },
    ],
  },

  'observability-engineering': {
    slug: 'observability-engineering',
    title: 'Observability Engineering',
    tagline: 'See everything. Alert on what matters. Sleep through the rest.',
    lede: `Alert fatigue and blind spots are two sides of the same problem: an observability setup that wasn't designed, it just grew. Too many alerts that fire on symptoms instead of causes. Dashboards that were set up once and never updated. No structured logs in production. No distributed traces to follow a request across services. I build observability stacks that give your team genuine visibility — meaningful alerts, dashboards engineers actually use, and the logs and traces to debug production issues in minutes rather than hours.`,
    whoFor: [
      'Engineering teams that find out about production issues from customers, not monitoring',
      'On-call rotations drowning in alert noise with no way to prioritise',
      'Teams running Kubernetes with no visibility into cluster or pod resource usage',
      "Companies that have Prometheus/Grafana installed but haven't configured it properly",
      'Engineering teams preparing SLOs for enterprise customers or investor due diligence',
    ],
    deliverables: [
      {
        title: 'Metrics stack (Prometheus + Grafana)',
        description:
          'Prometheus deployed with service discovery, recording rules for expensive queries, and retention tuned for your data volume. Grafana with pre-built Kubernetes and application dashboards.',
      },
      {
        title: 'Log aggregation (Loki)',
        description:
          'Promtail or OpenTelemetry Collector forwarding logs to Loki. Structured log parsing configured. Log-based alerts for error rate spikes and critical log patterns.',
      },
      {
        title: 'Distributed tracing',
        description:
          'OpenTelemetry SDK integration for your primary services. Tempo or Jaeger as the trace backend. Request traces linked to logs and metrics for unified debugging.',
      },
      {
        title: 'Alert design and routing',
        description:
          'Alertmanager configured with meaningful alert rules — alerting on symptoms, not noise. Routing to Slack for low-severity, PagerDuty for page-worthy events.',
      },
      {
        title: 'SLO/SLA definitions',
        description:
          'Error budget tracking for critical user journeys. SLO dashboards showing burn rate and remaining budget. Alerts when error budget burn rate is unsustainable.',
      },
      {
        title: 'Runbooks',
        description:
          'On-call runbooks linked from alert annotations. Each runbook covers: what triggered this alert, why it matters, and the investigation steps to resolve it.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Observability audit',
        description:
          'I review what you currently have — metrics, logs, traces, alerting rules — and identify the gaps causing blind spots or alert fatigue.',
        duration: '1–2 days',
      },
      {
        step: 2,
        title: 'SLO definition workshop',
        description:
          'We define what reliability means for your product: the user journeys that matter, the acceptable error rates, and the latency targets.',
        duration: '1 day',
      },
      {
        step: 3,
        title: 'Stack deployment',
        description:
          'Prometheus, Grafana, Loki, and optionally Tempo deployed via Helm. Retention, resource limits, and storage configured for your data volume.',
        duration: '3–5 days',
      },
      {
        step: 4,
        title: 'Instrumentation',
        description:
          'Application metrics exposed and collected. Structured logging implemented. OpenTelemetry tracing added to critical service paths.',
        duration: '1–2 weeks',
      },
      {
        step: 5,
        title: 'Alert design',
        description:
          'Meaningful alert rules written and tested. Alertmanager routing configured. Existing alert noise reduced. SLO burn-rate alerts configured.',
        duration: '3–5 days',
      },
      {
        step: 6,
        title: 'Dashboard build and handover',
        description:
          'Operational dashboards built for each service and the cluster. On-call runbooks written. Team walkthrough covering how to use the stack to debug a production issue.',
        duration: '2–3 days',
      },
    ],
    stack: [
      'Prometheus',
      'Grafana',
      'Loki',
      'Tempo',
      'Alertmanager',
      'OpenTelemetry',
      'Promtail',
      'kube-state-metrics',
      'node-exporter',
      'PagerDuty',
      'OpsGenie',
      'Slack',
      'VictoriaMetrics (for large-scale setups)',
    ],
    pricingNote:
      'Observability builds range from £2,500 (adding Loki and better alerting to an existing Prometheus/Grafana stack) to £8,000 (full stack from scratch with tracing and SLO framework). Ongoing retainers are available for teams that want dashboards and alerts maintained as the system evolves.',
    faqs: [
      {
        q: 'We have Grafana but nobody looks at it. Where do we start?',
        a: "That's a common state. Usually the dashboards are too low-level (raw container metrics, no service-level view), the alert rules fire too often on things nobody can fix, or there's no structured log data to actually debug with. I'd start with a dashboard that shows the four golden signals — latency, traffic, errors, saturation — for your most critical services.",
      },
      {
        q: 'Prometheus or Datadog?',
        a: "Prometheus if you're on Kubernetes and have the engineering capacity to maintain it — far lower cost at scale. Datadog if you want a managed service, need APM out of the box, or are on a small team that can't maintain the stack. I work with both. The right choice depends on your team size, budget, and existing tooling.",
      },
      {
        q: 'What is an SLO and do I need one?',
        a: "An SLO (Service Level Objective) is an internal target for reliability — e.g., \"99.9% of API requests complete in under 500ms\". It's not a customer-facing promise (that's an SLA), it's a target that tells you when your error budget is being spent too fast. Enterprise customers increasingly ask for SLOs during procurement. They're also genuinely useful for on-call teams to know when to page versus when to investigate in the morning.",
      },
      {
        q: 'How do you handle log volume without spending a fortune on storage?',
        a: "Loki's label-based indexing keeps storage costs very low compared to Elasticsearch. For production-scale setups, I configure log retention policies (90 days standard, shorter for debug logs), sampling for high-volume low-value logs, and Loki's compaction. For very high volumes, I can evaluate VictoriaLogs or Grafana Cloud.",
      },
    ],
  },

  'wordpress-web-development': {
    slug: 'wordpress-web-development',
    title: 'WordPress & Web Development',
    tagline: "WordPress sites that load fast, rank well, and don't break on updates.",
    lede: `WordPress powers 43% of the web and gets a bad reputation it mostly doesn't deserve — usually because it's been set up by someone who knew just enough to make it work, not enough to make it fast, secure, and maintainable. I build WordPress sites with the same engineering rigour I apply to cloud infrastructure: CI/CD for theme and plugin deployments, staging environments, database backups with tested restores, CDN configuration, and performance tuning that gets Lighthouse scores above 90. The result is a site your marketing team can update without engineering help, and your engineering team doesn't have to babysit.`,
    whoFor: [
      'Agencies and consultancies needing a technical WordPress developer for client projects',
      "SMBs with a WordPress site that's slow, insecure, or breaking after updates",
      'Content-heavy businesses that need custom WordPress architecture (custom post types, ACF, headless)',
      'Companies that want a Next.js or headless WordPress setup for performance',
      'Startups that need a site launched quickly without sacrificing code quality',
    ],
    deliverables: [
      {
        title: 'Custom theme or plugin development',
        description:
          'Block-based themes using the Full Site Editor, classic PHP themes, or Oxygen/Bricks Builder — whichever suits the project. Custom plugins for bespoke functionality.',
      },
      {
        title: 'Performance optimisation',
        description:
          'Lighthouse score above 90 on desktop. Caching configured (object cache + page cache). Images served via WebP with lazy loading. Unused plugins removed.',
      },
      {
        title: 'Hosting and CDN setup',
        description:
          'Managed WordPress hosting (Kinsta, WP Engine, or Cloudways) or self-managed on AWS/DO. Cloudflare CDN with proper cache rules and DDoS protection.',
      },
      {
        title: 'CI/CD for WordPress',
        description:
          'Git-based deployment workflow. Changes pushed to staging, reviewed, then promoted to production. No more SFTP edits in production.',
      },
      {
        title: 'Security hardening',
        description:
          'File permission hardening, login protection, two-factor authentication, vulnerability scanning via WPScan, and automated core and plugin updates with rollback.',
      },
      {
        title: 'SEO foundation',
        description:
          'Yoast or Rank Math configured, XML sitemap, robots.txt, structured data (JSON-LD) for posts and pages, Core Web Vitals passing.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Requirements and design review',
        description:
          'We define the site structure, content types, integrations, and performance targets. If you have designs, I review them for WordPress feasibility.',
        duration: '1–2 days',
      },
      {
        step: 2,
        title: 'Hosting and environment setup',
        description:
          'Production and staging environments configured. Git repository connected. Local development environment documented for your team.',
        duration: '1–2 days',
      },
      {
        step: 3,
        title: 'Theme / plugin development',
        description:
          'Core development work: theme, custom blocks, custom post types, ACF field groups, and any bespoke plugin functionality.',
        duration: '2–6 weeks (depends on scope)',
      },
      {
        step: 4,
        title: 'Performance and SEO tuning',
        description:
          'Caching, image optimisation, font loading, and Lighthouse audit. Structured data added. Core Web Vitals verified against real-device testing.',
        duration: '3–5 days',
      },
      {
        step: 5,
        title: 'Security hardening',
        description:
          'Security checklist applied. Wordfence or similar configured. Backups verified (restore tested, not just backup). SSL/TLS configured properly.',
        duration: '1–2 days',
      },
      {
        step: 6,
        title: 'Launch and handover',
        description:
          'DNS cutover, post-launch monitoring, and a content editing guide for non-technical users.',
        duration: '1 day + 2-week support window',
      },
    ],
    stack: [
      'WordPress',
      'WooCommerce',
      'Advanced Custom Fields (ACF)',
      'Oxygen Builder',
      'Bricks Builder',
      'Gutenberg / Full Site Editor',
      'Cloudflare',
      'Kinsta',
      'WP Engine',
      'Cloudways',
      'Yoast SEO',
      'Rank Math',
      'WP Rocket',
      'Redis Object Cache',
      'Next.js (headless)',
    ],
    pricingNote:
      'WordPress projects are fixed-price, quoted after a requirements call: simple brochure sites from £1,500, complex WooCommerce stores or headless setups from £4,000. Performance audits and security hardening for existing sites are typically 1–3 days of work.',
    faqs: [
      {
        q: 'Should I use WordPress or a headless CMS?',
        a: "WordPress is the right choice if your content team needs a familiar editing experience and you don't have a dedicated frontend development team. Headless (Next.js + WordPress as API) is worth the complexity if you need maximum frontend performance, you're building a custom React/Next.js frontend anyway, or you need to serve content to multiple channels (web, app, etc.).",
      },
      {
        q: "My WordPress site is slow. What's usually the cause?",
        a: 'In order of frequency: no caching at all or misconfigured caching, unoptimised images served at full resolution, too many plugins (especially page builders with bloated output), cheap shared hosting with no object cache, and external requests blocking page load (fonts, analytics loaded synchronously). Most slow WordPress sites can be significantly improved without a rebuild.',
      },
      {
        q: 'Can you take over an existing WordPress site?',
        a: "Yes. I'll do a technical audit first — code quality, security vulnerabilities, performance issues, hosting setup — and give you a clear picture of what you're working with before we agree on scope.",
      },
      {
        q: 'Do you build WooCommerce stores?',
        a: 'Yes. Custom WooCommerce themes, payment gateway integrations, custom shipping rules, and performance optimisation for stores with large product catalogues.',
      },
    ],
  },

  'devops-consulting-audits': {
    slug: 'devops-consulting-audits',
    title: 'DevOps Consulting & Audits',
    tagline: 'An external eye on your infrastructure — before something forces it.',
    lede: `Sometimes you don't need someone to build something. You need someone to look at what you have and tell you honestly: what's working, what's a risk you haven't thought about, and what should you fix first. I do infrastructure audits, architecture reviews, and DevOps assessments for engineering teams that want a second opinion — before a security audit, before a scale event, after an incident, or just because the tech lead left and nobody is sure what they inherited. The output is a written report with findings ranked by risk and an actionable remediation roadmap.`,
    whoFor: [
      'CTOs or VPs of Engineering who want an independent assessment of their infrastructure health',
      'Engineering teams after a production incident who need root-cause analysis and hardening recommendations',
      "Startups preparing for SOC 2 or ISO 27001 certification who want to know what's missing",
      'Companies that acquired a codebase or infrastructure and need to understand what they own',
      'Teams scaling rapidly and unsure if their infrastructure will hold',
    ],
    deliverables: [
      {
        title: 'Written audit report',
        description:
          'A structured report covering findings across security, reliability, scalability, cost, and operational maturity — each with a severity rating and remediation recommendation.',
      },
      {
        title: 'Risk matrix',
        description:
          'Findings plotted by severity and effort-to-fix, so you can prioritise remediation work by impact.',
      },
      {
        title: 'Remediation roadmap',
        description:
          'A phased plan for addressing findings: quick wins (this week), medium-term improvements (this quarter), and strategic changes (this year).',
      },
      {
        title: 'Architecture review session',
        description:
          'A working session with your team to walk through findings, answer questions, and align on the remediation plan.',
      },
      {
        title: 'Optional: hands-on remediation',
        description:
          'After the audit, I can implement the highest-priority fixes directly — switching from consulting mode to engineering mode.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Scoping call',
        description:
          'We agree what the audit covers: cloud infrastructure, CI/CD, Kubernetes, security posture, or all of the above. I define what access I need.',
        duration: '1 hour',
      },
      {
        step: 2,
        title: 'Access and documentation review',
        description:
          'I review your Terraform/IaC code, CI/CD configuration, Kubernetes manifests, AWS IAM policies, and any existing architecture documentation.',
        duration: '1–2 days',
      },
      {
        step: 3,
        title: 'Live environment assessment',
        description:
          'With read-only access, I review the live environment: running workloads, network configuration, security group rules, IAM policies, monitoring coverage.',
        duration: '1–2 days',
      },
      {
        step: 4,
        title: 'Report writing',
        description:
          'Findings documented with evidence, severity ratings, and specific remediation steps. Not a generic checklist — specific to what I found in your environment.',
        duration: '2–3 days',
      },
      {
        step: 5,
        title: 'Report delivery and review session',
        description:
          'I deliver the written report and hold a working session with your team to walk through findings, answer questions, and agree next steps.',
        duration: '1 day',
      },
    ],
    stack: [
      'AWS (all services)',
      'Kubernetes',
      'Terraform / Terragrunt',
      'GitHub Actions / GitLab CI / Jenkins',
      'Docker',
      'Prometheus / Grafana',
      'tfsec / Checkov',
      'Trivy',
      'kube-bench',
      'AWS Security Hub',
      'AWS Config',
    ],
    pricingNote:
      'Standard infrastructure audits are fixed-price: £1,800–£4,500 depending on the scope and complexity of the estate. Incident post-mortems are typically 1–2 days of work. Architecture review sessions (without a full audit) can be booked as half-day or full-day engagements.',
    faqs: [
      {
        q: 'What access do you need to do an audit?',
        a: "Read-only access to your AWS account (SecurityAudit IAM policy or equivalent), read access to your IaC repository and CI/CD configuration, and ideally access to your Kubernetes cluster with view-only permissions. I don't need write access and will sign an NDA before any review.",
      },
      {
        q: 'How is a DevOps audit different from a penetration test?',
        a: "Complementary, not the same thing. A pentest looks for exploitable vulnerabilities from an attacker's perspective. A DevOps audit looks at operational risk: misconfigured IAM policies, missing monitoring, no disaster recovery plan, CI/CD that bypasses security controls, or infrastructure that hasn't been touched since the founding engineer left. Both are useful; they catch different things.",
      },
      {
        q: 'We just had a production incident. Can you help with post-mortem?',
        a: 'Yes. I can facilitate the post-mortem process, help write the timeline, identify contributing factors beyond the immediate trigger, and produce a set of hardening recommendations. A blame-free, structured post-mortem is one of the most valuable investments after a serious incident.',
      },
      {
        q: 'Do you work with regulated industries (fintech, healthtech)?',
        a: "Yes. I'm familiar with the infrastructure requirements for SOC 2 Type II, ISO 27001, HIPAA (for US clients), and PCI DSS. An audit can specifically focus on the gap between your current state and the controls required by the relevant standard.",
      },
    ],
  },
}
