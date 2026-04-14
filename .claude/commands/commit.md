---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr view:*), Bash(gh pr create:*)
description: Commit staged changes and push to both casestatus and ldemarinis-cs remotes
---

## Context

- Current git status: !`git status`
- Current git diff (staged and unstaged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -5`
- Configured push remotes: !`git remote -v`

## Your task

Follow these steps exactly, in order.

### Step 1 — Stage and commit

Stage only relevant source files (never `.env`, secrets, or large binaries). Do not use `git add -A` or `git add .` — add files by name.

Write a commit message that:
- Uses conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Summarizes the *why*, not just the *what*
- Is concise (1-2 sentences max)
- Always ends with this trailer:

  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

### Step 2 — Push to both remotes

This repo is configured with two push URLs on `origin`:
- `https://github.com/casestatus/modern-woodmen-mobile.git` (primary — Case Status)
- `https://github.com/ldemarinis-cs/modern-woodmen-mobile.git` (personal mirror)

A single `git push` reaches both simultaneously. Run:

```bash
git push --set-upstream origin HEAD
```

### Step 3 — PR check

```bash
gh pr view 2>/dev/null || echo "No PR — committed directly to main"
```

Output a one-line confirmation with the commit SHA and confirm both remotes received the push.
