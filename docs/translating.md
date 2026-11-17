# Translating the practice

The app is bilingual (English and Spanish). English is the source; anything not translated is shown in English, so a partial translation is fine.

## What is translated today

| Part | Where | State |
| --- | --- | --- |
| App interface (menus, labels, messages, data column names) | `app/static/i18n.js` | Spanish complete |
| Missions: titles, situations, inbox messages, tasks, decisions and consequences, deliverable titles, questions, checkpoints, cast roles | `practice/i18n/es/missions.yaml` | Spanish complete |
| Rubrics: review criteria and scale | `practice/i18n/es/rubrics.yaml` | Spanish complete |
| Start guide and README | `START-HERE.es.md`, `README.es.md` | Spanish complete |
| Study documents in `leadership/`, `technical/`, `docs/` | `<name>.es.md` next to the English file | Not translated; shown in English with a notice |

## How the language is chosen

The dropdown at the top of the app sets `profile.lang` in `progress/state.json`. AI tools that follow `AGENTS.md` read that value and talk to the learner in that language. Files, ids, paths, agent names and commands are never translated.

## Translate a study document

1. Copy a document such as `leadership/strategy/roadmap.md` to the same name ending in `.es.md` and translate the text. Keep file paths and commands in backticks unchanged.
2. Open the document in the app with Spanish selected: the reader serves the `.es.md` version when it exists.

Deliverables the learner writes (for example `leadership/strategy/platform-charter.md`) stay one file; the learner may write in either language, and the review is in the language chosen in the app.

## Add another language

1. In `app/static/i18n.js`, add an object to `STRINGS` with the keys you translate, and, if you like, a column-name map like `COLUMNS_ES`.
2. Create `practice/i18n/<code>/missions.yaml` and `rubrics.yaml`, copying the structure of the Spanish files. Only text is overlaid; ids must match the English files.
3. Add the language's display name to `LANG_NAMES` in `app/server.py`.
4. Run `python3 app/server.py --check`. It fails if a translation refers to an id that does not exist.
