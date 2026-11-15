# How we work

## Issues

| Label | Meaning |
| --- | --- |
| `type:epic` | A goal that groups stories |
| `type:story` | One piece of work with acceptance criteria |
| `type:defect` | Something wrong, unverified or broken in the repository |
| `area:leadership` | Leadership track |
| `area:technical` | Technical track |

Stories are sub-issues of their epic.

## Definition of done

- The artefact is committed.
- `python3 scripts/validate.py` passes.
- For leadership exercises, the answer has been rehearsed aloud.
- Facts and prices have a source and date.

## Pipelines

| Workflow | Runs on | Does |
| --- | --- | --- |
| `validate` | Every push and pull request | Checks YAML, CSV and file references, and runs the TCO model |
| `publish-wiki` | Changes under `wiki/` | Copies wiki pages from the repository to this wiki |

## Decisions

Lasting decisions are recorded as ADRs in `leadership/governance/adr/`.
