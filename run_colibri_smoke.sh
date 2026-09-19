#!/bin/zsh
set -euo pipefail

# Terminal-only smoke runner. Keep paths explicit so the benchmark cannot
# accidentally use a different Python, model, or runtime.
COLIBRI_PYTHON="${COLIBRI_PYTHON:-/Users/aashish/apps/Loom/.venv-loom-ai/bin/python}"
COLIBRI_SOURCE="${COLIBRI_SOURCE:-/Users/aashish/apps/Loom/.colibri-src}"
COLIBRI_MODEL="${COLIBRI_MODEL:-/Volumes/T9/loom-ai-models/models/GLM-5.3-Flash-colibri-i4}"

if [[ ! -x "$COLIBRI_PYTHON" ]]; then
  print -u2 "Missing Colibrì Python: $COLIBRI_PYTHON"
  exit 1
fi
if [[ ! -f "$COLIBRI_SOURCE/c/coli" ]]; then
  print -u2 "Missing Colibrì source checkout: $COLIBRI_SOURCE"
  exit 1
fi
if [[ ! -f "$COLIBRI_MODEL/config.json" ]]; then
  print -u2 "Converted model is not ready: $COLIBRI_MODEL"
  exit 1
fi

exec "$COLIBRI_PYTHON" "$COLIBRI_SOURCE/c/coli" run \
  --model "$COLIBRI_MODEL" \
  --ram "${COLIBRI_RAM_GB:-12}" \
  --ctx "${COLIBRI_CONTEXT:-128}" \
  --ngen "${COLIBRI_NEW_TOKENS:-8}" \
  --no-think --policy balanced \
  "Reply with exactly OK."
