# 03 · Tooling options

Options per layer, with what each is good for and what to watch. Prices are deliberately left out of this file; see `finops/licenses.csv` for the few that were verified and the date.

Status notes were checked on 2026-11-15. Re-check before quoting them.

## How to choose (applies to every layer)

Score each option 1 to 5 on the same six questions and record the result as an ADR:

1. Does it fit the stacks we already run (SAP, .NET/Azure, Java, Data)?
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
| Port, Cortex, OpsLevel | Commercial SaaS portals | Fast start, scorecards and self-service actions out of the box | Per-seat cost at 600 developers; data lives with the vendor |
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
| Azure Container Apps / App Service | Cloud PaaS | The realistic "Heroku" for a .NET and Azure organisation. Often the right answer for Tier 3 apps |
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

Dex is an open-source federated OpenID Connect provider (CNCF sandbox). It does not store users. It sits between the platform tools and the real identity sources and speaks OIDC to the tools on one side and LDAP, SAML, GitHub, GitLab, Microsoft or another OIDC provider on the other, through **connectors**.

Why it fits an IDP:

- One login for Backstage, Argo CD, Grafana and the Kubernetes API.
- Several identity sources at once. In Scenario A: employees through the corporate directory, each delivery vendor through its own connector. The group claim then drives what each population can do.
- Argo CD embeds Dex, so it is often already present.
- Token exchange lets CI jobs and agents trade an upstream token for a platform token without long-lived secrets.

| Option | When to prefer it |
| --- | --- |
| Dex | You already have identity providers and need a thin broker with connectors |
| Keycloak (CNCF) | You need to manage users, realms, fine-grained roles and admin UI yourself. Used by the CNOE reference stacks |
| Direct OIDC to Entra ID or Okta | One identity source, all tools support OIDC natively. Fewest moving parts |

Lab choice: Dex in front of a small LDAP directory whose groups simulate "employee" and "vendor" populations (Phase 4), with a note on how the Microsoft connector would replace it.

## Measurement: DX and alternatives

DX (getdx.com) is a developer-intelligence product that combines survey data with system data. It publishes the **DX Core 4** framework, which unifies DORA, SPACE and DevEx into four balanced dimensions: speed, effectiveness, quality and impact. Its effectiveness measure is the Developer Experience Index (DXI). Atlassian announced the acquisition of DX in September 2025 for about USD 1 billion and has since completed it.

| Option | Type | Good for | Watch out for |
| --- | --- | --- | --- |
| DX | Commercial | Survey plus system metrics, benchmarks, AI impact measurement, executive reporting | Now owned by a tool vendor; check neutrality and data terms |
| Apache DevLake | Open source | DORA metrics from Git, CI and issue trackers with Grafana dashboards. Free | You operate it; no surveys |
| Backstage scorecards / Tech Insights | Open source | Standards compliance per service inside the portal | Not delivery metrics |
| LinearB, Jellyfish, Swarmia, Faros | Commercial | Delivery analytics and investment allocation | Activity metrics are easy to misuse on individuals |
| A plain survey (Forms) | Free | The DevEx half: satisfaction, friction, cognitive load | Needs discipline: same questions every quarter |

Lab choice: DevLake for system metrics plus a ten-question survey template (Phase 7). `docs/04-metrics-and-adoption.md` shows how the DX Core 4 dimensions map onto what the lab collects, so the same story can be told whether or not the organisation buys DX.

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
| Cloud billing format | FOCUS (FinOps Open Cost and Usage Specification), version 1.4 ratified June 2026 | FOCUS column names in `finops/cost-allocation-tags.yaml` |
| Cost in pull requests | Infracost | Optional |

## AI in the SDLC

| Need | Options | Notes |
| --- | --- | --- |
| Coding assistants and agents | GitHub Copilot, Claude Code, SAP Joule for developers, Devin | Several will coexist. Standardise the rules, not the tool |
| Tool access for agents | Model Context Protocol servers | Register each approved server in the catalog with an owner and data classification |
| Spend and policy control | An AI gateway (for example LiteLLM) or the vendor's admin controls | Budgets per team, model allow-list, logging |
| Impact measurement | DX AI measurement, or cohort comparison in DevLake plus survey | See `docs/06-ai-capability.md` |
