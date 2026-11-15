# Missions: the first two quarters

Eleven missions in the order the job would bring them. Each has a situation, the theory to read, a leadership move, a technical move and a question to answer aloud. Read `START-HERE.md` first.

The technical move has two levels. **Understand** needs no installation. **Build** is optional and refers to a phase of `technical/04-build-plan.md`.

| # | When | Mission | Leadership exercise | Build-plan phase |
| --- | --- | --- | --- | --- |
| 0 | Day 1 | Take the brief | L1, L14 | — |
| 1 | Weeks 1 to 4 | Listen and take the baseline | L2 | 2 |
| 2 | Week 5 | Choose what to do first | L3, L4 | — |
| 3 | Weeks 6 to 8 | Ship golden path 0.1 with one team | L4 | 1, 3 |
| 4 | Weeks 9 to 10 | Win the next five teams | L5 | 4 |
| 5 | Weeks 11 to 12 | Set the rules | L7 | 5 |
| 6 | Day 90 | Show the first results | L6 | 7 |
| 7 | Month 4 | Budget and vendors | L8, L9 | 8 |
| 8 | Month 5 | Bring order to AI | L10 | 9 |
| 9 | Month 5 | The platform breaks | L12 | 6 |
| 10 | Month 6 | Report to the committee and build the team | L13, L11 | 12 |

Exercise details are in `leadership/03-practice-plan.md`.

---

## Mission 0 · Take the brief

**Situation.** Day one. You have the CIO's message and a first meeting with your director tomorrow. He will ask what you understand the job to be.

**Read.** `leadership/01-role-and-operating-model.md`, `leadership/02-scenario.md`, `technical/01-idp-anatomy.md`, and the platform definition in your study sheet.

**Note.** The definition of a platform in one sentence. What the platform is not. The parts of an IDP.

**Decide.** Exercise L1: rewrite the charter's mission, scope and out-of-scope in your own words.

**See it work**
- Understand: draw the request flow from the anatomy page from memory.
- Build: none.

**Say it.** "What is this office for, and what will it not do?"

---

## Mission 1 · Listen and take the baseline

**Situation.** Tomás tells you every director has a different opinion about what is broken. Hugo offers to introduce you to developers.

> **Hugo:** "Talk to Ana in production tracking and to Victor at Altos. You will hear two different companies."

**Read.** Method step 1 in your study sheet; "Baseline first" in `leadership/measurement/metrics-and-adoption.md`; `leadership/strategy/first-90-days.md`.

**Note.** Which questions reveal friction. Which numbers a baseline needs and where each would come from.

**Decide.** Exercise L2: interview guide, three interviews with the `developer-customer` agent (Ana, Victor and an SAP developer), a friction log, a value-stream sketch and the baseline table. Commit as `leadership/strategy/discovery-notes.md`.

**See it work**
- Understand: read `technical/platform/catalog/org.yaml` and `technical/platform/catalog/domains.yaml`. Add two more services you heard about in the interviews as catalog entries. A catalog is the first inventory; "how many services have an owner?" is your first number.
- Build: phases 1 and 2 (local platform and portal).

**Say it.** "What did you learn in your first 30 days and how do you know it is true?"

---

## Mission 2 · Choose what to do first

**Situation.** Your friction log has forty items. Four stacks each want the first golden path. Iván from security wants signing made mandatory this quarter.

**Read.** Platform as a product and thinnest viable platform in your study sheet; `leadership/strategy/golden-path-plan.md`; `leadership/strategy/roadmap.md`.

**Note.** How to score by reach and friction. What "opinionated and supported" means. Why a not-now list matters.

**Decide.** Exercises L3 and L4: score the backlog, edit the roadmap, choose the first stack and pilot team, define version 0.1. Record the choice as an ADR.

**See it work**
- Understand: read `technical/05-golden-path-design.md` and the template form in `technical/platform/templates/dotnet-service/template.yaml`. Decide which questions the form should ask a developer and which the platform should already know. Edit the form to match.
- Build: none.

**Say it.** "Why this stack first, and what are you saying no to?"

---

## Mission 3 · Ship golden path 0.1 with one team

**Situation.** Ana's team agrees to be the pilot, with a new internal service due in six weeks.

> **Paula:** "I can have a template and pipeline in three weeks if we cut dashboards, signing and production deploys. Otherwise eight."

**Read.** `technical/05-golden-path-design.md` again; the launch plan and support model in `leadership/strategy/golden-path-plan.md`.

**Note.** What "done" means for 0.1. How improvements reach services created earlier. Who is on call for the standard pipeline.

**Decide.** Agree the 0.1 scope with Paula (`platform-engineer` agent, Challenge mode). Write the launch plan: pilot, tutorial, support channel, the measures you will take from day one.

**See it work**
- Understand: read `technical/platform/pipelines/golden-path-ci.yml` stage by stage and name the directive each gate enforces.
- Build: phases 1 and 3. Create the service from the template and record the time to first deploy.

**Say it.** "How did you get the first team onto the platform, and what did it cost them?"

---

## Mission 4 · Win the next five teams

