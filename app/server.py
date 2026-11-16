#!/usr/bin/env python3
"""Local practice app. Standard library plus PyYAML.

    python3 app/server.py            # opens http://127.0.0.1:8765
    python3 app/server.py --no-browser --port 9000
    python3 app/server.py --check    # load everything once and exit (used by CI)

It reads practice/ (missions, rubrics, data), checks deliverables with
scripts/check_progress.py, and stores what you tick in progress/state.json.
It listens on localhost only.
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
import webbrowser
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
STATIC = Path(__file__).resolve().parent / "static"
PROGRESS = ROOT / "progress"
STATE = PROGRESS / "state.json"
REVIEWS = PROGRESS / "reviews"
DATA = ROOT / "practice" / "data"

sys.path.insert(0, str(ROOT / "scripts"))
import check_progress  # noqa: E402

EMPTY_STATE = {"profile": {}, "tasks": {}, "minutes": {}, "decisions": {}, "said": {}, "log": []}
MIME = {".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml"}


def now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def load_state() -> dict:
    if STATE.exists():
        state = json.loads(STATE.read_text(encoding="utf-8"))
        return {**EMPTY_STATE, **state}
    return json.loads(json.dumps(EMPTY_STATE))


def save_state(state: dict) -> None:
    PROGRESS.mkdir(exist_ok=True)
    STATE.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def load_reviews() -> list[dict]:
    reviews = []
    if REVIEWS.exists():
        for path in sorted(REVIEWS.glob("*.json")):
            try:
                review = json.loads(path.read_text(encoding="utf-8"))
                review["file"] = str(path.relative_to(ROOT))
                reviews.append(review)
            except json.JSONDecodeError:
                reviews.append({"file": str(path.relative_to(ROOT)), "error": "This review file is not valid JSON"})
    return reviews


def load_dataset(name: str) -> list[dict]:
    path = DATA / name
    if path.parent != DATA or path.suffix != ".csv" or not path.exists():
        raise FileNotFoundError(name)
    with path.open(newline="", encoding="utf-8") as fh:
        return list(csv.DictReader(fh))


def bootstrap() -> dict:
    practice = yaml.safe_load((ROOT / "practice" / "missions.yaml").read_text(encoding="utf-8"))
    rubrics = yaml.safe_load((ROOT / "practice" / "rubrics.yaml").read_text(encoding="utf-8"))
    rubrics.pop("planted_findings", None)  # not shown to the learner
    return {
        "practice": practice,
        "rubrics": rubrics,
        "state": load_state(),
        "deliverables": check_progress.evaluate(),
        "reviews": load_reviews(),
        "datasets": sorted(p.name for p in DATA.glob("*.csv")),
    }


def apply(state: dict, op: dict) -> dict:
    kind = op.get("op")
    if kind == "profile":
        state["profile"] = {"name": str(op.get("name", ""))[:80], "track": op.get("track", "sprint"),
                            "started": state["profile"].get("started") or now()}
    elif kind == "task":
        state["tasks"][op["id"]] = bool(op["done"])
    elif kind == "minutes":
        state["minutes"][op["mission"]] = max(0, int(op["minutes"]))
    elif kind == "decision":
        state["decisions"][op["id"]] = op["option"]
    elif kind == "said":
        state["said"][op["mission"]] = bool(op["done"])
    elif kind == "reset":
        state = json.loads(json.dumps(EMPTY_STATE))
    else:
        raise ValueError(f"unknown op {kind!r}")
    state["log"] = (state.get("log", []) + [{"at": now(), **{k: v for k, v in op.items()}}])[-500:]
    return state


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args) -> None:  # quiet
        pass

    def send(self, status: int, body: bytes, mime: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", f"{mime}; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def json(self, payload, status: int = 200) -> None:
        self.send(status, json.dumps(payload, ensure_ascii=False).encode("utf-8"), "application/json")

    def do_GET(self) -> None:
        path = self.path.split("?")[0]
        try:
            if path == "/api/bootstrap":
                return self.json(bootstrap())
            if path.startswith("/api/data/"):
                return self.json(load_dataset(path.rsplit("/", 1)[1]))
            name = "index.html" if path == "/" else path.lstrip("/")
            target = (STATIC / name).resolve()
            if STATIC not in target.parents or not target.is_file():
                return self.send(404, b"Not found", "text/plain")
            self.send(200, target.read_bytes(), MIME.get(target.suffix, "application/octet-stream"))
        except FileNotFoundError:
            self.send(404, b"Not found", "text/plain")
        except Exception as exc:  # show the problem instead of a blank page
            self.json({"error": str(exc)}, 500)

    def do_POST(self) -> None:
        if self.path != "/api/state":
            return self.send(404, b"Not found", "text/plain")
        try:
            length = int(self.headers.get("Content-Length", "0"))
            op = json.loads(self.rfile.read(length) or b"{}")
            save_state(apply(load_state(), op))
            self.json(bootstrap())
        except (ValueError, KeyError, json.JSONDecodeError) as exc:
            self.json({"error": str(exc)}, 400)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--port", type=int, default=8765)
    ap.add_argument("--no-browser", action="store_true")
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    if args.check:
        data = bootstrap()
        for name in data["datasets"]:
            load_dataset(name)
        ids = {m["id"] for m in data["practice"]["missions"]}
        for track in data["practice"]["tracks"].values():
            missing = set(track["missions"]) - ids
            assert not missing, f"track refers to unknown missions: {missing}"
        for item in data["deliverables"].values():
            assert item["rubric"] in data["rubrics"]["rubrics"], f"no rubric for {item['id']}"
        print(f"OK: {len(ids)} missions, {len(data['deliverables'])} deliverables, {len(data['datasets'])} datasets")
        return

    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    url = f"http://127.0.0.1:{args.port}"
    print(f"Practice app running at {url}  (Ctrl+C to stop)")
    if not args.no_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped")


if __name__ == "__main__":
    main()
