# Instructions for AI agents working in this repository

## What this repository is

A practice for leading an Internal Developer Platform. The learner plays the head of the Developer Platform Group at **Kestrel Parcel**, a fictional parcel logistics company, and works through missions that end in leadership documents. A local app tracks progress; AI tools act as tutor, counterpart and examiner.

The learner is studying. The value is in their own thinking and words.

## Load this context first

| Read | For |
| --- | --- |
| `START-HERE.md` | How the practice works |
| `leadership/02-scenario.md` | The company, the group, the constraints |
| `practice/missions.yaml` | Missions, tasks, deliverables, decisions, cast, checkpoints |
| `practice/rubrics.yaml` | How deliverables and spoken answers are judged |
| `progress/state.json` (if present) | Where the learner is |

## Three jobs you may be asked to do

| Job | Instructions |
| --- | --- |
| Tutor and counterpart for a mission | `.claude/skills/run-mission/SKILL.md` |
| Examiner at a checkpoint or the final exam | `.claude/skills/review-checkpoint/SKILL.md` |
| A specific character | The matching file in `.claude/agents/` |

If your tool does not load skills automatically, open the file and follow it.

## Rules

1. **Do not write the learner's deliverables.** Outline, question, review and challenge. Write for them only when they explicitly ask for an example, and label it as an example.
2. **Stay in the fiction.** Do not name or ask about real employers, clients, interviewers or the learner's career. Personal material belongs in `notes/private/`, which Git ignores. Never invent facts about the learner.
3. **Kestrel Parcel figures are practice figures.** Money, team sizes and metrics are invented. Do not present them as benchmarks.
4. **Check claims against `practice/data/`.** Do not reveal the `planted_findings` in the rubrics file before the learner has found them.
5. **Facts about the real world need a source and a date** in `docs/references.md`, or a clear "unverified" label.
6. **Reference files by repo-root path in backticks.** The validator checks them.
7. **Plain language.** Short sentences, no hype.
8. **Language.** Read `profile.lang` in `progress/state.json` (`en` or `es`, English if absent). Talk to the learner, play the cast and write reviews in that language. Never translate ids, file paths, commands or agent names, and quote the learner's own words in the language they wrote them. Spanish texts of the missions are in `practice/i18n/es/`.
9. **The technical appendix is optional and untested.** `technical/appendix/` holds a hands-on build plan and starter configuration that has never been run. The practice does not require it.

## Structure

```
START-HERE.md        how to begin
app/                 local practice app (python3 app/server.py)
practice/            missions, rubrics, mock data, examples
progress/            the learner's state and reviews (created on first use)
leadership/          the documents a platform leader produces
technical/           how an IDP works; appendix/ is the optional build
notes/               study notes; notes/private/ is ignored by Git
docs/                standards map, glossary, references
.claude/skills/      run-mission, review-checkpoint
.claude/agents/      the cast
scripts/             validate, check_progress, generate_dataset
```

## Checks before committing

```bash
python3 scripts/validate.py
python3 scripts/check_progress.py
python3 app/server.py --check
```

If you change a template that a mission lists as an `edit` deliverable, or the mission data itself, run `python3 scripts/check_progress.py --write-baseline` so unchanged templates are not counted as work.

## Cast

| Agent | Plays |
| --- | --- |
| `exec-committee` | The CTO, the VP of Engineering and the executive committee |
| `developer-customer` | Developers, tech leads and Guild Leads, employee and vendor |
| `vendor-account-manager` | The delivery vendor's account manager |
| `finops-partner` | The finance business partner |
| `platform-engineer` | A senior platform engineer; also plays the head of security |
