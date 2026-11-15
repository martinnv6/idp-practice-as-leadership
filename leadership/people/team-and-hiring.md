# Team and hiring

Fictional structure for Forja Norte's Software Engineering Office.

## Structure

```mermaid
flowchart TB
  dir[IT Senior Director] --> head[Head of SEO]
  head --> e1[Platform Engineer · SAP]
  head --> e2[Platform Engineer · Microsoft]
  head --> e3[Platform Engineer · Java]
  head --> e4[Platform Engineer · Data]
  head -.matrix.-> h1[Hub Leader · SAP]
  head -.matrix.-> h2[Hub Leader · Microsoft]
  head -.matrix.-> h3[Hub Leader · Java]
  head -.matrix.-> h4[Hub Leader · Data]
  h1 & h2 & h3 & h4 -.influence.-> teams[Delivery teams: about 100 employees, 500 contractors]
```

## The two roles

| | Platform Engineer | Hub Leader |
| --- | --- | --- |
| Reports to | Head of SEO | Their domain director; matrix to the Head of SEO |
| Mission | Build and run the golden path and shared capabilities for one stack | Get the stack's delivery teams to adopt them, and bring their friction back |
| Success | Time to first deploy, path reliability, satisfaction of path users | Teams active on the path, scorecard pass rate, vendor gap |
| Profile | Strong engineer with a product mindset who enjoys enabling others | Respected senior engineer or architect in that stack, good at persuasion |
| Team Topologies type | Platform team | Enabling role |

## Hiring order

1. **Platform Engineer for the first golden path's stack.** Nothing else can start without the path.
2. **Hub Leader for the same stack.** Adoption needs a trusted voice inside the delivery teams.
3. **Second stack pair** once the first path has three active teams.
4. **Remaining roles** as the roadmap reaches their stack.

Hire internally for Hub Leaders where possible; credibility with the teams matters more than platform experience.

## Role scorecard template (fill two in exercise L11)

| Field | Content |
| --- | --- |
| Role | |
| Mission in one sentence | |
| Outcomes in the first 12 months (three to five, measurable) | |
| Competencies | |
| Evidence to look for in interviews | |
| Signals of a poor fit | |

## Interview loop

| Stage | Assesses |
| --- | --- |
| Screening conversation | Motivation, product mindset |
| Technical depth in the stack | Credibility with the teams they will serve |
| Design exercise: "design the golden path for X and its adoption plan" | Scope judgement, empathy for users |
| Stakeholder conversation with a domain tech lead | Influence without authority |
| Head of SEO | Values, growth, how they handle disagreement |

## Leading the matrix roles

Hub Leaders do not report to the Head of SEO, so authority has to be replaced with:

- An agreed share of their time, written down with their director.
- Shared goals that appear in both their director's objectives and the office's.
- A weekly rhythm where they bring problems and leave with help.
- Visible credit: adoption wins are presented by the Hub Leader and the team.
- Data they can use with their own teams (scorecards, survey results by stack).

## Rituals

| Ritual | Cadence | Who |
| --- | --- | --- |
| One-to-one | Weekly | Head with each of the eight |
| Platform planning | Every two weeks | Head, engineers |
| Hub Leaders sync | Weekly | Head, Hub Leaders |
| Retrospective | Monthly | Whole office |
| Demo | Monthly | Whole office plus invited teams |
| Growth conversation | Quarterly | Head with each engineer |

## Growth

Each engineer has a development plan with one platform skill, one product skill and one stack skill per year. Certification budget covers the CNCF platform engineering track.
