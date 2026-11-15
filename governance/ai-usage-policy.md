# AI usage policy for software engineering

Fictional. Version 0.1, practice draft. Applies to employees and contractors.

## 1. Approved tools

Only tools listed in the portal under "AI capabilities" may be used with company code or data. Each entry states the plan, the data-handling terms, the owner and the allowed data classification.

Adding a tool: open a request, Security and the SEO review data terms, cost and overlap, and the result is recorded as an ADR.

## 2. Data

| Classification | May be sent to an approved AI tool? |
| --- | --- |
| Public | Yes |
| Internal | Yes, with tools approved for internal data |
| Confidential | Only with tools whose terms exclude training on customer data and that are approved for this class |
| Restricted (credentials, personal data, plant process parameters, SOX-scope financial data) | No, unless a specific approved boundary exists |

Never paste secrets into a prompt. Secret scanning applies to prompts routed through the gateway.

## 3. Accountability

- The person who merges a change is accountable for it, whoever or whatever wrote it.
- Agents open pull requests. Agents do not approve or merge.
- Generated code passes the same tests, scans and review as any other code.

## 4. Agents and MCP servers

- Every MCP server is registered in the catalog with an owner, the systems it reaches, the scopes it holds and its data classification.
- Agents run with their own identity and least privilege. They never use a person's token.
- Write actions outside the repository (tickets, messages, deployments) need explicit human approval unless the action is on a pre-approved list.
- Agent sessions are logged: who started it, tools called, changes proposed.

## 5. Skills and instructions

- Shared skills live in a versioned repository owned by the SEO and the Hub Leaders. Changes go through pull requests.
- Each golden-path repository includes an agent instructions file describing build, test and conventions.

## 6. Cost

- Each team has a monthly AI budget. Default per-user cap, with overrides approved by the tech lead.
- Seats inactive for 30 days are reclaimed.

## 7. Measurement

Adoption, speed, quality, experience and cost are reported quarterly, by team, never by individual. See `docs/06-ai-capability.md`.

## 8. Review

This policy is reviewed every six months and whenever a new class of tool is approved.
