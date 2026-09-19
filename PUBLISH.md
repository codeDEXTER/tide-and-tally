# Private repository publication

The local repository is ready for publication as `tide-and-tally`.

## After GitHub authentication

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
