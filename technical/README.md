# technical/

How an IDP works, at the depth a platform leader needs: enough to explain it, question an estimate and recognise a risky design. Building it is optional.

## Reading order

| # | File | What it gives you |
| --- | --- | --- |
| 1 | `technical/01-idp-anatomy.md` | The parts of an IDP and what happens when a developer uses it |
| 2 | `technical/02-reference-architecture.md` | The CNCF capability list mapped to concrete tools |
| 3 | `technical/03-tooling-options.md` | Options per layer and how to choose |
| 4 | `technical/05-golden-path-design.md` | What a golden path contains, including the pipeline |
| 5 | `technical/04-build-plan.md` | Optional hands-on lab in phases |

## Folders

| Folder | Contents |
| --- | --- |
| `platform/` | Starter configuration: catalog entities, a software template, a pipeline example, policies, identity, workload spec. Untested |
| `lab/` | How to run the lab locally |

## What a leader should be able to do after reading

1. Name the parts of an IDP and say which one a given problem belongs to.
2. Describe the path of a change from template to production.
3. Explain why policy, identity and cost labels are built into the path and not added later.
4. Tell the portal (the front door) apart from the platform (everything behind it).
5. Ask an engineer the right five questions about any proposed tool: fit, day-one usability, cost with people included, exit, evidence for audit.
