# Tide & Tally

Tide & Tally is a public-minded benchmark project for testing whether different AI models can incrementally build and improve the same small game under identical rules.

## The game

Tide & Tally is an original, dependency-free browser game inspired by the merchant-sailing loop of classic Tradewinds-style games:

- Sail between a small set of ports.
- Buy goods where they are cheap and sell them where they are scarce.
- Manage cash, cargo capacity, travel time, and risk.
- Upgrade the ship after earning enough profit.
- Respond to occasional sea events.

The game is intentionally small, deterministic, and easy to test. It does not copy Tradewinds’ assets, characters, dialogue, story, or interface. The benchmark measures implementation quality, not artistic imitation.

## Hardware target

- MacBook Pro with Apple M1 Pro
- 16 GB unified memory
- External Samsung T9 with approximately 1.7 TB free space
- macOS

The initial test should use the smallest Colibrì-compatible model that fits comfortably. GLM-5.3 itself is an optional stress test: storage is available, but 16 GB unified memory is the limiting constraint.

## Benchmark objective

Each model receives the same repository, requirements, prompts, time budget, and test commands. The model is evaluated on whether it can:

1. Explain the existing codebase accurately.
2. Implement a requested feature across at least two files.
3. Run the smoke tests and browser game locally.
4. Diagnose and fix at least one intentionally introduced bug.
5. Produce a clean Git diff and a short implementation summary.

See [PROJECT_BRIEF.md](PROJECT_BRIEF.md), [GAME_SCOPE.md](GAME_SCOPE.md), [AGENT_WORKFLOW.md](AGENT_WORKFLOW.md), and [BENCHMARK.md](BENCHMARK.md) for the controlled plan.

For the machine-specific model experiment, see [COLIBRI_RUN_PLAN.md](COLIBRI_RUN_PLAN.md). For publication, see [PUBLISH.md](PUBLISH.md).

## Run the game

Open `index.html` in a browser. No package installation is required.

For a local HTTP server:

```bash
python3 -m http.server 8080
```

Then open <http://127.0.0.1:8080>.

## Run checks

```bash
./tests/smoke.sh
```

## Repository status

The intended public repository name is `tide-and-tally`. The local POC folder is `tide-and-tally-poc`.
