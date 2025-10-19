#!/bin/bash
# Delete all GitHub deployments except the most recent one

DRY_RUN="${DRY_RUN:-false}"

# --- Detect owner/repo if not provided ---
OWNER="${OWNER:-}"
REPO="${REPO:-}"
if [[ -z "${OWNER}" || -z "${REPO}" ]]; then
  if gh repo view >/dev/null 2>&1; then
    NWO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
    OWNER="${NWO%%/*}"
    REPO="${NWO##*/}"
  else
    echo "Set OWNER and REPO env vars or run inside a checked-out repo."
    exit 1
  fi
fi

# Fetch all deployments (newest first)
DEPLOYMENTS=$(gh api repos/$OWNER/$REPO/deployments --jq '.[].id')

# Keep the first (most recent), delete the rest
FIRST=true
for ID in $DEPLOYMENTS; do
  if $FIRST; then
    echo "Keeping deployment $ID (most recent)"
    FIRST=false
  else
    echo "Deleting deployment $ID"
    if [ "$DRY_RUN" != true ]; then
      gh api -X DELETE repos/$OWNER/$REPO/deployments/$ID >/dev/null
    fi
  fi
  
done