# Mock data for Kestrel Parcel

Invented data for one year, four quarters. It stands in for what a platform leader would pull from source control, pipelines, the survey tool, scorecards and billing. Nothing here was measured anywhere.

| File | One row per | Columns worth knowing |
| --- | --- | --- |
| `teams.csv` | Team | Stack, employee or vendor, tier, developers, quarter it joined the golden path (empty if never) |
| `delivery_metrics.csv` | Team and quarter | Lead time, deployments per week, change fail rate, recovery time, rework rate, on the path or not |
| `scorecards.csv` | Team and quarter | Production-readiness pass rate, open exceptions |
| `funnel.csv` | Quarter | Teams aware, onboarded, activated, active weekly, retained |
| `survey.csv` | Quarter and workforce type | Invited, responses, four scores |
| `spend.csv` | Team and quarter | Cloud spend, and whether it has an owner tag |
| `ai_usage.csv` | Quarter | Paid seats, weekly active users, idle seats, cost |

## How to use it

- Open the Data screen in the app, or open the files in a spreadsheet.
- Treat Q1 as the baseline: the platform's first golden path went live in Q2.
- Before you believe a comparison, ask who is being compared with whom.
- Empty cells mean the number was never recorded. That is information too.

## What it is for

The missions ask you to read these numbers, decide something and defend it. The data contains several things a careful reader should notice and a careless one will get wrong. They are listed for the reviewer in `practice/rubrics.yaml`; reading that list first spoils the exercise.

Regenerate with `python3 scripts/generate_dataset.py`. The output is the same every time.
