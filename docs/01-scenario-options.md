# 01 · Scenario options

An IDP is shaped by who it serves and what rules they live under. Pick one scenario and keep it for the whole lab, so that every policy and metric has a reason.

All four companies are fictional.

## Comparison

| | A. Steel manufacturing (default) | B. Retail bank / fintech | C. Healthcare provider network | D. Global e-commerce |
| --- | --- | --- | --- | --- |
| Company | Forja Norte | Banco Sierra | Red Salud Altiplano | Mercado Boreal |
| What breaks if software fails | A production line stops; safety systems lose data | Payments fail; regulator reporting is late | Clinical systems unavailable; patient data exposed | Checkout down; revenue lost per minute |
| Engineering population | ~100 employees, ~500 contractors | ~400 employees, ~200 contractors | ~80 employees, ~150 contractors | ~1,500 employees |
| Dominant stacks | SAP, .NET/Azure, Java, Data | Java, .NET, mainframe integration, Data | .NET, Java, HL7/FHIR integration | Java, Node, Go, Data |
| Runtime | Azure + on-premises plant data centres | Private cloud + one public cloud | Public cloud with strict tenancy | Multi-region public cloud |
| Main regulations | SOX ITGC, ISO/IEC 27001, IEC 62443, NIST CSF | PCI DSS, banking regulator rules, SOX | HIPAA or local health-data law, ISO 27001 | PCI DSS, GDPR/LFPDPPP, SOC 2 |
| Hardest platform problem | Contractors delivering to one standard; IT/OT boundary; SAP extensions | Change control evidence and segregation of duties | PHI handling in every environment | Scale, release frequency, cost per request |
| Platform emphasis | Golden paths per stack, vendor quality metrics, plant-safe deployments | Auditable pipelines, policy as code, evidence export | Data classification, masked test data, access reviews | Self-service speed, progressive delivery, FinOps |

Choose A if you want the scenario that matches a manufacturing interview. Choose D if you want the one closest to large-scale consumer engineering. B and C are useful to practise heavier compliance.

## Scenario A in detail: Forja Norte

### The company

- Integrated steel producer, headquartered in Monterrey, with plants in three countries.
- Listed on a US exchange, so financial systems fall under SOX IT general controls.
- One global SAP S/4HANA landscape with a "clean core" policy: extensions live outside the ERP and talk to it through APIs.
- Plants run manufacturing execution and quality systems that must keep working when the corporate network does not.

### The department: Software Engineering Office (SEO)

The SEO owns the IDP as an internal product. Its customers are the people who build software.

| Role | Count | Responsibility |
| --- | --- | --- |
| Head of SEO | 1 | Vision, roadmap, budget, vendors, quarterly report to the executive committee |
| Platform Engineer, SAP | 1 | Golden path for ABAP Cloud and BTP extensions, transport and API standards |
| Platform Engineer, Microsoft | 1 | Golden path for .NET on Azure, GitHub, pipelines, Copilot policies |
| Platform Engineer, Java | 1 | Golden path for Java services, build and runtime standards |
| Platform Engineer, Data | 1 | Golden path for data pipelines and data products |
| Hub Leader (one per stack) | 4 | Matrix role, no direct reports. Drives adoption and governance inside the delivery teams |

Reach: about 600 developers (about 100 employees and 500 contractors from several delivery vendors).

### Delivery teams the platform serves

| Domain | Typical systems | Stack | Criticality |
| --- | --- | --- | --- |
| Manufacturing | Shop-floor execution, production tracking, quality | .NET, Java | Tier 1 (plant) |
| Supply chain | Order promising, logistics, yard management | Java, SAP extensions | Tier 1 |
| Commercial | Customer portal, pricing, order entry | .NET, SAP extensions | Tier 2 |
| Finance | Reporting, consolidation, treasury integrations | SAP, Data | Tier 2, SOX scope |
| Data and AI | Data platform, predictive maintenance, video analytics | Data, Python | Tier 2 |
| Corporate | HR, safety, internal tools | .NET, low-code | Tier 3 |

### Constraints that drive the design

1. **Contractors are most of the workforce.** Standards have to be built into templates and pipelines, because training and goodwill do not scale across vendors with turnover.
2. **IT/OT boundary.** Plant systems sit behind a controlled zone (IEC 62443 zones and conduits). The platform can deploy *to* the plant edge through an approved conduit, never from the plant network outward.
3. **Plant deployments need maintenance windows.** Tier 1 services deploy with progressive rollout and a tested rollback; some only in agreed windows.
4. **SOX scope.** Financial systems need segregation of duties, approved changes and retained evidence. The platform should produce that evidence automatically.
5. **Four stacks, one platform.** One portal, one catalog, one set of policies; one golden path per stack; a documented exit for teams that cannot use the path.
6. **AI is a capability inside the platform**, with a catalog of approved agents, skills and MCP servers, and rules for data and human review.

### What "good" looks like after 12 months (targets to practise with)

These are practice targets, not benchmarks from a real company.

| Outcome | Measure | Target |
| --- | --- | --- |
| New service is productive fast | Time from "create" in the portal to first deploy in a dev environment | Under 1 hour |
| Teams choose the platform | Share of production deployments that go through a golden path | 60% of new services, 30% of all services |
| Delivery improves for adopters | Change lead time and failed-deployment recovery time, adopters vs. their own baseline | Both improve; change fail rate does not get worse |
| Developers feel the difference | Quarterly developer survey (satisfaction with tooling) | +15 points over baseline |
| Contractors meet the same bar | Scorecard pass rate, employees vs. each vendor | Gap under 10 points |
| Spend is visible | Share of cloud and licence cost allocated to an owner | 90% |

## Scenario switches

If you change scenario, these files change with it:

- `governance/directives.md`: the regulation column and the tiering rules.
- `platform/policies/kyverno/`: which labels are mandatory and what is blocked.
- `platform/catalog/org.yaml` and `domains.yaml`: the organisation and systems.
- `finops/scenarios.csv`: developer count and cost assumptions.
