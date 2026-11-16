# Appendix · Build plan (optional)

This is the hands-on track: build a small but complete IDP for Kestrel Parcel on a laptop, one phase at a time. Its purpose in this repo is understanding. A leader does not need to build all of it, but should be able to explain what each phase delivers and why it matters.

The leadership track is separate: `leadership/03-practice-plan.md`. Phases 0 and 12 below are leadership work and are kept here only so the phase numbering stays complete.

## Principles for the lab

- **Working system first, depth second.** Phase 1 produces a running platform in minutes; later phases replace or deepen one piece at a time.
- **Every phase ends with a demo and a number.** If there is nothing to show or measure, the phase is not done.
- **Write the decision down.** Each real choice becomes an ADR in `leadership/governance/adr/`.
- **Simulate the organisation, not only the technology.** Two fake teams (one "employee", one "vendor") use the platform so that adoption, policy and cost have something to measure.

## Prerequisites

| Need | Detail |
| --- | --- |
| Machine | Linux, macOS or Windows with WSL2. 16 GB RAM recommended; 8 GB works for Phases 1 to 5 only |
| Docker | Docker Engine or Docker Desktop, 4 CPUs and 8 GB assigned |
| CLI tools | `kubectl`, `helm`, `idpbuilder`, `git`. Later: `kyverno`, `cosign`, `trivy`, `score-k8s` |
| Accounts | None required. A GitHub account is optional for Phase 4 (GitHub connector) |

## Phase overview

| Phase | Name | CNCF capability | Maturity aspect moved | Effort |
| --- | --- | --- | --- | --- |
| 0 | Scenario, charter, plan | (product) | Investment | Done |
| 1 | Foundation cluster and GitOps | Infrastructure, delivery | Operations | 0.5 day |
| 2 | Portal and catalog | Web portals | Interfaces | 1 day |
| 3 | Golden path #1 (Java service) | Templates, build, delivery, artifacts | Interfaces, Adoption | 2 days |
| 4 | Identity and access with Dex | Identity and secrets | Operations | 1 day |
| 5 | Guardrails and supply chain | Security | Operations | 1.5 days |
| 6 | Observability and SLOs | Observability | Operations | 1 day |
| 7 | Measurement: adoption, DORA, experience | (measurement) | Measurement | 1.5 days |
| 8 | FinOps: showback and licence model | (cost) | Investment, Measurement | 1 day |
| 9 | AI capability: agents, skills, MCP | (AI) | Interfaces, Adoption | 1.5 days |
| 10 | PaaS contrast and a data capability | APIs, data services | Interfaces | 1.5 days |
| 11 | Golden path #2 | Templates | Adoption | 1.5 days |
| 12 | Quarterly executive report | (product) | Measurement, Investment | 0.5 day |

Total: about 15 working days at a few hours each. Phases 1 to 3 plus 7 give the minimum story worth telling.

---

## Phase 0 · Scenario, charter, plan (done)

**Goal.** Decide who the platform is for and how success is judged before any tool is installed.

**Delivered in this repo**

- Scenario and department: `leadership/02-scenario.md`
- Charter: `leadership/strategy/platform-charter.md`
- Directives and exception process: `leadership/governance/directives.md`, `leadership/governance/exception-process.md`
- Metric definitions: `leadership/measurement/metrics-catalog.yaml`
- Cost templates: `leadership/finops/`

**You can now answer:** "How would you approach a platform initiative?" (the seven steps, with the scenario as the worked example).

---

## Phase 1 · Foundation cluster and GitOps

**Goal.** A local cluster where every change arrives through Git.

**Steps**

1. Install Docker and `idpbuilder` (see `technical/appendix/lab/README.md`).
2. Run `idpbuilder create`. It creates a kind cluster with Argo CD, Gitea and an ingress controller.
3. Log in to Argo CD and Gitea with `idpbuilder get secrets`.
4. Create four namespaces per fake team (`dev`, `staging`, `prod`, `hub-edge`) from a Git repository that Argo CD watches. Team names: `hub-sortation` (employees) and `route-planning` (vendor "Altos Delivery").
5. Record ADR-0003: why GitOps is the only way to change an environment.

