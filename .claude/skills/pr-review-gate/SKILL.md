---
name: pr-review-gate
description: Check CI and CodeRabbit review status across one or more PRs in this repo, self-fix any real issue that CI or CodeRabbit finds (verify empirically before trusting the finding), reply to and resolve CodeRabbit threads, and report a clear ready/not-ready summary — but never merge without explicit user confirmation. Use whenever the user asks to check PR status, review CodeRabbit comments, "查看 PR 狀態", "檢查 CI", or says something like "全部修" about outstanding review feedback.
---

# PR Review Gate

Standing workflow for shepherding PRs in `chongruei/next-app-boilerplate` through CI + CodeRabbit review to a mergeable state, established over many rounds in this repo. The core rule: **never auto-merge**. Every merge needs an explicit "好" / confirmation from the user, even if everything is green.

## Per-PR check

For each PR in scope:

1. `mcp__github__pull_request_read` (method `get`) for `mergeable` and the exact `head.sha`, plus CI check runs for that SHA (`actions_list` → `list_workflow_runs` filtered to the head branch, then match `head_sha` — don't trust "latest run on the branch" alone, a later push can leave a stale run associated with the branch name).
2. `mcp__github__pull_request_read` (method `get_reviews` / `get_review_comments`) to pull CodeRabbit's review threads.
3. Classify:
   - **Ready**: `mergeable === true` AND all required CI runs for the current head SHA are green AND no unresolved actionable CodeRabbit comment.
   - **Needs work**: not mergeable, CI red/pending for the head SHA, or CodeRabbit raised something not yet addressed/resolved.

## Handling CodeRabbit / CI findings

Do not take a finding at face value — verify it against the actual code first (read the file, reproduce the bug, or run the relevant check locally/in CI logs).

- **Finding is valid** → fix it, re-verify (typecheck/lint/build/test as relevant — see sandbox notes below), commit, push. Then reply on the CodeRabbit thread explaining the fix and reference the commit (style: "Addressed in commit `<sha>`: ..."), and resolve the thread (`pull_request_review_write` method `resolve_thread`, or `resolve_review_thread`).
- **Finding is not valid / a deliberate tradeoff** → reply explaining the reasoning, then resolve the thread. Don't leave it hanging and don't silently ignore it — CodeRabbit and the user should see a response either way.
- CodeRabbit sometimes auto-detects a fix landing in a later commit and auto-resolves with "✅ Addressed in commit X" — still double-check manually, it isn't 100% reliable.

## Sandbox notes (this environment)

- Outbound network is proxied and blocks some hosts (confirmed: `cdn.playwright.dev`, `jsonplaceholder.typicode.com`). Don't conclude a real failure from a blocked-host error — check `curl -sS "$HTTPS_PROXY/__agentproxy/status"` to confirm it's a policy block, not a real bug, then rely on real GitHub Actions CI for anything that needs those hosts (multi-browser Playwright, live API calls).
- Pre-installed Chromium at `/opt/pw-browsers/chromium-*/chrome-linux/chrome` works fine for local browser checks that don't need blocked hosts.
- `.husky/pre-commit` runs `pnpm lint-staged` then `pnpm typecheck` (fast) — on current `main` this is cheap enough to just let it run, don't reach for `--no-verify` here. If you're on an older branch where the hook still runs the full Playwright suite, run `pnpm lint-staged` and `pnpm typecheck` explicitly yourself first, then use `--no-verify` only to skip the long e2e run (not to skip everything blindly) — and say in your report to the user which checks you bypassed and why.

## Reporting back

Summarize as a compact table: PR number, title, CI status, CodeRabbit status, action taken. Explicitly list which PRs are ready to merge and wait for the user to say which ones (or "全部") before calling `merge_pull_request`. If you fixed something, say what you fixed and why — the user has asked for this transparency repeatedly.
