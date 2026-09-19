# Contributing to Tide & Tally

Tide & Tally is both a small game and a reproducible coding-model benchmark.

## Before changing the game

1. Read `PROJECT_BRIEF.md` and `GAME_SCOPE.md`.
2. Preserve the dependency-free browser baseline unless the task explicitly changes it.
3. Keep the game original; do not add copied assets, names, dialogue, characters, or source from another game.
4. Add or update a check when changing a rule.
5. Run `./tests/smoke.sh`.
6. Record the change and result in `RUN_LOG.md` when it is part of a model benchmark.

## Benchmark changes

Do not change the fixed task wording, scoring rubric, or baseline during an active comparison. Propose protocol changes separately and version them before running new models.
