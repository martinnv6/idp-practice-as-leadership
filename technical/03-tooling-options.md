# 03 · Tooling options

Options per layer, with what each is good for and what to watch. Prices are deliberately left out of this file; see `leadership/finops/licenses.csv` for the few that were verified and the date.

Status notes were checked on 2026-11-15. Re-check before quoting them.

## How to choose (applies to every layer)

Score each option 1 to 5 on the same six questions and record the result as an ADR:

1. Does it fit the stacks we already run (Java, TypeScript, Python and Data, Mobile)?
2. Can contractors use it on day one without a week of training?
3. What does it cost in licences **and** in people to operate?
4. How hard is it to leave (data export, open formats, open source)?
5. Does it produce the evidence auditors ask for?
6. Is the vendor or project healthy (roadmap, releases, foundation status)?

## Portal and catalog

| Option | Type | Good for | Watch out for |
| --- | --- | --- | --- |
| Backstage | Open source, CNCF | Full control, large plugin ecosystem, the de facto standard and the base of the Certified Backstage Associate exam | It is a framework: you build and operate it. Budget engineers, not licences |
| Managed Backstage (Roadie, Red Hat Developer Hub, Spotify Portal) | Commercial on top of Backstage | Backstage without the upkeep | Plugin freedom varies; pricing per developer |
| Port, Cortex, OpsLevel | Commercial SaaS portals | Fast start, scorecards and self-service actions out of the box | Per-seat cost at 420 developers; data lives with the vendor |
| Atlassian Compass | Commercial, part of Atlassian | Organisations already standardised on Jira and Confluence | Less flexible templates; ties the catalog to one vendor |

Lab choice: Backstage. It is free to run locally, and learning it teaches the concepts every other portal reuses (catalog entities, templates, scorecards, TechDocs).

## Platform orchestration and provisioning

| Option | What it is | Good for | Watch out for |
| --- | --- | --- | --- |
| Argo CD + Helm/Kustomize | GitOps delivery | Simple, proven, what the lab starts with | Not an abstraction by itself; developers still see Kubernetes YAML unless templates hide it |
| Crossplane | Kubernetes-native control plane for cloud resources | "Platform API" for databases, queues and cloud services with compositions | Learning curve; needs careful composition design |
| kro (Kube Resource Orchestrator) | Lightweight resource grouping | Small abstractions without the weight of Crossplane | Younger project |
| Kratix | Framework for "promises" (platform as a service catalog) | Teams that want an explicit marketplace of capabilities | Smaller community |
| Score | Workload specification (CNCF sandbox) | One developer-facing file that renders to Kubernetes, Docker Compose or an orchestrator | A spec, not a runtime. Needs an implementation behind it |
| Humanitec | Commercial platform orchestrator | Dynamic configuration per environment, strong RBAC | Commercial; another control plane to depend on |
| Terraform or OpenTofu modules | Infrastructure as code | Existing skills and modules | Ticket-driven habits survive unless it is wrapped in self-service |

Lab choice: Argo CD first (Phase 3), Score for the workload spec, then Crossplane or kro for one database capability (Phase 10).

## Heroku-style PaaS: the developer-experience benchmark

Heroku matters to an IDP for one reason: it set the standard for what self-service feels like. `git push`, a buildpack turns source into a running app, a database is one command, a pull request gets its own review app, and promotion between stages is one click. Every golden path is an attempt to give that experience inside enterprise constraints.

**Status.** On 6 February 2026 Heroku announced a move to a "sustaining engineering" model: security and stability work continues, no new features, and no new Enterprise contracts for new customers. Existing customers keep running and renewing. For this lab that means Heroku is a model to study and a contrast case, not a strategic runtime to adopt.

| Option | Type | Why it is in the list |
| --- | --- | --- |
| Heroku | Hosted PaaS | The reference experience. Use the free concepts (twelve-factor, buildpacks, pipelines, review apps, add-ons) as the checklist for your golden path |
| Cloud Foundry / Korifi | Open source PaaS; Korifi runs the `cf push` experience on Kubernetes | Closest to Pivotal Cloud Foundry. Good if the organisation already knows `cf push` |
| Cloud container PaaS (for example Cloud Run, Azure Container Apps, App Runner) | Cloud PaaS | The realistic "Heroku" inside a cloud the company already uses. Often the right answer for Tier 3 apps |
| Cloud Native Buildpacks (`pack`, kpack) | CNCF project | The buildpack idea without the PaaS: source to image with no Dockerfile. Reusable inside any golden path |
| Dokku, Coolify, CapRover | Self-hosted mini-PaaS | Runs on one machine. Useful in the lab to feel the Heroku flow in an afternoon |
| Knative | Serverless on Kubernetes | Scale-to-zero services with a simple developer contract |
| OpenShift | Enterprise Kubernetes platform | Bundles build, registry, pipelines and console with vendor support |
| Render, Fly.io, Railway | Hosted PaaS | Heroku successors for small products; rarely acceptable for regulated enterprise workloads |

