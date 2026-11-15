# Platform charter · Forja Norte SEO

Fictional. Version 0.1, practice draft.

## Mission

Make it fast, safe and routine for any engineer at Forja Norte, employee or contractor, to deliver software that the business can rely on.

## Users

| User | What they need from the platform |
| --- | --- |
| Developer (employee or contractor) | Start a service in minutes, deploy without tickets, find docs and owners, know the rules up front |
| Tech lead | See the health and compliance of the team's services, onboard people quickly |
| Hub Leader | Adoption and quality by team and vendor, a channel to raise friction |
| Security and audit | Controls enforced by default and evidence without chasing teams |
| Finance | Spend by owner, forecast, licence utilisation |
| Executives | Delivery speed, stability, risk and cost, in one page per quarter |

## What the platform offers (scope)

1. Portal and software catalog.
2. One golden path per stack: SAP extensions, Microsoft (.NET and Azure), Java, Data.
3. Standard pipelines, environments and deployment.
4. Identity, secrets and policy guardrails.
5. Observability defaults and production-readiness scorecards.
6. AI capability: approved tools, MCP server catalog, shared skills.
7. Delivery, adoption and cost metrics.

## Out of scope

- Business applications themselves (ERP, shop-floor systems, customer portals). The platform helps build them.
- Deploying on behalf of teams through tickets.
- Plant control systems below the IT/OT boundary.

## Principles

1. **Developers are customers.** We research their needs, keep a public backlog and publish a roadmap.
2. **Adoption is earned.** The golden path must be easier than the alternative. Only security and compliance controls are mandatory.
3. **Same bar for everyone.** Employees and every vendor are measured with the same scorecards.
4. **Thin platform.** We own interfaces and standards and reuse providers behind them.
5. **Measure and publish.** Adoption, delivery, experience and cost are visible to everyone.
6. **Secure by default.** Controls live in templates and pipelines, not in documents.

## Operating model

| Ritual | Cadence | Purpose |
| --- | --- | --- |
| Platform planning | Every two weeks | Backlog priorities from user feedback and metrics |
| Hub Leaders sync | Weekly | Adoption blockers per stack |
| Office hours | Weekly | Open help for any team |
| Platform demo | Monthly | Show what shipped, hear reactions |
| Developer survey | Quarterly | Experience trend |
| Vendor QBRs | Quarterly | Delivery quality by vendor |
| Executive report | Quarterly | Outcomes, risks, investment |
| Roadmap review | Quarterly | Re-plan against results |

## Service levels (initial targets)

| Capability | Target |
| --- | --- |
| Portal availability | 99.5% in business hours |
| CI queue time, p90 | Under 5 minutes |
| Response to a platform support request | Same business day |
| New team onboarding | Under 1 day |

## Success measures

See `docs/01-scenario-options.md` (targets) and `platform/metrics/metrics-catalog.yaml` (definitions).

## Decision rights

See `governance/raci.md`. Technical decisions with lasting effect are recorded as ADRs in `governance/adr/`.
