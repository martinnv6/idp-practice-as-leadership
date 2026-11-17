"use strict";
// Practice app front end. No framework: one state object, one render per view.

let S = null; // bootstrap payload from the server
const $view = document.getElementById("view");

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (n) => "$" + Math.round(n).toLocaleString(LANG === "es" ? "es-MX" : "en-US");
const toolName = (x) => {
  const m = /^(App|AI agent): (.+)$/.exec(x);
  if (m) return t(m[1] === "App" ? "tool.app" : "tool.agent", { x: m[1] === "App" ? t("tool." + m[2]) === "tool." + m[2] ? m[2] : t("tool." + m[2]) : m[2] });
  return t("tool." + x) === "tool." + x ? x : t("tool." + x);
};
const docLink = (p, label) => `<a class="path" href="#/doc/${esc(p)}">${esc(label || p)}</a>`;
const paras = (text) => esc(text).trim().split(/\n\s*\n/).map((p) => `<p>${p}</p>`).join("");

const withLang = (path) => path + (path.includes("?") ? "&" : "?") + "lang=" + LANG;
async function api(path, body) {
  const res = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}
async function act(op) { S = await api("/api/state", op); setLang(S.lang); render(); }

// ---------- derived state ----------
const practice = () => S.practice;
const trackId = () => S.state.profile.track || "sprint";
const track = () => practice().tracks[trackId()];
const missionById = (id) => practice().missions.find((m) => m.id === id);
const trackMissions = () => track().missions.map(missionById);

function missionStatus(m) {
  const tasks = m.tasks || [];
  const tasksDone = tasks.filter((t) => S.state.tasks[t.id]).length;
  const dels = (m.deliverables || []).map((d) => S.deliverables[d.id]);
  const delsReady = dels.filter((d) => d.status === "ready").length;
  const decisions = m.decisions || [];
  const decided = decisions.filter((d) => S.state.decisions[d.id]).length;
  const said = !!S.state.said[m.id];
  const total = tasks.length + dels.length + decisions.length + 1;
  const done = tasksDone + delsReady + decided + (said ? 1 : 0);
  return { tasksDone, tasks: tasks.length, delsReady, dels: dels.length, decided, decisions: decisions.length, said, done, total, complete: done === total, started: done > 0 };
}
function currentMission() { return trackMissions().find((m) => !missionStatus(m).complete) || null; }
function statusTag(st) {
  if (st.complete) return `<span class="tag good">${t("status.complete")}</span>`;
  if (st.started) return `<span class="tag warn">${t("status.progress", { done: st.done, total: st.total })}</span>`;
  return `<span class="tag plain">${t("status.none")}</span>`;
}
function checkpointsForTrack() {
  const ids = new Set(track().missions);
  return practice().checkpoints.filter((c) => c.after.every((id) => ids.has(id)));
}
function reviewFor(cpId) { return [...S.reviews].reverse().find((r) => r.checkpoint === cpId); }

// ---------- views ----------
function viewOnboarding() {
  const tracks = Object.entries(practice().tracks).map(([id, t], i) => `
    <label class="option"><input type="radio" name="track" value="${id}" ${i === 0 ? "checked" : ""}>
      <span><b>${esc(t.title)}</b><br><span class="meta">${esc(t.description)}</span></span></label>`).join("");
  $view.innerHTML = `
    <h1>${t("onb.title", { role: esc(practice().role) })}</h1>
    <p class="lede">${t("onb.lede", { company: esc(practice().company) })}</p>
    <div class="card">
      <h2 style="margin-top:0">${t("onb.before")}</h2>
      <div class="form-row"><label for="name">${t("onb.name")}</label><input type="text" id="name" placeholder="${t("onb.optional")}" autocomplete="off"></div>
      <h3>${t("onb.pace")}</h3>${tracks}
      <div class="form-row"><button class="primary" id="start">${t("onb.open")}</button></div>
    </div>`;
  document.getElementById("start").onclick = () => act({
    op: "profile", name: document.getElementById("name").value,
    track: document.querySelector("input[name=track]:checked").value,
  });
}

