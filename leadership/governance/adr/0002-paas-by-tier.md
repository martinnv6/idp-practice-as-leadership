# ADR-0002: Choose the runtime abstraction by workload tier

| Field | Value |
| --- | --- |
| Status | Proposed (decide in Phase 10 with measured data) |
| Date | 2026-11-15 |
| Deciders | Lab owner |
| Phase | 10 |

## Context

A Heroku-style PaaS gives the simplest developer experience. A Kubernetes golden path gives the most control over policy, network and rollout. Running every small internal app on the shared cluster has a cost; so does operating two runtimes.

Heroku itself moved to a sustaining engineering model in February 2026 (no new features, no new Enterprise contracts for new customers), so it is a reference for the experience and not a candidate for new strategic workloads.

## Options considered

| Option | Note |
| --- | --- |
| Everything on the Kubernetes golden path | One runtime, one policy model. Heavier for trivial apps |
| Tier 3 on a managed PaaS, Tiers 1 and 2 on the golden path | Lower cost and effort for simple apps. Two runtimes to govern |
| PaaS experience on Kubernetes (Korifi, Knative with buildpacks) | One cluster, simpler developer contract. More platform components to operate |

## Hypothesis to test

Tier 3 applications are cheaper and faster on a managed PaaS, provided identity, catalog registration, cost tags and scanning still apply.

## Data to collect in Phase 10

| Measure | Golden path | PaaS |
| --- | --- | --- |
| Steps to first deploy | | |
| Time to first deploy | | |
| Concepts the developer must know | | |
| Directives satisfied by default | | |
| Monthly run cost for one small app | | |
| Effort to move away | | |

## Decision

Pending.

## Consequences

Pending.
