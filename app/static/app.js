"use strict";
// Practice app front end. No framework: one state object, one render per view.

let S = null; // bootstrap payload from the server
const $view = document.getElementById("view");
const STEP_NAMES = { read: "Read", note: "Note", decide: "Decide", understand: "See it work", say: "Say it" };

const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
const paras = (text) => esc(text).trim().split(/\n\s*\n/).map((p) => `<p>${p}</p>`).join("");

async function api(path, body) {
  const res = await fetch(path, body ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : undefined);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data;
}
async function act(op) { S = await api("/api/state", op); render(); }

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
  if (st.complete) return '<span class="tag good">Complete</span>';
  if (st.started) return `<span class="tag warn">In progress · ${st.done}/${st.total}</span>`;
  return '<span class="tag plain">Not started</span>';
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
    <h1>You have been appointed ${esc(practice().role)}</h1>
    <p class="lede">${esc(practice().company)} is a fictional company. This app gives you the situations the job would bring, tracks what you produce, and shows the reviews of your work. Your documents live in the repository; the app only watches them.</p>
    <div class="card">
      <h2 style="margin-top:0">Before you start</h2>
      <div class="form-row"><label for="name">Your name</label><input type="text" id="name" placeholder="Optional" autocomplete="off"></div>
      <h3>Pace</h3>${tracks}
      <div class="form-row"><button class="primary" id="start">Open the brief</button></div>
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
      ${i > reached ? '<p class="meta">Arrives when you finish the mission before it.</p>' : paras(msg.body)}
    </div>`).join("")).slice(0, reached + 2).reverse().join("");
  const cast = practice().cast.map((c) => `<tr><td><b>${esc(c.name)}</b></td><td>${esc(c.role)}</td><td><code>${esc(c.agent)}</code></td></tr>`).join("");
  const next = current
    ? `<a class="cardlink" href="#/mission/${current.id}"><div class="card"><div class="row"><div><div class="meta">Next · ${esc(current.when)}</div><b>${esc(current.title)}</b></div>${statusTag(missionStatus(current))}</div><p style="margin:8px 0 0">${esc(current.situation)}</p></div></a>`
    : `<div class="card"><b>All missions in this track are complete.</b> Go to <a href="#/checkpoints">Checkpoints</a> for the review.</div>`;
  $view.innerHTML = `
    <h1>${S.state.profile.name ? esc(S.state.profile.name) + ", " : ""}${esc(practice().role)}</h1>
    <p class="lede">${esc(track().title)} · ${esc(track().description)}</p>
    ${next}
    <h2>Inbox</h2>${letters}
    <h2>People</h2>
    <div class="scroll"><table><thead><tr><th>Person</th><th>Role</th><th>Played by agent</th></tr></thead><tbody>${cast}</tbody></table></div>`;
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
  $view.innerHTML = `<h1>Missions</h1><p class="lede">${esc(track().description)} A mission is complete when its tasks are ticked, its deliverables are ready, its decision is recorded and the answer has been said aloud.</p><div class="grid">${cards}</div>`;
}

function viewMission(id) {
  const m = missionById(id);
  if (!m) return viewMissions();
  const st = missionStatus(m);
  const tasks = m.tasks.map((t) => {
    const done = !!S.state.tasks[t.id];
    return `<li><input type="checkbox" id="${t.id}" data-task="${t.id}" ${done ? "checked" : ""}>
      <span class="step-name">${STEP_NAMES[t.step]}</span>
      <label for="${t.id}" class="${done ? "done-text" : ""}">${esc(t.text)}</label>
      <span class="meta">${esc(t.tool)} · ${t.minutes} min</span></li>`;
  }).join("");
  const reads = (m.read || []).map((p) => `<li><span class="path">${esc(p)}</span></li>`).join("");
  const dels = (m.deliverables || []).map((d) => {
    const info = S.deliverables[d.id];
    const tag = info.status === "ready" ? '<span class="tag good">Ready</span>' : info.status === "started" ? '<span class="tag warn">Started</span>' : '<span class="tag plain">Not started</span>';
    const criteria = (S.rubrics.rubrics[d.rubric] || []).map((c) => `<li>${esc(c.text)}</li>`).join("");
    return `<div class="card"><div class="row"><b>${esc(d.title)}</b>${tag}</div>
      <div class="meta">${d.kind === "edit" ? "Edit" : "Create"} <span class="path">${esc(d.path)}</span>${info.why ? " · " + esc(info.why) : ""}</div>
      <details><summary class="meta">How it will be reviewed</summary><ul class="clean">${criteria}</ul></details></div>`;
  }).join("");
  const decisions = (m.decisions || []).map((d) => {
    const chosen = S.state.decisions[d.id];
    const opts = d.options.map((o) => `<label class="option"><input type="radio" name="${d.id}" data-decision="${d.id}" value="${o.id}" ${chosen === o.id ? "checked" : ""}>
      <span><b>${esc(o.label)}</b> · ${money(o.cost_usd)}${chosen === o.id ? `<br><span class="meta">Consequence: ${esc(o.consequence)}</span>` : ""}</span></label>`).join("");
    return `<div class="card"><b>${esc(d.question)}</b><div class="meta">The cost goes to your ledger. You see the consequence after you choose.</div>${opts}</div>`;
  }).join("");
  const estimate = m.tasks.reduce((sum, t) => sum + t.minutes, 0);
  $view.innerHTML = `
    <p class="meta"><a href="#/missions">Missions</a> · ${esc(m.when)}</p>
    <div class="row"><h1>${esc(m.title)}</h1>${statusTag(st)}</div>
    <p class="lede">${esc(m.situation)}</p>
    <h2>Read first</h2><ul class="clean">${reads}</ul>
    <h2>Tasks</h2><div class="card"><ul class="steps">${tasks}</ul></div>
    ${decisions ? "<h2>Decision</h2>" + decisions : ""}
    <h2>Deliverables</h2>${dels}
    <p class="meta">The app checks whether each file exists and is filled in. Quality is judged at the checkpoint review.</p>
    <h2>Say it</h2>
    <div class="card"><p><b>“${esc(m.say_it.question)}”</b></p>
      <p class="meta">Answer aloud in about five minutes, then to the <code>${esc(m.say_it.agent)}</code> agent. In your AI tool: “Run mission ${esc(m.id)} with me.”</p>
      <label class="option"><input type="checkbox" id="said" ${st.said ? "checked" : ""}><span>I have said it aloud and noted the feedback in <span class="path">notes/study-notes.md</span></span></label></div>
    <h2>Time</h2>
    <div class="card form-row"><label for="mins">Minutes spent so far</label>
      <input type="number" id="mins" min="0" step="5" value="${S.state.minutes[m.id] || 0}" style="width:100px">
      <button id="save-mins">Save</button><span class="meta">Estimate: ${estimate} min</span></div>`;
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
  const head = cols.map((c) => `<th data-col="${esc(c)}">${esc(c.replace(/_/g, " "))}${dataView.sort === c ? (dataView.dir > 0 ? " ↑" : " ↓") : ""}</th>`).join("");
  const body = rows.map((r) => "<tr>" + cols.map((c) => r[c] === "" ? '<td class="empty">not recorded</td>' : `<td class="${numeric(c) ? "num" : ""}">${esc(r[c])}</td>`).join("") + "</tr>").join("");
  const quarters = hasQuarter ? [...new Set(all.map((r) => r.quarter))] : [];
  $view.innerHTML = `
    <h1>Data</h1>
    <p class="lede">Mock data for ${esc(practice().company)}: what you would pull from pipelines, the survey, scorecards and billing. The numbers are invented. Reading them well is part of the practice. Files are in <span class="path">practice/data/</span> if you prefer a spreadsheet.</p>
    <div class="form-row">
      <label for="ds">Dataset</label><select id="ds">${S.datasets.map((d) => `<option ${d === dataView.name ? "selected" : ""}>${esc(d)}</option>`).join("")}</select>
      ${hasQuarter ? `<label for="q">Quarter</label><select id="q"><option value="">All</option>${quarters.map((q) => `<option ${q === dataView.quarter ? "selected" : ""}>${esc(q)}</option>`).join("")}</select>` : ""}
      <span class="meta">${rows.length} rows · click a column to sort</span>
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
      decisionRows.push(`<tr><td>${esc(m.title)}</td><td>${esc(d.question)}</td><td>${opt ? esc(opt.label) : '<span class="meta">Not decided</span>'}</td><td class="num">${opt ? money(opt.cost_usd) : ""}</td></tr>`);
    });
    const e = m.tasks.reduce((s, t) => s + t.minutes, 0), l = S.state.minutes[m.id] || 0;
    est += e; logged += l;
    timeRows.push(`<tr><td>${esc(m.title)}</td><td class="num">${e}</td><td class="num">${l}</td></tr>`);
  });
  const budget = practice().budget.discretionary_usd;
  const pct = Math.min(100, (spent / budget) * 100);
  $view.innerHTML = `
    <h1>Ledger</h1>
    <p class="lede">What your decisions cost Kestrel Parcel, and what the practice costs you in time. ${esc(practice().budget.note)}</p>
    <div class="stats">
      <div class="stat"><b>${money(budget)}</b><span>Discretionary budget</span></div>
      <div class="stat"><b>${money(spent)}</b><span>Committed by your decisions</span></div>
      <div class="stat"><b>${money(budget - spent)}</b><span>Remaining</span></div>
      <div class="stat"><b>${Math.round(logged / 6) / 10} h</b><span>Logged of ${Math.round(est / 6) / 10} h estimated</span></div>
    </div>
    <div class="bar ${spent > budget ? "over" : ""}"><span style="width:${pct}%"></span></div>
    <h2>Decisions</h2>
    ${decisionRows.length ? `<div class="scroll"><table><thead><tr><th>Mission</th><th>Decision</th><th>Your choice</th><th>Cost</th></tr></thead><tbody>${decisionRows.join("")}</tbody></table></div>` : '<p class="meta">This track has no budget decisions. The full simulation has six.</p>'}
    <h2>Time</h2>
    <div class="scroll"><table><thead><tr><th>Mission</th><th>Estimated min</th><th>Logged min</th></tr></thead><tbody>${timeRows.join("")}</tbody></table></div>`;
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
      <span class="meta">${complete}/${mine.length} missions${avg !== null ? ` · review ${avg.toFixed(1)}/3` : ""}</span></div>`;
  }).join("");
  const done = missions.filter((m) => missionStatus(m).complete).length;
  const dels = [...new Set(missions.flatMap((m) => (m.deliverables || []).map((d) => d.id)))];
  const ready = dels.filter((id) => S.deliverables[id].status === "ready").length;
  $view.innerHTML = `
    <h1>Scoreboard</h1>
    <p class="lede">Progress by competency. The bar shows missions completed; the review score appears once a checkpoint review covers that work.</p>
    <div class="stats">
      <div class="stat"><b>${done}/${missions.length}</b><span>Missions complete</span></div>
      <div class="stat"><b>${ready}/${dels.length}</b><span>Deliverables ready</span></div>
      <div class="stat"><b>${S.reviews.filter((r) => !r.error).length}</b><span>Reviews on file</span></div>
    </div>
    <div class="card">${rows}</div>`;
}

function viewCheckpoints() {
  const cards = checkpointsForTrack().map((cp) => {
    const missions = cp.after.map(missionById);
    const complete = missions.filter((m) => missionStatus(m).complete).length;
    const ready = complete === missions.length;
    const r = reviewFor(cp.id);
    let review = `<p class="meta">No review yet. ${ready ? "Ready for review." : `Finish ${missions.length - complete} more mission(s) first, or ask for an early review.`}</p>
      <div class="note">In your AI tool, from the repository folder: <b>“Run the review-checkpoint skill for ${esc(cp.id)}.”</b> It writes <span class="path">progress/reviews/${esc(cp.id)}.json</span>; reload this page to see it.</div>`;
    if (r && r.error) review = `<div class="note">${esc(r.file)}: ${esc(r.error)}</div>`;
    else if (r) {
      const dels = (r.deliverables || []).map((d) => `<details><summary><b>${esc((S.deliverables[d.id] || {}).title || d.id)}</b> · ${(d.scores || []).map((s) => s.score).join(" ")}</summary>
        <ul class="clean">${(d.scores || []).map((s) => `<li><b>${esc(s.score)}/3 ${esc(s.criterion)}</b>${s.evidence ? ` — “${esc(s.evidence)}”` : ""}${s.advice ? `<br><span class="meta">${esc(s.advice)}</span>` : ""}</li>`).join("")}</ul></details>`).join("");
      const list = (title, items) => items && items.length ? `<h3>${title}</h3><ul class="clean">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";
      review = `<div class="row"><span class="tag ${r.verdict === "pass" ? "good" : "warn"}">${esc(r.verdict || "reviewed")}</span><span class="meta">${esc(r.date || "")} · overall ${esc(r.overall ?? "")}/3 · ${esc(r.reviewer || "")}</span></div>
        ${list("Strengths", r.strengths)}${list("Gaps", r.gaps)}${list("Do next", r.next)}<h3>Deliverables</h3>${dels}`;
    }
    return `<div class="card"><div class="row"><b>${esc(cp.title)}</b><span class="tag ${ready ? "good" : "plain"}">${complete}/${missions.length} missions</span></div>
      <p>${esc(cp.question)}</p>${cp.exam ? '<p class="meta">Includes a timed oral exam with the exec-committee agent.</p>' : ""}${review}</div>`;
  }).join("");
  $view.innerHTML = `<h1>Checkpoints</h1><p class="lede">A checkpoint is a review of your documents against the rubrics, by an AI reviewer that quotes your own text as evidence. Scores run from 0 to 3; a deliverable passes at an average of 2 with no zeros.</p>${cards}`;
}

// ---------- router ----------
function render() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [name, arg] = hash.split("/");
  const viewName = !S.state.profile.track ? "home" : name || "home";
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.view === (viewName === "mission" ? "missions" : viewName)));
  const foot = document.getElementById("nav-foot");
  foot.innerHTML = S.state.profile.track ? `${esc(track().title)}<br><button class="ghost" id="switch">Switch pace</button>` : "";
  const sw = document.getElementById("switch");
  if (sw) sw.onclick = () => act({ op: "profile", name: S.state.profile.name, track: trackId() === "sprint" ? "full" : "sprint" });
  ({ home: viewHome, missions: viewMissions, mission: () => viewMission(arg), data: viewData, ledger: viewLedger, score: viewScore, checkpoints: viewCheckpoints }[viewName] || viewHome)();
}

async function start() {
  try { S = await api("/api/bootstrap"); render(); }
  catch (err) { $view.innerHTML = `<h1>The app could not load</h1><div class="note">${esc(err.message)}</div><p>Run <code>python3 scripts/validate.py</code> in the repository to find the problem.</p>`; }
}
window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
start();