**Acceptance criteria**

- `kubectl get applications -n argocd` shows all applications Synced and Healthy.
- Deleting a namespace by hand is reverted by Argo CD within its sync interval.
- A new team namespace is created by merging one file, with no `kubectl` by a human.

**Number to capture.** Time from merge to namespace ready.

**You can now answer:** "How do you give auditors a change trail without slowing teams down?"

---

## Phase 2 · Portal and catalog

**Goal.** One place where anyone can see what exists, who owns it and how healthy it is.

**Steps**

1. Add Backstage through the CNOE reference stack (`idpbuilder create -p <stack>`), or run Backstage locally with `npx @backstage/create-app`.
2. Load `technical/appendix/platform/catalog/org.yaml`, `domains.yaml` and `example-component.yaml` as catalog locations.
3. Check that the DPG team, the four Guild Leads, the two delivery teams and the vendor group all appear, with ownership links.
4. Enable TechDocs for one component.
5. Record ADR-0001 as accepted or changed (portal choice).

**Acceptance criteria**

- Every Component has an owner, a system, a lifecycle and a tier annotation.
- Searching the portal for "route" finds the vendor team's service and its owner.
- Catalog files live in Git; nobody registers entities by hand in the UI.

**Number to capture.** Share of services with a valid owner (the first adoption metric: catalog coverage).

**You can now answer:** "What is the first thing you would build, and why?" (Visibility: you cannot improve or govern what you cannot list.)

---

## Phase 3 · Golden path #1: Java service

**Goal.** A developer goes from nothing to a running, compliant service without asking anyone.

**Steps**

1. Register `technical/appendix/platform/templates/java-service/template.yaml` in Backstage.
2. Write the skeleton it publishes: a minimal ASPJava service, Dockerfile or buildpack, CI workflow, Kubernetes manifests or `score.yaml`, `catalog-info.yaml`, docs folder.
3. CI: build, unit tests, coverage threshold, image build, push to the Gitea registry.
4. Delivery: the template also commits an Argo CD Application so the service deploys to `dev` on merge and is promoted to `staging` by pull request.
5. Run the template twice: once as the employee team, once as the vendor team.
6. Write the exit: a short page that says what a team must still satisfy if it does not use the path (the directives marked MUST).

**Acceptance criteria**

- Time from clicking "Create" to a 200 response in `dev` is under 30 minutes on a warm cluster.
- The new service appears in the catalog automatically with owner, tier and docs.
- No manual step is performed by the platform team.
- A failing unit test blocks the image from being published.

**Numbers to capture.** Time to first deploy; number of manual steps (target zero); lead time for a one-line change.

**You can now answer:** "What is a golden path?" and "How do you get contractors to follow a standard?" (The standard is the template and the pipeline; following it is easier than not.)

---

## Phase 4 · Identity and access with Dex

**Goal.** One login everywhere, and permissions that follow the group a person belongs to.

**Steps**

