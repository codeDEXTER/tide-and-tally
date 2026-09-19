# Comparative benchmark plan

This document defines the model-comparison experiment for Tide & Tally. It is intentionally model-neutral: the game is the fixed test environment, not a task designed around one vendor's agent.

## Research question

Which model can take a small, documented browser game from a known baseline to a complete, playable, tested release with the least human correction, while staying within the same scope and constraints?

## Autonomous-module rule

Every module has one written goal, one fixed prompt, a time budget, and acceptance checks. Once a module starts, the model receives no additional implementation input. It may inspect the repository, edit files, run the allowed commands, and make its own decisions. A human may stop the run for safety, but may not explain the solution, repair files, or answer implementation questions during the module.

Modules may run sequentially so that the next module starts from the previous module's committed repository state. Every model must receive the same module prompts, baseline commit, tool permissions, and time limits. If a model asks for clarification, log the question, do not answer it, and score the module using the state it produced when the timer expires.

## Modules

| Module | Goal | Time limit | Completion gate |
|---|---|---:|---|
| 0 — Orientation | Understand the codebase and write a plan without editing product files. | 10 min | Accurate state summary, risks, and plan saved to the run record. |
| 1 — Playable core | Build or complete the merchant loop: ports, prices, buying, selling, sailing, turns, win/loss state, and restart. | 45 min | The game loads without dependencies and all core smoke checks pass. |
| 2 — Depth and interface | Add the fixed ship-upgrade and sea-event requirements while preserving the trading loop. | 35 min | Multi-file change works in the browser and existing checks still pass. |
| 3 — Debugging | Diagnose and repair one seeded accounting or price bug without changing the rules. | 30 min | Reproduction, explanation, focused fix, and regression check are recorded. |
| 4 — Release hardening | Improve accessibility, responsive behavior, documentation, and test coverage without expanding scope. | 35 min | Manual playthrough, smoke checks, clean diff, and release summary pass review. |

The current repository is the reference implementation of the complete minimum game. A blank-project reproduction can use Modules 0–4; the model-comparison run should start from the same tagged baseline for every model.

## Controlled parameters

- Baseline: one immutable Git tag, `baseline-v1`.
- Prompt: exact text stored under `benchmark/prompts/` for each module.
- Tools: file listing/search, file read/write, terminal, tests, and Git diff only.
- Network: disabled unless the lane explicitly tests research; external references must be credited.
- Dependencies: no package installation for the baseline run.
- Test command: `./tests/smoke.sh`; also run `node --check game.js` and `git diff --check`.
- Browser: one manual playthrough at the release-hardening gate.
- Human input: safety intervention only; no implementation guidance.
- Repetitions: three independent runs per model/module when practical; report median and range.
- Randomness: record model version, reasoning/effort setting, temperature if exposed, and seed if exposed.
- Stop rule: stop exactly at the module time limit; preserve the working tree and transcript.

## Model lanes

| Lane | Candidate | Purpose | Execution boundary |
|---|---|---|---|
| Local constrained | GLM-5.3-Flash through Colibrì | Test privacy, storage-streaming, and low-memory local coding. | M1 Pro, 16 GB RAM, T9; record cold/warm cache and time-to-first-token. |
| Claude budget | Claude Haiku 4.5 through Claude Code | Low-cost, fast hosted coding-agent comparison. | Same repository, prompts, module limits, and no human hints. |
| Claude balanced | Claude Sonnet 4.6 through Claude Code, **high effort** | Recommended first Claude run: strong coding quality with a reasonable cost/time profile. | Same as above; record exact model ID and effort setting. |
| Claude frontier | Claude Opus 5 through Claude Code, **very high/max effort** | Premium upper-bound control for the best autonomous completion we can obtain from Claude. | Run after Sonnet; record exact model ID, effort, and cost. |
| Frontier control | GPT-5.3-Codex through Codex cloud | Reference for what a current frontier coding agent does with the same task. | Isolated cloud task; export transcript, diff, tests, and elapsed time. |

