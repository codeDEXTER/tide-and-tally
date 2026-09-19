# POC benchmark

The benchmark compares model behavior, not just final game quality.

## Tasks

### Task A — understand

Ask the model to describe the state model, market rules, travel/event flow, and restart path without editing files.

### Task B — implement

Ask it to add ship upgrades while preserving existing market behavior.

### Task C — debug

Introduce a small bug in price or cargo accounting, then ask the model to reproduce, diagnose, and fix it.

### Task D — extend

Ask it to add a delivery contract between two ports and no new dependencies.

## Record for every run

- model and runtime
- model quantization
- machine and RAM available
- model location and storage medium
- cold or warm cache
- time to first response
- total wall-clock time
- number of model turns
- files changed
- tests passed
- manual gameplay result
- human corrections required
- failure modes or hallucinated commands

## Scoring rubric

Score each run from 0 to 4 in each category:

- Requirements coverage: 0–4
- Functional correctness: 0–4
- Test quality and test result: 0–4
- Scope discipline: 0–4
- Code clarity and maintainability: 0–4
- Debugging/recovery: 0–4
- Human correction load: 0–4, where 4 means no correction

Maximum: 28 points. Report the raw score, not only a rank.

## Practical success threshold

The model is useful for this benchmark if it can complete Tasks B–D, keep the project passing `./tests/smoke.sh`, and score at least 20/28 without hidden human implementation work.
