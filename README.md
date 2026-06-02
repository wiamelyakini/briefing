# The Briefing

A end-to-end DevOps project — the app is a simple React news reader, the focus is the infrastructure around it.

## Pipeline

Jenkins automatically triggers on every push:

1. Code quality analysis — SonarQube + Quality Gate
2. Security scan — OWASP Dependency Check + Trivy
3. Docker image build & push to Docker Hub
4. Deployment to Kubernetes cluster (Amazon EKS)
5. Email notification on build result

## Stack

**CI/CD** — Jenkins, SonarQube, OWASP, Trivy  
**Infra** — Docker, Kubernetes (Amazon EKS), Terraform  
**Monitoring** — Prometheus, Grafana, Blackbox Exporter  
**App** — React, Hacker News API

## Structure

```
Jenkinsfile          # Declarative CI/CD pipeline
Dockerfile           # Container build
K8S/manifest.yml     # Kubernetes deployment & service
Terraform/           # Monitoring server provisioning
scripts/             # Tool installation scripts
```

## Author

Wiame EL YAKINI — [GitHub](https://github.com/wiameelyakini) · [LinkedIn](https://www.linkedin.com/in/wiame-el-yakini/)
