# Game scope: Tide & Tally

## Goal

Build the smallest game that still exercises real software implementation:

- state management
- market and pricing rules
- travel and risk resolution
- deterministic seeded events
- rendering and UI feedback
- restart and reset flow
- automated checks

## Fixed v1 scope

The first version has one map, five ports, four trade goods, a cargo hold, port-specific prices, turn-based travel, a profit target, ship upgrades, a small event system, and restart.

### Core loop

1. Inspect current port prices.
2. Buy cargo within the ship’s capacity.
3. Choose a destination.
4. Travel one turn and resolve a simple event.
5. Sell cargo at the destination.
6. Upgrade capacity when profitable.
7. Reach the target fortune before the voyage limit.

## Explicit non-goals

- No framework
- No build step
- No external assets
- No backend
- No multiplayer
- No copied Tradewinds assets, characters, names, dialogue, story, or UI
- No combat in v1; pirate encounters are represented as a simple risk event
- No accounts or server persistence
- No sound requirement
- No mobile controls in v1

## Proposed implementation boundaries

- `index.html`: accessible game shell, map, market, and status text
- `style.css`: layout, theme, map, tables, and state styling
- `game.js`: pure game state, market rules, travel, events, upgrades, rendering
- `tests/smoke.sh`: static and JavaScript syntax checks

## Feature backlog for model-driven iterations

1. Baseline trading loop and smoke checks.
2. Add a second economy profile with scarcity changes.
3. Add ship upgrades and maintenance costs.
4. Add deterministic seeded events.
5. Add a small quest board with delivery contracts.
6. Add a save/resume panel stored locally.
7. Add a lightweight replay/export string for debugging.

Each iteration must have a written request, a diff, a test result, and a short human review.