function viewHome() {
  if (!S.state.profile.track) return viewOnboarding();
  const missions = trackMissions();
  const current = currentMission();
  const reached = current ? missions.indexOf(current) : missions.length - 1;
  const letters = missions.map((m, i) => (m.inbox || []).map((msg) => `
    <div class="card letter ${i > reached ? "locked" : ""}">
      <div class="meta"><b>${esc(msg.from)}</b> · ${esc(m.when)} · ${esc(msg.subject)}</div>
      ${i > reached ? '<p class="meta">${t("home.arrives")}</p>' : paras(msg.body)}
    </div>`).join("")).slice(0, reached + 2).reverse().join("");
  const cast = practice().cast.map((c) => `<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.role)}</td><td><code>${esc(c.agent)}</code></td></tr>`).join("");
  const next = current
    ? `<a class="cardlink" href="#/mission/${current.id}"><div class="card"><div class="row"><div><div class="meta">${t("home.next", { when: esc(current.when) })}</div><b>${esc(current.title)}</b></div>${statusTag(missionStatus(current))}</div><p style="margin:8px 0 0">${esc(current.situation)}</p></div></a>`
    : `<div class="card"><b>${t("home.alldone")}</b> ${t("home.goto", { link: `<a href="#/checkpoints">${t("nav.checkpoints")}</a>` })}</div>`;
  $view.innerHTML = `
    <h1>${S.state.profile.name ? esc(S.state.profile.name) + ", " : ""}${esc(practice().role)}</h1>
    <p class="lede">${esc(track().title)} · ${esc(track().description)}</p>
    ${next}
    <h2>${t("home.inbox")}</h2>${letters}
    <h2>${t("home.people")}</h2>
    <div class="scroll"><table><thead><tr><th>${t("home.person")}</th><th>${t("home.role")}</th><th>${t("home.agent")}</th></tr></thead><tbody>${cast}</tbody></table></div>`;
}

function viewMissions() {
  const cards = trackMissions().map((m) => {
    const st = missionStatus(m);
    const comps = m.competencies.map((c) => `<span class="tag">${esc(practice().competencies[c])}</span>`).join("");
    return `<a class="cardlink" href="#/mission/${m.id}"><div class="card">
      <div class="row"><div class="meta">${esc(m.when)}</div>${statusTag(st)}</div>
      <b>${esc(m.title)}</b>
      <div class="bar" style="margin:10px 0"><span style="width:${(st.done / st.total) * 100}%"></span></div>
      <div>${comps}</div></div></a>`;
  }).join("");
  $view.innerHTML = `<h1>${t("missions.title")}</h1><p class="lede">${esc(track().description)} ${t("missions.lede")}</p><div class="grid">${cards}</div>`;
}

