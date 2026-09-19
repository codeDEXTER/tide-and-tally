# Project brief

## Public identity

**Tide & Tally: The Model Harbor**

Short name: **Tide & Tally**

Repository slug: `tide-and-tally`

The name signals the two central systems: sailing conditions and commercial accounting. “The Model Harbor” makes the public purpose explicit: this is a safe harbor where coding models can be evaluated by building the same small game under the same rules. The title is short enough for a game, distinctive enough for a public repository, and clearly separate from the classic game that inspired the merchant-sailing loop.

Public tagline: *A fair harbor for testing how AI models build software.*

## Purpose

Create a repeatable testbed for comparing coding models. Every model should receive the same small game, the same requirements, and the same controlled tasks. The project should make it possible to compare:

- planning quality
- code correctness
- multi-file editing
- debugging ability
- test discipline
- tool use
- human correction load
- speed and cost

## Product boundary

The base project is a browser game with no build system, framework, external assets, backend, telemetry, or package installation. This keeps the benchmark portable and prevents environment setup from dominating the result.

## Model fairness rules

1. Start every model from the same tagged baseline commit.
2. Give every model the same task wording and repository instructions.
3. Allow the same tools: inspect, search, edit, test, and diff.
4. Do not provide hidden implementation hints.
5. Record model, runtime, quantization, context settings, and hardware.
6. Stop a run when the time budget expires; do not silently finish it by hand.
7. Human edits are recorded separately and count against correction load.
8. Score the resulting behavior and tests, not just the amount of code produced.
9. Never expose secrets or unrelated files to the model.
10. Preserve the full prompt, tool trace, diff, test output, and final score.

## Safety and publishing boundary

The benchmark is original software. Do not copy proprietary game assets or source code. Keep model-generated contributions under review, run security checks, and publish only material that the project owner has approved.
