# Start here

*En español: [`START-HERE.es.md`](START-HERE.es.md). The app has a language menu at the top left.*

You have been appointed head of the Developer Platform Group at Kestrel Parcel, a fictional parcel logistics company. This repository is your desk for the next two quarters.

## 1. Run the app

```bash
pip install -r requirements.txt
python3 app/server.py
```

Choose **Sprint** or **Full simulation**. The first screen is your brief from the CTO, Elena Ríos. Read it; everything you do here is your answer to it.

## 2. Open the repository in an AI tool

Any tool that reads a repository works. Start with:

> Run mission s1 with me.

or `m0` for the full simulation. The tool follows `AGENTS.md`: it presents the situation, plays the people in it, questions your reasoning and gives feedback on your spoken answers. It does not write your documents.

## 3. Work a mission

Each mission has five steps.

| Step | What you do |
| --- | --- |
| **Read** | The documents the mission lists, plus your own study material |
| **Note** | The theory in your own words, in `notes/study-notes.md` |
| **Decide** | A decision and a document, written as the head of the group. Some decisions cost budget; record them in the app |
| **See it work** | The mechanism behind the decision: read the technical page or the data |
| **Say it** | Answer the mission's question aloud, then to the agent |

Tick tasks in the app as you go. Deliverables turn to "Ready" when the file exists and is filled in.

## 4. Get reviewed

At each checkpoint, say to your AI tool:

> Run the review-checkpoint skill for cp1.

It scores every deliverable against the rubric from 0 to 3, quoting your own text as evidence, and writes the result where the app can show it. A deliverable passes at an average of 2 with no zeros. Revise and ask again; the history is kept.

The final checkpoint includes a timed oral exam: a ten-minute report to the executive committee and twenty minutes of questions.

## The people

All fictional. Each is played by an agent in `.claude/agents/`.

| Person | Role |
| --- | --- |
| Elena Ríos | CTO. Came up through operations and finance |
| Tomás Leal | VP of Engineering, your manager |
| Paula | Platform engineer, pipelines and runtime |
| Hugo | Guild Lead, backend |
| Ana | Employee developer, hub sortation |
| Victor | Contractor developer, route planning |
| Marcela Ibarra | Account manager at Altos Delivery, a vendor |
| Lucía Montes | Finance business partner |
| Iván Cano | Head of information security |

## Working habits

- Commit after every mission. The history is your record.
- Write rough, then improve after the review.
- When an agent challenges an answer, put the better answer in section 10 of your notes.
- The data has things in it that a careful reader finds and a hurried one gets wrong. Do not open `practice/rubrics.yaml` looking for them.

## Keep private things private

If your fork is public, keep real employers, interview details and your own career numbers in `notes/private/`, which Git ignores. Kestrel Parcel material and general theory are fine in the open.

## If you only have an hour

Do sprint session 1: read the role, the scenario and the anatomy of an IDP, rewrite the charter's mission in your own words, and answer aloud: "If you had this role, how would you start the creation, implementation and control of the platform?"
