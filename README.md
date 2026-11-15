# IDP practice as leadership

A practice repository for **leading** an Internal Developer Platform (IDP): setting its strategy, governing it, measuring adoption, managing its money and vendors, and reporting it to executives. A second, smaller area explains how an IDP works technically, so the leader can discuss it with engineers.

The company in it, **Forja Norte**, is fictional. Every number marked `ASSUMPTION` is a placeholder.

## Two areas

| Area | Question it answers | Start here |
| --- | --- | --- |
| [`leadership/`](leadership/) | What does the head of a platform office decide, produce and report? | [`leadership/README.md`](leadership/README.md) |
| [`technical/`](technical/) | What are the parts of an IDP and how do they fit together? | [`technical/01-idp-anatomy.md`](technical/01-idp-anatomy.md) |

Shared reference material (standards, glossary, sources) is in [`docs/`](docs/).

## The role being practised

Head of a Software Engineering Office: one leader, four platform engineers (SAP, Microsoft, Java, Data) and four matrix Hub Leaders, serving about 600 developers of whom about 500 are contractors. The role is an internal product leader whose customers are developers. See [`leadership/01-role-and-operating-model.md`](leadership/01-role-and-operating-model.md).

## How to practise

1. Read the scenario: [`leadership/02-scenario.md`](leadership/02-scenario.md).
2. Follow the leadership practice plan: [`leadership/03-practice-plan.md`](leadership/03-practice-plan.md). Fourteen exercises, each ending in an artefact a real leader would produce and a five-minute spoken answer.
3. Read [`technical/01-idp-anatomy.md`](technical/01-idp-anatomy.md) once, so the vocabulary is concrete.
4. Optional: build parts of the lab with [`technical/04-build-plan.md`](technical/04-build-plan.md).

Work is tracked as GitHub issues: epics, stories and defects, labelled `area:leadership` or `area:technical`.

## Repository map

```
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
