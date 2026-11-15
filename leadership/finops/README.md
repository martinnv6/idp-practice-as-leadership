# leadership/finops/

Cost templates for the platform. Method and reasoning are in `leadership/finops/finops-and-vendors.md`. The delivery-vendor scorecard is in `leadership/vendors/vendor-scorecard.md`.

| File | Purpose |
| --- | --- |
| `licenses.csv` | Licence register and comparison: one row per product and plan, with pricing unit, list price, source and date |
| `scenarios.csv` | Build, buy and blend scenarios for a three-year TCO |
| `tco.py` | Reads the two CSVs and prints TCO, cost per developer and seat cost at three organisation sizes |
| `budget-template.csv` | Annual budget by quarter: CapEx, OpEx people, infrastructure, licences |
| `cost-allocation-tags.yaml` | Mandatory tags and labels, aligned with FOCUS column names |

## Rules for the numbers

- A price is entered only with a source URL and the date it was read. Otherwise the cell stays empty.
- `licenses.csv` holds public list prices only. Negotiated prices do not belong in a repository.
- Everything in `scenarios.csv` is an **ASSUMPTION** for practice. Replace with real quotes and loaded salary costs before drawing any conclusion.
- People cost is always included.

## Run

```bash
python3 leadership/finops/tco.py
python3 leadership/finops/tco.py --developers 300
```
