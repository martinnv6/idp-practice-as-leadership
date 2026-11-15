# Exception process

A team that cannot meet a MUST directive asks for an exception. Exceptions are normal; hidden deviations are the problem.

## Rules

1. Requested by pull request adding a file under `governance/exceptions/` (create the folder on first use).
2. Always time-boxed: 90 days by default, 180 at most. Renewals are new requests.
3. Always has an owner and a plan to close it.
4. Always states the compensating control.
5. Approved by the Hub Leader of the stack and Security. Tier 1 or SOX-scope exceptions also need the Head of SEO.
6. Enforced technically: the policy exclusion is scoped to the named workload and expires on the same date.

## Request template

```yaml
id: EXC-2027-001
directive: SEO-DIR-031
service: yard-management-legacy
team: scm-yard
vendor: Altos Delivery
tier: 2
reason: >
  Legacy image is built by a vendor pipeline that cannot sign images yet.
compensating_control: >
  Image digest pinned and scanned weekly; deployment restricted to one namespace.
plan: Migrate build to the standard pipeline.
requested_by: tech-lead@example.invalid
approved_by: []
requested_on: 2027-01-15
expires_on: 2027-04-15
```

## What gets reported

| Metric | Why |
| --- | --- |
| Open exceptions by directive | Shows which rule is hardest to meet. Many exceptions on one rule means the golden path or the rule needs work |
| Open exceptions by team and vendor | Fairness and follow-up |
| Age of the oldest exception | Exceptions that never close are permanent deviations |
| Exceptions closed on time | Health of the process |
