# 03 · Leadership practice plan

Fourteen exercises. Each one ends with an artefact a platform leader really produces and a spoken answer of about five minutes. They can be done in order or picked by interview topic.

The practice app (`python3 app/server.py`) presents these exercises as missions, in the order the job would bring them, and tracks them. An exercise is done when the artefact is committed and the answer has been rehearsed aloud.

The agents in `.claude/agents/` play the counterpart (executive, developer, vendor, finance) so an answer can be challenged.

## Overview

| # | Exercise | Method step | Artefact | Counterpart agent |
| --- | --- | --- | --- | --- |
| L1 | Define the platform and its charter | 1 | Edited charter, 20-second definition | exec-committee |
| L2 | Discovery and baseline | 1 | Interview guide, friction log, baseline table | developer-customer |
| L3 | Roadmap and prioritisation | 2 | Four-quarter roadmap, scored backlog | exec-committee |
| L4 | Golden-path plan | 3 | Plan for the first golden path | platform-engineer |
| L5 | Adoption plan | 4, 6 | Funnel targets, pilot list, communication plan | developer-customer |
| L6 | Measurement with DX Core 4 | 5 | One-page scorecard with baselines and targets | exec-committee |
| L7 | Governance and exceptions | 6, 7 | One new directive and one exception decision | platform-engineer |
| L8 | Budget and TCO | 7 | Filled budget, build-or-buy memo | finops-partner |
| L9 | Delivery vendors | 6, 7 | SLA clauses, scorecard, QBR run | vendor-account-manager |
| L10 | AI programme | 3, 5, 7 | Rollout plan and impact measurement plan | exec-committee |
| L11 | Team and hiring | (people) | Role scorecards, first hires, rituals | exec-committee |
| L12 | Incident and continuity | 7 | Postmortem review and continuity plan outline | platform-engineer |
| L13 | Quarterly executive report | 7 | One-page report and ten-minute talk | exec-committee |
| L14 | Explain the IDP end to end | (technical judgement) | Five-minute whiteboard talk | platform-engineer |

---

## L1 · Define the platform and its charter

**Situation.** First week. The CTO asks: "In one sentence, what is this platform and what is it not?"

**Do**

1. Read `leadership/strategy/platform-charter.md` and the definition in `docs/standards-map.md`.
2. Rewrite the mission, scope and out-of-scope sections in your own words.
3. Write a 20-second definition and say it without reading.

**Done when.** The charter is edited and committed; the definition is said aloud twice.

**Question it answers.** "What is an IDP?" and "What is this office for?"

## L2 · Discovery and baseline

**Situation.** Days 1 to 30. Nobody agrees on what hurts most.

**Do**

1. Write an interview guide: eight questions for developers, five for tech leads, five for vendor leads.
2. Run it with the `developer-customer` agent as three personas: employee Java developer, vendor TypeScript developer, mobile developer. Log the friction points in a table: friction, who, how often, time lost, evidence.
3. Draw the value stream of one change from ticket to production with wait times (invented, but plausible).
4. Fill the "minimum viable baseline" in `leadership/measurement/metrics-and-adoption.md`: which numbers exist, which do not, how to get each.

**Done when.** `leadership/strategy/discovery-notes.md` exists with the guide, the friction log, the value stream and the baseline table.

**Question it answers.** "How would you start?" and "What would you do in the first 30 days?"

## L3 · Roadmap and prioritisation

**Situation.** Forty requests, capacity for six.

**Do**

1. Take the friction log from L2 and score each item: reach (teams affected), friction (hours lost), effort, risk reduced.
2. Edit `leadership/strategy/roadmap.md`: one outcome per quarter, the bets under it and what is explicitly not being done.
3. Prepare the answer to a director whose request did not make the cut.

**Done when.** Roadmap committed, with a "not now" list and the reason for each.

**Question it answers.** "How do you prioritise?" and "How do you say no?"

## L4 · Golden-path plan

**Situation.** Four stacks want a golden path first.

**Do**

1. Read `leadership/strategy/golden-path-plan.md`.
2. Choose the first stack and justify it with reach, readiness of a volunteer team and your own credibility.
3. Define what "done" means for version 0.1, the pilot teams, the support model and the exit for teams that cannot use it.
4. Ask the `platform-engineer` agent to estimate it and challenge the scope.

**Done when.** The plan's decision table is filled and an ADR records the choice.

**Question it answers.** "What is a golden path and how would you launch one?"

## L5 · Adoption plan

**Situation.** The first golden path exists. Two teams use it. Fifty do not.

**Do**

1. Set funnel targets per quarter: aware, onboarded, activated, active, retained.
2. Segment teams: volunteers, pragmatists, sceptics, cannot-move-yet. Name the tactic for each.
3. Write the role of Guild Leads and champions in adoption.
4. Role-play with `developer-customer` as a sceptical senior tech lead from a long-established team, and as a vendor lead who is paid by the hour.
5. Decide what, if anything, becomes mandatory and when.

**Done when.** `leadership/strategy/adoption-plan.md` is committed.

**Question it answers.** "How would you get contractors and established teams to adopt standards?"

