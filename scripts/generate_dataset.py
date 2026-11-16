#!/usr/bin/env python3
"""Generate the mock dataset for Kestrel Parcel in practice/data/.

Everything here is invented. The generator is seeded, so the files are the
same every time. It plants a few problems for the learner to find; they are
listed in practice/rubrics.yaml under planted_findings.

    python3 scripts/generate_dataset.py
"""
from __future__ import annotations

import csv
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "practice" / "data"
QUARTERS = ["Q1", "Q2", "Q3", "Q4"]

# name, domain, stack, workforce, vendor, tier, developers, quarter joined golden path ("" = never), strength 0-1
TEAMS = [
    ("hub-sortation", "hub-operations", "java", "employee", "", 1, 26, "Q2", 0.85),
    ("parcel-scan", "hub-operations", "java", "employee", "", 1, 22, "Q2", 0.80),
    ("hub-capacity", "hub-operations", "python", "employee", "", 2, 12, "Q3", 0.70),
    ("route-planning", "last-mile", "java", "vendor", "altos-delivery", 1, 22, "", 0.30),
    ("dispatch", "last-mile", "java", "vendor", "altos-delivery", 1, 18, "", 0.35),
    ("proof-of-delivery", "last-mile", "mobile", "vendor", "altos-delivery", 1, 16, "Q4", 0.40),
    ("courier-app", "last-mile", "mobile", "employee", "", 1, 24, "", 0.60),
    ("tracking-portal", "customer", "typescript", "employee", "", 2, 22, "Q2", 0.90),
    ("checkout", "customer", "typescript", "employee", "", 1, 20, "Q3", 0.75),
    ("notifications", "customer", "typescript", "vendor", "brightline", 2, 14, "Q3", 0.65),
    ("customer-app", "customer", "mobile", "vendor", "brightline", 2, 18, "", 0.55),
    ("billing-core", "billing", "java", "employee", "", 2, 24, "Q3", 0.55),
    ("payments", "billing", "java", "employee", "", 2, 16, "", 0.60),
    ("invoicing", "billing", "java", "vendor", "altos-delivery", 2, 18, "", 0.30),
    ("forecasting", "data", "python", "employee", "", 2, 16, "Q4", 0.70),
    ("route-optimisation", "data", "python", "employee", "", 2, 18, "", 0.65),
    ("data-platform", "data", "python", "vendor", "brightline", 2, 20, "Q4", 0.60),
    ("pricing", "customer", "java", "vendor", "altos-delivery", 2, 16, "", 0.35),
    ("returns", "customer", "typescript", "vendor", "brightline", 2, 14, "", 0.55),
    ("address-quality", "data", "python", "vendor", "altos-delivery", 3, 12, "", 0.40),
    ("partner-api", "customer", "java", "employee", "", 2, 14, "Q4", 0.70),
    ("internal-tools", "corporate", "typescript", "employee", "", 3, 12, "Q3", 0.65),
    ("hr-systems", "corporate", "typescript", "vendor", "brightline", 3, 12, "", 0.50),
    ("fleet", "last-mile", "java", "employee", "", 2, 14, "", 0.50),
]
# Teams that record no deployment data until they join the path (incomplete baseline).
NO_FREQUENCY = {"invoicing", "address-quality", "hr-systems", "fleet"}


def write(name: str, header: list[str], rows: list[list]) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    with (OUT / name).open("w", newline="", encoding="utf-8") as fh:
        writer = csv.writer(fh)
        writer.writerow(header)
        writer.writerows(rows)


def on_path(joined: str, quarter: str) -> bool:
    return bool(joined) and QUARTERS.index(quarter) >= QUARTERS.index(joined)


