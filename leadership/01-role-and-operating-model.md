# 01 · The role and its operating model

## The role in one paragraph

The head of the Software Engineering Office is the product leader of the internal developer platform. The customers are developers. The job is to decide what the platform offers, get teams to adopt it by making it the easiest way to work, prove the effect with data, keep it within budget, and explain all of that to executives in business terms. It is not a project-management or delivery-lead role, and it is not the person who writes the pipelines.

## What the leader owns

| Area | Decisions | Artefacts |
| --- | --- | --- |
| Strategy and product | Scope, golden paths, priorities, what not to build | Charter, roadmap, backlog |
| Adoption | Which teams first, how to scale, mandate or pull | Adoption plan, funnel report |
| Measurement | What is measured, baselines, targets | DX Core 4 scorecard, survey, quarterly report |
| Governance | Rules, exceptions, risk appetite | Directives, exception register, ADRs |
| Money | Budget, build or buy, licence mix | Budget, TCO model, licence register |
| Vendors | Tool vendors and delivery vendors | SOW and SLA terms, scorecards, QBRs |
| AI | Approved tools, agent and MCP catalog, usage rules | AI policy, impact report |
| People | Structure, hiring, growth, rituals | Team charter, hiring plan, role scorecards |
| Continuity | Platform reliability, incident learning | SLOs, postmortems, DR plan |

## What the leader does not own, but must understand

How the portal, templates, pipelines, policies and metrics pipelines work. Enough to ask good questions, judge an estimate, spot a risky design and explain the system to a non-technical committee. That is what `technical/` is for.

## Cadence

| Cadence | Activity | Output |
| --- | --- | --- |
| Weekly | One-to-ones with the eight direct and matrix reports | Notes, unblocked items |
| Weekly | Hub Leaders sync: adoption blockers per stack | Updated adoption board |
| Weekly | Review of adoption funnel, incidents, top friction | Backlog adjustments |
| Every two weeks | Platform planning with the engineers | Prioritised backlog |
| Monthly | Platform demo or town hall | Feedback, new adopters |
| Monthly | Cost review with Finance | Spend against budget, forecast |
| Monthly | Tool-vendor and delivery-vendor check-ins | Open actions |
| Quarterly | Developer survey | Experience trend, top three actions |
| Quarterly | Vendor QBRs | Scorecards, improvement plans |
| Quarterly | Executive committee report | One page: outcomes, risks, investment, asks |
| Quarterly | Roadmap review | Next quarter's commitments |
| Yearly | Budget cycle, maturity self-assessment, team reviews | Budget, target maturity, development plans |

## Stakeholder map

| Stakeholder | What they want | How the leader serves it |
| --- | --- | --- |
| CIO and executive committee | Faster, safer delivery at visible cost | Quarterly report in time, cost and risk |
| IT directors of business domains | Their teams deliver without disruption | Voluntary pilots, migration support, no surprise mandates |
| Developers and tech leads | Less friction | Golden paths, office hours, acting on survey results |
| Security and audit | Controls and evidence | Controls built into templates, evidence from Git |
| Finance and procurement | Predictable, allocated spend | Budget, showback, renewal calendar |
| Delivery vendors | Clear expectations, fair measurement | Same scorecard for everyone, QBRs |
| Tool vendors | Renewals and expansion | Usage-based negotiation, exit plans |

## How the time splits (starting assumption)

About 40% people and stakeholders, 25% strategy and measurement, 20% money and vendors, 15% technical judgement. Confirm the real split in the interview.

## The method in seven steps

1. Understand before building: interviews, value-stream map, baseline.
2. Prioritise by friction and reach.
3. Build the thinnest useful version with volunteer teams.
4. Measure adoption as a funnel.
5. Measure outcome and experience, with counter-metrics.
6. Scale through influence; mandate only security and compliance controls.
7. Govern and report in business terms.

Every exercise in `leadership/03-practice-plan.md` applies one or more of these steps.