Claude Haiku 4.5 is the recommended “low-level” Claude lane: Anthropic describes it as its small, faster, lower-cost model and explicitly positions it for Claude Code and rapid prototyping. Sonnet 4.6 is a useful second Claude lane because it is a stronger control while remaining below the premium Opus tier. Model names and availability must be rechecked at run time.

### Recommended order

1. Run Sonnet 4.6 at high effort first. This is the primary Claude baseline.
2. Run Haiku 4.5 at its normal/default effort to measure the economical lane.
3. Run Opus 5 at very high/max effort only after the protocol and scoring are stable. Treat it as an upper-bound quality comparison, not the default model.

If the Claude interface exposes only qualitative choices such as “high” and “very high,” record the exact displayed choice in the run metadata. Do not compare a high-effort Sonnet score directly with a max-effort Opus score without showing the effort setting.

## Measurements

### Primary outcome

`Completion rate` = modules that pass all acceptance gates / modules attempted.

### Quality score — 28 points

Score each from 0–4 using evidence from the diff, tests, and manual playthrough:

1. Requirements coverage
2. Functional correctness
3. Test discipline
4. Scope discipline
5. Maintainability
6. Debugging and recovery
7. Human correction load, where 4 means no implementation correction

### Operational metrics

- Wall-clock time per module and total time to a complete game.
- Time to first response/token for local lanes.
- Number of model turns and tool calls.
- Test pass rate and number of regressions.
- Lines/files changed, used only as diagnostic context—not as a quality score.
- Human corrections and clarification requests.
- Token usage and estimated cost for hosted lanes, when available.
- Peak RAM, disk growth, and CPU time for local lanes.
- Attribution/compliance violations.

## Graphs and reporting

The report should contain four views:

1. **Completion funnel:** percentage of runs passing Modules 1–4.
2. **Quality vs. time scatter:** total score on the y-axis and hours to completion on the x-axis; a better result is higher and farther left.
3. **Module heatmap:** model rows, module columns, and 0–4 scores, with the raw score printed in every cell.
4. **Correction-load bars:** human correction minutes and clarification count per model.

Never plot invented values as results. `results/benchmark-dashboard.html` is only a clearly labeled layout mockup until real run records replace its sample data.

## External benchmark context

Vendor-published scores are context, not substitutes for this experiment. OpenAI reports GPT-5.3-Codex scores of 56.8% on SWE-Bench Pro, 77.3% on Terminal-Bench 2.0, and 64.7% on OSWorld-Verified, with xhigh reasoning; those tasks, scaffolds, and environments are not equivalent to Tide & Tally. Anthropic reported 73.3% for Claude Haiku 4.5 on SWE-bench Verified under its stated scaffold and methodology. OpenAI later documented serious quality and contamination concerns in common coding evaluations, so we should not merge vendor scores into our leaderboard.

Use those numbers only to explain why our benchmark measures a different thing: long-horizon completion of one small product under fixed prompts, reproducible local checks, and observed human correction.

## Estimated time to build the complete game

For this deliberately small scope, a capable frontier cloud agent should plausibly complete Modules 1–4 in roughly **2–4 hours of elapsed agent time**, including test and review loops. A budget hosted model may need **3–8 hours** or may fail a module and require a second run. The local GLM-5.3-Flash lane is the unknown: conversion and disk-streaming inference can dominate, so the honest estimate is **half a day to multiple days**, depending on time-to-first-token and whether the model can sustain long tool loops. We will replace estimates with measured medians after the first three runs per lane.

The existing human-authored POC should not be used to claim model completion time; it is the controlled starting artifact and benchmark harness.

## Result record

Each run stores the exact prompt, model ID, runtime, settings, transcript, diff, tests, wall-clock timings, score, corrections, references, and reviewer notes. A failed or incomplete run is retained as evidence rather than repaired before scoring.

See [BENCHMARK_PROTOCOL.md](BENCHMARK_PROTOCOL.md) for the shared protocol and [results/benchmark-dashboard.html](results/benchmark-dashboard.html) for the non-result chart layout.
