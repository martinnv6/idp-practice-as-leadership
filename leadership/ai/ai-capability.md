# 06 · AI as a platform capability

AI in the software lifecycle is treated here as one more capability of the platform: discoverable in the portal, governed by policy, measured for adoption and impact, and paid for from a visible budget. It is not a separate platform.

## What the platform provides

| Element | What it is | Where it lives |
| --- | --- | --- |
| Approved tools | The coding assistants and agents teams may use, with the plan and data terms of each | Catalog, `leadership/governance/ai-usage-policy.md` |
| MCP server catalog | Approved Model Context Protocol servers (issue tracker, source control, docs, design, observability) with owner and data classification | `technical/platform/catalog/ai-capabilities.yaml` |
| Skills and instructions | Shared, versioned skills and agent instruction files. Each golden-path skeleton ships with one | Skills repository, template skeleton |
| Guardrails | Data rules, human approval points, logging | Policy, pipeline checks |
| Gateway and budgets | Optional proxy that enforces model allow-list, per-team budget and logging | Platform service |
| Measurement | Adoption, impact and cost | Metrics catalog |

## Levels of use

| Level | Example | Main control |
| --- | --- | --- |
| 1. Individual assistant | Completion and chat in the editor | Approved tool list, data rules |
| 2. Task agent in the developer's session | Agent reads a ticket, clones, creates a branch, analyses a defect, drafts questions | Scoped credentials, pull request review |
| 3. Agent in the pipeline | Automated review comments, test generation, dependency updates | Runs as a named service identity, cannot merge |
| 4. Agent in operations | Incident summarisation, runbook suggestions, cost anomaly triage | Read-only by default, human approves actions |

Move a level only when the previous one is measured and stable.

## Rules (summary of `leadership/governance/ai-usage-policy.md`)

1. A human author is accountable for every change. Agents open pull requests; people approve and merge.
2. Data classification decides what may be sent to which tool. Restricted data (credentials, personal data, plant process parameters, financial data in SOX scope) never leaves approved boundaries.
3. Agents act with their own least-privilege identity, never a person's token.
4. Every MCP server is registered, owned and reviewed before use. Unregistered servers are blocked in managed environments.
5. Agent actions are logged with enough detail to reconstruct what happened.
6. Generated code passes the same gates as any other code: tests, coverage, scanning, review.

Reference frameworks: NIST AI Risk Management Framework, ISO/IEC 42001, and the OWASP guidance for LLM applications.

## Measuring impact

DORA's research describes AI as an amplifier: it strengthens teams with good practices and exposes weak ones. So measure the system, not the tool.

| Layer | Metric |
| --- | --- |
| Adoption | Weekly active users over licensed users; share of pull requests with agent involvement; skills and MCP servers used per team |
| Speed | Time from ticket to first pull request; pull-request cycle time |
| Quality | Change fail rate and rework rate for AI-assisted changes vs. others; review comments per pull request |
| Experience | Survey: time saved, trust in output, where it gets in the way |
| Cost | Spend per active user; spend per merged pull request; idle seats |

Method:

1. Baseline before rollout.
2. Compare cohorts over the same period, and each team against its own baseline.
3. Report speed and quality together.
4. State the sample size. Small pilots show direction, not proof.

## Lab exercise (Phase 9)

1. Register two MCP servers and one skills repository in the catalog.
2. Add an agent instructions file to the golden-path skeleton.
3. Take five small tickets. Do each once by hand and once with an agent, alternating which goes first. Record time to first pull request, review time and whether rework was needed.
4. Write half a page on what the numbers suggest and what they cannot prove.