function viewMission(id) {
  const m = missionById(id);
  if (!m) return viewMissions();
  const st = missionStatus(m);
  const tasks = m.tasks.map((task) => {
    const done = !!S.state.tasks[task.id];
    return `<li><input type="checkbox" id="${task.id}" data-task="${task.id}" ${done ? "checked" : ""}>
      <span class="step-name">${t("step." + task.step)}</span>
      <label for="${task.id}" class="${done ? "done-text" : ""}">${esc(task.text)}</label>
      <span class="meta">${esc(toolName(task.tool))} · ${task.minutes} ${t("mission.min")}</span></li>`;
  }).join("");
  const reads = (m.read || []).map((p) => `<li>${docLink(p)}</li>`).join("");
  const dels = (m.deliverables || []).map((d) => {
    const info = S.deliverables[d.id];
    const tag = info.status === "ready" ? `<span class="tag good">${t("status.ready")}</span>` : info.status === "started" ? `<span class="tag warn">${t("status.started")}</span>` : `<span class="tag plain">${t("status.none")}</span>`;
    const criteria = (S.rubrics.rubrics[d.rubric] || []).map((c) => `<li>${esc(c.text)}</li>`).join("");
    return `<div class="card"><div class="row"><b>${esc(d.title)}</b>${tag}</div>
      <div class="meta">${d.kind === "edit" ? t("mission.edit") : t("mission.create")} ${info.exists ? docLink(d.path) : `<span class="path">${esc(d.path)}</span>`}${info.why ? " · " + esc(info.why) : ""}</div>
      <details><summary class="meta">${t("mission.review")}</summary><ul class="clean">${criteria}</ul></details></div>`;
  }).join("");
  const decisions = (m.decisions || []).map((d) => {
    const chosen = S.state.decisions[d.id];
    const opts = d.options.map((o) => `<label class="option"><input type="radio" name="${d.id}" data-decision="${d.id}" value="${o.id}" ${chosen === o.id ? "checked" : ""}>
      <span><b>${esc(o.label)}</b> · ${money(o.cost_usd)}${chosen === o.id ? `<br><span class="meta">${t("mission.consequence", { x: esc(o.consequence) })}</span>` : ""}</span></label>`).join("");
    return `<div class="card"><b>${esc(d.question)}</b><div class="meta">${t("mission.cost")}</div>${opts}</div>`;
  }).join("");
  const estimate = m.tasks.reduce((sum, x) => sum + x.minutes, 0);
  $view.innerHTML = `
    <p class="meta"><a href="#/missions">${t("missions.title")}</a> · ${esc(m.when)}</p>
    <div class="row"><h1>${esc(m.title)}</h1>${statusTag(st)}</div>
    <p class="lede">${esc(m.situation)}</p>
    <h2>${t("mission.readfirst")}</h2><ul class="clean">${reads}</ul>
    <h2>${t("mission.tasks")}</h2><div class="card"><ul class="steps">${tasks}</ul></div>
    ${decisions ? `<h2>${t("mission.decision")}</h2>` + decisions : ""}
    <h2>${t("mission.deliverables")}</h2>${dels}
    <p class="meta">${t("mission.writehere", { root: `<span class="path">${esc(S.root)}</span>` })}</p>
    <h2>${t("mission.sayit")}</h2>
    <div class="card"><p><b>“${esc(m.say_it.question)}”</b></p>
      <p class="meta">${t("mission.sayhelp", { agent: `<code>${esc(m.say_it.agent)}</code>`, id: esc(m.id) })}</p>
      <label class="option"><input type="checkbox" id="said" ${st.said ? "checked" : ""}><span>${t("mission.saidlabel", { link: docLink("notes/study-notes.md") })}</span></label></div>
    <h2>${t("mission.time")}</h2>
    <div class="card form-row"><label for="mins">${t("mission.minutes")}</label>
      <input type="number" id="mins" min="0" step="5" value="${S.state.minutes[m.id] || 0}" style="width:100px">
      <button id="save-mins">${t("mission.save")}</button><span class="meta">${t("mission.estimate", { n: estimate })}</span></div>`;
  $view.querySelectorAll("[data-task]").forEach((el) => (el.onchange = () => act({ op: "task", id: el.dataset.task, done: el.checked })));
  $view.querySelectorAll("[data-decision]").forEach((el) => (el.onchange = () => act({ op: "decision", id: el.dataset.decision, option: el.value })));
  document.getElementById("said").onchange = (e) => act({ op: "said", mission: m.id, done: e.target.checked });
  document.getElementById("save-mins").onclick = () => act({ op: "minutes", mission: m.id, minutes: Number(document.getElementById("mins").value) || 0 });
}

