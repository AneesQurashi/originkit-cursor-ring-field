#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -z "${ORIGINKIT_API_KEY:-}" ]]; then
  echo "Missing ORIGINKIT_API_KEY. Export it privately in your shell first." >&2
  exit 1
fi
if [[ ! -d node_modules ]]; then
  echo "Installing project dependencies..."
  npm install
fi
# IMPORTANT: Do not enable shell tracing (set -x) or echo the secret.
npx originkit@latest add cursor-ring-field --prompt
printf '\nOriginkit install finished. Run: npm run dev\n'
