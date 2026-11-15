# IDP practice as leadership

A practice repository for **leading** an Internal Developer Platform (IDP): setting its strategy, governing it, measuring adoption, managing its money and vendors, and reporting it to executives. A second, smaller area explains how an IDP works technically, so the leader can discuss it with engineers.

The company in it, **Forja Norte**, is fictional. Every number marked `ASSUMPTION` is a placeholder.

**New here? Open [`START-HERE.md`](START-HERE.md).** It gives you the brief from the fictional CIO and the missions that follow it.

## Two areas

| Area | Question it answers | Start here |
| --- | --- | --- |
| [`leadership/`](leadership/) | What does the head of a platform office decide, produce and report? | [`leadership/README.md`](leadership/README.md) |
| [`technical/`](technical/) | What are the parts of an IDP and how do they fit together? | [`technical/01-idp-anatomy.md`](technical/01-idp-anatomy.md) |

Shared reference material (standards, glossary, sources) is in [`docs/`](docs/).

## The role being practised

Head of a Software Engineering Office: one leader, four platform engineers (SAP, Microsoft, Java, Data) and four matrix Hub Leaders, serving about 600 developers of whom about 500 are contractors. The role is an internal product leader whose customers are developers. See [`leadership/01-role-and-operating-model.md`](leadership/01-role-and-operating-model.md).

## How to practise

1. Read [`START-HERE.md`](START-HERE.md): your brief, the cast and how a mission works.
2. If an interview is close, do [`journey/sprint.md`](journey/sprint.md): four sessions.
3. Otherwise follow [`journey/missions.md`](journey/missions.md): eleven missions over the first two quarters in the job. Each pairs a leadership decision with the technical piece that makes it real.
4. Write the theory in your own words in [`notes/study-notes.md`](notes/study-notes.md) as you go.

Work is tracked as GitHub issues: epics, stories and defects, labelled `area:leadership` or `area:technical`.

## Repository map

```
journey/         the missions and the sprint
notes/           study notes (notes/private/ is ignored by Git)
leadership/      strategy, governance, measurement, finops, vendors, ai, people
technical/       anatomy, architecture, tooling options, build plan, golden-path design, starter config
docs/            standards map, glossary, references
wiki/            source pages for the GitHub wiki
.github/         issue forms, pull-request template, workflows
.claude/agents/  role-play and review agents for practice
scripts/         validation and GitHub bootstrap
```

## Status

| Item | State |
| --- | --- |
| Leadership documents and templates | Drafted; exercises not yet done |
| Technical starter configuration (`technical/platform/`) | Untested. Passes a YAML syntax check only |
| CI workflow | Validates YAML, CSV, internal references and runs the TCO script |

## Foundations

CNCF TAG App Delivery *Platforms White Paper* and *Platform Engineering Maturity Model* (the base of the CNPA and CNPE certifications), DORA, SPACE, DevEx and DX Core 4 for measurement, and the FinOps Framework for cost. See [`docs/standards-map.md`](docs/standards-map.md).
