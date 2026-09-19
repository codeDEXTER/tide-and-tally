# Run log

Use this file to record each controlled model run.

| Run | Model/runtime | Task | Wall time | Turns | Tests | Human corrections | Result |
|---|---|---|---:|---:|---|---|---|
| 0 | Not started | Baseline project review | — | — | Pending | — | — |

## Preflight evidence (not scored model runs)

| Check | Evidence | Result |
|---|---|---|
| Raw checkpoint | `coli doctor --deep` on all 62 raw shards | Config, tensor layouts, shard sequence, required tensors, and index passed |
| Raw smoke | One-token `coli run` with `--no-think` | Correctly rejected FP8 source tensor; conversion required |
| Conversion test | One-shard `convert_glm53.py` run | Passed in 52 seconds; 4.16 GB int4 output |
| Full conversion | Other local session at `/Volumes/T9/loom-ai-models/models/GLM-5.3-Flash-i4` | In progress; duplicate stopped and removed; do not score until complete |
