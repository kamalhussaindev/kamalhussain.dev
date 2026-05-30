import { SITE_URL } from './constants'

export const RESOURCE_SLUGS = [
  'helm-chart-starter',
  'terraform-module-aws-eks',
  'github-actions-deploy-template',
  'argocd-app-of-apps',
] as const

export type ResourceSlug = (typeof RESOURCE_SLUGS)[number]

export interface ResourceFile {
  name: string
  language: string
  content: string
}

export interface ResourceMeta {
  slug: ResourceSlug
  type: 'Helm chart' | 'Terraform module' | 'CI/CD template' | 'ArgoCD pattern'
  title: string
  subtitle: string
  description: string
  githubUrl: string
  techBadges: string[]
  whatYouGet: string[]
  whatItAssumes: string[]
  programmingLanguages: string[]
  relatedService: { href: string; label: string }
  relatedCaseStudy?: { href: string; label: string }
  datePublished: string
  files: ResourceFile[]
}

// ---------------------------------------------------------------------------
// Helm Chart Starter
// ---------------------------------------------------------------------------

const helmFiles: ResourceFile[] = [
  {
    name: 'Chart.yaml',
    language: 'yaml',
    content: `apiVersion: v2
name: my-app
description: >
  A production-ready Helm chart for stateless services.
  Batteries included: HPA, PDB, ServiceMonitor, secure defaults.
type: application
version: 0.1.0
appVersion: "1.0.0"
keywords:
  - stateless
  - kubernetes
  - production
home: https://github.com/kamalhussaindevops/helm-chart-starter
maintainers:
  - name: Kamal Hussain
    url: https://kamalhussain.dev`,
  },
  {
    name: 'values.yaml',
    language: 'yaml',
    content: `# ──────────────────────────────────────────────
# Image
# ──────────────────────────────────────────────
image:
  repository: ""         # e.g. 123456789.dkr.ecr.us-east-1.amazonaws.com/my-app
  tag: ""                # overridden by CI; never use "latest" in production
  pullPolicy: IfNotPresent

# ──────────────────────────────────────────────
# Replicas — let HPA control count; set a sane floor
# ──────────────────────────────────────────────
replicaCount: 2

# ──────────────────────────────────────────────
# Service
# ──────────────────────────────────────────────
service:
  type: ClusterIP
  port: 80
  targetPort: 8080
  annotations: {}

# ──────────────────────────────────────────────
# Ingress
# ──────────────────────────────────────────────
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
  hosts:
    - host: example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: app-tls
      hosts:
        - example.com

# ──────────────────────────────────────────────
# Resource requests + limits (REQUIRED — no defaults)
# If you don't set these, the VPA and cluster-autoscaler
# cannot make accurate scheduling decisions.
# ──────────────────────────────────────────────
resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi

# ──────────────────────────────────────────────
# HPA — targets both CPU and memory
# Relying on CPU alone misses memory-bound workloads.
# ──────────────────────────────────────────────
autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

# ──────────────────────────────────────────────
# PDB — ensures availability during node drains
# minAvailable: 1 means at least one pod must stay up.
# ──────────────────────────────────────────────
podDisruptionBudget:
  enabled: true
  minAvailable: 1

# ──────────────────────────────────────────────
# Security context — non-root, read-only FS, no caps
# This satisfies most CIS Kubernetes Benchmark controls.
# ──────────────────────────────────────────────
podSecurityContext:
  runAsNonRoot: true
  runAsUser: 1000
  runAsGroup: 1000
  fsGroup: 1000
  seccompProfile:
    type: RuntimeDefault

containerSecurityContext:
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop:
      - ALL

# ──────────────────────────────────────────────
# Probes
# Liveness and readiness use DIFFERENT endpoints intentionally:
#   /healthz — "am I alive?" (restart if not)
#   /ready   — "am I ready for traffic?" (remove from LB if not)
# Using the same endpoint causes cascading restarts under load.
# ──────────────────────────────────────────────
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 15
  periodSeconds: 20
  timeoutSeconds: 5
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 3

startupProbe:
  httpGet:
    path: /healthz
    port: 8080
  failureThreshold: 30
  periodSeconds: 5

# ──────────────────────────────────────────────
# ServiceMonitor (Prometheus Operator)
# ──────────────────────────────────────────────
serviceMonitor:
  enabled: false
  path: /metrics
  interval: 30s
  scrapeTimeout: 10s
  additionalLabels: {}

# ──────────────────────────────────────────────
# Topology spread — spread pods across AZs
# ──────────────────────────────────────────────
topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: topology.kubernetes.io/zone
    whenUnsatisfiable: ScheduleAnyway
    labelSelector:
      matchLabels:
        app.kubernetes.io/name: my-app

# ──────────────────────────────────────────────
# Miscellaneous
# ──────────────────────────────────────────────
nameOverride: ""
fullnameOverride: ""

serviceAccount:
  create: true
  annotations: {}
  name: ""

podAnnotations: {}
podLabels: {}

env: []
envFrom: []

volumes: []
volumeMounts: []

nodeSelector: {}
tolerations: []
affinity: {}`,
  },
  {
    name: 'templates/deployment.yaml',
    language: 'yaml',
    content: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
spec:
  {{- if not .Values.autoscaling.enabled }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
  selector:
    matchLabels:
      {{- include "my-app.selectorLabels" . | nindent 6 }}
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      annotations:
        # Force pod restart when ConfigMap or Secret changes
        checksum/config: {{ include (print $.Template.BasePath "/configmap.yaml") . | sha256sum }}
        {{- with .Values.podAnnotations }}
        {{- toYaml . | nindent 8 }}
        {{- end }}
      labels:
        {{- include "my-app.labels" . | nindent 8 }}
        {{- with .Values.podLabels }}
        {{- toYaml . | nindent 8 }}
        {{- end }}
    spec:
      serviceAccountName: {{ include "my-app.serviceAccountName" . }}
      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}
      {{- with .Values.topologySpreadConstraints }}
      topologySpreadConstraints:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          securityContext:
            {{- toYaml .Values.containerSecurityContext | nindent 12 }}
          ports:
            - name: http
              containerPort: {{ .Values.service.targetPort }}
              protocol: TCP
          {{- with .Values.env }}
          env:
            {{- toYaml . | nindent 12 }}
          {{- end }}
          {{- with .Values.envFrom }}
          envFrom:
            {{- toYaml . | nindent 12 }}
          {{- end }}
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
          readinessProbe:
            {{- toYaml .Values.readinessProbe | nindent 12 }}
          startupProbe:
            {{- toYaml .Values.startupProbe | nindent 12 }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          {{- with .Values.volumeMounts }}
          volumeMounts:
            {{- toYaml . | nindent 12 }}
          {{- end }}
      {{- with .Values.volumes }}
      volumes:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}`,
  },
  {
    name: 'templates/hpa.yaml',
    language: 'yaml',
    content: `{{- if .Values.autoscaling.enabled }}
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "my-app.fullname" . }}
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
  metrics:
    {{- if .Values.autoscaling.targetCPUUtilizationPercentage }}
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetCPUUtilizationPercentage }}
    {{- end }}
    {{- if .Values.autoscaling.targetMemoryUtilizationPercentage }}
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetMemoryUtilizationPercentage }}
    {{- end }}
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15
        - type: Pods
          value: 4
          periodSeconds: 15
      selectPolicy: Max
{{- end }}`,
  },
  {
    name: 'templates/pdb.yaml',
    language: 'yaml',
    content: `{{- if .Values.podDisruptionBudget.enabled }}
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
spec:
  minAvailable: {{ .Values.podDisruptionBudget.minAvailable }}
  selector:
    matchLabels:
      {{- include "my-app.selectorLabels" . | nindent 6 }}
{{- end }}`,
  },
  {
    name: 'templates/servicemonitor.yaml',
    language: 'yaml',
    content: `{{- if .Values.serviceMonitor.enabled }}
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: {{ include "my-app.fullname" . }}
  labels:
    {{- include "my-app.labels" . | nindent 4 }}
    {{- with .Values.serviceMonitor.additionalLabels }}
    {{- toYaml . | nindent 4 }}
    {{- end }}
