#!/usr/bin/env python3
"""Repository checks: YAML parses, CSV rows are rectangular, and file
references written as repo-root paths in backticks or as relative markdown
links point at something that exists.

Run from the repository root:  python3 scripts/validate.py
"""
from __future__ import annotations

import csv
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {".git", "node_modules", ".venv"}
TOP_LEVEL = ("leadership", "technical", "docs", "wiki", "scripts", ".github", ".claude")

# Files that exercises ask the practitioner to create later.
PLANNED = {
    "leadership/strategy/discovery-notes.md",
    "leadership/strategy/adoption-plan.md",
    "leadership/ai/rollout-plan.md",
    "leadership/governance/exceptions",
    "technical/lab/log/phase-N.md",
}

BACKTICK_PATH = re.compile(r"`((?:%s)/[^`\s*<>]+)`" % "|".join(re.escape(t) for t in TOP_LEVEL))
MD_LINK = re.compile(r"\]\(([^)#]+?)(?:#[^)]*)?\)")


def files(*suffixes: str):
    for path in ROOT.rglob("*"):
        if path.is_file() and path.suffix in suffixes and not SKIP_DIRS & set(path.relative_to(ROOT).parts):
            yield path


def main() -> int:
    errors: list[str] = []

    for path in files(".yaml", ".yml"):
        try:
            list(yaml.safe_load_all(path.read_text(encoding="utf-8")))
        except yaml.YAMLError as exc:
            errors.append(f"YAML  {path.relative_to(ROOT)}: {exc}")

    for path in files(".csv"):
        with path.open(newline="", encoding="utf-8") as fh:
            widths = {len(row) for row in csv.reader(fh)}
        if len(widths) > 1:
            errors.append(f"CSV   {path.relative_to(ROOT)}: rows have different column counts {sorted(widths)}")

    for path in files(".md"):
        text = path.read_text(encoding="utf-8")
        rel = path.relative_to(ROOT)
        for match in BACKTICK_PATH.finditer(text):
            ref = match.group(1).rstrip("/.,")
            if ref in PLANNED:
                continue
            if not (ROOT / ref).exists():
                errors.append(f"REF   {rel}: `{ref}` does not exist")
        if rel.parts[0] == "wiki":
            continue  # wiki links resolve on the wiki, not in the repo
        for match in MD_LINK.finditer(text):
            target = match.group(1).strip()
            if re.match(r"^[a-z]+:", target):
                continue
            if not (path.parent / target).exists():
                errors.append(f"LINK  {rel}: ({target}) does not exist")

    for line in errors:
        print(line)
    print(f"{len(errors)} problem(s)" if errors else "All checks passed")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