The real decision is not "Heroku or Kubernetes". It is **how much abstraction per workload tier**:

- Tier 3 internal apps: a managed PaaS is usually cheaper than running them on the shared cluster.
- Tier 1 and 2 services: golden path on Kubernetes, because they need the policy, network and rollout controls.

Phase 10 of the plan deploys the same application both ways and records the comparison as ADR-0002.

## Identity: Dex

Dex is an open-source federated OpenID Connect provider (CNCF sandbox). It does not store users. It sits between the platform tools and the real identity sources and speaks OIDC to the tools on one side and LDAP, SAML, GitHub, GitLab or another OIDC provider on the other, through **connectors**.

Why it fits an IDP:

- One login for Backstage, Argo CD, Grafana and the Kubernetes API.
- Several identity sources at once. For Kestrel Parcel: employees through the corporate directory, each delivery vendor through its own connector. The group claim then drives what each population can do.
- Argo CD embeds Dex, so it is often already present.
- Token exchange lets CI jobs and agents trade an upstream token for a platform token without long-lived secrets.

| Option | When to prefer it |
| --- | --- |
| Dex | You already have identity providers and need a thin broker with connectors |
| Keycloak (CNCF) | You need to manage users, realms, fine-grained roles and admin UI yourself. Used by the CNOE reference stacks |
| Direct OIDC to the corporate identity provider | One identity source, all tools support OIDC natively. Fewest moving parts |

Lab choice: Dex in front of a small LDAP directory whose groups simulate "employee" and "vendor" populations (Phase 4), with a note on how the corporate-directory connector would replace it.

## Measurement tooling

The framework (DX Core 4) and how a leader uses it are in `leadership/measurement/dx-core-4.md`. This section is only about where the data comes from.

| Option | Type | Provides | Watch out for |
| --- | --- | --- | --- |
| DX | Commercial | Core 4 dashboards, the DXI survey, benchmarks, AI impact measurement | Per-developer cost; owned by a tool vendor (Atlassian) |
| Apache DevLake | Open source | DORA metrics from Git, CI and issue trackers | You operate it; no surveys |
| Backstage scorecards / Tech Insights | Open source | Standards compliance per service | Not delivery metrics |
| A plain survey form | Free | The experience half: satisfaction, friction, cognitive load | Needs the same questions every quarter |

Lab choice: DevLake for system metrics plus the survey in `leadership/measurement/devex-survey.md`.

## Policy, security and supply chain

| Need | Options | Lab choice |
| --- | --- | --- |
| Admission policy | Kyverno, OPA Gatekeeper, Kubernetes ValidatingAdmissionPolicy | Kyverno |
| Policy checks in CI | Conftest (OPA), Kyverno CLI, Checkov | Kyverno CLI |
| Image scanning and SBOM | Trivy, Grype, Syft | Trivy and Syft |
| Signing and provenance | Sigstore cosign, SLSA provenance | cosign |
| Secrets | External Secrets Operator with Key Vault or OpenBao | External Secrets with a local fake store |
| Code scanning | CodeQL, SonarQube, Semgrep | SonarQube community or Semgrep |

## Observability and cost

| Need | Options | Lab choice |
| --- | --- | --- |
| Telemetry standard | OpenTelemetry | OpenTelemetry |
| Metrics, logs, traces | Prometheus, Loki, Tempo with Grafana; or commercial APM | Prometheus and Grafana |
| Kubernetes cost allocation | OpenCost (CNCF), Kubecost | OpenCost |
| Cloud billing format | FOCUS (FinOps Open Cost and Usage Specification), version 1.4 ratified June 2026 | FOCUS column names in `leadership/finops/cost-allocation-tags.yaml` |
| Cost in pull requests | Infracost | Optional |

## AI in the SDLC

| Need | Options | Notes |
| --- | --- | --- |
| Coding assistants and agents | GitHub Copilot, Claude Code, Cursor, Devin | Several will coexist. Standardise the rules, not the tool |
| Tool access for agents | Model Context Protocol servers | Register each approved server in the catalog with an owner and data classification |
| Spend and policy control | An AI gateway (for example LiteLLM) or the vendor's admin controls | Budgets per team, model allow-list, logging |
| Impact measurement | DX AI measurement, or cohort comparison in DevLake plus survey | See `leadership/ai/ai-capability.md` |