spec:
  selector:
    matchLabels:
      {{- include "my-app.selectorLabels" . | nindent 6 }}
  endpoints:
    - port: http
      path: {{ .Values.serviceMonitor.path }}
      interval: {{ .Values.serviceMonitor.interval }}
      scrapeTimeout: {{ .Values.serviceMonitor.scrapeTimeout }}
{{- end }}`,
  },
]

// ---------------------------------------------------------------------------
// Terraform EKS Module
// ---------------------------------------------------------------------------

const terraformFiles: ResourceFile[] = [
  {
    name: 'versions.tf',
    language: 'hcl',
    content: `terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.27"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.13"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }
}`,
  },
  {
    name: 'variables.tf',
    language: 'hcl',
    content: `variable "cluster_name" {
  description = "Name of the EKS cluster. Used as a prefix for all related resources."
  type        = string
}

variable "cluster_version" {
  description = "Kubernetes version for the EKS cluster. Pin this — auto-upgrades are painful."
  type        = string
  default     = "1.30"
}

variable "region" {
  description = "AWS region to deploy the cluster in."
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones to use. Must be >= 2 for HA."
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "node_groups" {
  description = "Managed node group configuration map."
  type = map(object({
    instance_types = list(string)
    min_size       = number
    max_size       = number
    desired_size   = number
    disk_size_gb   = optional(number, 50)
    labels         = optional(map(string), {})
    taints = optional(list(object({
      key    = string
      value  = string
      effect = string
    })), [])
  }))
  default = {
    general = {
      instance_types = ["m6i.large"]
      min_size       = 2
      max_size       = 10
      desired_size   = 3
    }
  }
}

variable "enable_cluster_autoscaler" {
  description = "Install cluster-autoscaler via Helm. Requires IRSA to be enabled."
  type        = bool
  default     = true
}

variable "enable_metrics_server" {
  description = "Install metrics-server. Required for HPA to work."
  type        = bool
  default     = true
}

variable "enable_aws_load_balancer_controller" {
  description = "Install AWS Load Balancer Controller for ALB/NLB ingress support."
  type        = bool
  default     = true
}

variable "tags" {
  description = "Common tags applied to all resources."
  type        = map(string)
  default     = {}
}`,
  },
  {
    name: 'main.tf',
    language: 'hcl',
    content: `# ──────────────────────────────────────────────────────────────────────────────
# VPC — three public + three private subnets across AZs.
# EKS nodes live in private subnets; the Load Balancer Controller
# creates ALBs in public subnets. Tags on the subnets tell the
# controller which subnet to use for internal vs internet-facing LBs.
# ──────────────────────────────────────────────────────────────────────────────
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "\${var.cluster_name}-vpc"
  cidr = var.vpc_cidr

  azs             = var.availability_zones
  private_subnets = [for i, az in var.availability_zones : cidrsubnet(var.vpc_cidr, 4, i)]
  public_subnets  = [for i, az in var.availability_zones : cidrsubnet(var.vpc_cidr, 4, i + 4)]

  enable_nat_gateway     = true
  single_nat_gateway     = false   # true saves ~$32/mo but removes AZ redundancy
  enable_vpn_gateway     = false
  enable_dns_hostnames   = true
  enable_dns_support     = true

  # Tags required for EKS to discover subnets for Load Balancers
  private_subnet_tags = {
    "kubernetes.io/cluster/\${var.cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"           = "1"
  }
  public_subnet_tags = {
    "kubernetes.io/cluster/\${var.cluster_name}" = "shared"
    "kubernetes.io/role/elb"                    = "1"
  }

  tags = var.tags
}