def main() -> None:
    rnd = random.Random(20260101)

    write(
        "teams.csv",
        ["team", "domain", "stack", "workforce", "vendor", "tier", "developers", "golden_path_since"],
        [[t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7]] for t in TEAMS],
    )

    delivery, scorecards, spend = [], [], []
    for name, _domain, _stack, workforce, vendor, tier, devs, joined, strength in TEAMS:
        for quarter in QUARTERS:
            q = QUARTERS.index(quarter)
            path = on_path(joined, quarter)
            quarters_on = q - QUARTERS.index(joined) + 1 if path else 0

            lead = (200 - 150 * strength) * rnd.uniform(0.9, 1.1)
            freq = (0.4 + 4.0 * strength) * rnd.uniform(0.9, 1.1)
            fail = (0.34 - 0.30 * strength) * rnd.uniform(0.9, 1.1)
            recover = (240 - 190 * strength) * rnd.uniform(0.9, 1.1)
            rework = fail * rnd.uniform(0.5, 0.8)
            if path:
                gain = min(0.25 * quarters_on, 0.5)
                lead *= 1 - gain
                freq *= 1 + 1.2 * gain
                recover *= 1 - gain
                fail *= 1 - 0.3 * gain
            if name == "billing-core" and path:  # faster, but breaking more
                lead *= 0.6
                freq *= 1.5
                fail = 0.24 + 0.05 * quarters_on
                rework = fail * 0.8

            unknown = name in NO_FREQUENCY and not path
            delivery.append([
                name, quarter, "yes" if path else "no",
                "" if unknown else round(lead, 1),
                "" if unknown else round(freq, 1),
                round(fail * 100, 1), round(recover), round(rework * 100, 1),
            ])

            passed = 35 + 45 * strength + (25 if path else 0) + rnd.uniform(-5, 5)
            scorecards.append([name, quarter, round(min(passed, 99)), rnd.randint(0, 2) if path else rnd.randint(1, 5)])

            cloud = devs * (900 + 300 * (3 - tier)) * rnd.uniform(0.85, 1.15)
            spend.append([name, quarter, round(cloud), "yes"])

    for quarter in QUARTERS:  # spend with no owner: about a fifth
        total = sum(r[2] for r in spend if r[1] == quarter)
        spend.append(["(no owner tag)", quarter, round(total * rnd.uniform(0.24, 0.28)), "no"])

    write("delivery_metrics.csv",
          ["team", "quarter", "on_golden_path", "lead_time_hours", "deploys_per_week", "change_fail_rate_pct", "recovery_minutes", "rework_rate_pct"],
          delivery)
    write("scorecards.csv", ["team", "quarter", "pass_rate_pct", "open_exceptions"], scorecards)
    write("spend.csv", ["team", "quarter", "cloud_usd", "allocated"], spend)

    total_teams = len(TEAMS)
    funnel = []
    for quarter in QUARTERS:
        q = QUARTERS.index(quarter)
        active = sum(1 for t in TEAMS if on_path(t[7], quarter))
        funnel.append([quarter, total_teams, min(total_teams, 6 + 6 * q), min(total_teams, 3 + 6 * q), active + (1 if q else 0), active,
                       sum(1 for t in TEAMS if t[7] and QUARTERS.index(t[7]) <= q - 1)])
    write("funnel.csv", ["quarter", "teams_total", "aware", "onboarded", "activated", "active_weekly", "retained_90d"], funnel)

    survey = []
    for quarter in QUARTERS:
        q = QUARTERS.index(quarter)
        for workforce, invited, rate in (("employee", 240, 0.62), ("vendor", 180, 0.14)):
            responses = round(invited * (rate + 0.02 * q))
            base = 3.0 if workforce == "employee" else 2.6
            survey.append([quarter, workforce, invited, responses,
                           round(base + 0.15 * q, 1), round(base - 0.2 + 0.2 * q, 1), round(3.6 - 0.15 * q, 1),
                           round(6.5 - 0.6 * q, 1)])
    write("survey.csv",
          ["quarter", "workforce", "invited", "responses", "ease_of_delivery_1to5", "satisfaction_with_tooling_1to5",
           "tooling_gets_in_the_way_1to5", "hours_lost_per_week"],
          survey)

    ai = []
    for quarter in QUARTERS[1:]:
        q = QUARTERS.index(quarter)
        seats = 120 + 60 * q
        active = round(seats * (0.60 + 0.03 * q))
        ai.append([quarter, seats, active, seats - active, 39, round(seats * 39 * 3), round(seats * 4.5 * q * 3)])
    write("ai_usage.csv",
          ["quarter", "paid_seats", "weekly_active_users", "idle_seats", "seat_usd_per_month", "seat_cost_usd_quarter", "metered_overage_usd_quarter"],
          ai)

    print(f"Wrote {len(list(OUT.glob('*.csv')))} files to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