**Situation.** Ana's team is live. The demo went well. A senior tech lead says his pipeline has worked for eight years. Marcela says Altos teams will adopt "when it is in the contract".

**Read.** Adoption funnel and MONK in your study sheet; "Adoption and usage" in `leadership/measurement/metrics-and-adoption.md`.

**Note.** The five funnel stages. Why voluntary adoption is the strongest signal. What the Hub Leaders do.

**Decide.** Exercise L5: funnel targets, team segments with a tactic each, what becomes mandatory and when. Role-play the sceptical tech lead and the vendor lead. Commit as `leadership/strategy/adoption-plan.md`.

**See it work**
- Understand: read `technical/platform/identity/dex/config.yaml`. Explain how one login with groups lets employees and each vendor have different permissions on the same platform.
- Build: phase 4.

**Say it.** "How do you get established teams and 500 contractors to adopt a standard?"

---

## Mission 5 · Set the rules

**Situation.** Iván returns: an audit finding says production images cannot be traced to a build. He wants enforcement now. One Altos team cannot comply for a quarter.

**Read.** `leadership/governance/directives.md`, `leadership/governance/exception-process.md`, control traceability in `docs/standards-map.md`.

**Note.** MUST versus SHOULD. Audit mode before enforce mode. What a compensating control is.

**Decide.** Exercise L7: decide the timing, process the exception, say how exceptions are reported.

**See it work**
- Understand: read the four files in `technical/platform/policies/kyverno/`. For one of them, trace the chain: standard, directive, policy, evidence, metric.
- Build: phase 5.

**Say it.** "How do you balance mandate and autonomy?"

---

## Mission 6 · Show the first results

**Situation.** Day 90. Elena has twenty minutes.

**Read.** `leadership/measurement/dx-core-4.md`; method and metrics in your study sheet.

**Note.** Four dimensions and their key metrics. Why a team is compared with its own baseline. What your data cannot show yet.

**Decide.** Exercise L6: fill the Core 4 scorecard for Forja Norte and the adoption funnel so far.

**See it work**
- Understand: for each scorecard row, name the system the number comes from and who owns it, using `leadership/measurement/metrics-catalog.yaml`.
- Build: phase 7.

**Say it.** "Is the platform working? How do you know?"

---

## Mission 7 · Budget and vendors

**Situation.** Lucía needs next year's budget in two weeks and asks whether to buy a commercial portal. The quarter's data shows Altos teams with twice the change fail rate of the others.

**Read.** `leadership/finops/finops-and-vendors.md`; the vendor and budget notes in your study sheet.

**Note.** Three kinds of cost. Unit costs. Outcome-based SLA clauses. The remedy ladder.

**Decide.** Exercises L8 and L9: budget, build-or-buy memo, vendor scorecard, QBR with Marcela, improvement plan.

**See it work**
- Understand: read `leadership/finops/cost-allocation-tags.yaml` and explain how the labels asked once in the template become a cost report per team.
- Build: phase 8.

**Say it.** "How would you justify this investment?" and "What do you do with a vendor that underperforms?"

---

## Mission 8 · Bring order to AI

**Situation.** Three AI assistants are in use with no rules. A contractor pasted production configuration into one of them. Elena wants productivity gains reported next quarter.

**Read.** `leadership/ai/ai-capability.md`, `leadership/governance/ai-usage-policy.md`; the AI section of your study sheet.

**Note.** The four levels of use. AI as an amplifier. Measuring speed and quality together.

**Decide.** Exercise L10: rollout plan and measurement plan. Commit as `leadership/ai/rollout-plan.md`.

**See it work**
- Understand: read `technical/platform/catalog/ai-capabilities.yaml`. Explain why MCP servers and skills are registered like any other component.
- Build: phase 9.

**Say it.** "How do you take AI beyond individual assistants, and how do you measure it?"

---

## Mission 9 · The platform breaks

**Situation.** A change to the standard pipeline blocks every deployment for three hours during a plant maintenance window.

**Read.** `leadership/governance/postmortem-template.md`; continuity in your study sheet.

**Note.** What blameless means. Why the standard pipeline needs an SLO. What the plant cares about.

**Decide.** Exercise L12: postmortem, actions, continuity outline. Prepare what you will say to the plant director.

**See it work**
- Understand: reread the pipeline design choices in `technical/05-golden-path-design.md` and say what would have limited the damage.
- Build: phase 6 failure drill.

**Say it.** "Tell me about a failure of your platform and what changed afterwards."

---

## Mission 10 · Report to the committee and build the team

**Situation.** End of the second quarter. Ten minutes with the executive committee, and approval to fill the remaining positions.

**Read.** `leadership/measurement/quarterly-report-template.md`, `leadership/people/team-and-hiring.md`, the maturity model in `docs/standards-map.md`.

**Note.** Outcomes before tools. Three asks with a cost each. How to lead people who do not report to you.

**Decide.** Exercises L13 and L11: the one-page report, the maturity self-assessment, two role scorecards and the hiring order.

**See it work**
- Understand: exercise L14. Explain the whole platform in five minutes without product names.
- Build: none.

**Say it.** "What have you achieved in six months and what do you need from us?"
