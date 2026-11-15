# leadership/

Everything the head of the platform office decides, writes and reports. None of it requires building software.

## Where this work lives in a real company

A platform leader's output is mostly documents, spreadsheets, backlogs and dashboards. This repo keeps plain-text equivalents so they can be versioned and reviewed.

| Leadership artefact | Typical tool in a company | Equivalent here |
| --- | --- | --- |
| Charter, vision, policies, directives | Word or Confluence | `leadership/strategy/`, `leadership/governance/` |
| Decision records | Confluence | `leadership/governance/adr/` |
| Roadmap and backlog | Jira, Jira Product Discovery, Azure Boards | `leadership/strategy/roadmap.md` plus GitHub issues and project |
| Budget, licence register, TCO model | Excel | `leadership/finops/` (CSV plus a script) |
| Productivity and adoption dashboards | DX (Core 4), DevLake or Power BI | `leadership/measurement/` |
| Developer survey | DX snapshots, Forms | `leadership/measurement/devex-survey.md` |
| Quarterly executive report, vendor QBR | PowerPoint | `leadership/measurement/quarterly-report-template.md`, `leadership/vendors/vendor-scorecard.md` |
| Team structure, hiring, rituals | Word, HR system | `leadership/people/team-and-hiring.md` |

## Reading order

| # | File | What it gives you |
| --- | --- | --- |
| 1 | `leadership/01-role-and-operating-model.md` | What the job is, week by week |
| 2 | `leadership/02-scenario.md` | The fictional company, department and constraints |
| 3 | `leadership/03-practice-plan.md` | Fourteen exercises to do |
| 4 | `leadership/strategy/platform-charter.md` | Mission, users, scope, principles |
| 5 | `leadership/strategy/roadmap.md` | Four quarters, with outcomes and bets |
| 6 | `leadership/strategy/golden-path-plan.md` | How to choose, launch and grow golden paths |
| 7 | `leadership/strategy/first-90-days.md` | Entry plan |
| 8 | `leadership/measurement/dx-core-4.md` | The measurement framework to report with |
| 9 | `leadership/measurement/metrics-and-adoption.md` | Full metric model and adoption funnel |
| 10 | `leadership/governance/directives.md` | The rules, and how each is enforced |
| 11 | `leadership/finops/finops-and-vendors.md` | Cost model, build or buy, vendor management |
| 12 | `leadership/ai/ai-capability.md` | AI and agents as a governed capability |
| 13 | `leadership/people/team-and-hiring.md` | Team design, hiring, rituals |

## Folders

| Folder | Contents |
| --- | --- |
| `strategy/` | Charter, roadmap, golden-path plan, first 90 days |
| `governance/` | Directives, exception process, RACI, AI usage policy, postmortem template, ADRs |
| `measurement/` | DX Core 4, metrics model, metrics catalog, survey, scorecard, quarterly report |
| `finops/` | Licence register, TCO scenarios and script, budget, allocation tags |
| `vendors/` | Delivery-vendor scorecard and QBR agenda |
| `ai/` | AI capability model and measurement |
| `people/` | Team structure, hiring plan, rituals |
