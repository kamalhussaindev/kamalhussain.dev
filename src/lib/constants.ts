export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kamalhussain.dev'

export const SITE_NAME = 'Kamal Hussain'

export const SITE_DESCRIPTION =
  'Freelance DevOps engineer specializing in Kubernetes, CI/CD pipelines, AWS Terraform infrastructure, and observability. Based in Rawalpindi, Pakistan — working with clients globally.'

export const AUTHOR = {
  name: 'Kamal Hussain',
  email: 'kamal@kamalhussain.dev',
  location: 'Rawalpindi, Pakistan',
  upwork: 'https://www.upwork.com/freelancers/kamalh',
  github: 'https://github.com/kamalhussaindevops',
  linkedin: 'https://www.linkedin.com/in/kamal-hussain-cloud-engineer/',
  twitter: 'https://x.com/nxt_analyst',
  calcom: 'https://cal.com/kamal-hussain-jxas5y',
} as const

export const SERVICE_SLUGS = [
  'kubernetes-platform-engineering',
  'cicd-pipeline-engineering',
  'aws-terraform-infrastructure',
  'observability-engineering',
  'wordpress-web-development',
  'devops-consulting-audits',
] as const

export const SERVICE_LABELS: Record<(typeof SERVICE_SLUGS)[number], string> = {
  'kubernetes-platform-engineering': 'Kubernetes Platform Engineering',
  'cicd-pipeline-engineering': 'CI/CD Pipeline Engineering',
  'aws-terraform-infrastructure': 'AWS Cloud Infrastructure with Terraform',
  'observability-engineering': 'Observability Engineering',
  'wordpress-web-development': 'WordPress & Web Development',
  'devops-consulting-audits': 'DevOps Consulting & Audits',
}
