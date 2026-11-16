# IDP practice as leadership

A hands-on practice for **leading** an Internal Developer Platform (IDP). You play the newly appointed head of a platform group at a fictional company. A local app gives you the situations the job would bring, tracks the documents you produce, and shows reviews of your work. An AI tool of your choice plays the people around you and examines you at checkpoints.

The focus is leadership: strategy, adoption, measurement, governance, budget, vendors, AI and people. There is no platform to install. The platform's data is mocked, so the work is reading numbers, deciding, writing and defending.

The company, **Kestrel Parcel**, is fictional and every figure is a practice figure.

## Quick start

Requires Python 3.10 or later.

```bash
# 1. Fork this repository on GitHub, then clone your fork
git clone https://github.com/<you>/idp-practice-as-leadership.git
cd idp-practice-as-leadership

# 2. Install the one dependency
pip install -r requirements.txt

# 3. Run the app
python3 app/server.py
```

Your browser opens at `http://127.0.0.1:8765`. Choose a pace and the app opens your brief from the CTO.

Then open the repository folder in an AI coding tool (Claude Code, Antigravity, Cursor, Copilot or similar) and say:

> Run mission s1 with me.

The tool reads `AGENTS.md`, plays the cast and challenges your answers. It will not write your documents.

## How the practice works

| Step | What you do | Where |
| --- | --- | --- |
| Read | The theory for the mission | Documents the mission lists |
| Note | Write it in your own words | `notes/study-notes.md` |
| Decide | Make the leadership decision and write the document | `leadership/` |
| See it work | Understand the mechanism behind it | `technical/` and the Data screen |
| Say it | Answer the mission's question aloud | To an AI agent |

Two paces:

- **Sprint:** four sessions of about 90 minutes, for when an interview is close.
- **Full simulation:** eleven missions that follow the first two quarters in the job, with four checkpoints and a final oral exam.

## What the app shows

| Screen | Purpose |
| --- | --- |
| Brief and inbox | Messages from the cast, arriving as you progress |
| Missions | Tasks to tick, tools to use, deliverables and their status |
| Data | Mock delivery metrics, survey, scorecards, spend and adoption funnel |
| Ledger | What your decisions cost against the budget, and your time |
| Scoreboard | Progress and review scores by competency |
| Checkpoints | Scored reviews with evidence quoted from your own documents |

The app detects whether each deliverable exists and is filled in. Quality is judged at checkpoints: ask your AI tool to "run the review-checkpoint skill for cp1" and reload the Checkpoints screen.

## Repository map

```
START-HERE.md        read this after the quick start
app/                 the practice app
practice/            missions, rubrics, mock data
progress/            your state and reviews (created when you start)
leadership/          the documents you will write and the templates for them
technical/           how an IDP works, at the depth a leader needs
notes/               your study notes; notes/private/ is ignored by Git
docs/                standards map, glossary, references
.claude/             skills (tutor, examiner) and the cast
scripts/             validation, progress check, data generator
```

## Keeping your work

Your fork is your workbook. Commit your documents and `progress/` as you go so the history shows how your thinking changed. Keep anything personal (real employers, interview details, your own career numbers) in `notes/private/`, which Git ignores.

## Checks

```bash
python3 scripts/validate.py         # files and references are consistent
python3 scripts/check_progress.py   # which deliverables are ready
python3 app/server.py --check       # the app's data loads
```

## Foundations

CNCF TAG App Delivery *Platforms White Paper* and *Platform Engineering Maturity Model*, DORA, SPACE, DevEx and DX Core 4 for measurement, and the FinOps Framework for cost. See [`docs/standards-map.md`](docs/standards-map.md) and [`docs/references.md`](docs/references.md).

## Limits

- The dataset is invented and small. It teaches how to read platform data, not what real numbers look like.
- AI reviews are a study aid. They follow the rubrics in `practice/rubrics.yaml` and can be wrong; argue with them.
- `technical/appendix/` holds an optional hands-on build plan and starter configuration that has never been run.
