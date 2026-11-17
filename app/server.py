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
from urllib.parse import parse_qs

import yaml

ROOT = Path(__file__).resolve().parent.parent
STATIC = Path(__file__).resolve().parent / "static"
PROGRESS = ROOT / "progress"
STATE = PROGRESS / "state.json"
REVIEWS = PROGRESS / "reviews"
DATA = ROOT / "practice" / "data"
I18N = ROOT / "practice" / "i18n"
LANG_NAMES = {"en": "English", "es": "Español"}

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


DOC_SUFFIXES = {".md", ".yaml", ".yml", ".csv", ".json", ".txt", ".py"}


def load_doc(rel: str, lang: str = "en") -> dict:
    """Text of a repository file, for the in-app reader. Repository files only.
    With a language other than English, `name.es.md` is served when it exists."""
    target = (ROOT / rel).resolve()
    variant = target.with_suffix(f".{lang}{target.suffix}") if lang != "en" and lang in languages() else None
    translated = bool(variant and variant.is_file() and ".es." not in target.name and f".{lang}." not in target.name)
    if translated:
        target = variant
    inside = ROOT in target.parents
    hidden = ".git" in target.relative_to(ROOT).parts if inside else True
    if not inside or hidden or target.suffix not in DOC_SUFFIXES or not target.is_file():
        raise FileNotFoundError(rel)
    return {"path": str(target.relative_to(ROOT)), "translated": translated,
            "text": target.read_text(encoding="utf-8", errors="replace")}


def languages() -> dict:
    """English plus every language that has a folder in practice/i18n/."""
    found = {"en": LANG_NAMES["en"]}
    if I18N.exists():
        for folder in sorted(p for p in I18N.iterdir() if p.is_dir()):
            found[folder.name] = LANG_NAMES.get(folder.name, folder.name)
    return found


def load_overlay(lang: str, name: str) -> dict:
    path = I18N / lang / name
    if lang == "en" or not path.exists():
        return {}
    return yaml.safe_load(path.read_text(encoding="utf-8")) or {}


def localize_practice(practice: dict, o: dict) -> dict:
    """Overlay translated text onto missions.yaml. Anything not translated stays in English.
    Ids, paths, agents, costs and minutes are never overlaid."""
    for key in ("role", "tracks", "competencies"):
        if isinstance(practice.get(key), dict):
            for k, v in (o.get(key) or {}).items():
                if isinstance(v, dict):
                    practice[key].setdefault(k, {}).update(v)
                else:
                    practice[key][k] = v
        elif key in o:
            practice[key] = o[key]
    if (o.get("budget") or {}).get("note"):
        practice["budget"]["note"] = o["budget"]["note"]
    roles = o.get("cast") or {}
    for person in practice["cast"]:
        person["role"] = roles.get(person["name"], person["role"])
    for cp in practice["checkpoints"]:
        cp.update((o.get("checkpoints") or {}).get(cp["id"], {}))
    for m in practice["missions"]:
        t = (o.get("missions") or {}).get(m["id"])
        if not t:
            continue
        for k in ("title", "when", "situation"):
            if k in t:
                m[k] = t[k]
        if "say_it" in t:
            m["say_it"]["question"] = t["say_it"]
        for i, msg in enumerate(t.get("inbox") or []):
            if i < len(m.get("inbox", [])):
                m["inbox"][i].update(msg)
        for task in m.get("tasks", []):
            task["text"] = (t.get("tasks") or {}).get(task["id"], task["text"])
        for d in m.get("deliverables", []):
            d["title"] = (t.get("deliverables") or {}).get(d["id"], d["title"])
        for dec in m.get("decisions", []):
            td = (t.get("decisions") or {}).get(dec["id"])
            if not td:
                continue
            dec["question"] = td.get("question", dec["question"])
            for opt in dec["options"]:
                opt.update((td.get("options") or {}).get(opt["id"], {}))
    return practice


def localize_rubrics(rubrics: dict, o: dict) -> dict:
    for k, v in (o.get("scale") or {}).items():
        rubrics["scale"][k] = v
    texts = {c["id"]: c for c in rubrics["common"]}
    for k, v in (o.get("common") or {}).items():
        if k in texts:
            texts[k]["text"] = v
    for rid, crits in (o.get("rubrics") or {}).items():
        for c in rubrics["rubrics"].get(rid, []):
            c["text"] = crits.get(c["id"], c["text"])
    for c in rubrics["oral"]:
        c["text"] = (o.get("oral") or {}).get(c["id"], c["text"])
    return rubrics


