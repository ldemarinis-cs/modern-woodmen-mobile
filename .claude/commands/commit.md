---
name: commit
description: >
  Commit staged changes, push to origin, create a PR, and output the PR URL.
  Use whenever the user says "commit", "commit and push", "sync", or asks for a PR message.
---

Follow these steps exactly, in order.

## Step 1 — Gather context

Run these in parallel:
- `git status` — identify modified/untracked files
- `git diff` — review all staged and unstaged changes
- `git log --oneline -5` — understand recent commit message style

## Step 2 — Stage and commit

Stage only the relevant source files (never `.env`, secrets, or binaries). Do not use `git add -A` or `git add .` — add files by name.

Write a commit message that:
- Uses conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Summarizes the *why*, not just the *what*
- Is concise (1–2 sentences max in the body if needed)
- Always ends with the co-author trailer

## Step 3 — Push to origin

```bash
git push --set-upstream origin HEAD
```

## Step 4 — Create PR

Check first whether a PR already exists — if one does, output the URL and stop.

```bash
gh pr view --repo casestatus/modern-woodmen-mobile 2>/dev/null \
  || gh pr create --repo casestatus/modern-woodmen-mobile \
       --title "<PR title under 70 chars>" \
       --body "..."
```

Output the PR URL so the user can open it directly.

The summary bullets should cover *what changed and why*. The test plan should be specific and checkable — not generic boilerplate.
