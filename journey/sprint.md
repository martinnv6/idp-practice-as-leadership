# Sprint: four sessions before an interview

Four sessions of about 90 minutes of repository work each, on top of your own reading. Each one turns that day's theory into something you have actually done, so the answer in the interview comes from practice.

The study-sheet column names the part of your own study sheet to read first. The sheet stays outside this repository.

| Session | Study sheet first | Theme | Missions used |
| --- | --- | --- | --- |
| 1 | The role; the definition of a platform; the CNCF white paper | What a platform is and how it works | 0 |
| 2 | Method and metrics; adoption; AI | Proving it works | 6, 4 (funnel only), 8 (measurement only) |
| 3 | Vendors, budget, gaps; first mock interview | Money, vendors and hard questions | 7 |
| 4 | Second mock interview; one-page sheet | Telling the whole story | 10 |

## Session 1 · What a platform is and how it works

| Step | Do | Time |
| --- | --- | --- |
| Read | `START-HERE.md` (the CIO's brief), `leadership/01-role-and-operating-model.md`, `technical/01-idp-anatomy.md` | 30 min |
| Note | In `notes/study-notes.md`: the definition in one sentence, the seven attributes, the parts of an IDP, portal versus platform | 15 min |
| Decide | Rewrite the mission and the out-of-scope list of `leadership/strategy/platform-charter.md` in your own words | 20 min |
| See it work | Draw the "how a request travels" flow from memory, then check it against the anatomy page | 15 min |
| Say it | To the `platform-engineer` agent in Challenge mode: "what happens when a developer uses the platform?" Then to `exec-committee`: "what is this office for?" | 10 min |

**You leave with:** a 20-second definition, an edited charter and a flow you can draw.

## Session 2 · Proving it works

| Step | Do | Time |
| --- | --- | --- |
| Read | `leadership/measurement/dx-core-4.md` and the adoption section of `leadership/measurement/metrics-and-adoption.md` | 30 min |
| Note | One sentence per framework (DORA, SPACE, DevEx, DX Core 4); the five funnel stages; three counter-metrics | 15 min |
| Decide | Fill the Forja Norte scorecard table in `leadership/measurement/dx-core-4.md` (invent plausible baselines, mark them as practice figures). Add funnel targets for two quarters | 25 min |
| See it work | Read `leadership/measurement/metrics-catalog.yaml` for three metrics and say, for each, which system the data would come from | 10 min |
| Say it | To `exec-committee`: "how will you know the platform is working?" and "how do you measure the impact of AI?" | 10 min |

In `notes/private/`, write your own past results in this vocabulary and mark which data you had and which you did not.

**You leave with:** a filled scorecard, funnel targets and an honest account of your own numbers.

## Session 3 · Money, vendors and hard questions

| Step | Do | Time |
| --- | --- | --- |
| Read | `leadership/finops/finops-and-vendors.md`, `leadership/vendors/vendor-scorecard.md` | 25 min |
| Note | What an SOW, an SLA and a QBR are; three kinds of cost; showback versus chargeback; five outcome-based SLA clauses | 15 min |
| Decide | Run `python3 leadership/finops/tco.py`, change two assumptions in `leadership/finops/scenarios.csv`, run it again and write three lines on what moved. Fill the vendor scorecard for Altos Delivery with practice figures | 25 min |
| See it work | Read `technical/platform/policies/kyverno/require-ownership-labels.yaml` and explain how one label rule gives both cost allocation and a fair vendor measure | 10 min |
| Say it | Run the QBR against `vendor-account-manager`. Then ask `finops-partner` to attack your TCO | 15 min |

In `notes/private/`, write an honest answer for each gap in your experience, each ending with how you would close it in 90 days.

**You leave with:** a vendor conversation you have actually had, and a cost model you have changed and defended.

## Session 4 · Telling the whole story

| Step | Do | Time |
| --- | --- | --- |
| Read | `leadership/strategy/first-90-days.md`, `leadership/strategy/golden-path-plan.md` | 20 min |
| Note | The seven-step method in your own words; what a golden path is; the three levels of use | 10 min |
| Decide | Fill `leadership/measurement/quarterly-report-template.md` for Forja Norte using sessions 2 and 3 | 30 min |
| See it work | Explain the platform end to end in five minutes with no product names | 10 min |
| Say it | Ten-minute report to `exec-committee`, then take its questions for ten more | 20 min |

**You leave with:** a one-page report and a story that runs from the brief to results.

## After the sprint

Continue with `journey/missions.md` from Mission 1. Nothing done here is wasted: each sprint document is the first draft of a mission deliverable.
