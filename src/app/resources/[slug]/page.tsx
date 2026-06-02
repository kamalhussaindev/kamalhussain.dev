import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react'
import { codeToHtml } from 'shiki'
import { SITE_URL, AUTHOR } from '@/lib/constants'
import {
  RESOURCE_SLUGS,
  RESOURCES_DATA,
  RESOURCE_LABELS,
  type ResourceSlug,
} from '@/lib/resources-data'
import { ResourceCodeViewer } from '@/components/resources/resource-code-viewer'

export function generateStaticParams() {
  return RESOURCE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  if (!RESOURCE_SLUGS.includes(slug as ResourceSlug)) return {}
  const r = RESOURCES_DATA[slug as ResourceSlug]
  const pageTitle = `${RESOURCE_LABELS[slug as ResourceSlug]} — Free Template`
  const desc = r.subtitle.slice(0, 155)
  return {
    title: { absolute: pageTitle },
    description: desc,
    alternates: { canonical: `${SITE_URL}/resources/${slug}` },
    openGraph: {
      title: pageTitle,
      description: desc,
      type: 'article',
      publishedTime: r.datePublished,
      authors: [AUTHOR.name],
      url: `${SITE_URL}/resources/${slug}`,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Per-resource explanation content
// ─────────────────────────────────────────────────────────────────────────────

function HelmExplanation() {
  return (
    <div className="prose-site">
      <h2>Why resource requests and limits are not optional</h2>
      <p>
        The values.yaml enforces resource requests and limits with no defaults — meaning a
        deploy fails if you forget to set them. This is intentional. Without requests, the
        Kubernetes scheduler cannot make accurate placement decisions, and without limits,
        a single runaway pod can starve everything else on the node. The Cluster
        Autoscaler also uses requests to decide when to add nodes; without them, it cannot
        scale up ahead of demand.
      </p>
      <p>
        The specific defaults in the example (100m CPU / 128Mi memory for requests, 500m /
        512Mi for limits) are a reasonable starting point for a small Node.js or Go
        service. You should measure your actual usage with <code>kubectl top pods</code>{' '}
        and adjust. A 5:1 ratio between limit and request is a common sign that the limits
        were set too conservatively — the pod will get throttled under load even though
        the node has headroom.
      </p>

      <h2>Why liveness and readiness probes point at different endpoints</h2>
      <p>
        A common mistake is to use <code>/healthz</code> for both probes. The probes have
        fundamentally different semantics:
      </p>
      <ul>
        <li>
          <strong>Liveness</strong> answers &quot;should Kubernetes restart me?&quot; If
          it returns a non-2xx, the pod gets killed and restarted. Point this at a simple
          endpoint that only returns 500 when the process is genuinely broken (deadlock,
          corrupted state). Do not include database connectivity here — a transient
          database blip should not restart your pod.
        </li>
        <li>
          <strong>Readiness</strong> answers &quot;should I receive traffic?&quot; If it
          returns non-2xx, the pod is removed from the Service endpoints. Point this at an
          endpoint that checks whether your application has finished initialising and can
          actually serve requests.
        </li>
      </ul>
      <p>
        Using the same endpoint for both means a healthy pod under a slow database query
        gets killed by Kubernetes — which then restarts it, which then experiences the
        same slow query, which causes a cascade. The startup probe in this chart adds a
        third layer: it gives the container up to 150 seconds (30 failures × 5 second
        period) to start before liveness kicks in, which prevents slow-starting JVM
        services from being killed before they finish their warm-up.
      </p>

      <h2>Why HPA targets memory AND CPU</h2>
      <p>
        The default autoscaling/v2 HPA in many example charts only targets CPU
        utilisation. This works fine for CPU-bound workloads — it does not work for
        memory-bound ones. A Node.js service that buffers large JSON payloads can sit at
        5% CPU and 95% memory utilisation. Without a memory target, HPA will never scale
        it out, and you get OOMKills under load instead of new pods.
      </p>
      <p>
        The scale-down stabilisation window is set to 300 seconds (5 minutes). Without it,
        HPA scales down aggressively during brief traffic dips, then has to scale back up
        — which takes time and causes latency spikes. The scale-up policy is more
        aggressive: it can add up to 100% of current replicas or 4 pods per 15 seconds,
        whichever is larger, with no stabilisation delay. Scaling up should be fast;
        scaling down should be conservative.
      </p>

      <h2>Why PDB is included by default</h2>
      <p>
        A PodDisruptionBudget with <code>minAvailable: 1</code> is the single most
        frequently missed Kubernetes setting in real clusters. Without it, a node drain
        (during a cluster upgrade, for example) can evict all pods in a Deployment
        simultaneously if they happen to be on the same node. With a PDB, Kubernetes will
        only evict pods if it can guarantee at least one remains available. For a
        2-replica Deployment, this means upgrades are never completely disruptive.
      </p>
      <p>
        Set <code>minAvailable: 1</code> as the floor. If you have a high-traffic service,
        consider
        <code>minAvailable: 2</code> or a percentage-based policy (
        <code>minAvailable: 75%</code>).
      </p>

      <h2>The security context</h2>
      <p>
        The security context in this chart satisfies the &quot;restricted&quot; pod
        security standard, which aligns with CIS Kubernetes Benchmark controls 5.2.x:
      </p>
      <ul>
        <li>
          <code>runAsNonRoot: true</code> — prevents processes from running as root, which
          limits the blast radius of a container escape
        </li>
        <li>
          <code>readOnlyRootFilesystem: true</code> — any write attempt to the container
          filesystem fails; legitimate writes must go to mounted volumes
        </li>
        <li>
          <code>allowPrivilegeEscalation: false</code> — prevents <code>setuid</code>{' '}
          binaries from gaining elevated privileges
        </li>
        <li>
          <code>capabilities.drop: [ALL]</code> — removes all Linux capabilities; if your
          app needs one (e.g. NET_BIND_SERVICE for port 80), add it explicitly
        </li>
        <li>
          <code>seccompProfile.type: RuntimeDefault</code> — enables the container
          runtime&apos;s default seccomp profile, which blocks dangerous syscalls
        </li>
      </ul>

      <h2>Topology spread constraints</h2>
      <p>
        The topology spread constraint forces Kubernetes to spread pods across
        availability zones, with a maximum skew of 1 (meaning no zone can have more than 1
        extra pod compared to others). This is set to <code>ScheduleAnyway</code>, which
        means Kubernetes will still schedule pods even if it can&apos;t satisfy the
        constraint — useful when you only have pods in one zone. Change this to{' '}
        <code>DoNotSchedule</code> if you require strict AZ distribution and would rather
        fail a deploy than let it pile up in one zone.
      </p>
    </div>
  )
}

function TerraformExplanation() {
  return (
    <div className="prose-site">
      <h2>Why managed node groups instead of Karpenter</h2>
      <p>
        Karpenter is excellent, but it introduces operational complexity that isn&apos;t
        worth it for most teams at the start of their EKS journey. Managed node groups are
        boring in the right way: AWS handles the node lifecycle, AMI updates ship as a
        simple node group update, and the operational surface area is small.
      </p>
      <p>
        Switch to Karpenter when you have workloads with highly variable compute shapes
        (some jobs need 4xlarge, others need spot 2xlarge), when your cluster-autoscaler
        scale-up is too slow for your traffic patterns, or when you&apos;re spending more
        than a few hours per month maintaining node group configurations. For a standard
        web application cluster, managed node groups and cluster-autoscaler are the right
        choice for the first 12-18 months.
      </p>

      <h2>Why the VPC uses multiple NAT gateways</h2>
      <p>
        The module sets <code>single_nat_gateway = false</code>, which provisions one NAT
        gateway per availability zone. This costs roughly $96/month more than a single NAT
        gateway. The tradeoff: if the AZ containing your single NAT gateway fails, all
        private subnet traffic is blocked — your nodes can&apos;t pull images, your app
        can&apos;t reach AWS APIs, and your cluster-autoscaler can&apos;t communicate. For
        production workloads, this is a hidden single point of failure. The comment in the
        module flags this explicitly so you can make a conscious choice rather than
        discovering it during an AZ outage.
      </p>

      <h2>Why private endpoint only</h2>
      <p>
        The module disables the public API server endpoint (
        <code>cluster_endpoint_public_access = false</code>). This means your API server
        is not reachable from the public internet — you must use a VPN, AWS Client VPN, or
        a bastion host to run <code>kubectl</code>. For CI/CD, your GitHub Actions runner
        must either be self-hosted inside the VPC or reach the cluster via VPC peering or
        AWS PrivateLink.
      </p>
      <p>
        The alternative (public endpoint with IP allowlisting) is acceptable for teams
        without the infrastructure to run private access, but the allowlist is frequently
        misconfigured — people add <code>0.0.0.0/0</code> to unblock a developer and
        forget to remove it. Defaulting to private removes this risk entirely.
      </p>

      <h2>IRSA instead of node IAM roles</h2>
      <p>
        IAM Roles for Service Accounts (IRSA) allows individual Kubernetes workloads to
        assume an IAM role — without storing credentials anywhere and without granting the
        entire node&apos;s IAM role broad permissions. The module provisions IRSA roles
        for the EBS CSI driver, cluster-autoscaler, and Load Balancer Controller. Each
        role has exactly the permissions needed for that add-on, scoped to the specific
        service account in the specific namespace.
      </p>
      <p>
        The alternative — attaching a broad IAM policy to the node IAM role — means any
        pod on that node can access AWS resources as if it were the node. A compromised
        pod can exfiltrate data from S3, create EC2 instances, or assume other roles. IRSA
        limits the blast radius to the permissions of the specific role the pod is allowed
        to assume.
      </p>

      <h2>Why observability is not bundled</h2>
      <p>
        This module deliberately excludes Prometheus, Grafana, Loki, and alerting.
        Observability stacks have strong opinions and significant configuration surface
        area — the right setup depends on whether you want managed (Amazon Managed
        Prometheus, Grafana Cloud) or self-hosted, how much retention you need, your alert
        routing preferences, and your budget. Bundling a default observability stack means
        you either accept defaults that might not fit your needs, or you spend more time
        configuring the module than if you&apos;d set it up separately.
      </p>
      <p>
        After provisioning with this module, deploy observability as a second step using
        its output values (<code>oidc_provider_arn</code> for IRSA,{' '}
        <code>private_subnet_ids</code> for placing agents). The outputs are designed to
        make this handoff clean.
      </p>

      <h2>Remote state</h2>
      <p>
        This module doesn&apos;t include a backend configuration — that belongs in your
        root module or workspace, not in a reusable module. Before running{' '}
        <code>terraform init</code>, create an S3 bucket and DynamoDB table for state
        locking, then configure your backend:
      </p>
      <pre>
        <code>{`terraform {
  backend "s3" {
    bucket         = "your-org-tfstate"
    key            = "eks/production/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}`}</code>
      </pre>
      <p>
        Use workspaces or separate state files per environment — never share state between
        staging and production.
      </p>
    </div>
  )
}

function GithubActionsExplanation() {
  return (
    <div className="prose-site">
      <h2>OIDC instead of long-lived AWS credentials</h2>
      <p>
        The workflow uses GitHub Actions OIDC to assume an AWS IAM role, which means no
        <code>AWS_ACCESS_KEY_ID</code> or <code>AWS_SECRET_ACCESS_KEY</code> stored in
        GitHub secrets. OIDC tokens are short-lived (valid for a single workflow run),
        issued by GitHub, and validated by AWS against a trust policy you configure once.
        If a token leaks, it&apos;s already expired. If you rotate a key in the old
        approach, you have to find and update it in every repo that uses it.
      </p>
      <p>
        Setting up OIDC requires two one-time steps: creating an OIDC provider in your AWS
        account pointing at <code>token.actions.githubusercontent.com</code>, and
        configuring a trust policy on the IAM role that restricts which GitHub org, repo,
        and branch can assume it. The
        <code>aws-actions/configure-aws-credentials</code> action handles the token
        exchange automatically.
      </p>

      <h2>Concurrency: never cancel a running deploy</h2>
      <p>
        The concurrency group is set per <code>github.ref</code> with
        <code>cancel-in-progress: false</code>. This is deliberate. Cancelling a running
        deploy mid-flight can leave your cluster in a partially updated state — some pods
        on the new image, some on the old. If you need to cancel a deploy that&apos;s gone
        wrong, use the rollback job instead.
      </p>
      <p>
        For CI (the <code>ci.yml</code> workflow), the same concurrency group uses
        <code>cancel-in-progress: true</code>, because cancelling a lint or test run on a
        superseded PR commit is always safe.
      </p>

      <h2>Environment resolution without duplication</h2>
      <p>
        A common pattern is to have separate workflow files for staging and production,
        duplicating identical steps with slightly different environment variables. The{' '}
        <code>resolve-env</code>
        job eliminates this by mapping branch name (or manual input) to
        environment-specific variables using GitHub Actions variable interpolation:
      </p>
      <pre>
        <code>{`vars[format('{0}_AWS_ROLE_ARN', upper(ENV))]`}</code>
      </pre>
      <p>
        This reads <code>STAGING_AWS_ROLE_ARN</code> or{' '}
        <code>PRODUCTION_AWS_ROLE_ARN</code> from your GitHub repository or environment
        variables — no duplication. The outputs from
        <code>resolve-env</code> are then used by all downstream jobs.
      </p>

      <h2>Why the smoke test retries 10 times</h2>
      <p>
        A rolling deployment doesn&apos;t complete atomically. After{' '}
        <code>kubectl rollout status</code>
        returns, traffic is still being moved from old pods to new ones through the
        ingress controller. The smoke test polls with 10-second backoff to handle this
        transition period. If the health check fails after all attempts, the rollback job
        triggers automatically — but only if the deploy job itself succeeded. A deploy
        that failed (e.g. image pull error) does not trigger rollback, because
        there&apos;s nothing to roll back to.
      </p>

      <h2>The ArgoCD sync step</h2>
      <p>
        The workflow updates the image tag in the Helm values file for the target
        environment, then triggers an ArgoCD sync. This keeps your GitOps repository as
        the source of truth — the deployed image tag is always visible in Git, every
        deploy is an auditable commit, and ArgoCD&apos;s self-heal means any manual{' '}
        <code>kubectl</code> changes get reverted automatically.
      </p>
      <p>
        The alternative (using <code>helm upgrade</code> directly from CI) works but loses
        the GitOps audit trail and means ArgoCD doesn&apos;t know the actual desired
        state. If you want the operational benefits of ArgoCD (diff view, rollback UI,
        sync windows for change control), the CI pipeline should update Git and let ArgoCD
        handle the actual apply.
      </p>

      <h2>Slack notifications are not optional</h2>
      <p>
        Both success and failure notifications go to Slack. The failure notification is
        obvious. The success notification is equally important — it gives the deploying
        engineer confirmation that the deploy completed and tells the rest of the team
        that a new version is live. Without it, you&apos;re relying on engineers
        remembering to check the Actions UI, which they don&apos;t.
      </p>
    </div>
  )
}

function ArgoCDExplanation() {
  return (
    <div className="prose-site">
      <h2>The one thing you apply manually</h2>
      <p>The entire pattern is bootstrapped by one command:</p>
      <pre>
        <code>kubectl apply -f bootstrap/app.yaml</code>
      </pre>
      <p>
        After that, ArgoCD manages everything — including itself, if you include
        ArgoCD&apos;s own Helm chart in the bootstrap. The bootstrap Application points at
        the
        <code>envs/</code> directory, which contains per-environment Applications. Each
        environment Application points at the environment&apos;s directory, which contains
        ApplicationSets. The ApplicationSets discover services by scanning subdirectories.
        Adding a new service is a directory commit. Removing a service is a directory
        deletion (with pruning enabled, ArgoCD removes the Kubernetes resources
        automatically).
      </p>

      <h2>ApplicationSet vs individual Applications</h2>
      <p>
        A common mistake is creating one ArgoCD Application per service per environment
        manually. For 10 services across 3 environments, that&apos;s 30 Application
        objects to maintain. When the GitOps repo URL changes, or you add a new
        environment, you update all 30. With an ApplicationSet and the git generator, you
        update one template. The generator scans the configured directory path and creates
        Applications automatically for each subdirectory it finds.
      </p>
      <p>The directory structure this pattern expects:</p>
      <pre>
        <code>{`services/
  production/
    api/                 # Creates api-production Application
      values.yaml
      values-production.yaml
    worker/              # Creates worker-production Application
      values.yaml
      values-production.yaml
  staging/
    api/                 # Creates api-staging Application
    worker/`}</code>
      </pre>

      <h2>AppProjects are not optional for production</h2>
      <p>
        The default ArgoCD project allows applications to deploy to any namespace on any
        cluster and pull from any repository. This is fine in a single-environment
        cluster. In a shared cluster or a production environment, it&apos;s a
        misconfiguration waiting to become an incident. The AppProject in this pattern:
      </p>
      <ul>
        <li>
          Restricts which repositories applications can use as sources (prevents a rogue
          PR from pointing an Application at a malicious Helm repo)
        </li>
        <li>
          Defines a whitelist of allowed cluster resources (prevents applications from
          creating ClusterRoles they shouldn&apos;t have)
        </li>
        <li>
          Configures sync windows (production deploys only happen during business hours
          unless a developer manually approves an out-of-window sync)
        </li>
      </ul>

      <h2>Common mistakes I see in real engagements</h2>

      <h3>Storing the GitOps config in the application repo</h3>
      <p>
        When ArgoCD configuration lives in the same repo as application code, every code
        change is a potential GitOps config change. More importantly, the permissions
        required to merge application code and deploy to production are the same. Use a
        separate GitOps repository with its own access controls — code review merges to
        the app repo, deployment review merges to the GitOps repo.
      </p>

      <h3>Disabling pruning</h3>
      <p>
        Many teams disable pruning because they&apos;re afraid of ArgoCD deleting things.
        Without pruning, deleted resources in Git persist indefinitely in the cluster. You
        end up with ghost Deployments from services that were renamed, old ConfigMaps from
        configuration that was moved to Secrets Manager, and NetworkPolicies from a
        security model that changed six months ago. Enable pruning, but enable{' '}
        <code>PruneLast=true</code> so resources are deleted after new ones are healthy,
        not before.
      </p>

      <h3>Using the argocd namespace for everything</h3>
      <p>
        Placing all Applications in the <code>argocd</code> namespace is the default and
        it works, but it means all ArgoCD users — including read-only developers — can see
        all Applications. Use AppProject roles and RBAC to limit what each team can see
        and do. A developer on the payments team doesn&apos;t need to see the
        infrastructure Applications.
      </p>

      <h3>No health checks on Application resources</h3>
      <p>
        ArgoCD has built-in health checks for standard Kubernetes resources (Deployments,
        StatefulSets, etc.), but custom resources (CRDs from Prometheus Operator,
        Cert-Manager, etc.) are reported as Healthy by default because ArgoCD doesn&apos;t
        know their health semantics. Write custom health check Lua scripts for your CRDs,
        or ArgoCD will report your monitoring stack as healthy even when a PrometheusRule
        has a syntax error.
      </p>
    </div>
  )
}

const EXPLANATIONS: Record<ResourceSlug, () => React.JSX.Element> = {
  'helm-chart-starter': HelmExplanation,
  'terraform-module-aws-eks': TerraformExplanation,
  'github-actions-deploy-template': GithubActionsExplanation,
  'argocd-app-of-apps': ArgoCDExplanation,
}

const CUSTOMIZATION_NOTES: Record<ResourceSlug, React.JSX.Element> = {
  'helm-chart-starter': (
    <>
      <h2>Customisation notes</h2>
      <p>
        The most common change is renaming the chart. Replace all references to{' '}
        <code>my-app</code> in <code>Chart.yaml</code> and the <code>_helpers.tpl</code>{' '}
        file (which the Explore agent found uses the chart name as a template prefix). The{' '}
        <code>nameOverride</code> and <code>fullnameOverride</code> values provide a
        lighter-weight option if you want to keep the chart generic.
      </p>
      <p>
        For services that need writable filesystem paths (e.g. a service that writes
        temporary files), add a volume and volumeMount for the specific path rather than
        disabling
        <code>readOnlyRootFilesystem</code>. A typical pattern is an emptyDir volume
        mounted at
        <code>/tmp</code>.
      </p>
      <p>
        If you run the Prometheus Operator, set <code>serviceMonitor.enabled: true</code>{' '}
        and add the <code>additionalLabels</code> that match your Prometheus
        instance&apos;s
        <code>serviceMonitorSelector</code>. Without the matching label, the
        ServiceMonitor exists but Prometheus won&apos;t discover it.
      </p>
    </>
  ),
  'terraform-module-aws-eks': (
    <>
      <h2>Customisation notes</h2>
      <p>
        The most common production customisation is adding a second node group for
        specialised workloads. A typical pattern is a general-purpose group using
        on-demand instances (for stateful or latency-sensitive services) and a batch group
        using spot instances (for background workers). Add taints to the batch group and
        tolerations to the batch workloads so they don&apos;t mix.
      </p>
      <p>
        For EKS version upgrades: update the <code>cluster_version</code> variable, run{' '}
        <code>terraform plan</code> to verify only the expected resources change, then
        apply. EKS upgrades are in-place for the control plane; node groups require a
        rolling replacement (Terraform handles this via the{' '}
        <code>force_update_version</code> flag or you can drain nodes manually for more
        control).
      </p>
      <p>
        If you need private cluster access from GitHub Actions, use an AWS CodeBuild
        project as a self-hosted runner inside the VPC, or configure AWS Client VPN. AWS
        Systems Manager Session Manager is another option for interactive access without a
        bastion host.
      </p>
    </>
  ),
  'github-actions-deploy-template': (
    <>
      <h2>Customisation notes</h2>
      <p>
        To add a new environment (e.g. a QA environment), add a branch pattern to the
        <code>on.push.branches</code> list, add a new case to the <code>resolve-env</code>{' '}
        step, and add the corresponding GitHub repository variables (
        <code>QA_AWS_ROLE_ARN</code>, <code>QA_CLUSTER_NAME</code>, etc.).
      </p>
      <p>
        The smoke test currently checks a single health endpoint. Extend it with your most
        critical user-facing flow — for a web service, a <code>curl</code> to an API
        endpoint that exercises the database connection is usually enough. For a payment
        service, check that the checkout initiation endpoint returns 200 (without
        completing a payment). The goal is to catch the most common failure modes (app
        can&apos;t connect to DB, config is wrong) within 60 seconds of deploy.
      </p>
      <p>
        Replace the <code>yq</code> command in the &quot;Update image tag&quot; step with
        a proper Git commit if you want the change to appear in your GitOps
        repository&apos;s history. This requires a deploy key or a GitHub App token with
        write access to the GitOps repository.
      </p>
    </>
  ),
  'argocd-app-of-apps': (
    <>
      <h2>Customisation notes</h2>
      <p>
        The most common customisation is adding a third environment (dev). Create an
        <code>envs/dev/</code> directory, copy the staging ApplicationSet, change the path
        prefix to <code>services/dev/</code> and the namespace suffix to <code>-dev</code>
        . If dev lives in a separate cluster, change the <code>destination.server</code>{' '}
        to the dev cluster&apos;s API endpoint (you&apos;ll need to add it to ArgoCD with{' '}
        <code>argocd cluster add</code>).
      </p>
      <p>
        The production sync window currently allows deploys Mon–Fri 06:00–16:00 UTC.
        Adjust the cron expression to match your team&apos;s actual deployment policy. If
        you use a change management system (ServiceNow, Jira), configure ArgoCD
        notifications to create a change request automatically when a sync is requested
        outside the window, rather than silently blocking it.
      </p>
      <p>
        For multi-cluster setups, add a second generator to the ApplicationSet&apos;s
        <code>generators</code> list using the cluster generator — it creates Applications
        for each registered cluster matching a label selector. This is how you scale the
        same pattern to 10 clusters without 10× the YAML.
      </p>
    </>
  ),
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!RESOURCE_SLUGS.includes(slug as ResourceSlug)) notFound()
  const r = RESOURCES_DATA[slug as ResourceSlug]

  // Highlight all files with Shiki server-side
  const highlightedFiles = await Promise.all(
    r.files.map(async (file) => ({
      name: file.name,
      rawCode: file.content,
      html: await codeToHtml(file.content, {
        lang: file.language,
        theme: 'github-dark-dimmed',
      }),
    })),
  )

  // JSON-LD
  const codeSchemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: r.title,
    description: r.subtitle,
    url: `${SITE_URL}/resources/${slug}`,
    codeRepository: r.githubUrl,
    programmingLanguage: r.programmingLanguages.map((lang) => ({
      '@type': 'ComputerLanguage',
      name: lang,
    })),
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: SITE_URL,
    },
    datePublished: r.datePublished,
    license: 'https://opensource.org/licenses/MIT',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: `${SITE_URL}/resources`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: RESOURCE_LABELS[slug as ResourceSlug],
        item: `${SITE_URL}/resources/${slug}`,
      },
    ],
  }

  const ExplanationComponent = EXPLANATIONS[slug as ResourceSlug]
  const customizationNotes = CUSTOMIZATION_NOTES[slug as ResourceSlug]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(codeSchemaJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="text-fg-muted mb-10 flex items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-foreground transition-colors">
            Resources
          </Link>
          <span>/</span>
          <span className="text-foreground">{RESOURCE_LABELS[slug as ResourceSlug]}</span>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_280px]">
          {/* Main column */}
          <div>
            {/* Hero */}
            <div className="mb-12">
              <p className="text-accent-primary mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                RESOURCE · {r.type.toUpperCase()}
              </p>
              <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-4xl">
                {r.title}
              </h1>
              <p className="text-fg-muted mb-6 text-lg leading-relaxed">{r.subtitle}</p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {r.techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="bg-bg-raised text-fg-muted border-border rounded-full border px-3 py-1 font-mono text-xs"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* What you get + What it assumes */}
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="border-border bg-bg-raised rounded-xl border p-6">
                <h2 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                  What you get
                </h2>
                <ul className="space-y-3">
                  {r.whatYouGet.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={14}
                        className="text-accent-primary mt-0.5 shrink-0"
                        aria-hidden
                      />
                      <span className="text-fg-muted text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-border bg-bg-raised rounded-xl border p-6">
                <h2 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                  What it assumes
                </h2>
                <ul className="space-y-3">
                  {r.whatItAssumes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="bg-fg-dim mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        aria-hidden
                      />
                      <span className="text-fg-muted text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code block */}
            <div className="mb-12">
              <h2 className="text-foreground mb-4 text-xl font-semibold">The code</h2>
              <ResourceCodeViewer files={highlightedFiles} />
              <div className="mt-4 flex items-center gap-4">
                <a
                  href={r.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fg-muted hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
                >
                  <ExternalLink size={14} aria-hidden />
                  View full repo on GitHub
                </a>
              </div>
            </div>

            {/* Explanation */}
            <div className="mb-12">
              <h2 className="text-foreground mb-6 text-xl font-semibold">
                The explanation
              </h2>
              <ExplanationComponent />
            </div>

            {/* Customisation notes */}
            <div className="prose-site mb-12">{customizationNotes}</div>

            {/* CTA */}
            <div className="border-border bg-bg-raised rounded-xl border p-8">
              <h2 className="text-foreground mb-2 text-lg font-semibold">
                Need this customised for your stack?
              </h2>
              <p className="text-fg-muted mb-6 text-sm leading-relaxed">
                The resource above covers the general case. If you need it adapted to your
                specific cloud account, VPC layout, security requirements, or team
                structure, that&apos;s what engagements are for.
              </p>
              <Link
                href="/book"
                className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all"
              >
                Let&apos;s talk
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Related work */}
            <div className="border-border rounded-xl border p-5">
              <h3 className="text-fg-subtle mb-4 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Related work
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={r.relatedService.href}
                    className="text-fg-muted hover:text-foreground group flex items-center justify-between gap-2 text-sm transition-colors"
                  >
                    <span className="leading-snug">{r.relatedService.label}</span>
                    <ArrowRight
                      size={12}
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
                {r.relatedCaseStudy && (
                  <li>
                    <Link
                      href={r.relatedCaseStudy.href}
                      className="text-fg-muted hover:text-foreground group flex items-center justify-between gap-2 text-sm transition-colors"
                    >
                      <span className="leading-snug">{r.relatedCaseStudy.label}</span>
                      <ArrowRight
                        size={12}
                        className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/resources"
                    className="text-fg-muted hover:text-foreground group flex items-center justify-between gap-2 text-sm transition-colors"
                  >
                    <span>All resources</span>
                    <ArrowRight
                      size={12}
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              </ul>
            </div>

            {/* GitHub link */}
            <div className="border-border rounded-xl border p-5">
              <h3 className="text-fg-subtle mb-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase">
                Source
              </h3>
              <a
                href={r.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-foreground hover:bg-bg-overlay flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} aria-hidden />
                View on GitHub
              </a>
            </div>

            {/* CTA box */}
            <div className="bg-accent-primary/5 border-accent-primary/20 rounded-xl border p-5">
              <h3 className="text-foreground mb-2 text-sm font-semibold">
                Want help with this?
              </h3>
              <p className="text-fg-muted mb-4 text-xs leading-relaxed">
                30 minutes. Bring your infra. Leave with a plan.
              </p>
              <Link
                href="/book"
                className="btn-shimmer bg-accent-primary hover:bg-accent-primary/90 block rounded-lg px-4 py-2 text-center text-sm font-semibold text-white transition-all"
              >
                Book a call
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
