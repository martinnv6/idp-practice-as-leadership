# technical/

How an IDP works, at the depth a platform leader needs: enough to explain it, question an estimate and recognise a risky design. Nothing here has to be installed.

## Reading order

| # | File | What it gives you |
| --- | --- | --- |
| 1 | `technical/01-idp-anatomy.md` | The parts of an IDP and what happens when a developer uses it |
| 2 | `technical/04-golden-path-design.md` | What a golden path contains, including the standard pipeline |
| 3 | `technical/02-reference-architecture.md` | The CNCF capability list mapped to concrete tools |
| 4 | `technical/03-tooling-options.md` | Options per layer and how to choose |

## What a leader should be able to do after reading

1. Name the parts of an IDP and say which one a given problem belongs to.
2. Describe the path of a change from template to production.
3. Explain why policy, identity and cost labels are built into the path and not added later.
4. Tell the portal (the front door) apart from the platform (everything behind it).
5. Ask an engineer the right five questions about any proposed tool: fit, day-one usability, cost with people included, exit, evidence for audit.

## Appendix: the optional build

`technical/appendix/` holds a hands-on plan for building a small platform on a laptop (`technical/appendix/build-plan.md`) and starter configuration for it (`technical/appendix/platform/`). It is outside the practice. The configuration has never been run and only passes a syntax check. Use it if you want to see the pieces working after the leadership practice is done.
