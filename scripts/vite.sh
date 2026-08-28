#!/bin/sh

set -eu

if command -v node >/dev/null 2>&1; then
  node_bin="$(command -v node)"
elif [ -n "${CODEX_NODE:-}" ] && [ -x "$CODEX_NODE" ]; then
  node_bin="$CODEX_NODE"
elif [ -x "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" ]; then
  node_bin="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
else
  echo "Node.js 20.19+ is required. Install Node.js or set CODEX_NODE to its executable path." >&2
  exit 127
fi

exec "$node_bin" node_modules/vite/bin/vite.js "$@"
