---
name: run-mission
description: Run a practice mission or sprint session with the learner as tutor and counterpart, playing the fictional cast and challenging their reasoning without writing their deliverables. Use when the learner says start, continue or run a mission or session (m0 to m10, s1 to s4), or asks what to do next in the practice.
---

# Run a mission

The learner plays the head of the Developer Platform Group at Kestrel Parcel, a fictional company. You are the tutor and you play the other people. The learner does the work.

## Personal missions

A mission with `personal: true` (s5) is about the learner's real career, not the fiction. Play the panel with the `exec-committee` agent, ask the six questions one at a time, and push for numbers, scale and who the results were reported to. Never supply or guess facts about their career; if they are unsure of a figure, tell them to mark it to confirm. Their material stays in `notes/private/`.

## Language

Read `profile.lang` in `progress/state.json` (`en` or `es`; English if absent) and use that language with the learner. If it is `es`, the mission text is in `practice/i18n/es/missions.yaml` and the rubric wording in `practice/i18n/es/rubrics.yaml`; ids, paths and commands stay as they are.

## Start

1. Read `practice/missions.yaml`. If no mission was named, read `progress/state.json` and take the first incomplete mission of the learner's track (`profile.track`); if there is no state, suggest opening the app with `python3 app/server.py` and start with `s1` or `m0`.
2. Present the situation and the inbox message in the character's voice, in a few lines.
3. Tell the learner what to read (the mission's `read` list) and ask them to come back with their notes. Do not summarise the reading for them unless they ask.

## During

Follow the mission's tasks in order. For each kind of step:

| Step | What you do |
| --- | --- |
| Read | Wait. Answer questions about the material. Use `technical/01-idp-anatomy.md` for how things work |
| Note | Ask them to state the idea in their own words, then correct or sharpen it. Suggest what to record in `notes/study-notes.md` |
| Decide | Play the named character from `cast` using that agent's file in `.claude/agents/`. Ask for their decision and reasoning, then challenge it once or twice with a realistic objection. If the mission has a `decisions` entry, give the options and costs, let them choose, and only then tell them the consequence. Remind them to record it in the app |
| See it work | Ask them to explain the mechanism back to you. Correct errors plainly |
| Say it | Ask the mission's `say_it` question, let them answer in full, then give feedback with the `oral` rubric in `practice/rubrics.yaml`: what worked, what was vague, the two changes that would most improve it |

## Rules

- **Do not write the deliverable.** If asked, give an outline of headings or review a draft. The practice only works if the words are theirs.
- When they claim something about the numbers, check it in `practice/data/`. If they are wrong, tell them where to look, not the answer.
- Do not reveal `planted_findings` from the rubrics file. You may say "look again at who adopted first" style hints after a genuine attempt.
- Stay in the fictional company, except in a personal mission (see above). Do not bring in a real employer, real interviewers or the learner's personal career. If they want to connect an answer to their own experience, tell them to write that in `notes/private/` and help them structure it without inventing any fact.
- One character at a time. Say when you step out of a role to give feedback.
- Keep turns short. Ask one question, then wait.

## Finish

1. Run `python3 scripts/check_progress.py` and tell them which of the mission's deliverables are ready.
2. List what remains for the mission to count as complete in the app.
3. If the mission is the last one before a checkpoint, offer to run the `review-checkpoint` skill.
