export interface ChecklistCategory {
  title: string
  items: string[]
}

export const K8S_CHECKLIST: ChecklistCategory[] = [
  {
    title: 'Cluster Infrastructure',
    items: [
      'Multi-AZ node groups configured for high availability',
      'Managed node groups use hardened AMI with no public IP addresses',
      'Kubernetes version is current or N-1 (not EOL)',
      'etcd encrypted at rest with customer-managed key',
      'Control plane logs enabled (API server, audit, scheduler, controller manager)',
      'CNI plugin selected and tested under load (Cilium or Calico recommended)',
      'Node instance types right-sized for actual workload profile',
      'Spot/preemptible nodes protected by PodDisruptionBudgets',
    ],
  },
  {
    title: 'Networking',
    items: [
      'Cluster API endpoint access restricted to known CIDR ranges',
      'Private cluster or Authorized Networks — no public API endpoint in production',
      'Network policies enforced with default-deny ingress and egress',
      'Load balancer annotations correct for internal vs external exposure',
      'CoreDNS configured with proper caching, autoscaling, and health checks',
      'Service mesh mTLS between pods for sensitive east-west traffic',
    ],
  },
  {
    title: 'Security',
    items: [
      'RBAC enabled — no legacy ABAC policy files present',
      'Pod Security Admission enforcing restricted or baseline for all namespaces',
      'No containers run as root (securityContext.runAsNonRoot: true)',
      'All image references pinned to SHA256 digest — no :latest tags in production',
      'Secrets stored in external manager (Vault, AWS Secrets Manager, or Sealed Secrets)',
      'Image vulnerability scanning integrated into CI pipeline (Trivy or Grype)',
      'Admission controller blocking non-compliant workloads (OPA Gatekeeper or Kyverno)',
      'Cluster API server audit logging enabled and shipped to SIEM',
    ],
  },
  {
    title: 'Access Control',
    items: [
      'No shared kubeconfig — individual OIDC-bound identities per engineer',
      'AWS IAM roles granted via IRSA (not legacy node-level EC2 instance profiles)',
      'Break-glass cluster-admin credentials in sealed storage, audited on use',
      'Certificate rotation automated via cert-manager with monitored expiry alerts',
    ],
  },
  {
    title: 'Storage',
    items: [
      'Default StorageClass uses Retain reclaim policy for production PersistentVolumes',
      'PersistentVolume encryption at rest verified at the storage layer',
      'Backup jobs scheduled and tested (Velero or cloud-native snapshots)',
      'Volume snapshot recovery procedure documented and last-tested date recorded',
    ],
  },
  {
    title: 'Workload Reliability',
    items: [
      'All Deployments have resource requests AND limits defined',
      'HorizontalPodAutoscaler configured for variable-load workloads',
      'PodDisruptionBudgets defined for all critical workloads',
      'Liveness and readiness probes defined on every container',
      'Termination grace period long enough for connection draining',
      'RollingUpdate strategy configured — not Recreate, unless stateful requirements dictate',
      'Init containers and sidecar ordering validated under load test',
    ],
  },
  {
    title: 'Observability',
    items: [
      'Prometheus and kube-state-metrics collecting cluster and workload metrics',
      'Alerting routed to PagerDuty or Opsgenie — not email-only for critical paths',
      'All container logs shipped to centralised system (Loki, CloudWatch, or Datadog)',
      'OpenTelemetry instrumentation on critical request paths for distributed tracing',
      'Per-service SLI/SLO dashboards in Grafana with error-budget tracking',
      'Every alert definition has a linked runbook URL',
    ],
  },
  {
    title: 'CI/CD & GitOps',
    items: [
      'All production manifests in Git — no kubectl apply from local machines',
      'GitOps controller (ArgoCD or Flux) managing production cluster state',
      'Deployment to production requires an approval gate or two-person rule',
      'Rollback procedure documented, tested, and rehearsed — not just written down',
    ],
  },
]

export const TOTAL_ITEMS = K8S_CHECKLIST.reduce((sum, cat) => sum + cat.items.length, 0)
