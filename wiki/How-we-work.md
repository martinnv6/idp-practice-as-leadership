# How we work

## Tracking

Progress is tracked by the practice app (`python3 app/server.py`), not by issues. The app reads the missions in `practice/missions.yaml`, checks whether each deliverable exists and is filled in, and stores what you tick in `progress/state.json`.

## Definition of done for a mission

- Every task is ticked.
- Every deliverable is "Ready".
- Any budget decision is recorded.
- The mission's question has been answered aloud.

## Reviews

At each checkpoint an AI reviewer scores the deliverables against `practice/rubrics.yaml`, from 0 to 3 per criterion, quoting the learner's own text. A deliverable passes at an average of 2 with no zeros. Reviews are saved under `progress/reviews/` and shown in the app.

## Pipelines

| Workflow | Runs on | Does |
| --- | --- | --- |
| `validate` | Every push and pull request | Checks YAML, CSV and file references, that the app's data loads, that the mock dataset is reproducible, and runs the TCO model |
| `publish-wiki` | Changes under `wiki/` | Copies wiki pages from the repository to this wiki |

## Decisions

Lasting decisions are recorded as ADRs in `leadership/governance/adr/`.
