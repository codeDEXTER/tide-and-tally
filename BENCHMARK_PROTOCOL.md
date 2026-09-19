# Tide & Tally benchmark protocol v1

This protocol makes future model comparisons comparable.

## Baseline

- Start from the same tagged commit: `baseline-v1`.
- Use the same clean working tree for every model.
- Use the same task prompt, task order, time limit, and tool set.
- Do not give a model the solution or hints from another model's run.

## Allowed environment

- Repository files inside the project directory
- A local browser for manual review
- The repository's smoke test
- A terminal restricted to the project directory
- No package installation during a run unless the task explicitly tests setup
- No access to unrelated personal files or secrets

## Standard run budget

- Task A: 10 minutes, analysis only
- Task B: 30 minutes, implementation
- Task C: 30 minutes, debugging
- Task D: 45 minutes, extension
- One model turn means one model response plus its requested tool calls
- Human clarification is allowed only for ambiguity or safety, not implementation

## Required artifacts

Every run must retain:

- model name and version
- runtime and model format
- quantization and context settings
- hardware and available memory
- exact prompt
- tool trace or command log
- final diff
- test output
- wall-clock time and model-turn count
- human corrections, if any
- external references and attribution record, or an explicit `None`
- score and reviewer notes

## Scoring

Score each category from 0 to 4:

| Category | 0 | 4 |
|---|---|---|
| Requirements coverage | Missing or contradicts the task | Complete and faithful |
| Functional correctness | Does not run | Behavior works across the acceptance cases |
| Test discipline | No meaningful check | Adds or runs useful checks and reports honestly |
| Scope discipline | Uncontrolled changes | Small, focused, dependency-free change |
| Maintainability | Confusing or fragile | Clear structure and sensible boundaries |
| Debugging/recovery | Cannot locate or repair failure | Reproduces, explains, and fixes failure |
| Human correction load | Human implements most of it | No implementation correction needed |

Maximum score: 28.

## Reporting

Report raw scores and evidence. Do not report a leaderboard position without the underlying run records. A failed run is valuable evidence and must not be silently repaired before scoring.

## Attribution gate

Any external reference used by a model or human during a run must be disclosed in the run record with its source, what was borrowed or followed, and the applicable license or credit. Uncredited reuse of code, assets, text, data, or distinctive protected game content fails the attribution gate and cannot be published until corrected. Original work and references with no redistributable permission must be separated clearly.