const dataView = { name: null, rows: [], sort: null, dir: 1, quarter: "" };
async function viewData() {
  if (!dataView.name) dataView.name = S.datasets.includes("delivery_metrics.csv") ? "delivery_metrics.csv" : S.datasets[0];
  dataView.rows = await api("/api/data/" + dataView.name);
  drawData();
}
function drawData() {
  const all = dataView.rows;
  const cols = all.length ? Object.keys(all[0]) : [];
  const hasQuarter = cols.includes("quarter");
  let rows = hasQuarter && dataView.quarter ? all.filter((r) => r.quarter === dataView.quarter) : all.slice();
  const numeric = (c) => all.every((r) => r[c] === "" || !isNaN(Number(r[c])));
  if (dataView.sort) {
    const c = dataView.sort, num = numeric(c);
    rows.sort((a, b) => (num ? (Number(a[c]) || 0) - (Number(b[c]) || 0) : String(a[c]).localeCompare(String(b[c]))) * dataView.dir);
  }
  const head = cols.map((c) => `<th data-col="${esc(c)}">${esc(columnName(c))}${dataView.sort === c ? (dataView.dir > 0 ? " ↑" : " ↓") : ""}</th>`).join("");
  const body = rows.map((r) => "<tr>" + cols.map((c) => r[c] === "" ? '<td class="empty">${t("data.missing")}</td>' : `<td class="${numeric(c) ? "num" : ""}">${esc(r[c])}</td>`).join("") + "</tr>").join("");
  const quarters = hasQuarter ? [...new Set(all.map((r) => r.quarter))] : [];
  $view.innerHTML = `
    <h1>${t("data.title")}</h1>
    <p class="lede">${t("data.lede", { company: esc(practice().company), path: '<span class="path">practice/data/</span>' })}</p>
    <div class="form-row">
      <label for="ds">${t("data.dataset")}</label><select id="ds">${S.datasets.map((d) => `<option ${d === dataView.name ? "selected" : ""}>${esc(d)}</option>`).join("")}</select>
      ${hasQuarter ? `<label for="q">${t("data.quarter")}</label><select id="q"><option value="">${t("data.all")}</option>${quarters.map((q) => `<option ${q === dataView.quarter ? "selected" : ""}>${esc(q)}</option>`).join("")}</select>` : ""}
      <span class="meta">${t("data.rows", { n: rows.length })}</span>
    </div>
    <div class="scroll"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  document.getElementById("ds").onchange = (e) => { dataView.name = e.target.value; dataView.sort = null; dataView.quarter = ""; viewData(); };
  if (hasQuarter) document.getElementById("q").onchange = (e) => { dataView.quarter = e.target.value; drawData(); };
  $view.querySelectorAll("th").forEach((th) => (th.onclick = () => {
    dataView.dir = dataView.sort === th.dataset.col ? -dataView.dir : 1; dataView.sort = th.dataset.col; drawData();
  }));
}

function viewLedger() {
  const missions = trackMissions();
  let spent = 0, est = 0, logged = 0;
  const decisionRows = [], timeRows = [];
  missions.forEach((m) => {
    (m.decisions || []).forEach((d) => {
      const opt = d.options.find((o) => o.id === S.state.decisions[d.id]);
      if (opt) spent += opt.cost_usd;
      decisionRows.push(`<tr><td>${esc(m.title)}</td><td>${esc(d.question)}</td><td>${opt ? esc(opt.label) : '<span class="meta">${t("ledger.notdecided")}</span>'}</td><td class="num">${opt ? money(opt.cost_usd) : ""}</td></tr>`);
    });
    const e = m.tasks.reduce((sum, x) => sum + x.minutes, 0), l = S.state.minutes[m.id] || 0;
    est += e; logged += l;
    timeRows.push(`<tr><td>${esc(m.title)}</td><td class="num">${e}</td><td class="num">${l}</td></tr>`);
  });
  const budget = practice().budget.discretionary_usd;
  const pct = Math.min(100, (spent / budget) * 100);
  $view.innerHTML = `
    <h1>${t("ledger.title")}</h1>
    <p class="lede">${t("ledger.lede", { company: esc(practice().company), note: esc(practice().budget.note) })}</p>
    <div class="stats">
      <div class="stat"><b>${money(budget)}</b><span>${t("ledger.budget")}</span></div>
      <div class="stat"><b>${money(spent)}</b><span>${t("ledger.committed")}</span></div>
      <div class="stat"><b>${money(budget - spent)}</b><span>${t("ledger.remaining")}</span></div>
      <div class="stat"><b>${Math.round(logged / 6) / 10} h</b><span>${t("ledger.logged", { est: Math.round(est / 6) / 10 })}</span></div>
    </div>
    <div class="bar ${spent > budget ? "over" : ""}"><span style="width:${pct}%"></span></div>
    <h2>${t("ledger.decisions")}</h2>
    ${decisionRows.length ? `<div class="scroll"><table><thead><tr><th>${t("ledger.mission")}</th><th>${t("ledger.decision")}</th><th>${t("ledger.choice")}</th><th>${t("ledger.costcol")}</th></tr></thead><tbody>${decisionRows.join("")}</tbody></table></div>` : `<p class="meta">${t("ledger.nodecisions")}</p>`}
    <h2>${t("ledger.time")}</h2>
    <div class="scroll"><table><thead><tr><th>${t("ledger.mission")}</th><th>${t("ledger.est")}</th><th>${t("ledger.log")}</th></tr></thead><tbody>${timeRows.join("")}</tbody></table></div>`;
}

function reviewScores() { // deliverable id -> average score from the latest review that covers it
  const out = {};
  S.reviews.forEach((r) => (r.deliverables || []).forEach((d) => {
    const scores = (d.scores || []).map((s) => Number(s.score)).filter((n) => !isNaN(n));
    if (scores.length) out[d.id] = scores.reduce((a, b) => a + b, 0) / scores.length;
  }));
  return out;
}
function viewScore() {
  const missions = trackMissions(), scores = reviewScores();
  const rows = Object.entries(practice().competencies).map(([id, label]) => {
    const mine = missions.filter((m) => m.competencies.includes(id));
    if (!mine.length) return "";
    const complete = mine.filter((m) => missionStatus(m).complete).length;
    const reviewed = mine.flatMap((m) => (m.deliverables || []).map((d) => scores[d.id])).filter((v) => v !== undefined);
    const avg = reviewed.length ? reviewed.reduce((a, b) => a + b, 0) / reviewed.length : null;
    return `<div class="score-row"><b>${esc(label)}</b>
      <div class="bar"><span style="width:${(complete / mine.length) * 100}%"></span></div>
      <span class="meta">${t("score.nmissions", { a: complete, b: mine.length })}${avg !== null ? ` · ${t("score.review", { x: avg.toFixed(1) })}` : ""}</span></div>`;
  }).join("");
  const done = missions.filter((m) => missionStatus(m).complete).length;
  const dels = [...new Set(missions.flatMap((m) => (m.deliverables || []).map((d) => d.id)))];
  const ready = dels.filter((id) => S.deliverables[id].status === "ready").length;
  $view.innerHTML = `
    <h1>${t("score.title")}</h1>
    <p class="lede">${t("score.lede")}</p>
    <div class="stats">
      <div class="stat"><b>${done}/${missions.length}</b><span>${t("score.missions")}</span></div>
      <div class="stat"><b>${ready}/${dels.length}</b><span>${t("score.deliverables")}</span></div>
      <div class="stat"><b>${S.reviews.filter((r) => !r.error).length}</b><span>${t("score.reviews")}</span></div>
    </div>
    <div class="card">${rows}</div>`;
}

function viewCheckpoints() {
  const cards = checkpointsForTrack().map((cp) => {
    const missions = cp.after.map(missionById);
    const complete = missions.filter((m) => missionStatus(m).complete).length;
    const ready = complete === missions.length;
    const r = reviewFor(cp.id);
    let review = `<p class="meta">${t("cp.noreview")} ${ready ? t("cp.ready") : t("cp.finish", { n: missions.length - complete })}</p>
      <div class="note">${t("cp.how", { cmd: `<b>${t("cp.cmd", { id: esc(cp.id) })}</b>`, file: `<span class="path">progress/reviews/${esc(cp.id)}.json</span>` })}</div>`;
    if (r && r.error) review = `<div class="note">${esc(r.file)}: ${esc(r.error)}</div>`;
    else if (r) {
      const dels = (r.deliverables || []).map((d) => `<details><summary><b>${esc((S.deliverables[d.id] || {}).title || d.id)}</b> · ${(d.scores || []).map((s) => s.score).join(" ")}</summary>
        <ul class="clean">${(d.scores || []).map((s) => `<li><b>${esc(s.score)}/3 ${esc(s.criterion)}</b>${s.evidence ? ` — “${esc(s.evidence)}”` : ""}${s.advice ? `<br><span class="meta">${esc(s.advice)}</span>` : ""}</li>`).join("")}</ul></details>`).join("");
      const list = (title, items) => items && items.length ? `<h3>${title}</h3><ul class="clean">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";
      review = `<div class="row"><span class="tag ${r.verdict === "pass" ? "good" : "warn"}">${esc(r.verdict ? (["pass", "revise"].includes(r.verdict) ? t("verdict." + r.verdict) : r.verdict) : t("cp.reviewed"))}</span><span class="meta">${esc(r.date || "")} · ${t("cp.overall", { x: esc(r.overall ?? "") })} · ${esc(r.reviewer || "")}</span></div>
        ${list(t("cp.strengths"), r.strengths)}${list(t("cp.gaps"), r.gaps)}${list(t("cp.next"), r.next)}<h3>${t("cp.deliverables")}</h3>${dels}`;
    }
    return `<div class="card"><div class="row"><b>${esc(cp.title)}</b><span class="tag ${ready ? "good" : "plain"}">${t("cp.nmissions", { a: complete, b: missions.length })}</span></div>
      <p>${esc(cp.question)}</p>${cp.exam ? `<p class="meta">${t("cp.exam")}</p>` : ""}${review}</div>`;
  }).join("");
  $view.innerHTML = `<h1>${t("cp.title")}</h1><p class="lede">${t("cp.lede")}</p>${cards}`;
}