# ──────────────────────────────────────────────────────────────────────────────
# EKS Cluster
# ──────────────────────────────────────────────────────────────────────────────
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # Private endpoint only — no public API server exposure.
  # Your CI/CD must run inside the VPC (or use a VPN/bastion).
  cluster_endpoint_public_access  = false
  cluster_endpoint_private_access = true

  # Enable IRSA — required for workloads to assume IAM roles without
  # storing long-lived credentials in the cluster.
  enable_irsa = true

  # EKS add-ons managed by AWS (auto patch minor versions)
  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent    = true
      before_compute = true   # Must be ready before nodes join
      configuration_values = jsonencode({
        env = {
          ENABLE_PREFIX_DELEGATION = "true"
          WARM_PREFIX_TARGET        = "1"
        }
      })
    }
    aws-ebs-csi-driver = {
      most_recent              = true
      service_account_role_arn = module.ebs_csi_irsa.iam_role_arn
    }
  }

  eks_managed_node_groups = {
    for name, config in var.node_groups : name => {
      instance_types = config.instance_types
      min_size       = config.min_size
      max_size       = config.max_size
      desired_size   = config.desired_size
      disk_size      = config.disk_size_gb

      labels = merge(config.labels, {
        "node.kubernetes.io/node-group" = name
      })

      dynamic "taint" {
        for_each = config.taints
        content {
          key    = taint.value.key
          value  = taint.value.value
          effect = taint.value.effect
        }
      }

      # Launch template — IMDSv2 required, no public IP
      metadata_options = {
        http_endpoint               = "enabled"
        http_tokens                 = "required"   # IMDSv2 — blocks SSRF attacks
        http_put_response_hop_limit = 2
      }

      tags = var.tags
    }
  }

  tags = var.tags
}

# ──────────────────────────────────────────────────────────────────────────────
# IRSA for EBS CSI Driver
# ──────────────────────────────────────────────────────────────────────────────
module "ebs_csi_irsa" {
  source  = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name             = "\${var.cluster_name}-ebs-csi"
  attach_ebs_csi_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:ebs-csi-controller-sa"]
    }
  }

  tags = var.tags
}

# ──────────────────────────────────────────────────────────────────────────────
# IRSA for Cluster Autoscaler
# ──────────────────────────────────────────────────────────────────────────────
module "cluster_autoscaler_irsa" {
  count  = var.enable_cluster_autoscaler ? 1 : 0
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name                        = "\${var.cluster_name}-cluster-autoscaler"
  attach_cluster_autoscaler_policy = true
  cluster_autoscaler_cluster_names = [var.cluster_name]

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:cluster-autoscaler"]
    }
  }

  tags = var.tags
}

# ──────────────────────────────────────────────────────────────────────────────
# IRSA for AWS Load Balancer Controller
# ──────────────────────────────────────────────────────────────────────────────
module "aws_lbc_irsa" {
  count  = var.enable_aws_load_balancer_controller ? 1 : 0
  source = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  version = "~> 5.0"

  role_name                              = "\${var.cluster_name}-aws-lbc"
  attach_load_balancer_controller_policy = true

  oidc_providers = {
    main = {
      provider_arn               = module.eks.oidc_provider_arn
      namespace_service_accounts = ["kube-system:aws-load-balancer-controller"]
    }
  }

