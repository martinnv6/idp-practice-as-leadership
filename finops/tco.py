#!/usr/bin/env python3
"""Three-year TCO for the platform scenarios in scenarios.csv.

Every figure in scenarios.csv is an ASSUMPTION for practice. Replace the
inputs with real quotes and loaded people costs before using the output.

Usage:
    python3 finops/tco.py
    python3 finops/tco.py --developers 300 --years 3
"""
from __future__ import annotations

import argparse
import csv
from pathlib import Path

HERE = Path(__file__).resolve().parent


def load_scenarios(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))
    numeric = [
        "one_time_implementation_usd",
        "portal_seat_usd_month",
        "metrics_seat_usd_month",
        "infra_usd_month",
        "platform_fte",
        "loaded_fte_cost_usd_year",
        "training_usd_year",
    ]
    for row in rows:
        for key in numeric:
            row[key] = float(row[key])
    return rows


def tco(row: dict, developers: int, years: int) -> dict:
    seats_year = (row["portal_seat_usd_month"] + row["metrics_seat_usd_month"]) * developers * 12
    infra_year = row["infra_usd_month"] * 12
    people_year = row["platform_fte"] * row["loaded_fte_cost_usd_year"]
    run_year = seats_year + infra_year + people_year + row["training_usd_year"]
    total = row["one_time_implementation_usd"] + run_year * years
    return {
        "scenario": row["scenario"],
        "licences_year": seats_year,
        "infra_year": infra_year,
        "people_year": people_year,
        "run_year": run_year,
        "total": total,
        "per_dev_month": total / (developers * 12 * years),
        "people_share": people_year / run_year if run_year else 0.0,
    }


def break_even_developers(a: dict, b: dict, years: int) -> float | None:
    """Developer count at which scenario a and b cost the same over the period.

    Total(n) = fixed + seat_month * n * 12 * years. Returns None when the
    per-seat prices are equal (the lines never cross).
    """

    def fixed(row: dict) -> float:
        return row["one_time_implementation_usd"] + years * (
            row["infra_usd_month"] * 12
            + row["platform_fte"] * row["loaded_fte_cost_usd_year"]
            + row["training_usd_year"]
        )

    def seat(row: dict) -> float:
        return (row["portal_seat_usd_month"] + row["metrics_seat_usd_month"]) * 12 * years

    slope = seat(b) - seat(a)
    if slope == 0:
        return None
    return (fixed(a) - fixed(b)) / slope


def licence_cost_at_sizes(path: Path, sizes: list[int]) -> list[tuple]:
    out = []
    with path.open(newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            price = row["list_price_usd_per_unit_month"].strip()
            if not price or row["pricing_unit"] != "user":
                continue
            p = float(price)
            if p == 0:
                continue
            out.append((f'{row["product"]} {row["plan"]}'.strip(), p, [p * n * 12 for n in sizes]))
    return out


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--developers", type=int, default=600)
    ap.add_argument("--years", type=int, default=3)
    args = ap.parse_args()

    rows = load_scenarios(HERE / "scenarios.csv")
    results = [tco(r, args.developers, args.years) for r in rows]

    print(f"Platform TCO over {args.years} years for {args.developers} developers")
    print("Inputs are ASSUMPTIONS from scenarios.csv. Replace before use.\n")
    header = f'{"scenario":<8}{"licences/yr":>14}{"infra/yr":>12}{"people/yr":>12}{"run/yr":>12}{"total":>14}{"USD/dev/mo":>12}{"people %":>10}'
    print(header)
    print("-" * len(header))
    for r in results:
        print(
            f'{r["scenario"]:<8}{r["licences_year"]:>14,.0f}{r["infra_year"]:>12,.0f}'
            f'{r["people_year"]:>12,.0f}{r["run_year"]:>12,.0f}{r["total"]:>14,.0f}'
            f'{r["per_dev_month"]:>12.2f}{r["people_share"]:>10.0%}'
        )

    by_name = {r["scenario"]: r for r in rows}
    if "build" in by_name and "buy" in by_name:
        n = break_even_developers(by_name["build"], by_name["buy"], args.years)
        print()
        if n is None or n <= 0:
            print("Build vs. buy: no break-even point with these inputs.")
        else:
            print(f"Build vs. buy break-even: about {n:,.0f} developers. Above that, build is cheaper with these inputs.")

    sizes = [50, args.developers // 2, args.developers]
    lic = licence_cost_at_sizes(HERE / "licenses.csv", sizes)
    if lic:
        print("\nAnnual seat cost at list price (per-user products with a verified price in licenses.csv)")
        head = f'{"product":<34}{"USD/user/mo":>12}' + "".join(f"{str(n) + ' users':>16}" for n in sizes)
        print(head)
        print("-" * len(head))
        for name, p, costs in lic:
            print(f"{name:<34}{p:>12.2f}" + "".join(f"{c:>16,.0f}" for c in costs))
        print("Metered usage (for example AI credits beyond the included amount) is not included.")


if __name__ == "__main__":
    main()
