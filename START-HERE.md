# Start here

This repository is a simulation. You play the person who has just been appointed head of the Software Engineering Office at Forja Norte, a fictional steel producer. You learn the theory, then use it the same day on a situation the job would really put in front of you.

## Day one: your brief

> **From:** Elena Ríos, CIO
> **To:** Head of Software Engineering Office
> **Subject:** Welcome, and what I need from you
>
> Welcome. Here is the situation as I see it.
>
> We have about 600 people writing software for us: around 100 employees and 500 contractors from three delivery vendors. They work in four stacks (SAP, Microsoft, Java and Data) and every team builds, tests and deploys in its own way. New people take weeks to become productive. I cannot tell you how often we deploy, how often it fails or what our tooling costs per developer.
>
> The new plant starts up next year and will depend on software more than any plant we have run. I need delivery to be faster, safer and predictable before then.
>
> Your office owns the internal developer platform. You have four platform engineers and four Hub Leaders who sit in the delivery areas and do not report to you. I do not want a tools project. I want teams to choose the platform because it makes their work easier, and I want numbers I can take to the executive committee.
>
> In 30 days tell me what hurts most and how you will measure it. In 60 days show me one team working differently. In 90 days bring me a roadmap, a budget and the first results.
>
> Tomás Leal, your director, will introduce you to the team.
>
> Elena

Everything you do in this repository is your answer to that message.

## The people you will deal with

All fictional.

| Person | Role | Played by |
| --- | --- | --- |
| Elena Ríos | CIO. Industrial engineer, thinks in flow, cost and risk | `exec-committee` agent |
| Tomás Leal | IT Senior Director, your manager | `exec-committee` agent |
| Paula | Platform engineer, Microsoft stack | `platform-engineer` agent |
| Hugo | Hub Leader, Microsoft stack | `developer-customer` agent |
| Ana | Employee developer, production tracking | `developer-customer` agent |
| Victor | Vendor developer, yard management | `developer-customer` agent |
| Marcela Ibarra | Account manager, Altos Delivery (vendor) | `vendor-account-manager` agent |
| Lucía Montes | Finance business partner | `finops-partner` agent |
| Iván Cano | Head of information security | `platform-engineer` agent |

## How each mission works

Every mission in `journey/missions.md` has the same five steps.

| Step | What you do | Where |
| --- | --- | --- |
| 1. Read | The theory for this mission | Your study sheet and the documents the mission lists |
| 2. Note | Write what you learned in your own words | `notes/study-notes.md` |
| 3. Decide | The leadership move: a decision and a document | `leadership/` |
| 4. See it work | The technical move: understand it, and build it if you want | `technical/` |
| 5. Say it | Answer the mission's question aloud in five minutes | To an agent or a recorder |

A mission is finished when the document is committed and the answer has been said aloud.

The technical move always has two levels. **Understand** takes about 30 minutes and needs no installation. **Build** is optional and needs Docker.

## Two ways through

| Pace | For | File |
| --- | --- | --- |
| Sprint | A few sessions before an interview. Covers the questions most likely to be asked | `journey/sprint.md` |
| Full simulation | Eleven missions that follow the first two quarters in the job | `journey/missions.md` |

Do the sprint first if an interview is close. The full simulation repeats nothing from the sprint; it goes deeper.

## Set up (10 minutes)

```bash
git clone https://github.com/martinnv6/idp-practice-as-leadership.git
cd idp-practice-as-leadership
pip install pyyaml
python3 scripts/validate.py
python3 leadership/finops/tco.py
```

Both commands should finish without errors. Then open `journey/sprint.md` or `journey/missions.md`.

## Working habits

- One branch per mission, one pull request, closed against the mission's issue. This is how a real platform team works and it gives you a history to look back on.
- Commit the document even when it is rough. Improve it in the next mission.
- When an agent challenges an answer, write the improved answer in your notes.

## Keep private things private

This repository is public. Interview details, names of real people and companies, salary and anything from your own career that you would not publish belong in `notes/private/`, which Git ignores. Forja Norte material and general theory are fine in the open.
