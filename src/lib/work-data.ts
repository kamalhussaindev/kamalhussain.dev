export const WORK_SLUGS = ['fintech-cicd-overhaul', 'aws-cost-optimization'] as const

export type WorkSlug = (typeof WORK_SLUGS)[number]

export interface CaseStudy {
  slug: WorkSlug
  headline: string
  client: string
  industry: string
  duration: string
  year: string
  metric: string
  metricLabel: string
  tags: string[]
  summary: string
  tldr: { label: string; value: string }[]
  challenge: string[]
  approach: { title: string; body: string }[]
  results: { metric: string; label: string }[]
  stack: string[]
  testimonial?: { quote: string; role: string }
}

export const WORK_DATA: Record<WorkSlug, CaseStudy> = {
  'fintech-cicd-overhaul': {
    slug: 'fintech-cicd-overhaul',
    headline: 'CI/CD overhaul for a Series-A European fintech',
    client: 'Series-A fintech (EU, anonymised)',
    industry: 'Financial services',
    duration: '6 weeks',
    year: '2025',
    metric: '47 min → 4 min',
    metricLabel: 'Deploy time',
    tags: ['GitHub Actions', 'ArgoCD', 'Kubernetes', 'Helm', 'Trivy'],
    summary:
      'A 12-person engineering team shipping 30+ microservices through a Jenkins monolith that took 47 minutes per run and required a senior engineer to babysit every production deploy. We rebuilt their entire CI/CD pipeline in 6 weeks — GitHub Actions for CI, ArgoCD for GitOps CD, automated smoke tests, and Slack-gated production deploys. Deploy time dropped to 4 minutes. The team went from 2–3 deploys a week to 10–15.',
    tldr: [
      { label: 'Deploy time', value: '47 min → 4 min' },
      { label: 'Weekly deploys', value: '2–3 → 10–15' },
      {
        label: 'Production incidents from deploys',
        value: '3 in 6 months → 0 in 3 months',
      },
      { label: 'Pipeline coverage', value: '30 services migrated' },
    ],
    challenge: [
      "The team's Jenkins setup had accumulated five years of technical debt. Build agents were shared and contended. Docker layers weren't cached between runs. Tests ran serially. The pipeline had no concept of environments — merging to main triggered a direct production deploy with no intermediate validation.",
      'Production deploys required a senior engineer to manually SSH into the deployment server, pull the Docker image, and restart services in the right order. This happened at most twice a week, on a schedule, which meant features sat in main for days waiting for the deploy window.',
      "Three production incidents in the previous six months were caused directly by deploy process failures — wrong image tags, missed service restarts, and one deploy that partially completed before the engineer's connection dropped.",
      'Engineers had started batching their work to reduce the number of deploys they had to request. The feedback loop had stretched so long that context-switching during a deploy cycle was a real productivity drain.',
    ],
    approach: [
      {
        title: 'Audit and baseline',
        body: 'I spent two days mapping the existing setup: all 30 services, their dependency graph, their current build times, and the failure modes that had caused the three production incidents. I measured baseline CI time (47 minutes average), deploy frequency (2.4/week), and lead time from merge to production (3.2 days average). These became the targets to beat.',
      },
      {
        title: 'GitHub Actions CI pipeline',
        body: 'The Jenkins pipeline ran tests serially. With GitHub Actions, I reorganised each service into a matrix job: lint, unit tests, and integration tests run in parallel. Docker builds were restructured to maximise layer cache hits — base images pulled from ECR, only the application layer rebuilt on code changes. For the services with the slowest test suites, I added pytest-xdist or Jest workers to parallelise within the test stage. Average CI time across all 30 services landed at 3m 50s.',
      },
      {
        title: 'ArgoCD GitOps CD',
        body: 'For deployment, I implemented an app-of-apps ArgoCD setup with three environments: dev (auto-sync on every merge to main), staging (manual sync with a PR-style approval), and production (manual sync with a Slack approval gate using argocd-notifications). Helm chart templates were standardised across services so deploying a new service meant filling in a 20-line values.yaml, not writing a custom pipeline.',
      },
      {
        title: 'Automated smoke tests and rollback',
        body: 'Each ArgoCD sync hook triggered a post-deploy smoke test job: HTTP health checks, database connectivity checks, and a synthetic transaction through the core payment flow. If any check failed within 5 minutes of deploy, ArgoCD rolled back to the previous revision automatically. The first time this fired in staging, it caught a misconfigured environment variable before it reached production.',
      },
      {
        title: 'Migration',
        body: 'We migrated services in three waves over three weeks — internal tooling first, then non-customer-facing services, then production traffic services. The team continued deploying via Jenkins during the transition. The cutover for each service was a 10-minute window where we ran both pipelines in parallel, confirmed the ArgoCD sync was healthy, then disabled the Jenkins job.',
      },
    ],
    results: [
      { metric: '11×', label: 'Faster deploys (47 min → 4 min)' },
      { metric: '5×', label: 'More deploys per week' },
      { metric: '0', label: 'Deploy-caused incidents in 3 months post-launch' },
      { metric: '30', label: 'Services migrated in 3 weeks' },
      { metric: '< 5 min', label: 'Automatic rollback on smoke test failure' },
    ],
    stack: [
      'GitHub Actions',
      'ArgoCD',
      'Helm',
      'Kubernetes',
      'Trivy',
      'AWS ECR',
      'Slack',
      'argocd-notifications',
    ],
    testimonial: {
      quote:
        "We went from dreading deploys to treating them as a non-event. The team ships multiple times a day now and nobody thinks twice about it. That's the goal.",
      role: 'CTO, fintech client',
    },
  },

  'aws-cost-optimization': {
    slug: 'aws-cost-optimization',
    headline: 'AWS cost optimisation and Terraform IaC migration',
    client: 'B2B SaaS startup (anonymised)',
    industry: 'SaaS / HR Tech',
    duration: '5 weeks',
    year: '2025',
    metric: '−42%',
    metricLabel: 'Monthly AWS bill',
    tags: ['AWS', 'Terraform', 'Cost Optimization', 'EC2', 'RDS'],
    summary:
      'A pre-Series-A SaaS startup was paying $14,000/month on AWS with no visibility into where the money was going. No Terraform, no tagging, no cost allocation. Everything had been provisioned manually over two years. I audited the entire estate, terminated unused resources immediately, right-sized everything that was over-provisioned, migrated to Terraform, and introduced Reserved Instances and Spot for the right workloads. Monthly bill dropped to $8,100 — a $5,900/month (42%) reduction.',
    tldr: [
      { label: 'Monthly AWS bill', value: '$14,000 → $8,100' },
      { label: 'Monthly saving', value: '$5,900 (42%)' },
      { label: 'Annual saving', value: '~$70,800' },
      { label: 'Terraform IaC coverage', value: '0% → 85%' },
    ],
    challenge: [
      'The startup had two engineers who had been provisioning AWS resources manually through the console since the company was founded. Two years later, nobody had a clear picture of what was running or why. The only signal was the monthly AWS bill, which had been climbing consistently as the product grew.',
      'There was no Terraform, no CloudFormation, no IaC of any kind. Resources had no consistent tagging, making cost allocation impossible. When I ran an inventory, I found 23 EC2 instances across 4 regions, 8 RDS instances (including 3 in regions where no application was running), 12 load balancers, and hundreds of forgotten EBS snapshots from instances that no longer existed.',
      "The founder's concern wasn't just the cost — it was that a senior engineer would leave and take institutional knowledge about the infrastructure with them. They had already had one close call when a developer left and it took three days to figure out what a mysteriously named EC2 instance was doing.",
    ],
    approach: [
      {
        title: 'Full inventory and immediate quick wins',
        body: "I spent day one building a complete inventory of all AWS resources across all regions using AWS Config and a combination of CLI scripts. I identified $800/month of obviously unused resources immediately: stopped EC2 instances that had been stopped for 6+ months (and their attached EBS volumes), 3 load balancers with no targets, 2 RDS instances in eu-west-2 that the application hadn't used in 4 months, and 400GB of orphaned EBS snapshots. These were terminated after 24-hour confirmation. First week saving: $800/month.",
      },
      {
        title: 'Right-sizing analysis',
        body: 'Using CloudWatch metrics, I profiled CPU, memory, and I/O utilisation for every running EC2 instance and RDS instance over a 30-day window. Production application servers were running at 15–25% CPU on m5.2xlarge instances. I moved them to m5.xlarge with a 1-week trial period — no performance impact. Development and staging instances moved from m5.xlarge to t3.medium (they were running at 5% CPU). RDS production moved from db.r5.large to db.r5.medium based on connection count and query patterns. Right-sizing saving: $2,100/month.',
      },
      {
        title: 'Reserved Instances and Savings Plans',
        body: 'For the production database and the two production application servers that had been running continuously for over a year, I purchased 1-year Reserved Instances. For the baseline EC2 compute, I implemented a Compute Savings Plan covering 60% of the baseline spend. Savings Plans are more flexible than RIs for variable workloads — if the instance type needs to change, the savings plan follows. Commitment saving: $1,400/month.',
      },
      {
        title: 'Spot for batch and CI workloads',
        body: 'The company ran nightly ETL jobs and their GitHub Actions CI on on-demand EC2. I moved these to Spot instances with a Spot Fleet configuration using multiple instance types to reduce interruption risk. CI runners on Spot dropped from $600/month to $180/month. ETL jobs moved from on-demand to a mixed Spot/On-demand fleet (70/30) with checkpointing — Spot interruptions restart from the last checkpoint, not from scratch.',
      },
      {
        title: 'Terraform migration',
        body: 'With cost reductions validated, I began codifying the remaining infrastructure in Terraform. I started with the lowest-risk resources — security groups, IAM roles, S3 buckets — and used terraform import to bring existing resources under management. Existing resources were imported and verified with terraform plan showing no pending changes before I moved to the next resource. For new resources (load balancers, target groups, RDS parameter groups), I wrote Terraform from scratch. After 3 weeks, 85% of the estate was under Terraform control with remote state in S3 and DynamoDB locking.',
      },
    ],
    results: [
      { metric: '$5,900', label: 'Monthly savings (42% reduction)' },
      { metric: '$70,800', label: 'Projected annual saving' },
      { metric: '85%', label: 'Infrastructure under Terraform (was 0%)' },
      { metric: '3 weeks', label: 'Payback period on engagement cost' },
      { metric: '$800', label: 'Immediate savings from unused resources (day 1)' },
    ],
    stack: [
      'AWS EC2',
      'AWS RDS',
      'AWS S3',
      'Terraform',
      'AWS Cost Explorer',
      'AWS Config',
      'CloudWatch',
      'Savings Plans',
      'Spot Instances',
    ],
  },
}
