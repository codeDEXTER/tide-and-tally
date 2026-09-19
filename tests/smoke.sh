#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"

test -f index.html
test -f style.css
test -f game.js
grep -q "Tide &amp; Tally" index.html
grep -q "function reset" game.js
grep -q "function travel" game.js
grep -q "function buy" game.js

if command -v node >/dev/null 2>&1; then
  node --check game.js
else
  echo "node not installed; skipped JavaScript syntax check"
fi

echo "smoke checks passed"
