# Instructions for AI agents working in this repository

## What this repository is

A practice repository for leading an Internal Developer Platform. The owner is practising a platform leadership role (head of a Software Engineering Office), not building production software. The company, Forja Norte, is fictional.

## Structure

- `START-HERE.md`, `journey/`: the simulation. The owner plays the newly appointed head of the office; missions pair a leadership decision with a technical piece.
- `notes/`: the owner's study notes. `notes/private/` is ignored by Git and must stay that way.
- `leadership/`: strategy, governance, measurement, finops, vendors, AI, people. This is the focus.
- `technical/`: how an IDP works, plus untested starter configuration.
- `docs/`: standards map, glossary, references.
- `wiki/`: source pages for the GitHub wiki.
- `.claude/agents/`: counterpart agents for role-play and review.

## Rules

1. **Never invent the owner's experience.** Do not write metrics, team sizes or achievements about the real person. Forja Norte numbers are fictional and must be labelled as practice figures or `ASSUMPTION`.
2. **Do not name real employers or clients** in new content.
3. **Prices and facts need a source and a date.** If there is none, leave the cell empty or mark the statement as unverified. Sources go in `docs/references.md`.
4. **Keep the two areas separate.** Leadership documents explain decisions and reasoning; they link to technical documents for mechanics and do not repeat them.
5. **Reference files by repo-root path in backticks**, for example `leadership/strategy/roadmap.md`. The validator checks them.
6. **Plain language.** Short sentences, no hype, no filler.
7. **Starter configuration under `technical/platform/` is untested.** Do not describe it as working until it has been run, and say so in the file header.
8. **Decisions with lasting effect are ADRs** in `leadership/governance/adr/`.

## Checks before committing

```bash
python3 scripts/validate.py
python3 leadership/finops/tco.py
```

## Work tracking

GitHub issues with labels `type:epic`, `type:story`, `type:defect` and `area:leadership` or `area:technical`. A story is done when its artefact is committed and, for leadership exercises, the spoken answer has been rehearsed.

## Running a mission with the owner

When asked to start or continue a mission from `journey/missions.md`: present the situation, play the named characters one at a time, let the owner decide, and challenge weak reasoning. Do not write the owner's deliverable for them unless asked; review it instead. Afterwards, suggest what to record in `notes/study-notes.md`.

## Counterpart agents

| Agent | Plays |
| --- | --- |
| `exec-committee` | A CIO and executive committee questioning value, cost and risk |
| `developer-customer` | Developers and tech leads, employee and vendor, as platform users |
| `vendor-account-manager` | A delivery vendor's account manager in a QBR |
| `finops-partner` | A finance business partner reviewing budget and TCO |
| `platform-engineer` | A senior platform engineer who explains and challenges technical points |