  tags = var.tags
}

# ──────────────────────────────────────────────────────────────────────────────
# Helm: cluster-autoscaler
# ──────────────────────────────────────────────────────────────────────────────
resource "helm_release" "cluster_autoscaler" {
  count      = var.enable_cluster_autoscaler ? 1 : 0
  name       = "cluster-autoscaler"
  repository = "https://kubernetes.github.io/autoscaler"
  chart      = "cluster-autoscaler"
  namespace  = "kube-system"
  version    = "9.37.0"

  set {
    name  = "autoDiscovery.clusterName"
    value = var.cluster_name
  }
  set {
    name  = "awsRegion"
    value = var.region
  }
  set {
    name  = "rbac.serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = module.cluster_autoscaler_irsa[0].iam_role_arn
  }

  depends_on = [module.eks]
}

# ──────────────────────────────────────────────────────────────────────────────
# Helm: metrics-server
# ──────────────────────────────────────────────────────────────────────────────
resource "helm_release" "metrics_server" {
  count      = var.enable_metrics_server ? 1 : 0
  name       = "metrics-server"
  repository = "https://kubernetes-sigs.github.io/metrics-server/"
  chart      = "metrics-server"
  namespace  = "kube-system"
  version    = "3.12.1"

  depends_on = [module.eks]
}

# ──────────────────────────────────────────────────────────────────────────────
# Helm: AWS Load Balancer Controller
# ──────────────────────────────────────────────────────────────────────────────
resource "helm_release" "aws_load_balancer_controller" {
  count      = var.enable_aws_load_balancer_controller ? 1 : 0
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.8.1"

  set {
    name  = "clusterName"
    value = var.cluster_name
  }
  set {
    name  = "serviceAccount.annotations.eks\\.amazonaws\\.com/role-arn"
    value = module.aws_lbc_irsa[0].iam_role_arn
  }
  set {
    name  = "vpcId"
    value = module.vpc.vpc_id
  }
  set {
    name  = "region"
    value = var.region
  }

  depends_on = [module.eks]
}`,
  },
  {
    name: 'outputs.tf',
    language: 'hcl',
    content: `output "cluster_name" {
  description = "EKS cluster name."
  value       = module.eks.cluster_name
}

output "cluster_endpoint" {
  description = "API server endpoint. Use this in kubeconfig."
  value       = module.eks.cluster_endpoint
}

output "cluster_ca_certificate" {
  description = "Base64-encoded cluster CA certificate."
  value       = module.eks.cluster_certificate_authority_data
  sensitive   = true
}

output "oidc_provider_arn" {
  description = "OIDC provider ARN. Pass to child modules that need IRSA."
  value       = module.eks.oidc_provider_arn
}

output "oidc_provider_url" {
  description = "OIDC provider URL (without https://)."
  value       = module.eks.cluster_oidc_issuer_url
}

output "vpc_id" {
  description = "VPC ID."
  value       = module.vpc.vpc_id
}

output "private_subnet_ids" {
  description = "Private subnet IDs. Use for node groups and internal load balancers."
  value       = module.vpc.private_subnets
}

output "public_subnet_ids" {
  description = "Public subnet IDs. Used by the LBC for internet-facing ALBs."
  value       = module.vpc.public_subnets
}

output "kubeconfig_command" {
  description = "Run this to update your local kubeconfig."
  value       = "aws eks update-kubeconfig --region \${var.region} --name \${module.eks.cluster_name}"
}`,
  },
]

// ---------------------------------------------------------------------------
// GitHub Actions Deploy Template
// ---------------------------------------------------------------------------

const githubActionsFiles: ResourceFile[] = [
  {
    name: '.github/workflows/deploy.yml',
    language: 'yaml',
    content: `name: Deploy

on:
  push:
    branches:
      - main          # Triggers production deploy
      - staging       # Triggers staging deploy
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        type: choice
        options: [staging, production]

concurrency:
  group: deploy-\$\{\{ github.ref }}
  cancel-in-progress: false  # Never cancel a running deploy — wait for it

permissions:
  contents: read
  id-token: write   # Required for OIDC AWS auth

