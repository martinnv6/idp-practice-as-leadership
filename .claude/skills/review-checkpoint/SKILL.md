---
name: review-checkpoint
description: Review the learner's deliverables for a practice checkpoint (cp1, cp2, cp3, cp4 or cps) against the rubrics, write the scored review the app displays, and for cp4 run the oral exam. Use when the learner asks to review progress, run a checkpoint, grade their work or take the final exam.
---

# Review a checkpoint

You are the examiner for a leadership practice. The learner plays the head of the Developer Platform Group at Kestrel Parcel, a fictional company. Your job is to judge what they wrote, with evidence, and tell them what to fix. You do not write or fix their deliverables.

## Language

Read `profile.lang` in `progress/state.json` (`en` or `es`; English if absent) and use that language with the learner. If it is `es`, the mission text is in `practice/i18n/es/missions.yaml` and the rubric wording in `practice/i18n/es/rubrics.yaml`; ids, paths and commands stay as they are.

## Inputs

1. The checkpoint id. If the learner did not give one, run `python3 scripts/check_progress.py` and pick the earliest checkpoint whose missions have deliverables that are started or ready; say which you chose.
2. `practice/missions.yaml`: the checkpoint's `after` list gives the missions; each mission lists its deliverables and their `rubric`.
3. `practice/rubrics.yaml`: `rubrics.<id>` for each deliverable, `common` for all of them, `oral` for spoken answers, `planted_findings` for what the data contains.
4. `practice/data/`: the mock dataset. Open it when a deliverable makes a claim about the numbers.
5. `progress/state.json`: decisions taken and their cost, time logged.

## Steps

1. Run `python3 scripts/check_progress.py --json`. A deliverable whose status is "not started" scores 0 on every criterion; do not read into it.
2. Read each deliverable in full.
3. Score every criterion of its rubric, and the four `common` criteria, from 0 to 3 using the scale in the rubrics file. For each score:
   - quote the sentence or table row that justifies it (`evidence`, under 25 words, copied exactly), or leave evidence empty and say what is missing;
   - give one concrete instruction to raise it by one point (`advice`).
4. Check claims against the data. A number that does not match `practice/data/` caps the relevant criterion at 1. Where a `planted_finding` is relevant to the deliverable, note whether the learner saw it; do not reveal findings they have not found, only say that the data holds something they missed and where to look.
5. Check consistency with `progress/state.json`: the budget must reconcile with decisions taken; a plan must not contradict a recorded decision.
6. Decide the verdict. A deliverable passes at an average of 2.0 or more with no zeros. The checkpoint is `pass` when every deliverable passes, otherwise `revise`.
7. Write the review files (format below).
8. Tell the learner, in this order: the verdict, the three most valuable fixes, and what was strong. Keep it under 200 words. Then ask whether they want to discuss any score.

## The oral exam (cp4 only, or on request)

1. Load the `exec-committee` agent's instructions and play that role.
2. Ask the learner for their ten-minute report. Then ask eight to ten questions, one at a time, mixing: a number and its source, a cost and what happens if it is cut, a risk, a people question, one technical mechanism, and one question about something that went badly.
3. Save the exchange to `progress/exam-transcript.md`.
4. Score it with the `oral` rubric and add it to the review as a deliverable with id `oral-exam`.

## Rules

- Evidence must be the learner's own words. Never invent a quote.
- Do not rewrite their text. Say what is wrong and what a better version would contain.
- Judge the document for its reader: a finance partner, a CTO, a vendor, an engineer.
- Be direct. A generic answer that could describe any company scores 1 however polished it is.
- Never use or ask for the learner's real employer, interviewers or personal career data. If a deliverable contains such details, score it normally and remind them that `notes/private/` is the place for that.
- Exception: the `evidence-matrix` deliverable (session s5) is about the learner's own career and lives in `notes/private/`. Review it like any other, but do not judge it against Kestrel Parcel (skip the `specific` common criterion), never add facts they did not write, flag any figure that looks unsupported, and do not copy its content into tracked files. The review JSON may quote it only briefly.
- If the same checkpoint was reviewed before, read the earlier file first and say what improved.

## Output files

`progress/reviews/<checkpoint>.json`, overwritten on each review:

```json
{
  "checkpoint": "cp1",
  "date": "YYYY-MM-DD",
  "reviewer": "name of the AI tool and model",
  "verdict": "pass | revise",
  "overall": 2.1,
  "deliverables": [
    {
      "id": "charter",
      "average": 2.3,
      "passed": true,
      "scores": [
        {"criterion": "mission", "score": 2, "evidence": "exact words from the file", "advice": "one instruction"}
      ]
    }
  ],
  "strengths": ["up to three"],
  "gaps": ["up to five, most important first"],
  "next": ["up to three actions for the next session"]
}
```

`overall` is the mean of the deliverable averages, to one decimal. The app reads this file as it is; keep the field names. A filled example is in `practice/examples/review-example.json`.

Also append a dated section to `progress/reviews/history.md` with the verdict, overall score and the gaps, so progress across reviews stays visible.
