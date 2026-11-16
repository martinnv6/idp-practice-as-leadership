# 04 · Metrics and adoption

How to know whether the platform is used, whether it helps, and what it costs. Machine-readable definitions are in `leadership/measurement/metrics-catalog.yaml`; this file explains how they fit together.

## The structure

The CNCF white paper groups platform success measures into three categories. This repo adds two more that the role is accountable for.

| Layer | Question it answers | Main frameworks |
| --- | --- | --- |
| 1. Adoption and usage | Do teams choose the platform and keep using it? | Adoption funnel, MONK |
| 2. User satisfaction and productivity | Is work easier for developers? | SPACE, DevEx, DXI |
| 3. Organisational efficiency | Is the organisation faster at routine things? | CNCF white paper |
| 4. Product and feature delivery | Do adopters deliver better? | DORA |
| 5. Cost and risk | What does it cost and what does it protect? | FinOps unit economics, scorecards |

Rule: never report a metric from one layer alone. Speed without quality, adoption without satisfaction, or savings without usage all mislead.

## 1. Adoption and usage

Adoption is a funnel, measured per team and per capability.

| Stage | Definition | How to measure |
| --- | --- | --- |
| Aware | Team has seen a demo or opened the portal | Portal unique visitors, demo attendance |
| Onboarded | Team has at least one service in the catalog with an owner | Catalog query |
| Activated | Team created or migrated a service with a golden path | Template runs, repositories with the platform marker |
| Active | Team deployed through the platform in the last 7 days | Deployments with the golden-path label |
| Retained | Team still active 90 days after activation | Cohort query |

Supporting measures:

| Metric | Definition |
| --- | --- |
| Catalog coverage | Services with a valid owner, tier and lifecycle, over all known services |
| Golden-path share | Production deployments through a golden path, over all production deployments |
| Capability usage | Teams using each capability (templates, pipelines, observability, database, AI) |
| Time to first deploy | From template run to first successful deployment in `dev` |
| Time to tenth pull request | For a new engineer or a new contractor: onboarding speed |
| Self-service rate | Requests fulfilled with no platform-team action, over all requests |
| Churn and exits | Teams that left the golden path, and the reason recorded |

**MONK** is a compact way to report platform health: **M**arket share (golden-path share), **O**nboarding time, **N**et Promoter Score and **K**ey customer metrics (the DORA results of adopting teams).

Voluntary adoption is the strongest signal. Where use is mandated, measure satisfaction and exceptions requested, because usage alone proves nothing.

## 2. Satisfaction and productivity

**DevEx** names three drivers of developer experience: feedback loops, cognitive load and flow state. **SPACE** names five dimensions of productivity: Satisfaction and wellbeing, Performance, Activity, Communication and collaboration, Efficiency and flow. Use at least three SPACE dimensions together and never rank individuals.

| Metric | Source | Cadence |
| --- | --- | --- |
| Platform satisfaction (CSAT or NPS) | Survey | Quarterly |
| Ease of delivery ("how easy is it to ship a change?") | Survey | Quarterly |
| Perceived cognitive load of tooling | Survey | Quarterly |
| Time lost to friction per week (self-reported) | Survey | Quarterly |
| CI feedback time (p50, p90) | CI system | Continuous |
| Pull-request review turnaround | Git | Continuous |
| Top three friction points (free text, coded) | Survey and interviews | Quarterly |

The survey template is `leadership/measurement/devex-survey.md`. Keep the same core questions every quarter so trends are comparable.

## 3. Organisational efficiency

| Metric | Definition |
| --- | --- |
| Request-to-fulfilment time | For environment, database or access requests |
| Time to production for a new service | From idea approved to first production deployment |
| Time to first contribution | For a new joiner, employee or contractor |
| Platform-team toil | Share of platform-team time spent on tickets instead of product work |
| Duplicate tooling retired | Tools or pipelines decommissioned because teams moved to the platform |

## 4. Delivery: DORA

The current DORA model uses five software delivery metrics.

