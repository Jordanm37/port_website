# CI Auto-Fix (Codex)

This repository includes a workflow that attempts to automatically fix failing CI on pull requests.

## How it works

- CI (`.github/workflows/ci.yml`) runs on PRs and pushes to `main`.
- If CI fails on a PR, the Codex workflow (`.github/workflows/codex-auto-fix-ci.yml`) is triggered by `workflow_run`.
- It collects failure details, writes them to `.ci-failure.json`, and asks Codex to apply minimal, safe edits to fix:
  - ESLint violations
  - TypeScript type errors
  - Next.js build errors
- Validation (`lint`, `typecheck`, `build`) runs non-blocking to provide feedback.
- Push strategy:
  - If the PR is from the same repo and branch is not protected, Codex pushes directly to the PR head branch.
  - Otherwise, Codex pushes to a new `codex-auto-fix-ci-<branch>-<runId>` branch and comments with a quick-PR link.
- Loop guard prevents Codex from retriggering itself on its own auto-fix commit.

## Triggers

- Automatic: CI failure on a PR triggers the workflow.
- Manual: push a new commit to the PR (if it still fails), or re-run CI to retrigger the workflow via a new failure.

## Forks and protected branches

- For forked PRs or protected branches where direct push is disallowed, Codex creates a `codex-auto-fix-ci-...` branch in the base repo.
- The workflow then comments on the PR with a link to create a PR from the fix branch.

## Vercel preview check (optional)

- If `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` are configured as repository secrets, the workflow attempts to surface basic preview deployment info for the PR branch.

## Secrets required

- `OPENAI_API_KEY` – Codex API key.
- Optional: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Tips

- Keep local pre-commit checks (husky + lint-staged) enabled to catch issues early.
- If you do not want auto-fixes on a PR, add a label such as `skip-auto-fix` (if configured in the workflow) or temporarily disable the workflow for that PR.
- Prefer small, focused changes so Codex can apply minimal fixes.
