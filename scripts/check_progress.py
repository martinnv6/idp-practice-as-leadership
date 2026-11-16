#!/usr/bin/env python3
"""Mechanical progress check for the practice.

For every deliverable in practice/missions.yaml it reports one of:
  not started · started · ready
"ready" means the mechanical bar is met (the file exists or was changed,
is long enough, and its tables are filled). It says nothing about quality;
that is the review skill's job.

    python3 scripts/check_progress.py              # table
    python3 scripts/check_progress.py --json       # for tools
    python3 scripts/check_progress.py --write-baseline   # maintainers only
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
BASELINE = ROOT / "practice" / "baseline.json"
MAX_EMPTY_CELL_SHARE = 0.15


def load_practice() -> dict:
    return yaml.safe_load((ROOT / "practice" / "missions.yaml").read_text(encoding="utf-8"))


def deliverables(practice: dict) -> dict[str, dict]:
    """Unique deliverables by id, with the missions that use each."""
    out: dict[str, dict] = {}
    for mission in practice["missions"]:
        for item in mission.get("deliverables", []):
            entry = out.setdefault(item["id"], {**item, "missions": []})
            entry["missions"].append(mission["id"])
    return out


def sha(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def words(text: str) -> int:
    return len(re.findall(r"[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9'’-]*", text))


def empty_cell_share(path: Path, text: str) -> float:
    """Share of empty cells in markdown table bodies or in a CSV."""
    cells = empty = 0
    if path.suffix == ".csv":
        for line in text.splitlines()[1:]:
            for cell in line.split(","):
                cells += 1
                empty += not cell.strip()
    else:
        for line in text.splitlines():
            stripped = line.strip()
            if not stripped.startswith("|") or re.fullmatch(r"\|[\s:|-]+\|?", stripped):
                continue
            for cell in stripped.strip("|").split("|"):
                cells += 1
                empty += not cell.strip()
    return empty / cells if cells else 0.0


def evaluate() -> dict[str, dict]:
    practice = load_practice()
    baseline = json.loads(BASELINE.read_text(encoding="utf-8")) if BASELINE.exists() else {}
    result: dict[str, dict] = {}
    for key, item in deliverables(practice).items():
        path = ROOT / item["path"]
        info = {
            "id": key, "title": item["title"], "path": item["path"], "kind": item["kind"],
            "rubric": item.get("rubric"), "missions": item["missions"],
            "exists": path.exists(), "words": 0, "empty_cells_pct": 0, "status": "not started", "why": "",
        }
        if path.exists():
            text = path.read_text(encoding="utf-8", errors="replace")
            info["words"] = words(text)
            share = empty_cell_share(path, text)
            info["empty_cells_pct"] = round(share * 100)
            if item["kind"] == "edit":
                changed = baseline.get(item["path"]) != sha(path)
                if not changed:
                    info["why"] = "Template not changed yet"
                elif share > MAX_EMPTY_CELL_SHARE:
                    info["status"], info["why"] = "started", f"{info['empty_cells_pct']}% of table cells are still empty"
                else:
                    info["status"] = "ready"
            else:
                need = item.get("min_words", 100)
                if info["words"] < need:
                    info["status"], info["why"] = "started", f"{info['words']} of {need} words"
                else:
                    info["status"] = "ready"
        else:
            info["why"] = "File does not exist yet" if item["kind"] == "create" else "Template is missing"
        result[key] = info
    return result


def write_baseline() -> None:
    practice = load_practice()
    hashes = {}
    for item in deliverables(practice).values():
        path = ROOT / item["path"]
        if item["kind"] == "edit":
            if not path.exists():
                sys.exit(f"Template missing: {item['path']}")
            hashes[item["path"]] = sha(path)
    BASELINE.write_text(json.dumps(hashes, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"Baseline written for {len(hashes)} templates")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--write-baseline", action="store_true")
    args = ap.parse_args()

    if args.write_baseline:
        write_baseline()
        return 0

    result = evaluate()
    if args.json:
        print(json.dumps(result, indent=2))
        return 0
    width = max(len(v["path"]) for v in result.values())
    for info in result.values():
        print(f'{info["status"]:<12} {info["path"]:<{width}}  {info["why"]}')
    ready = sum(v["status"] == "ready" for v in result.values())
    print(f"\n{ready} of {len(result)} deliverables ready")
    return 0


if __name__ == "__main__":
    sys.exit(main())
