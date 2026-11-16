# DX Core 4

The framework this repo uses to report platform and engineering performance to leadership. The full metric model, including the adoption funnel, is in `leadership/measurement/metrics-and-adoption.md`.

## What it is

DX Core 4 is a measurement framework published by the company DX. It unifies the three frameworks that came before it (DORA, SPACE and DevEx) into four dimensions that are meant to be read together, so that improving one at the expense of another is visible.

| Dimension | Key metric | Secondary metrics |
| --- | --- | --- |
| **Speed** | Diffs (pull requests) per engineer, reported for teams or larger groups, never for individuals | Lead time, deployment frequency, perceived rate of delivery |
| **Effectiveness** | Developer Experience Index (DXI), a survey-based composite | Time to tenth pull request, ease of delivery, regrettable attrition |
| **Quality** | Change failure rate | Failed deployment recovery time, perceived software quality, operational health and security metrics |
| **Impact** | Percentage of time spent on new capabilities | Initiative progress and ROI, revenue per engineer, R&D as a percentage of revenue |

The secondary metrics are listed from memory of the published framework. Check them against the DX paper before quoting them (`docs/references.md`).

## Where the older frameworks sit inside it

| Framework | What it contributes | Lands in |
| --- | --- | --- |
| DORA | Delivery throughput and stability | Speed and Quality |
| SPACE | Productivity has several dimensions; never measure activity alone | The balance across all four |
| DevEx | Feedback loops, cognitive load, flow state | Effectiveness (DXI) |

So the answer to "do you use DORA, SPACE or DevEx?" can be: "I report with Core 4, which contains all three."

## How the data is collected

| Method | Examples | Notes |
| --- | --- | --- |
| System data | Pull requests, deployments, incidents | From source control, pipelines and incident tools |
| Periodic survey | DXI, ease of delivery, perceived quality | Quarterly, same questions each time |
| Experience sampling | One question at the moment of an event, such as after a deployment | Optional, later |

A company can buy the DX product to do this, or assemble it from a delivery-metrics tool and a survey. The framework is the same either way.

## Rules for using it as a leader

1. **Four numbers or none.** Never show speed without quality and effectiveness beside it.
2. **Teams, not people.** Throughput per engineer is an average for a group. Used on individuals it produces fear and gaming.
3. **Baseline before targets.** The first quarter only establishes where things stand.
4. **Compare a team with its own past** before comparing teams with each other.
5. **No rewards tied to the metrics.** They guide investment; they are not performance reviews.
6. **Say what the data cannot show.** Especially with small samples or self-selected early adopters.

## Scorecard for Kestrel Parcel (fill in exercise L6)

| Dimension | Metric | Source | Baseline | Target in 12 months | Counter-metric shown beside it |
| --- | --- | --- | --- | --- | --- |
| Speed | Pull requests merged per engineer per week (team level) | Source control | | | Change failure rate |
| Speed | Change lead time | Delivery metrics tool | | | Rework rate |
| Effectiveness | Developer experience score (survey) | Quarterly survey | | | Response rate |
| Effectiveness | Time to tenth pull request for new engineers | Source control | | | Scorecard pass rate |
| Quality | Change failure rate | Delivery metrics tool | | | Deployment frequency |
| Quality | Failed deployment recovery time | Delivery metrics tool, incidents | | | |
| Impact | Share of engineering time on new capabilities | Work allocation by issue type | | | Platform-team toil |

Segment every row three ways: by stack, by employee or vendor, and by on or off the golden path. The third cut is the platform's evidence.

## Platform view of Core 4

The platform does not own these numbers; delivery teams do. The platform's claim is narrower and testable:

> Teams on the golden path improve on Speed, Effectiveness and Quality against their own baseline, and spend a larger share of time on new capabilities.

Report adoption (how many teams are on the path) next to Core 4 (what happens to them). Adoption without Core 4 is activity. Core 4 without adoption is someone else's result.

## Translating your own past results

Write your real results in this vocabulary in `notes/private/`, not here: this repository is public. For each result, name the Core 4 dimension it belongs to and state plainly which data you had and which you did not. For example, a faster deployment is part of Speed (lead time), a faster rollback is Quality (recovery time), and neither says anything about deployment frequency unless you recorded it.

## Tooling

See the measurement section of `technical/03-tooling-options.md`.