## L6 · Measurement with DX Core 4

**Situation.** The committee asks whether the platform is working.

**Do**

1. Read `leadership/measurement/dx-core-4.md`.
2. Build the one-page scorecard: for each of the four dimensions, the key metric, the baseline, the target and the data source.
3. Translate one of your own past results into this vocabulary and mark which data you had and which you did not.
4. Write which counter-metric you would show next to each number.

**Done when.** The scorecard table in `leadership/measurement/dx-core-4.md` is filled for Kestrel Parcel.

**Question it answers.** "How do you measure adoption and impact?" and "Have you used DORA, SPACE or DevEx?"

## L7 · Governance and exceptions

**Situation.** Security wants image signing mandatory next month. A Tier 2 vendor team cannot comply for a quarter.

**Do**

1. Read `leadership/governance/directives.md` and `leadership/governance/exception-process.md`.
2. Decide: mandate now, or SHOULD for a quarter with measured pass rate. Write the reasoning.
3. Process the vendor team's exception request: approve, reject or change the terms.
4. State how you would report exceptions to the committee.

**Done when.** One exception file is committed under `leadership/governance/exceptions/` and the directive change is proposed as a pull request.

**Question it answers.** "How do you balance mandate and autonomy?"

## L8 · Budget and TCO

**Situation.** Finance asks for next year's budget and whether to buy a commercial portal.

**Do**

1. Replace the assumptions in `leadership/finops/scenarios.csv` with figures you can defend and run `python3 leadership/finops/tco.py`.
2. Fill `leadership/finops/budget-template.csv`.
3. Write a one-page build-or-buy memo with the break-even point and the non-financial factors.
4. Defend it against the `finops-partner` agent.

**Done when.** Budget, scenarios and memo are committed.

**Question it answers.** "How would you justify the investment?" and "Have you managed a budget?" (Honest answer plus a method.)

## L9 · Delivery vendors

**Situation.** One of the two delivery vendors has a change fail rate well above the other teams'.

**Do**

1. Draft five SLA clauses tied to platform data, using `leadership/finops/finops-and-vendors.md`.
2. Fill `leadership/vendors/vendor-scorecard.md` for the weak vendor with invented but consistent numbers.
3. Run the QBR against the `vendor-account-manager` agent, who will dispute the data and blame the platform.
4. Write the improvement plan and the remedy ladder.

**Done when.** Scorecard, clauses and plan are committed.

**Question it answers.** "How do you measure contractor quality?" and "What do you do with a vendor that underperforms?"

## L10 · AI programme

**Situation.** Three AI assistants are in use without rules. The CTO wants productivity gains reported next quarter.

**Do**

1. Read `leadership/ai/ai-capability.md` and `leadership/governance/ai-usage-policy.md`.
2. Write the rollout: approved tools, pilot cohort, catalog of skills and MCP servers, rules, budget.
3. Write the measurement plan: baseline, cohorts, speed and quality together, sample size.
4. Prepare the answer to "why can't you show ROI yet?".

**Done when.** `leadership/ai/rollout-plan.md` is committed.

**Question it answers.** "How do you take AI beyond individual assistants and measure it?"

## L11 · Team and hiring

**Situation.** Nine positions to fill or confirm; three are matrix roles with no reporting line.

**Do**

1. Read `leadership/people/team-and-hiring.md`.
2. Write a role scorecard for one Platform Engineer and one Guild Lead: outcomes, competencies, interview signals.
3. Order the hires and explain the order.
4. Describe how you lead Guild Leads who do not report to you.

**Done when.** Two role scorecards are committed.

**Question it answers.** "How would you structure and hire the team?" and "How do you lead without authority?"

## L12 · Incident and continuity

**Situation.** A platform pipeline change blocked all deployments for three hours on the first night of peak season.

**Do**

1. Fill `leadership/governance/postmortem-template.md` for this incident.
2. Decide which actions become platform backlog items and which become directives.
3. Outline the platform's continuity plan: what must survive, recovery targets, how it is tested.

**Done when.** The postmortem and a half-page continuity outline are committed.

**Question it answers.** "How do you run post-incident improvement?"

## L13 · Quarterly executive report

**Situation.** Ten minutes with the executive committee.

**Do**

1. Fill `leadership/measurement/quarterly-report-template.md` with Kestrel Parcel numbers from the earlier exercises.
2. Rehearse it aloud in ten minutes. Outcomes first, tools never.
3. Take questions from the `exec-committee` agent.

**Done when.** The report is committed and rehearsed twice.

**Question it answers.** "What would you show me in twelve months?"

## L14 · Explain the IDP end to end

**Situation.** A director asks, "What actually happens when a developer uses this platform?"

**Do**

1. Read `technical/01-idp-anatomy.md`.
2. Draw the flow from "developer clicks Create" to "service running in production with a dashboard and a cost label".
3. Explain it in five minutes with no product names, then again with them.
4. Let the `platform-engineer` agent correct you.

**Done when.** You can do both versions without notes.

**Question it answers.** "How does it work?" at the depth a leader needs.
