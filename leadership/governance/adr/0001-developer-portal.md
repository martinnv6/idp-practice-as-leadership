# ADR-0001: Use Backstage as the developer portal for the lab

| Field | Value |
| --- | --- |
| Status | Proposed (confirm or change in Phase 2) |
| Date | 2026-11-15 |
| Deciders | Lab owner |
| Phase | 2 |

## Context

The platform needs one front door: catalog, templates, docs and scorecards. The lab must run on a laptop at no licence cost and should teach concepts that transfer to other portals.

## Options considered

| Option | Note |
| --- | --- |
| Backstage (open source) | Runs locally, no licence, large ecosystem, included in the CNOE reference stacks |
| Managed Backstage | Less upkeep, but needs an account and is not local |
| Commercial SaaS portal | Fast start, per-seat cost, cannot be run offline |

Scores are left for Phase 2, after using Backstage for a day.

## Decision

Start with Backstage through the CNOE reference stack.

## Consequences

- We operate the portal ourselves. In a real organisation this is one to two engineers of ongoing effort; `leadership/finops/scenarios.csv` must reflect that.
- Catalog and template formats are open, which keeps a later move to a managed offering cheap.

## Review date

End of Phase 3.