jobs:
  # ─────────────────────────────────────────────
  # Resolve which environment to deploy to
  # ─────────────────────────────────────────────
  resolve-env:
    runs-on: ubuntu-latest
    outputs:
      environment: \$\{\{ steps.resolve.outputs.environment }}
      aws_role: \$\{\{ steps.resolve.outputs.aws_role }}
      ecr_registry: \$\{\{ steps.resolve.outputs.ecr_registry }}
      cluster_name: \$\{\{ steps.resolve.outputs.cluster_name }}
    steps:
      - id: resolve
        run: |
          if [[ "\$\{\{ github.event_name }}" == "workflow_dispatch" ]]; then
            ENV="\$\{\{ github.event.inputs.environment }}"
          elif [[ "\$\{\{ github.ref }}" == "refs/heads/main" ]]; then
            ENV="production"
          else
            ENV="staging"
          fi
          echo "environment=$ENV" >> $GITHUB_OUTPUT
          echo "aws_role=\$\{\{ vars[format('{0}_AWS_ROLE_ARN', upper(ENV))] }}" >> $GITHUB_OUTPUT
          echo "ecr_registry=\$\{\{ vars.ECR_REGISTRY }}" >> $GITHUB_OUTPUT
          echo "cluster_name=\$\{\{ vars[format('{0}_CLUSTER_NAME', upper(ENV))] }}" >> $GITHUB_OUTPUT

  # ─────────────────────────────────────────────
  # Build and push to ECR
  # ─────────────────────────────────────────────
  build:
    runs-on: ubuntu-latest
    needs: resolve-env
    outputs:
      image_tag: \$\{\{ steps.meta.outputs.version }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \$\{\{ needs.resolve-env.outputs.aws_role }}
          aws-region: us-east-1

      - name: Log in to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \$\{\{ needs.resolve-env.outputs.ecr_registry }}/my-app
          tags: |
            type=sha,prefix=,format=short
            type=ref,event=branch

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \$\{\{ steps.meta.outputs.tags }}
          labels: \$\{\{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          provenance: false   # Avoids multi-arch manifest issues with ECR

  # ─────────────────────────────────────────────
  # Run tests against the built image
  # ─────────────────────────────────────────────
  test:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - name: Run integration tests
        run: |
          docker run --rm \\
            -e DATABASE_URL=\$\{\{ secrets.TEST_DATABASE_URL }} \\
            \$\{\{ needs.resolve-env.outputs.ecr_registry }}/my-app:\$\{\{ needs.build.outputs.image_tag }} \\
            npm run test:integration

  # ─────────────────────────────────────────────
  # Deploy via Helm + ArgoCD sync
  # ─────────────────────────────────────────────
  deploy:
    runs-on: ubuntu-latest
    needs: [resolve-env, build, test]
    environment: \$\{\{ needs.resolve-env.outputs.environment }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \$\{\{ needs.resolve-env.outputs.aws_role }}
          aws-region: us-east-1

      - name: Update kubeconfig
        run: |
          aws eks update-kubeconfig \\
            --name \$\{\{ needs.resolve-env.outputs.cluster_name }} \\
            --region us-east-1

      - name: Update image tag in Helm values
        run: |
          IMAGE_TAG=\$\{\{ needs.build.outputs.image_tag }}
          ENV=\$\{\{ needs.resolve-env.outputs.environment }}
          # Update the image.tag in the environment-specific values file
          # This commits back to the GitOps repo so ArgoCD picks it up
          yq -i ".image.tag = \\"$IMAGE_TAG\\"" deploy/helm/envs/$ENV/values.yaml

      - name: Trigger ArgoCD sync
        run: |
          argocd app sync my-app-\$\{\{ needs.resolve-env.outputs.environment }} \\
            --server \$\{\{ secrets.ARGOCD_SERVER }} \\
            --auth-token \$\{\{ secrets.ARGOCD_TOKEN }} \\
            --timeout 300 \\
            --retry-limit 3

      - name: Wait for rollout
        run: |
          kubectl rollout status deployment/my-app \\
            --namespace \$\{\{ needs.resolve-env.outputs.environment }} \\
            --timeout=300s

  # ─────────────────────────────────────────────
  # Smoke test the deployed endpoint
  # ─────────────────────────────────────────────
  smoke-test:
    runs-on: ubuntu-latest
    needs: [resolve-env, deploy]
    steps:
      - name: Health check
        run: |
          ENV=\$\{\{ needs.resolve-env.outputs.environment }}
          BASE_URL=\$\{\{ secrets[format('{0}_BASE_URL', upper(ENV))] }}
          for i in {1..10}; do
            STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/healthz")
            if [[ "$STATUS" == "200" ]]; then
              echo "Smoke test passed (attempt $i)"
              exit 0
            fi
            echo "Attempt $i: got $STATUS, retrying in 10s..."
            sleep 10
          done
          echo "Smoke test failed after 10 attempts"
          exit 1

  # ─────────────────────────────────────────────
  # Rollback on smoke test failure
  # ─────────────────────────────────────────────
  rollback:
    runs-on: ubuntu-latest
    needs: [resolve-env, deploy, smoke-test]
    if: failure() && needs.deploy.result == 'success'
    steps:
      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \$\{\{ needs.resolve-env.outputs.aws_role }}
          aws-region: us-east-1

      - name: Rollback Helm release
        run: |
          aws eks update-kubeconfig \\
            --name \$\{\{ needs.resolve-env.outputs.cluster_name }} \\
            --region us-east-1
          helm rollback my-app --namespace \$\{\{ needs.resolve-env.outputs.environment }}

      - name: Notify Slack — rollback
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": ":warning: *Deploy rolled back*",
              "attachments": [{
                "color": "danger",
                "fields": [
                  {"title": "Env", "value": "\$\{\{ needs.resolve-env.outputs.environment }}", "short": true},
                  {"title": "Commit", "value": "\$\{\{ github.sha }}", "short": true},
                  {"title": "Actor", "value": "\$\{\{ github.actor }}", "short": true}
                ]
              }]
            }
        env:
          SLACK_WEBHOOK_URL: \$\{\{ secrets.SLACK_WEBHOOK_URL }}

  # ─────────────────────────────────────────────
  # Notify Slack on success
  # ─────────────────────────────────────────────
  notify:
    runs-on: ubuntu-latest
    needs: [resolve-env, smoke-test]
    if: success()
    steps:
      - name: Notify Slack — success
        uses: slackapi/slack-github-action@v1.26.0
        with:
          payload: |
            {
              "text": ":white_check_mark: *Deploy succeeded*",
              "attachments": [{
                "color": "good",
                "fields": [
                  {"title": "Env", "value": "\$\{\{ needs.resolve-env.outputs.environment }}", "short": true},
                  {"title": "Image", "value": "\$\{\{ needs.build.outputs.image_tag }}", "short": true},
                  {"title": "Actor", "value": "\$\{\{ github.actor }}", "short": true}
                ]
              }]
            }
        env:
          SLACK_WEBHOOK_URL: \$\{\{ secrets.SLACK_WEBHOOK_URL }}`,
  },
  {
    name: '.github/workflows/ci.yml',
    language: 'yaml',
    content: `name: CI

on:
  pull_request:
    branches: [main, staging]

concurrency:
  group: ci-\$\{\{ github.ref }}
  cancel-in-progress: true   # PRs: cancel old runs on new push

permissions:
  contents: read
  id-token: write
  pull-requests: write

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run test
        env:
          DATABASE_URL: postgres://postgres:test@localhost:5432/testdb

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \$\{\{ vars.STAGING_AWS_ROLE_ARN }}
          aws-region: us-east-1
      - name: Log in to ECR
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build Docker image (no push)
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
  },
]

// ---------------------------------------------------------------------------
// ArgoCD App-of-Apps
// ---------------------------------------------------------------------------

const argocdFiles: ResourceFile[] = [
  {
    name: 'bootstrap/app.yaml',
    language: 'yaml',
    content: `# The bootstrap Application is the only thing you apply manually.
# Everything else is managed by ArgoCD from this point on.
#
#   kubectl apply -f bootstrap/app.yaml
#
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: bootstrap
  namespace: argocd
  # Cascade deletion — removing the bootstrap app removes everything.
  # Set this to 'foreground' in production; leave unset in dev.
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/gitops-config.git
    targetRevision: HEAD
    path: envs          # Points at the envs/ directory, which contains the env apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true       # Remove resources that no longer exist in Git
      selfHeal: true    # Revert manual kubectl edits
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true`,
  },
  {
    name: 'envs/production/apps.yaml',
    language: 'yaml',
    content: `# This Application manages all production-environment apps.
# It points at envs/production/, which contains ApplicationSets.
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-apps
  namespace: argocd
  labels:
    environment: production
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: production
  source:
    repoURL: https://github.com/your-org/gitops-config.git
    targetRevision: HEAD
    path: envs/production
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true`,
  },
  {
    name: 'envs/production/applicationset.yaml',
    language: 'yaml',
    content: `# ApplicationSet generates one Application per service directory.
# Add a new service by creating a directory under services/production/;
# ArgoCD picks it up automatically within the sync interval.
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: production-services
  namespace: argocd
spec:
  generators:
    - git:
        repoURL: https://github.com/your-org/gitops-config.git
        revision: HEAD
        directories:
          - path: services/production/*
  template:
    metadata:
      name: '{{path.basename}}-production'
      labels:
        environment: production
        app: '{{path.basename}}'
      annotations:
        # Prevent prod deploys without an explicit sync window approval
        notifications.argoproj.io/subscribe.on-sync-failed.slack: devops-alerts
      finalizers:
        - resources-finalizer.argocd.argoproj.io
    spec:
      project: production
      source:
        repoURL: https://github.com/your-org/gitops-config.git
        targetRevision: HEAD
        path: '{{path}}'
        helm:
          valueFiles:
            - values.yaml
            - values-production.yaml
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{path.basename}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true
          - PrunePropagationPolicy=foreground
        retry:
          limit: 5
          backoff:
            duration: 5s
            factor: 2
            maxDuration: 3m`,
  },
  {
    name: 'envs/staging/applicationset.yaml',
    language: 'yaml',
    content: `apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: staging-services
  namespace: argocd
spec:
  generators:
    - git:
        repoURL: https://github.com/your-org/gitops-config.git
        revision: HEAD
        directories:
          - path: services/staging/*
  template:
    metadata:
      name: '{{path.basename}}-staging'
      labels:
        environment: staging
        app: '{{path.basename}}'
      annotations:
        notifications.argoproj.io/subscribe.on-sync-failed.slack: devops-alerts
      finalizers:
        - resources-finalizer.argocd.argoproj.io
    spec:
      project: staging
      source:
        repoURL: https://github.com/your-org/gitops-config.git
        targetRevision: HEAD
        path: '{{path}}'
        helm:
          valueFiles:
            - values.yaml
            - values-staging.yaml
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{path.basename}}-staging'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
          - CreateNamespace=true
        retry:
          limit: 3
          backoff:
            duration: 5s
            factor: 2
            maxDuration: 1m`,
  },
  {
    name: 'projects/production.yaml',
    language: 'yaml',
    content: `# AppProject scopes what production applications can access.
# This prevents a production workload from accidentally writing to
# a dev namespace or pulling from an untrusted registry.
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: production
  namespace: argocd
spec:
  description: Production environment — change control required

  # Repositories allowed as sources
  sourceRepos:
    - https://github.com/your-org/gitops-config.git
    - https://charts.bitnami.com/bitnami
    - https://prometheus-community.github.io/helm-charts
    - https://grafana.github.io/helm-charts

  # Destination clusters and namespaces
  destinations:
    - server: https://kubernetes.default.svc
      namespace: '*'

  # Kubernetes resource allow-list (deny-list by default for prod)
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace
    - group: rbac.authorization.k8s.io
      kind: ClusterRole
    - group: rbac.authorization.k8s.io
      kind: ClusterRoleBinding

  namespaceResourceBlacklist:
    - group: ''
      kind: ResourceQuota   # Managed centrally, not per-app

  # Require manual sync approval for production (via sync windows)
  syncWindows:
    - kind: allow
      schedule: '0 6 * * 1-5'   # Mon–Fri 06:00 UTC only
      duration: 10h
      applications:
        - '*'
      manualSync: true

  roles:
    - name: read-only
      description: Read-only access for developers
      policies:
        - p, proj:production:read-only, applications, get, production/*, allow
      groups:
        - engineers`,
  },
]

// ---------------------------------------------------------------------------
// Resource metadata registry
// ---------------------------------------------------------------------------

export const RESOURCES_DATA: Record<ResourceSlug, ResourceMeta> = {
  'helm-chart-starter': {
    slug: 'helm-chart-starter',
    type: 'Helm chart',
    title: 'A production-ready Helm chart starter for stateless services',
    subtitle:
      'Opinionated defaults for resource limits, security contexts, HPA, PDB, and Prometheus scraping — all in one chart.',
    description:
      'A batteries-included Helm chart template for stateless Kubernetes workloads. Enforces resource requests/limits, locked-down security contexts, multi-metric HPA, and PodDisruptionBudgets out of the box.',
    githubUrl: 'https://github.com/kamalhussaindevops/helm-chart-starter', // [CONFIRM REPO EXISTS]
    techBadges: ['Helm 3', 'Kubernetes 1.28+', 'HPA v2', 'Prometheus Operator'],
    whatYouGet: [
      'Chart.yaml, values.yaml, and six production templates (Deployment, Service, Ingress, HPA, PDB, ServiceMonitor)',
      'Security context defaults that pass CIS Kubernetes Benchmark: non-root, read-only filesystem, no privilege escalation, all capabilities dropped',
      'Dual-metric HPA targeting both CPU and memory, with configurable scale-down stabilisation to avoid flapping',
    ],
    whatItAssumes: [
      'A Kubernetes cluster running 1.28 or newer',
      'Helm 3.12+ installed on your local machine or CI runner',
      'Prometheus Operator installed if you want the ServiceMonitor to work (otherwise set serviceMonitor.enabled: false)',
    ],
    programmingLanguages: ['YAML'],
    relatedService: {
      href: '/services/kubernetes-platform-engineering',
      label: 'Kubernetes Platform Engineering',
    },
    relatedCaseStudy: {
      href: '/work/pulsehealth-eks',
      label: 'PulseHealth EKS Case Study',
    },
    datePublished: '2025-05-01',
    files: helmFiles,
  },

  'terraform-module-aws-eks': {
    slug: 'terraform-module-aws-eks',
    type: 'Terraform module',
    title: 'A minimal-but-real Terraform module for production EKS',
    subtitle:
      'VPC, EKS cluster, managed node groups, IRSA, and three essential add-ons — with sane defaults and explicit reasoning for every choice.',
    description:
      'A complete Terraform module that provisions a production-grade EKS cluster: VPC across three AZs, managed node groups with IMDSv2 enforced, IRSA for EBS CSI and cluster-autoscaler, and AWS Load Balancer Controller wired up on day one.',
    githubUrl: 'https://github.com/kamalhussaindevops/terraform-module-aws-eks', // [CONFIRM REPO EXISTS]
    techBadges: ['Terraform 1.5+', 'AWS EKS 1.30', 'IRSA', 'Helm 3'],
    whatYouGet: [
      'Four root files: versions.tf, variables.tf, main.tf, outputs.tf — ready to use as a module or as a root configuration',
      'Three add-ons pre-wired: cluster-autoscaler with IRSA, metrics-server (required for HPA), and AWS Load Balancer Controller',
      'Output values for every downstream dependency: OIDC provider ARN/URL, cluster endpoint, private/public subnet IDs',
    ],
    whatItAssumes: [
      'Terraform 1.5+ and AWS CLI configured with credentials that can create EKS and VPC resources',
      'An S3 bucket and DynamoDB table for remote state (recommended — not included in the module)',
      'Familiarity with AWS IAM; IRSA requires understanding of OIDC trust relationships',
    ],
    programmingLanguages: ['HCL'],
    relatedService: {
      href: '/services/aws-terraform-infrastructure',
      label: 'AWS Cloud Infrastructure with Terraform',
    },
    relatedCaseStudy: {
      href: '/work/pulsehealth-eks',
      label: 'PulseHealth EKS Case Study',
    },
    datePublished: '2025-05-01',
    files: terraformFiles,
  },

  'github-actions-deploy-template': {
    slug: 'github-actions-deploy-template',
    type: 'CI/CD template',
    title: 'A CI/CD template for zero-downtime Kubernetes deploys',
    subtitle:
      'OIDC-based AWS auth, ECR push, ArgoCD sync, smoke test, and automatic rollback — all in one workflow file.',
    description:
      'A production GitHub Actions workflow that builds, tests, pushes to ECR, triggers an ArgoCD sync, runs a smoke test, and rolls back automatically on failure. No long-lived AWS credentials anywhere.',
    githubUrl: 'https://github.com/kamalhussaindevops/github-actions-deploy-template', // [CONFIRM REPO EXISTS]
    techBadges: ['GitHub Actions', 'AWS OIDC', 'Amazon ECR', 'ArgoCD', 'Helm 3', 'Slack'],
    whatYouGet: [
      'A main deploy.yml that handles staging and production from a single file, resolved by branch name or manual trigger',
      'A ci.yml for pull requests: lint, type-check, integration tests with a real Postgres service container, and a dry-run Docker build',
      'Automatic rollback via helm rollback if the post-deploy smoke test fails, with a Slack notification on both success and failure',
    ],
    whatItAssumes: [
      'GitHub Actions enabled on the target repository',
      'An ECR registry and an EKS cluster already provisioned (use the Terraform module above)',
      'ArgoCD installed in the cluster and reachable from the GitHub Actions runner, with a service account token stored as a GitHub secret',
    ],
    programmingLanguages: ['YAML'],
    relatedService: {
      href: '/services/cicd-pipeline-engineering',
      label: 'CI/CD Pipeline Engineering',
    },
    relatedCaseStudy: {
      href: '/work/pulsehealth-eks',
      label: 'PulseHealth EKS Case Study',
    },
    datePublished: '2025-05-01',
    files: githubActionsFiles,
  },

  'argocd-app-of-apps': {
    slug: 'argocd-app-of-apps',
    type: 'ArgoCD pattern',
    title: 'A real ArgoCD app-of-apps pattern (with notes on what NOT to do)',
    subtitle:
      'Bootstrap Application, environment-scoped ApplicationSets, AppProjects with sync windows — and the anti-patterns I see in real engagements.',
    description:
      'A working ArgoCD app-of-apps structure: one bootstrap Application you apply once, then environment-level ApplicationSets that auto-discover new services by directory. AppProjects scope what each environment can touch, with production sync windows for change control.',
    githubUrl: 'https://github.com/kamalhussaindevops/argocd-app-of-apps', // [CONFIRM REPO EXISTS]
    techBadges: ['ArgoCD 2.11+', 'ApplicationSet', 'AppProject', 'Helm 3'],
    whatYouGet: [
      'A bootstrap Application (the only manual kubectl apply you ever do), plus environment Applications for staging and production',
      'ApplicationSets with git generator — adding a new service is as simple as creating a directory under services/production/',
      'AppProjects that lock down what each environment can deploy to, with production sync windows that restrict deploys to business hours',
    ],
    whatItAssumes: [
      'ArgoCD 2.11+ installed in the target cluster (ApplicationSet is bundled since 2.6)',
      'A dedicated GitOps repository (separate from your application code) for cluster state',
      'Your services are packaged as Helm charts with environment-specific values files',
    ],
    programmingLanguages: ['YAML'],
    relatedService: {
      href: '/services/kubernetes-platform-engineering',
      label: 'Kubernetes Platform Engineering',
    },
    relatedCaseStudy: {
      href: '/work/pulsehealth-eks',
      label: 'PulseHealth EKS Case Study',
    },
    datePublished: '2025-05-01',
    files: argocdFiles,
  },
}

export const RESOURCE_LABELS: Record<ResourceSlug, string> = {
  'helm-chart-starter': 'Helm Chart Starter',
  'terraform-module-aws-eks': 'Terraform EKS Module',
  'github-actions-deploy-template': 'GitHub Actions Deploy Template',
  'argocd-app-of-apps': 'ArgoCD App-of-Apps',
}

export function getResourceOgMeta(slug: ResourceSlug) {
  const r = RESOURCES_DATA[slug]
  return {
    title: r.title,
    subtitle: r.subtitle,
    type: `RESOURCE · ${r.type.toUpperCase()}`,
    url: `${SITE_URL}/resources/${slug}`,
  }
}