| Group | Metric | Definition |
| --- | --- | --- |
| Throughput | Change lead time | From commit to running in production |
| Throughput | Deployment frequency | How often a service deploys to production |
| Throughput | Failed deployment recovery time | Time to recover from a deployment that failed |
| Instability | Change fail rate | Share of deployments that need immediate intervention |
| Instability | Deployment rework rate | Share of deployments that are unplanned fixes for a production problem |

How to use them:

- Measure per service or application, never per person.
- Compare adopters with **their own baseline**, and with non-adopters as a secondary view. Teams that adopt first are usually the strongest, so a raw adopter vs. non-adopter comparison flatters the platform.
- Read throughput and instability together.

### Translating existing results into DORA language

Worked example with a typical pipeline modernisation:

| What was measured | DORA term | Have the data? |
| --- | --- | --- |
| Deployment duration went from hours to minutes | Contributes to change lead time (the deploy segment) | Yes |
| Rollback went from close to an hour to a few minutes | Failed deployment recovery time | Yes |
| Nearly all deployments stable | Change fail rate | Yes, approximate |
| How often the team deployed | Deployment frequency | No. Say so |
| Unplanned fix deployments | Rework rate | No. Say so |

Being exact about which numbers exist is more convincing than claiming the full set.

## 5. Cost and risk

| Metric | Definition |
| --- | --- |
| Platform cost per active developer per month | (licences + infrastructure + platform-team cost) / active developers |
| Cost per deployment | Platform run cost / production deployments |
| Allocated spend | Share of cloud and licence cost mapped to an owner |
| Idle licences | Paid seats with no activity in 30 days |
| Scorecard pass rate | Services meeting the production-readiness checks, by team and by vendor |
| Open exceptions | Count and age of policy exceptions |
| Critical vulnerabilities past SLA | Count, by team |
| AI spend per active AI user | See `leadership/ai/ai-capability.md` |

## DX Core 4 as the one-slide summary

DX Core 4 folds DORA, SPACE and DevEx into four dimensions that balance each other. It is a convenient shape for an executive slide whether or not the DX product is used.

| Dimension | DX Core 4 key metric | What this lab uses |
| --- | --- | --- |
| Speed | Diffs (pull requests) per engineer, reported at team level or above | Change lead time and deployment frequency |
| Effectiveness | Developer Experience Index (DXI) | Survey score on ease of delivery and friction |
| Quality | Change failure rate | Change fail rate and rework rate |
| Impact | Share of time spent on new capabilities | Allocation of work: new features vs. maintenance and toil |

Throughput per engineer is the metric most likely to be gamed or to scare people. Report it only in aggregate and always next to the experience and quality numbers.

## Counter-metrics

| If you push this | Watch this |
| --- | --- |
| Deployment frequency | Change fail rate, rework rate |
| Golden-path share | Satisfaction, exceptions requested |
| Time to first deploy | Scorecard pass rate after 30 days |
| AI adoption | Review time, rework rate, defects escaping |
| Cost reduction | Developer wait time, incident count |

## Baseline first

Nothing can be claimed without a baseline. Minimum viable baseline, in the first 30 days:

1. Deployment frequency and lead time for five to ten representative services, from existing pipeline logs.
2. A ten-question survey to a sample of employees and contractors.
3. An inventory of pipelines, tools and licences with their cost.
4. Time to first commit for the last five people who joined.

Collect with the least effort that gives a usable signal. Improve the instrumentation later.

## Reporting cadence

| Audience | Cadence | Content |
| --- | --- | --- |
| Platform team | Weekly | Funnel movement, incidents, top friction |
| Guild Leads | Monthly | Adoption and scorecards by team and vendor, exceptions |
| Finance | Monthly | Spend vs. budget, allocation, licence utilisation |
| Executive committee | Quarterly | One page: outcomes, risks, investment, asks (`leadership/measurement/quarterly-report-template.md`) |
| Vendors | Quarterly (QBR) | Scorecard pass rate, delivery metrics of their teams, SLA results |