// ---------- document reader ----------
const PATH_ROOTS = "leadership|technical|docs|practice|notes|scripts|app|wiki|\\.claude|\\.github";
function inline(text, base) {
  const codes = [];
  let s = esc(text).replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>");
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    if (/^[a-z]+:/i.test(url)) return `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
    if (url.startsWith("#")) return label;
    const parts = (base ? base.split("/").slice(0, -1) : []).concat(url.split("#")[0].split("/"));
    const out = [];
    parts.forEach((p) => { if (p === "..") out.pop(); else if (p && p !== ".") out.push(p); });
    return `<a href="#/doc/${out.join("/")}">${label}</a>`;
  });
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => {
    const c = codes[Number(i)];
    return new RegExp(`^(${PATH_ROOTS})/[\\w./-]+\\.(md|yaml|yml|csv|json|py)$`).test(c.replace(/&[a-z]+;/g, "")) || /^[A-Z-]+\.md$/.test(c)
      ? `<a class="path" href="#/doc/${c}">${c}</a>` : `<code>${c}</code>`;
  });
}
function markdown(src, base) {
  const lines = src.replace(/\r/g, "").split("\n");
  const out = [];
  let i = 0;
  if (lines[0] === "---") { const end = lines.indexOf("---", 1); if (end > 0) i = end + 1; } // skip front matter
  const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  while (i < lines.length) {
    const line = lines[i];
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim(), buf = [];
      for (i++; i < lines.length && !/^```/.test(lines[i]); i++) buf.push(lines[i]);
      i++;
      out.push(`${lang === "mermaid" ? '<p class="meta">${t("doc.diagram")}</p>' : ""}<pre><code>${esc(buf.join("\n"))}</code></pre>`);
    } else if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      out.push(`<h${Math.min(level + 1, 4)} class="doc-h${level}">${inline(line.replace(/^#+\s*/, ""), base)}</h${Math.min(level + 1, 4)}>`);
      i++;
    } else if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const head = cells(line); const rows = [];
      for (i += 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(cells(lines[i]));
      out.push(`<div class="scroll doc-table"><table><thead><tr>${head.map((c) => `<th>${inline(c, base)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c, base)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
    } else if (/^\s*([-*]|\d+\.)\s/.test(line)) {
      const ordered = /^\s*\d+\./.test(line), items = [];
      for (; i < lines.length && (/^\s*([-*]|\d+\.)\s/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length)); i++) {
        if (/^\s*([-*]|\d+\.)\s/.test(lines[i])) items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "").replace(/^\[( |x)\]\s*/, (_, x) => (x === "x" ? "☑ " : "☐ ")));
        else items[items.length - 1] += " " + lines[i].trim();
      }
      out.push(`<${ordered ? "ol" : "ul"} class="clean">${items.map((it) => `<li>${inline(it, base)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`);
    } else if (/^>\s?/.test(line)) {
      const buf = [];
      for (; i < lines.length && /^>\s?/.test(lines[i]); i++) buf.push(lines[i].replace(/^>\s?/, ""));
      out.push(`<blockquote>${markdown(buf.join("\n"), base)}</blockquote>`);
    } else if (!line.trim()) { i++; } else {
      const buf = [];
      for (; i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|>|\s*\||\s*([-*]|\d+\.)\s)/.test(lines[i]); i++) buf.push(lines[i]);
      out.push(`<p>${inline(buf.join(" "), base)}</p>`);
    }
  }
  return out.join("\n");
}
async function viewDoc(path) {
  let doc;
  try { doc = await api(withLang("/api/doc?path=" + encodeURIComponent(path))); }
  catch (err) {
    $view.innerHTML = `<p class="meta"><a href="javascript:history.back()">${t("doc.back")}</a></p><h1>${t("doc.notfound")}</h1><p>${t("doc.missing", { path: `<span class="path">${esc(path)}</span>` })}</p>`;
    return;
  }
  const body = doc.path.endsWith(".md") ? markdown(doc.text, doc.path) : `<pre><code>${esc(doc.text)}</code></pre>`;
  $view.innerHTML = `<p class="meta"><a href="javascript:history.back()">${t("doc.back")}</a> · <span class="path">${esc(doc.path)}</span> · ${doc.translated ? t("doc.translated") + " · " : ""}${t("doc.edit")}</p>${LANG !== "en" && !doc.translated && doc.path.endsWith(".md") ? `<p class="note">${t("doc.untranslated")}</p>` : ""}<article class="doc">${body}</article>`;
}

// ---------- router ----------
function render() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [name, ...rest] = hash.split("/");
  const arg = rest.join("/");
  const viewName = !S.state.profile.track ? "home" : name || "home";
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.view === (viewName === "mission" ? "missions" : viewName)));
  const foot = document.getElementById("nav-foot");
  foot.innerHTML = S.state.profile.track ? `${esc(track().title)}<br><button class="ghost" id="switch">${t("foot.switch")}</button>` : "";
  document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
  const pick = document.getElementById("lang");
  pick.innerHTML = Object.entries(S.languages).map(([code, name]) => `<option value="${esc(code)}" ${code === LANG ? "selected" : ""}>${esc(name)}</option>`).join("");
  pick.onchange = () => act({ op: "lang", lang: pick.value });
  const sw = document.getElementById("switch");
  if (sw) sw.onclick = () => act({ op: "profile", name: S.state.profile.name, track: trackId() === "sprint" ? "full" : "sprint" });
  ({ home: viewHome, missions: viewMissions, mission: () => viewMission(arg), doc: () => viewDoc(arg), data: viewData, ledger: viewLedger, score: viewScore, checkpoints: viewCheckpoints }[viewName] || viewHome)();
}

async function start() {
  try { S = await api("/api/bootstrap"); setLang(S.lang); render(); }
  catch (err) { $view.innerHTML = `<h1>${t("err.title")}</h1><div class="note">${esc(err.message)}</div><p>${t("err.hint", { cmd: "<code>python3 scripts/validate.py</code>" })}</p>`; }
}
window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
start();
