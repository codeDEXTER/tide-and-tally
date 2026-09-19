# Model-driven implementation workflow

## Mandatory external-authorization rule

The agent must never initiate, request, approve, or complete OAuth, device-code, account-login, API-key, or other persistent external authorization on the user's behalf. This includes opening an authorization flow, asking the user to enter a code, or clicking an authorization button. If a task needs external authorization, stop at the handoff point, explain what remains, and leave the user to complete it manually.

## Agent contract

The model may:

- inspect files
- search the codebase
- propose a plan
- edit files inside this project
- run the smoke test
- run a local HTTP server for manual review
- inspect test output

The model may not:

- access files outside the project without approval
- run destructive shell commands
- install packages without approval
- publish commits or push to a remote without approval
- initiate or request external account authorization of any kind
- claim a feature works without running the checks

## Prompt template

```text
You are working on Tide & Tally in this repository.

Task: <one narrowly defined feature or bug>

Constraints:
- Keep the project dependency-free.
- Preserve the existing game rules unless the task changes them.
- Inspect relevant files before editing.
- If using an external reference, code sample, dataset, model output, or asset, record its source and give appropriate credit before finishing.
- Do not copy protected game assets, characters, dialogue, or source code; use only material with compatible permission or license.
- Make the smallest coherent change.
- Run ./tests/smoke.sh after editing.
- Report changed files, test output, and any remaining uncertainty.
```

## Required loop

1. Ask the model to inspect and summarize the relevant code.
2. Ask for a short plan before edits.
3. Approve the plan.
4. Let the model edit only the project folder.
5. Run the smoke test.
6. Manually play the affected path in the browser.
7. Feed failures back to the model.
8. Review the diff and record the result in `RUN_LOG.md`.

## Attribution and reference constraint

Every model run must disclose meaningful external references used during implementation. The run record must name the source, provide a URL or local origin when available, explain what was used, and include the applicable license or attribution requirement. This includes code snippets, documentation, datasets, images, sounds, fonts, design references, and generated model output. If no external reference was used, record `None`. Uncredited reuse is a benchmark failure and must be corrected before publication.

## Suggested local API shape

The eventual front end can call a Colibrì-compatible OpenAI endpoint at `http://127.0.0.1:8000/v1`. The orchestration layer should expose narrow tools such as `list_files`, `read_file`, `write_file`, `run_tests`, and `git_diff`, with approval before writes and command execution.
