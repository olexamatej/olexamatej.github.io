#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
PREVIEW_HOST="${HOST:-127.0.0.1}"
PREVIEW_PORT="${PORT:-5173}"

cd -- "${PROJECT_DIR}"

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "Node.js and npm are required. Install Node.js 18+ and run this script again." >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Installing project dependencies..."
  npm install
fi

echo "Starting Matej Olexa's portfolio preview"
echo "Home:     http://${PREVIEW_HOST}:${PREVIEW_PORT}/"
echo "Projects: http://${PREVIEW_HOST}:${PREVIEW_PORT}/index-projects.html"
echo "Writing:  http://${PREVIEW_HOST}:${PREVIEW_PORT}/writeups.html"
echo "Press Ctrl+C to stop."

exec npm run dev -- --host "${PREVIEW_HOST}" --port "${PREVIEW_PORT}"
