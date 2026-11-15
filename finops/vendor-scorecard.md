# Delivery-vendor scorecard and QBR

One scorecard per delivery vendor per quarter. Every measure comes from platform data, and the same thresholds apply to internal teams.

## Scorecard

Vendor: ____  Quarter: ____  Teams: ____  Engineers: ____

| Area | Measure | Source | Threshold | Vendor | Internal average | Trend |
| --- | --- | --- | --- | --- | --- | --- |
| Standards | Services at or above minimum scorecard level | Scorecards | 90% | | | |
| Standards | New services started from a golden path or recorded exception | Catalog | 100% | | | |
| Standards | Open policy exceptions; age of oldest | Exceptions register | Agreed per quarter | | | |
| Quality | Coverage gate pass rate on pull requests | CI | 95% | | | |
| Quality | Change fail rate | DevLake | At or below internal average | | | |
| Quality | Deployment rework rate | DevLake | At or below internal average | | | |
| Speed | Change lead time, median | DevLake | Agreed per domain | | | |
| Stability | Failed deployment recovery time, median | DevLake | Agreed per tier | | | |
| Security | Critical and high vulnerabilities past SLA | Scanner | 0 critical | | | |
| People | Time to tenth pull request for new engineers | Source control | Agreed | | | |
| People | Engineer turnover in the quarter | Vendor report | Agreed | | | |
| Knowledge | Services with current docs and runbook | TechDocs | 90% | | | |
| Cost | Spend vs. SOW; cost per delivered change | Finance, DevLake | Within SOW | | | |

Overall: Green / Amber / Red. Amber or red needs an improvement plan with dates.

## SLA design notes

- Tie SLAs to outcomes the platform measures (pass rates, recovery time, vulnerability SLA), not to hours worked.
- State the data source in the contract, so there is one version of the numbers.
- Include a remedy ladder: improvement plan, service credits, rebalancing of scope.
- Require that all work lives in the organisation's repositories, pipelines and docs.

## QBR agenda (60 minutes)

| Time | Topic |
| --- | --- |
| 5 | Actions from last QBR |
| 15 | Scorecard walk-through: what moved and why |
| 10 | Incidents and postmortems involving vendor teams |
| 10 | Friction the vendor's engineers report with the platform (their feedback to us) |
| 10 | Staffing, onboarding and turnover |
| 5 | Commercials: spend vs. SOW, forecast |
| 5 | Agreed actions, owners, dates |

The fourth item matters: vendors are users of the platform too, and their engineers see friction that employees have stopped noticing.
