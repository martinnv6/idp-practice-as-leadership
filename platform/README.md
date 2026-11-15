# platform/

Starter configuration for the lab. **None of these files has been applied to a cluster yet.** They are syntactically valid YAML written from the tools' documented formats; each is validated in the phase listed below, and field names should be checked against the tool version you install.

| Path | What | Validated in |
| --- | --- | --- |
| `catalog/org.yaml` | Groups and users: SEO team, Hub Leaders, delivery teams, vendor group | Phase 2 |
| `catalog/domains.yaml` | Domains and systems of Forja Norte | Phase 2 |
| `catalog/example-component.yaml` | A service entity with the annotations the directives require | Phase 2 |
| `catalog/ai-capabilities.yaml` | MCP servers and skills as catalog entities | Phase 9 |
| `templates/dotnet-service/template.yaml` | Backstage Software Template for golden path #1 | Phase 3 |
| `score/score.yaml` | Developer-facing workload spec | Phase 3 or 10 |
| `identity/dex/config.yaml` | Dex with an LDAP connector for lab groups and an optional GitHub connector | Phase 4 |
| `policies/kyverno/*.yaml` | Guardrails mapped to directives | Phase 5 |
| `scorecards/production-readiness.yaml` | Tool-neutral scorecard definition | Phase 7 |
| `metrics/metrics-catalog.yaml` | Metric definitions, sources, owners, counter-metrics | Phase 7 |
| `metrics/devex-survey.md` | Quarterly developer survey | Phase 7 |

Convention: every policy file names the directive it enforces in the `forjanorte.example/directive` annotation, so the chain directive → policy → evidence can be traced.