def bootstrap(lang: str | None = None) -> dict:
    state = load_state()
    available = languages()
    lang = lang if lang in available else state["profile"].get("lang", "en")
    lang = lang if lang in available else "en"
    practice = yaml.safe_load((ROOT / "practice" / "missions.yaml").read_text(encoding="utf-8"))
    rubrics = yaml.safe_load((ROOT / "practice" / "rubrics.yaml").read_text(encoding="utf-8"))
    rubrics.pop("planted_findings", None)  # not shown to the learner
    practice = localize_practice(practice, load_overlay(lang, "missions.yaml"))
    rubrics = localize_rubrics(rubrics, load_overlay(lang, "rubrics.yaml"))
    return {
        "lang": lang,
        "languages": available,
        "practice": practice,
        "rubrics": rubrics,
        "state": state,
        "deliverables": check_progress.evaluate(),
        "reviews": load_reviews(),
        "datasets": sorted(p.name for p in DATA.glob("*.csv")),
        "root": str(ROOT),
    }


def apply(state: dict, op: dict) -> dict:
    kind = op.get("op")
    if kind == "profile":
        state["profile"] = {**state["profile"], "name": str(op.get("name", ""))[:80], "track": op.get("track", "sprint"),
                            "started": state["profile"].get("started") or now()}
    elif kind == "lang":
        if op.get("lang") not in languages():
            raise ValueError(f"unknown language {op.get('lang')!r}")
        state["profile"]["lang"] = op["lang"]
    elif kind == "task":
        state["tasks"][op["id"]] = bool(op["done"])
    elif kind == "minutes":
        state["minutes"][op["mission"]] = max(0, int(op["minutes"]))
    elif kind == "decision":
        state["decisions"][op["id"]] = op["option"]
    elif kind == "said":
        state["said"][op["mission"]] = bool(op["done"])
    elif kind == "reset":
        lang = state["profile"].get("lang")
        state = json.loads(json.dumps(EMPTY_STATE))
        if lang:
            state["profile"]["lang"] = lang
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
        path, _, query = self.path.partition("?")
        try:
            if path == "/api/doc":
                q = parse_qs(query)
                return self.json(load_doc(q.get("path", [""])[0], q.get("lang", ["en"])[0]))
            if path == "/api/bootstrap":
                return self.json(bootstrap(parse_qs(query).get("lang", [None])[0]))
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
            self.json(bootstrap(op.get("lang") if op.get("op") == "lang" else None))
        except (ValueError, KeyError, json.JSONDecodeError) as exc:
            self.json({"error": str(exc)}, 400)


def check_overlay(lang: str) -> None:
    """Every id in a translation must exist in the English source, and the page must still load."""
    src = yaml.safe_load((ROOT / "practice" / "missions.yaml").read_text(encoding="utf-8"))
    o = load_overlay(lang, "missions.yaml")
    missions = {m["id"]: m for m in src["missions"]}
    for mid, t in (o.get("missions") or {}).items():
        assert mid in missions, f"{lang}: unknown mission {mid}"
        m = missions[mid]
        assert set(t.get("tasks") or {}) <= {x["id"] for x in m["tasks"]}, f"{lang}: unknown task in {mid}"
        assert set(t.get("deliverables") or {}) <= {x["id"] for x in m["deliverables"]}, f"{lang}: unknown deliverable in {mid}"
        decisions = {d["id"]: d for d in m.get("decisions", [])}
        assert set(t.get("decisions") or {}) <= set(decisions), f"{lang}: unknown decision in {mid}"
        for did, td in (t.get("decisions") or {}).items():
            assert set(td.get("options") or {}) <= {x["id"] for x in decisions[did]["options"]}, f"{lang}: unknown option in {did}"
        assert len(t.get("inbox") or []) <= len(m.get("inbox", [])), f"{lang}: too many inbox messages in {mid}"
    rub = yaml.safe_load((ROOT / "practice" / "rubrics.yaml").read_text(encoding="utf-8"))
    for rid, crits in (load_overlay(lang, "rubrics.yaml").get("rubrics") or {}).items():
        assert rid in rub["rubrics"], f"{lang}: unknown rubric {rid}"
        assert set(crits) <= {c["id"] for c in rub["rubrics"][rid]}, f"{lang}: unknown criterion in {rid}"
    for lg in (lang,):
        bootstrap(lg)


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
        for lang in data["languages"]:
            if lang != "en":
                check_overlay(lang)
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
