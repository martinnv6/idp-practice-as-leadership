# lab/

How to run the lab locally. Commands here follow the tools' public documentation and **have not been run from this repo yet**; Phase 1 is where they are tried and corrected.

## Prerequisites

- Docker running, with at least 4 CPUs and 8 GB of memory assigned.
- `kubectl`, `helm`, `git`.
- `idpbuilder` from https://github.com/cnoe-io/idpbuilder (release binary or `brew install cnoe-io/tap/idpbuilder`).

## Phase 1 quick start

```bash
# 1. Create the local platform: kind cluster + Argo CD + Gitea + ingress
idpbuilder create

# 2. Get the generated credentials
idpbuilder get secrets

# 3. Open the UIs (default host of the CNOE local setup)
#    Argo CD: https://cnoe.localtest.me:8443/argocd
#    Gitea:   https://cnoe.localtest.me:8443/gitea
```

Depending on the idpbuilder version, the default may use sub-domains (`argocd.cnoe.localtest.me`) instead of paths; `--use-path-routing` selects path routing.

## Phase 2 quick start

```bash
# Add Backstage and identity from the CNOE reference stack
git clone https://github.com/cnoe-io/stacks.git ../stacks
idpbuilder create --use-path-routing -p ../stacks/ref-implementation
```

The reference stack uses Keycloak for identity. Phase 4 adds Dex next to it or in its place, so both brokers can be compared.

## Tear down

```bash
kind get clusters
kind delete cluster --name localdev
```

## Log

Keep a short log per phase in `lab/log/phase-N.md`: date, versions installed, what failed, the numbers captured. That log is the evidence behind everything you later say about the lab.
