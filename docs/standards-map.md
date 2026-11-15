# 07 · Standards map

The standards this repo builds on, and where each one shows up.

A note on names: the certifications are **CNPA** (Certified Cloud Native Platform Engineering Associate) and **CNPE** (Certified Cloud Native Platform Engineer), both from the **CNCF** (Cloud Native Computing Foundation). If you heard "CNCP" or "CNCA", these are almost certainly what was meant.

## Platform engineering

### CNCF Platforms White Paper (TAG App Delivery)

The base text. It defines a platform, its attributes, the attributes of platform teams, common failure modes, how to measure success and the capability domains.

| Attribute from the paper | Where this repo applies it |
| --- | --- |
| Platform as a product | `leadership/strategy/platform-charter.md`: users, backlog, feedback, roadmap |
| User experience | One portal, consistent templates and docs |
| Documentation and onboarding | TechDocs in every template; time to first deploy as a metric |
| Self-service | Git-driven requests; self-service rate as a metric |
| Reduced cognitive load | One workload spec (`technical/platform/score/score.yaml`) |
| Optional and composable | Design rule 5 in `technical/02-reference-architecture.md` |
| Secure by default | Policies in `technical/platform/policies/`, enforced on the golden path |

### CNCF Platform Engineering Maturity Model

Five aspects, four levels. Use it to self-assess and to set next year's target. Do not aim for the top level everywhere; each level costs more.

| Aspect | Provisional | Operational | Scalable | Optimizing |
| --- | --- | --- | --- | --- |
| Investment | Voluntary or temporary | Dedicated team | Platform as product | Enabled ecosystem |
| Adoption | Erratic | Extrinsic push | Intrinsic pull | Participatory |
| Interfaces | Custom processes | Standard tooling | Self-service solutions | Integrated services |
| Operations | By request | Centrally tracked | Centrally enabled | Managed services |
| Measurement | Ad hoc | Consistent collection | Insights | Quantitative and qualitative |

Level names are from the CNCF model. Read the full descriptions in the source before assessing.

Self-assessment for the lab scenario:

| Aspect | Forja Norte today (assumed) | Target in 12 months | Phase that moves it |
| --- | --- | --- | --- |
| Investment | Provisional | Scalable | 0, 8, 12 |
| Adoption | Provisional | Operational to Scalable | 3, 7, 11 |
| Interfaces | Provisional | Scalable | 2, 3, 10 |
| Operations | Operational | Scalable | 1, 4, 5, 6 |
| Measurement | Provisional | Scalable | 7, 8, 12 |

### CNPA exam domains

| Domain | Weight | Phases in this lab |
| --- | --- | --- |
| Platform Engineering Core Fundamentals | 36% | 0, 1, 3 |
| Platform Observability, Security and Conformance | 20% | 5, 6 |
| Continuous Delivery and Platform Engineering | 16% | 1, 3 |
| Platform APIs and Provisioning Infrastructure | 12% | 10 |
| IDPs and Developer Experience | 8% | 2, 9 |
| Measuring your Platform | 8% | 7 |

Weights are from memory of the published curriculum. Confirm on the CNCF certification page before planning study time.

Related CNCF certifications that map to lab tools: Certified Backstage Associate (CBA), Certified Argo Project Associate (CAPA), GitOps Certified Associate (CGOA), Kyverno Certified Associate (KCA), OpenTelemetry Certified Associate (OTCA).

### Other platform references

| Reference | Use |
| --- | --- |
| Team Topologies | Platform team, enabling team and stream-aligned teams; thinnest viable platform |
| OpenGitOps principles | Declarative, versioned, pulled automatically, continuously reconciled (Phase 1) |
| Twelve-Factor App | Contract between the application and the platform (Phases 3, 10) |
| CNOE | Open reference implementation of an IDP (Phase 1) |

## Measurement

| Standard | Use | File |
| --- | --- | --- |
| DORA software delivery metrics | Delivery performance | `leadership/measurement/metrics-and-adoption.md` |
| SPACE | Productivity dimensions | same |
| DevEx | Feedback loops, cognitive load, flow | same |
| DX Core 4 | One-slide executive summary | same |

## Cost

| Standard | Use | File |
| --- | --- | --- |
| FinOps Framework | Inform, optimise, operate | `leadership/finops/finops-and-vendors.md` |
| FOCUS specification | Common schema for cloud, SaaS and AI billing data | `leadership/finops/cost-allocation-tags.yaml` |

## Security and compliance (Scenario A)

| Standard | Why it applies | Enforced by |
| --- | --- | --- |
| NIST SSDF (SP 800-218) | Secure development practices across the lifecycle | Golden-path pipeline, directives |
| SLSA | Build integrity and provenance levels | Signing and provenance in CI (Phase 5) |
| OpenSSF Scorecard | Repository hygiene checks | Scorecards |
| OWASP ASVS and SAMM | Application security requirements and programme maturity | Template defaults, scorecards |
| CIS Benchmarks, Kubernetes Pod Security Standards | Hardened runtime configuration | Kyverno policies |
| ISO/IEC 27001 | Information security management system | Directives map to Annex A controls |
| NIST Cybersecurity Framework 2.0 | Risk language for executives, includes Govern function | Quarterly report |
| IEC 62443 | Industrial automation security: zones and conduits between IT and plant | Environment model, `plant-edge` rules |
| ISA-95 | Layering between enterprise and plant systems | Domain model in the catalog |
| SOX IT general controls | Change management, access, segregation of duties for financial systems | GitOps promotion with second approver, evidence in Git |
| Data protection law (for example Mexico's LFPDPPP, GDPR where relevant) | Personal data in systems and test data | Data classification label, policy |
| NIST AI RMF, ISO/IEC 42001 | Governing AI use | `leadership/governance/ai-usage-policy.md` |

This table is a study aid. It is not legal or audit advice; scoping a real compliance programme is done with the company's security, legal and audit functions.

## Control traceability

The chain to be able to show for any control:

`standard clause → directive (leadership/governance/directives.md) → policy or pipeline check (technical/platform/policies/) → evidence (policy report, Git history, scorecard) → metric (pass rate)`

Phase 5 fills this chain for five controls end to end.
