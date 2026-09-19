# Private repository publication

The local repository is ready for publication as `tide-and-tally`.

## Mandatory authorization boundary

The agent must not initiate, request, or complete GitHub OAuth/device authorization, account login, token creation, or permission approval. The owner must perform any GitHub sign-in and authorization manually. Once the owner has independently authenticated the local `gh` CLI, the owner may run the commands below.

## After owner-managed GitHub authentication

From this directory:

```bash
gh auth status
gh repo create tide-and-tally --private --source=. --remote=origin --push
```

Then verify:

```bash
git remote -v
gh repo view --json nameWithOwner,isPrivate,url
```

The repository must remain private until the owner reviews the generated code, model-run records, licenses, and any logs. Do not commit model weights, API keys, personal files, or raw logs containing sensitive data.
