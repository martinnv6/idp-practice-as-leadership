# 05 · FinOps and vendor management

How the platform's money is modelled, allocated and defended, and how suppliers are managed. Templates are in `leadership/finops/`.

## Three kinds of cost

| Kind | Examples | Template |
| --- | --- | --- |
| Licences and subscriptions | Source control seats, AI assistant seats and credits, portal SaaS, observability, security scanning | `leadership/finops/licenses.csv` |
| Infrastructure | Clusters, CI runners, registries, storage, network | `leadership/finops/cost-allocation-tags.yaml` plus OpenCost |
| People | Platform engineers, Guild Leads' time, vendor delivery staff | `leadership/finops/scenarios.csv` |

People are usually the largest line and the one most often left out. A "free" open-source portal that needs two engineers is not free. The TCO script always includes people.

## Build, buy or blend

`leadership/finops/scenarios.csv` compares three shapes over three years:

| Scenario | Shape | When it tends to win |
| --- | --- | --- |
| Build | Open-source portal and tooling, operated in-house | Strong platform engineers available; need for deep customisation; many developers (per-seat pricing hurts) |
| Buy | Commercial SaaS portal and metrics | Small platform team; need results in one quarter |
| Blend | Managed open-source core plus selected commercial pieces | Most enterprises: buy what is undifferentiated, build the golden paths |

Run `python3 leadership/finops/tco.py`. All figures shipped in the CSV are marked ASSUMPTION and exist only so the script runs.

Outputs to quote: three-year TCO, cost per developer per month, and the break-even number of developers at which building becomes cheaper than per-seat licences.

## Licence comparison method

For each tool category, fill one row per candidate in `leadership/finops/licenses.csv`:

1. **Pricing unit.** Per user, per committer, per host, per GB, per credit. Different units are the main source of surprises.
2. **Who counts as a user.** With many contractors, ask whether external collaborators need full seats.
3. **What is metered on top of the seat.** AI assistants moved to seat-plus-usage models in 2026; budget the overage, not only the seat.
4. **Prerequisites.** Some products require another paid tier underneath.
5. **Term and exit.** Annual prepay discount, minimum seats, data export, notice period.
6. **Source and date.** Every price has a URL and the date it was read. List prices only; negotiated prices go in a private file.

Then compute cost at three sizes (pilot of 50, half the organisation, everyone) because the cheapest option often changes with scale.

## Showback before chargeback

1. **Tag everything.** Mandatory labels are in `leadership/finops/cost-allocation-tags.yaml` and enforced by policy (`technical/appendix/platform/policies/kyverno/require-ownership-labels.yaml`).
2. **Showback.** Publish cost per team and environment monthly. No invoices, only visibility.
3. **Unit economics.** Cost per deployment, per active developer, per environment.
4. **Budgets and alerts.** Per team, with anomaly alerts.
5. **Chargeback** only when showback is trusted and allocation is above 90%.

Use the FOCUS column names (FinOps Open Cost and Usage Specification) for the cost dataset so that cloud, SaaS and AI bills can be combined. FOCUS 1.4 was ratified in June 2026.

## The FinOps lifecycle applied to the platform

| Phase | Activities |
| --- | --- |
| Inform | Allocation, showback, licence utilisation, forecasting |
| Optimise | Right-size clusters and runners, reclaim idle seats, commitment discounts, retire duplicate tools |
| Operate | Budgets, anomaly response, quarterly review with Finance, cost criteria in ADRs |

## Budget structure

`leadership/finops/budget-template.csv` has one row per cost line and one column per quarter.

| Category | Typical lines |
| --- | --- |
| CapEx | Initial implementation services, migration projects, hardware for hub edge |
| OpEx: people | Platform team, training, certifications |
| OpEx: infrastructure | Cloud consumption for platform services and CI |
| OpEx: licences | Per-seat and usage-based subscriptions |
| Contingency | 10 to 15% in year one |

What counts as CapEx or OpEx depends on the company's accounting policy. Confirm with Finance.

## AI spend

AI tooling is now a metered cost. Treat it like cloud:

- Budget per team with a default per-user cap and explicit overrides for heavy users.
- Report credits or tokens consumed per active user and per merged pull request.
- Reclaim seats with no activity in 30 days.
- Keep a model allow-list; premium models are a cost decision.

## Vendor management

Two kinds of supplier, managed differently.

### Tool vendors (source control, cloud, ERP, observability, AI)

- One owner per vendor inside the DPG.
- Renewal calendar with notice dates, twelve months ahead.
- Usage reviewed before every renewal: seats assigned vs. active.
- Exit plan written at signing, not at renewal.

### Delivery vendors (the contractors)

Contract for outcomes that the platform can measure:

| Clause | Measured by |
| --- | --- |
| New services start from an approved golden path or a recorded exception | Catalog and template data |
| Scorecard pass rate at or above the agreed threshold | Scorecards |
| Coverage and quality gates pass in the standard pipeline | CI data |
| Delivery metrics reported per team (lead time, change fail rate, recovery time) | DevLake |
| Critical vulnerabilities fixed within SLA | Scanner data |
| Onboarding time for a replacement engineer | Time to tenth pull request |
| Knowledge stays in the organisation's repositories and docs | TechDocs coverage |

The same thresholds apply to internal teams. That is what makes the measure fair and defensible.

`leadership/vendors/vendor-scorecard.md` has the scorecard and a QBR agenda.

**Handling underperformance:** shared data first, then a time-boxed improvement plan with specific metrics, then commercial remedies in the SLA, then rebalancing work to another vendor. Avoid depending on a single delivery vendor for any Tier 1 domain.
