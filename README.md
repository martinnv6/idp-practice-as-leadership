# IDP Reference Lab

A practice repository for designing, building and measuring an **Internal Developer Platform (IDP)** end to end: the product thinking, the reference architecture, the policies, the adoption metrics and the money.

It is a study and practice project. The company in it, **Forja Norte**, is fictional. Nothing here describes a real employer or client, and every number marked `ASSUMPTION` is a placeholder to replace with real quotes or measurements.

## What is in here

| Path | What it holds |
| --- | --- |
| [`docs/00-master-plan.md`](docs/00-master-plan.md) | The plan: 12 build phases, each with a goal, steps, acceptance criteria and the interview question it lets you answer |
| [`docs/01-scenario-options.md`](docs/01-scenario-options.md) | Four industry scenarios (steel manufacturing is the default) with the engineering department, stacks and regulations of each |
| [`docs/02-reference-architecture.md`](docs/02-reference-architecture.md) | The 13 CNCF platform capabilities mapped to concrete tools for the lab |
| [`docs/03-tooling-options.md`](docs/03-tooling-options.md) | Options per layer: portals, orchestrators, Heroku-style PaaS, identity (Dex), metrics (DX) |
| [`docs/04-metrics-and-adoption.md`](docs/04-metrics-and-adoption.md) | How to prove adoption, usage and impact: funnel, DORA, SPACE, DevEx, DX Core 4, AI metrics |
| [`docs/05-finops-and-vendors.md`](docs/05-finops-and-vendors.md) | Cost model, showback, licence comparison method, vendor management |
| [`docs/06-ai-capability.md`](docs/06-ai-capability.md) | Agents, skills and MCP servers as a governed platform capability |
| [`docs/07-standards-map.md`](docs/07-standards-map.md) | CNCF white paper, maturity model, CNPA/CNPE domains and the security and compliance standards behind the policies |
| [`docs/08-glossary.md`](docs/08-glossary.md) | Terms, including the three different things people call "DEX" |
| [`docs/references.md`](docs/references.md) | Sources, with the date each was checked |
| [`governance/`](governance/) | Platform charter, engineering directives, exception process, RACI, ADRs |
| [`platform/`](platform/) | Starter configuration: Backstage catalog and template, Kyverno policies, Dex config, Score workload, scorecards, metrics catalog |
| [`finops/`](finops/) | Cost templates (CSV) and a small script that computes 3-year TCO per scenario |
| [`lab/`](lab/) | How to run the lab locally, phase by phase |

## How to use it

1. Read `docs/01-scenario-options.md` and keep or change the default scenario.
2. Read `docs/00-master-plan.md`. Phase 0 is already done by this repo; Phase 1 is the first one that needs Docker.
3. Work one phase at a time. Each phase ends with something you can show and a number you can quote.
4. Record every real decision as an ADR in `governance/adr/`.

## Status

| Phase | State |
| --- | --- |
| 0. Scenario, charter, plan | Done (this commit) |
| 1–12 | Not started |

The files under `platform/` are **starter templates that have not been run against a cluster yet**. They pass a YAML syntax check and nothing more. Each one is validated in the phase that uses it.

## Foundations

The plan follows the CNCF TAG App Delivery *Platforms White Paper* and *Platform Engineering Maturity Model*, which are also the base of the CNPA and CNPE certifications. See [`docs/07-standards-map.md`](docs/07-standards-map.md).
