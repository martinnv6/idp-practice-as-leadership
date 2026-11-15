#!/usr/bin/env python3
"""Create the epics, stories and defects in scripts/backlog.yaml as GitHub
issues, using the GitHub CLI with your own login.

Untested against GitHub. Try it first with --dry-run.

    python3 scripts/create_issues.py --dry-run
    python3 scripts/create_issues.py

Stories are attached to their epic as sub-issues. If that API call fails, the
story still carries a "Part of #N" line. Running the script twice creates
duplicates; it is meant to be run once.
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

import yaml

REPO = "martinnv6/idp-practice-as-leadership"
ROOT = Path(__file__).resolve().parent.parent


def gh(args: list[str], dry: bool) -> str:
    if dry:
        return ""
    result = subprocess.run(["gh", *args], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  gh failed: {result.stderr.strip()}", file=sys.stderr)
        return ""
    return result.stdout.strip()


def create(title: str, body: str, labels: list[str], milestone: str | None, dry: bool) -> tuple[int | None, int | None]:
    """Return (issue number, issue database id)."""
    print(f"- {title}  [{', '.join(labels)}]" + (f"  ({milestone})" if milestone else ""))
    if dry:
        return None, None
    args = ["issue", "create", "--repo", REPO, "--title", title, "--body", body]
    for label in labels:
        args += ["--label", label]
    if milestone:
        args += ["--milestone", milestone]
    url = gh(args, dry)
    if not url:
        return None, None
    number = int(url.rstrip("/").split("/")[-1])
    raw = gh(["api", f"repos/{REPO}/issues/{number}", "--jq", ".id"], dry)
    return number, int(raw) if raw else None


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    dry = ap.parse_args().dry_run

    data = yaml.safe_load((ROOT / "scripts" / "backlog.yaml").read_text(encoding="utf-8"))
    milestones = data.get("milestones", {})
    epic_numbers: dict[str, int | None] = {}

    print("Epics")
    for epic in data["epics"]:
        number, _ = create(
            f"[Epic] {epic['title']}",
            epic["body"],
            ["type:epic", f"area:{epic['area']}"],
            milestones.get(epic.get("milestone")),
            dry,
        )
        epic_numbers[epic["key"]] = number

    print("Stories")
    for story in data["stories"]:
        parent = epic_numbers.get(story["epic"])
        checklist = "\n".join(f"- [ ] {item}" for item in story["acceptance"])
        body = f"## Story\n{story['story']}\n\n## Acceptance criteria\n{checklist}\n"
        body += f"\nPart of #{parent}\n" if parent else f"\nPart of epic {story['epic']}\n"
        number, issue_id = create(
            f"[Story] {story['title']}",
            body,
            ["type:story", f"area:{story['area']}"],
            milestones.get(story.get("milestone")),
            dry,
        )
        if parent and issue_id:
            gh(["api", "-X", "POST", f"repos/{REPO}/issues/{parent}/sub_issues", "-F", f"sub_issue_id={issue_id}"], dry)

    print("Defects")
    for defect in data["defects"]:
        area = defect["area"] if defect["area"] in ("leadership", "technical") else "technical"
        body = f"## Kind\n{defect['kind']}\n\n## What is wrong\n{defect['what']}\n\n## What it should be, or how to verify\n{defect['expected']}\n"
        create(f"[Defect] {defect['title']}", body, ["type:defect", f"area:{area}"], None, dry)

    total = len(data["epics"]) + len(data["stories"]) + len(data["defects"])
    print(f"{total} issues" + (" (dry run, nothing created)" if dry else ""))


if __name__ == "__main__":
    main()
