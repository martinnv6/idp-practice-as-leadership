# Engineering directives · Kestrel Parcel DPG

Fictional. Version 0.1, practice draft.

A directive is a rule that applies to every team that builds software, whether or not it uses a golden path. The golden paths satisfy all of them by default.

- **MUST**: mandatory. Deviation needs an approved exception (`leadership/governance/exception-process.md`).
- **SHOULD**: expected. Deviation is recorded in the service's docs.

## Service tiers

| Tier | Meaning | Examples |
| --- | --- | --- |
| 1 | Parcels stop moving or revenue stops if it fails | Parcel scanning and sortation, checkout |
| 2 | Important business process degraded | Customer tracking portal, billing |
| 3 | Internal convenience | Internal tools |

## Directives

### Ownership and catalog

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-001 | MUST | Every service is registered in the catalog with owner team, system, tier and lifecycle | Scorecard; Kyverno label policy | ISO 27001 asset management |
| DPG-DIR-002 | MUST | Every workload carries the labels `owner`, `cost-center`, `tier`, `data-classification` | `require-ownership-labels.yaml` | FinOps allocation |
| DPG-DIR-003 | SHOULD | Every service has docs in the repository, published in the portal | Scorecard | White paper: documentation |

### Source and change control

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-010 | MUST | All code and configuration lives in the organisation's source control | Catalog check | SSDF PS.1 |
| DPG-DIR-011 | MUST | Changes to the default branch go through a pull request reviewed by someone other than the author | Branch protection | PCI DSS, SSDF PW.7 |
| DPG-DIR-012 | MUST | Production changes are promoted through Git; nobody changes production by hand | Argo CD, cluster RBAC | PCI DSS change control |
| DPG-DIR-013 | MUST | For PCI-scope and Tier 1 systems the approver of a production promotion is not the author | Promotion repository rules | Segregation of duties |
| DPG-DIR-014 | MUST | Tier 1 hub deployments happen in agreed windows with a tested rollback | Sync windows, rollout policy | Operational safety |

### Build and quality

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-020 | MUST | Builds run in the standard pipeline, not on a workstation | Image provenance check | SLSA |
| DPG-DIR-021 | MUST | Unit tests run on every pull request; coverage on new code meets the stack's threshold (default 80%) | CI quality gate | SSDF PW.8 |
| DPG-DIR-022 | SHOULD | Tier 1 and 2 services have integration, smoke and performance tests in the pipeline | Scorecard | |
| DPG-DIR-023 | SHOULD | Services follow twelve-factor configuration: no environment-specific builds | Template | |

### Security and supply chain

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-030 | MUST | No secrets in source. Secrets come from the secret store at runtime | Secret scanning; External Secrets | ISO 27001, SSDF |
| DPG-DIR-031 | MUST | Images come from the approved registry and are signed by the pipeline | `restrict-image-registries.yaml`, verify-image policy | SLSA |
| DPG-DIR-032 | MUST | Dependency and image scanning runs on every build. Critical findings block release; high findings are fixed within 30 days | CI gate, scanner SLA report | SSDF RV |
| DPG-DIR-033 | MUST | An SBOM is produced for every release | CI | SSDF PS.3 |
| DPG-DIR-034 | MUST | Containers run as non-root, with resource requests and limits, and no privileged mode | `baseline-pod-security.yaml`, `require-requests-limits.yaml` | CIS, Pod Security Standards |
| DPG-DIR-035 | MUST | Namespaces default to deny-all network policy; hub-edge traffic uses approved network paths only | Namespace template | ISO 27001 network controls |

### Identity and access

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-040 | MUST | Access to platform tools is through single sign-on with group-based roles. No shared accounts | Dex, tool configuration | ISO 27001 access control |
| DPG-DIR-041 | MUST | Contractor access is tied to the vendor group and ends when the person leaves the engagement | Connector per vendor, access review | PCI DSS access control |
| DPG-DIR-042 | MUST | Access to production is reviewed quarterly by the owning team | Access report | PCI DSS |

### Operations

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-050 | MUST | Tier 1 and 2 services emit metrics, logs and traces through the standard telemetry pipeline and define at least one SLO | Scorecard | |
| DPG-DIR-051 | MUST | Incidents of severity 1 and 2 get a blameless postmortem within five working days | Postmortem register | |
| DPG-DIR-052 | SHOULD | Tier 1 services test recovery at least twice a year | DR calendar | Continuity |

### Data

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-060 | MUST | Every service declares a data classification: public, internal, confidential, restricted | Label policy | ISO 27001 |
| DPG-DIR-061 | MUST | Personal and restricted data is not used in non-production environments unless masked | Review; data-platform controls | Data protection law |

### AI

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-070 | MUST | Only approved AI tools and registered MCP servers are used with company code or data | Catalog, managed settings | AI usage policy |
| DPG-DIR-071 | MUST | A human reviews and is accountable for every merged change, whoever wrote it | Branch protection | NIST AI RMF |
| DPG-DIR-072 | MUST | Restricted data is never sent to an AI tool outside approved boundaries | Gateway, policy | |
| DPG-DIR-073 | SHOULD | Repositories include agent instructions so agents follow the team's conventions | Template | |

### Cost

| ID | Level | Directive | Enforced by | Supports |
| --- | --- | --- | --- | --- |
| DPG-DIR-080 | MUST | Every cloud resource is tagged with the allocation keys in `leadership/finops/cost-allocation-tags.yaml` | Policy | FinOps |
| DPG-DIR-081 | SHOULD | Non-production environments scale down outside working hours | Scheduler | FinOps |

## Vendors

Contracts with delivery vendors reference this document. The same directives, thresholds and scorecards apply to vendor teams and internal teams.

## Change process

Directives change by pull request to this file, reviewed by the Head of Developer Platform, Security and at least two Guild Leads. New MUST directives start as SHOULD for one quarter, with the pass rate measured, before they are enforced.
