# Golden-path plan

How a leader chooses, launches and grows golden paths. The technical design of one is in `technical/04-golden-path-design.md`.

## What it is

The idea comes from Spotify, which describes a golden path as the opinionated and supported way to build a kind of software, delivered with a tutorial that walks an engineer through it. Two words carry the weight:

- **Opinionated:** the decisions are already made (language version, pipeline, deployment, telemetry, security checks).
- **Supported:** a named team maintains it, answers questions and fixes it.

Other companies call it a paved road.

A golden path is a product, with users, versions, documentation, support and metrics. It is not a wiki page of recommendations and not a rule.

## Three levels of use

Not every team can use the path whole. Offer levels, as Spotify does:

| Level | The team uses | Fits |
| --- | --- | --- |
| 1. Zero configuration | The template as it is | New services, most teams |
| 2. Configured | The standard pipeline with its own steps added | Teams with special build or test needs |
| 3. Building blocks | The platform's APIs and pipeline components directly | Teams that cannot use the template but still want the shared tooling |

All three satisfy the mandatory directives. Teams outside all three need an exception.

## Choosing the first path

Score each candidate stack.

| Criterion | Question | Java | TypeScript | Python and Data | Mobile |
| --- | --- | --- | --- | --- | --- |
| Reach | How many teams and new services per year? | | | | |
| Pain | How much time is lost today in setup and deployment? | | | | |
| Volunteer | Is there a willing team with a real service to build? | | | | |
| Feasibility | Can version 0.1 exist in six weeks? | | | | |
| Credibility | Does the platform team know this stack deeply? | | | | |
| Total | | | | | |

Default choice for Kestrel Parcel: Java services, because of reach and platform-team credibility. Confirm with the scoring in exercise L4.

## Scope of version 0.1

Decide what is in and what waits.

| In 0.1 | Later |
| --- | --- |
| Create a service from a template with owner, tier and cost labels | Database and messaging on request |
| Build, test and quality gate | Performance tests |
| Deploy to dev automatically, to staging by pull request | Production with progressive rollout |
| Appears in the catalog with docs | Dashboards and SLO generated |
| Security scan in the pipeline | Signing and enforcement |

Rule: version 0.1 must take one real team to a running service. Anything not needed for that waits.

## Launch plan

| Step | Who | Output |
| --- | --- | --- |
| Pick one or two pilot teams with a real, non-critical service | Head of Developer Platform, Guild Lead | Signed-up teams |
| Build 0.1 with the pilot team in the room | Platform Engineer | Working path |
| Write the tutorial as the pilot follows it | Platform Engineer, pilot team | Tutorial tested by a real user |
| Measure time to first deploy and collect friction | Guild Lead | First numbers |
| Fix the top three frictions | Platform Engineer | 0.2 |
| Demo by the pilot team, not by the platform team | Pilot tech lead | New volunteers |
| New joiners do the tutorial in onboarding | Guild Leads | Steady feedback |

Using new joiners as the tutorial's audience is Spotify's practice: every new engineer walks the path, so feedback never stops.

## Support model

- One named owner per path.
- Office hours weekly; a chat channel with a same-day response target.
- Versioned releases with notes; upgrades offered as automated pull requests where possible.
- A documented exit: what a team must still satisfy if it leaves the path.

## Measures

| Measure | Target for the first two quarters |
| --- | --- |
| Time to first deploy | Under 1 hour |
| Teams active on the path | 5 |
| Share of new services of that stack created from the path | 60% |
| Tutorial completion by new joiners | 90% |
| Satisfaction with the path (survey) | 4 out of 5 |
| Scorecard pass rate of path services after 30 days | 90% |
| Teams that left the path, with reason | Tracked, no target |

## Decision record

Record the choice of first stack, the 0.1 scope and the pilot teams as an ADR in `leadership/governance/adr/`.
