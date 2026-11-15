#!/usr/bin/env bash
# One-time GitHub setup that needs your own credentials: label colours,
# milestones, and a Project board with every issue added to it.
# Untested. Requires the GitHub CLI, logged in with the "project" scope:
#   gh auth refresh -s project
# Run from the repository root:  bash scripts/bootstrap-github.sh
set -euo pipefail

REPO="martinnv6/idp-practice-as-leadership"
OWNER="martinnv6"

echo "Labels"
gh label create "type:epic"        --repo "$REPO" --color 5319e7 --description "Goal that groups stories" --force
gh label create "type:story"       --repo "$REPO" --color 0e8a16 --description "Work with a clear outcome" --force
gh label create "type:defect"      --repo "$REPO" --color d73a4a --description "Wrong, unverified or broken" --force
gh label create "area:leadership"  --repo "$REPO" --color 1d76db --description "Leadership track" --force
gh label create "area:technical"   --repo "$REPO" --color fbca04 --description "Technical track" --force

echo "Milestones"
for title in "M1 Foundations and discovery" "M2 Strategy and adoption" "M3 Money, vendors and AI" "M4 Executive readiness" "T1 Understand the platform (optional lab)"; do
  gh api "repos/$REPO/milestones" -f title="$title" >/dev/null 2>&1 || echo "  exists or failed: $title"
done

echo "Project"
PROJECT_URL=$(gh project create --owner "$OWNER" --title "IDP practice as leadership" --format json --jq .url)
echo "  $PROJECT_URL"
gh issue list --repo "$REPO" --state open --limit 200 --json url --jq '.[].url' | while read -r url; do
  gh project item-add "$(basename "$PROJECT_URL")" --owner "$OWNER" --url "$url" >/dev/null
done
gh project link "$(basename "$PROJECT_URL")" --owner "$OWNER" --repo "$REPO" || true

echo "Done. In the project, add a Board view grouped by Status and a Table view grouped by label."