1. Deploy a small OpenLDAP with four groups and four users, then Dex with `technical/appendix/platform/identity/dex/config.yaml`. (Dex's built-in static users carry no group claim, so a directory is needed to practise group-based access.)
2. Point Backstage, Argo CD and Grafana at Dex as their OIDC provider.
3. Map groups to roles: `dpg-platform` is admin; `team-*` can deploy to its own namespaces; `vendor-*` can deploy to `dev` and `staging` and can only propose changes to `prod`.
4. Optional: add the GitHub connector and log in with a real account.
5. Write down how the corporate-directory connector would replace the lab directory.

**Acceptance criteria**

- The vendor user can sync their application in `dev` and is refused in `prod`.
- Removing a user from a group removes access at next login, in every tool.
- No tool has local user accounts other than a break-glass admin.

**Number to capture.** Count of tools behind SSO out of total.

**You can now answer:** "How do you manage access for contractors from several vendors?"

---

## Phase 5 · Guardrails and supply chain

**Goal.** The directives are enforced by the platform, and the golden path already passes them.

**Steps**

1. Install Kyverno. Apply the policies in `technical/appendix/platform/policies/kyverno/` in **Audit** mode.
2. Read the policy reports. Fix the golden path until it produces zero violations.
3. Switch the security policies to **Enforce** for `prod` and `hub-edge` only.
4. Add Trivy scanning and an SBOM (Syft) to the CI workflow. Sign the image with cosign and add a verify-image policy.
5. Run the exception process once: one team asks for a time-boxed exception; record it as in `leadership/governance/exception-process.md`.
6. Map each policy to its directive and to the standard it supports (`docs/standards-map.md`).

**Acceptance criteria**

- A Deployment without owner and cost labels is rejected in `prod` with a message that tells the developer how to fix it.
- An unsigned image is rejected in `prod`.
- Golden-path services have zero policy violations; the hand-made "legacy" service shows several.
- The exception is visible in Git with an owner and an expiry date.

**Numbers to capture.** Policy pass rate by team (employee vs. vendor); number of open exceptions and their age.

**You can now answer:** "How do you measure contractor quality objectively?" and "How do you balance mandate and autonomy?"

---

## Phase 6 · Observability and SLOs

**Goal.** Every service born from the golden path is observable without extra work.

**Steps**

1. Install the Prometheus and Grafana stack and the OpenTelemetry Collector through Argo CD.
2. Add OpenTelemetry auto-instrumentation to the template.
3. Generate a default dashboard and one availability SLO per service from the template.
4. Link the dashboard from the catalog entity.
5. Run a failure drill: break a deployment, watch the alert, roll back, write a short blameless postmortem from `leadership/governance/postmortem-template.md`.

**Acceptance criteria**

- A newly created service has a dashboard and an SLO with no manual configuration.
- The drill produces a postmortem with a timeline and at least one action item.

**Numbers to capture.** Time to detect and time to recover in the drill.

**You can now answer:** "How do you run post-incident improvement?" and "Why do the hubs care about rollback time?"

---

## Phase 7 · Measurement: adoption, DORA, experience

**Goal.** Prove with data whether the platform is used and whether it helps. This is the phase that matters most for the role.

**Steps**

1. Install Apache DevLake. Connect it to Gitea (or GitHub) and to the CI and deployment data.
2. Generate history: make 20 to 30 changes across three services, two on the golden path and one "legacy" service deployed by hand, including a few failed deployments and rollbacks.
3. Build the dashboards defined in `leadership/measurement/metrics-catalog.yaml`:
   - Adoption funnel (aware, onboarded, active weekly, retained).
   - DORA metrics per service, golden path vs. legacy.
   - Scorecard pass rate per team.
4. Run the survey in `leadership/measurement/devex-survey.md` with two or three people (or answer it yourself as each persona) to exercise the process.
5. Fill the metric baseline table and write one page: "What the data says and what I would do next".

**Acceptance criteria**

- Each metric in the catalog has a definition, a data source and an owner, and shows a value.
- The comparison golden path vs. legacy is visible on one screen.
- At least one counter-metric is shown next to each speed metric.

**Numbers to capture.** All of them. This is the baseline for the executive report in Phase 12.

**You can now answer:** "How do you measure adoption?", "How do you use DORA, SPACE and DevEx?" and "How would you know the platform is failing?"

---

## Phase 8 · FinOps: showback and licence model

**Goal.** Know what the platform costs, who consumes it and what each tooling option would cost over three years.

**Steps**

1. Install OpenCost. Confirm that cost is allocated by the labels in `leadership/finops/cost-allocation-tags.yaml`.
2. Produce a showback report per team and environment.
3. Fill `leadership/finops/licenses.csv` with real list prices (several are pre-filled with sources and dates; the rest are blank on purpose).
4. Replace the assumptions in `leadership/finops/scenarios.csv` and run `python3 leadership/finops/tco.py`.
5. Fill `leadership/finops/budget-template.csv` for one year (CapEx, OpEx, licences).
6. Draft one vendor scorecard and one QBR agenda from `leadership/vendors/vendor-scorecard.md`.

**Acceptance criteria**

- At least 90% of cluster cost is allocated to a team.
- The TCO comparison shows cost per developer per month for each scenario, with people cost included.
- The unit costs "cost per deployment" and "cost per active developer" are calculated.

**You can now answer:** "How would you justify the investment?", "Build or buy the portal?" and "How do you manage a vendor that underperforms?"

---

## Phase 9 · AI capability: agents, skills, MCP

**Goal.** Treat AI as a governed capability of the platform, and measure it like any other.

**Steps**

1. Register two MCP servers and one skills repository as catalog entities with owner, data classification and approval status (`technical/appendix/platform/catalog/ai-capabilities.yaml`).
2. Add an agent instructions file and a skills folder to the golden-path skeleton, so every new service is agent-ready.
3. Apply the rules in `leadership/governance/ai-usage-policy.md`: which data may be sent to which tool, where a human must approve, what is logged.
4. Optional: run an AI gateway with a budget per team and a model allow-list.
5. Measure with two cohorts over the same tasks (with and without the agent): time from ticket to first pull request, review time, rework. Record honestly how small the sample is.

**Acceptance criteria**

- The approved agents, skills and MCP servers are discoverable in the portal.
- A new service contains agent instructions out of the box.
- AI usage and spend can be attributed to a team.

**You can now answer:** "How do you take AI beyond individual assistants?" and "How do you measure its impact and control its risk?"

---

## Phase 10 · PaaS contrast and a data capability

**Goal.** Understand the Heroku experience by using it, and offer one self-service backing service.

**Steps**

1. Deploy the Phase 3 service on a Heroku-style PaaS (Dokku locally, or Cloud Native Buildpacks plus Knative). Note every step and how long it took.
2. Compare with the golden path on: steps, time, what the developer must know, policy coverage, cost model, exit cost.
3. Accept or change ADR-0002 (which workload tiers go to a PaaS).
4. Add a PostgreSQL capability with CloudNativePG, requested through Score or a Crossplane or kro abstraction: the developer asks for "a database, small" and receives a connection secret.

**Acceptance criteria**

- The comparison table is filled with measured values.
- A developer gets a database by committing one short resource definition.

**You can now answer:** "Why not just buy a PaaS?" and "What is a platform API?"

---

## Phase 11 · Golden path #2

**Goal.** Show that the platform is one product for several stacks.

**Steps**

1. Build a second template (TypeScript service or a data pipeline) reusing the same CI building blocks, policies and catalog model.
2. Measure how much was reused versus rewritten.
3. Write one page on the mobile stack: which platform capabilities apply unchanged (catalog, scorecards, identity, metrics, AI rules) and which do not (runtime, release through app stores).

**Acceptance criteria**

- Second template passes the same policies with no policy changes.
- Reuse percentage is written down.

**You can now answer:** "How do you serve several stacks with one platform?"

---

## Phase 12 · Quarterly executive report

**Goal.** Tell the story to a non-technical committee in ten minutes.

**Steps**

1. Fill `leadership/measurement/quarterly-report-template.md` with the lab's real numbers.
2. Self-assess with the CNCF maturity model (`docs/standards-map.md`) and state the target level per aspect for the next year.
3. Rehearse it aloud in ten minutes.

**Acceptance criteria**

- One page. Outcomes first, in time, cost and risk. Tools appear only in the appendix.
- Three asks of the committee, each with a cost and an expected result.

**You can now answer:** "What would you show me in twelve months?"

---

## Risks to the lab itself

| Risk | Mitigation |
| --- | --- |
| The laptop cannot run everything at once | Phases are independent after Phase 3. Stop the stacks you are not using. |
| Tool versions change and a template breaks | Templates are marked untested. Pin versions when a phase is completed and note them in an ADR. |
| The lab becomes a tool tour | Each phase has an acceptance number. If a phase adds no number, cut it. |
| Synthetic data proves nothing | Say so. The lab demonstrates the method and the instrumentation, not real organisational results. |
