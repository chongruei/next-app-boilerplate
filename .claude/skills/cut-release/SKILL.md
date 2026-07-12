---
name: cut-release
description: Cut a new GitHub Release for this repo — bump package.json version, draft categorized release notes from PRs merged since the last tag, drive .github/workflows/release.yml to create/update the release, and work around the known tag-push permission issue. Use when the user asks to cut a release, "發新版", "下個 tag 新增 release note", "打 tag", or "產生 release note".
---

# Cut Release

Standing workflow for publishing a versioned release of `chongruei/next-app-boilerplate`, built around `.github/workflows/release.yml` (triggers on `push: tags: v*` or `workflow_dispatch`).

## 1. Version bump

- Decide the next semver version from what's changed since the last tag (check `mcp__github__list_tags` / `list_releases` for the last one). Default to a minor bump if there's a notable feature/upgrade, patch for fixes-only — ask the user if genuinely ambiguous.
- Bump `"version"` in `package.json`, commit, open a PR, wait for CI green, merge (per the `pr-review-gate` skill — never auto-merge).

## 2. Draft release notes

Gather every PR merged since the previous tag: `mcp__github__list_pull_requests` (state closed, sorted by created desc — paginate/slice if the result is large, it can exceed the tool-result token cap) and `mcp__github__list_releases` to find the previous tag's `published_at` as the cutoff. Include Dependabot PRs, not just this session's PRs.

Categorize by conventional-commit prefix / intent into the house style used in past releases (see `mcp__github__get_latest_release` for the exact format to match: `## What's Changed` heading, `**Full Changelog**` compare link at the end). For a substantial release, split into labeled sections rather than one flat list — this repo's readers have responded well to:

- 🚀 Major Dependency Upgrade / Features
- 🔒 Security
- 🐛 Bug Fixes
- ⚙️ Engineering & CI
- 🧪 Testing
- 📝 Docs
- 🤖 Dependency Bumps (Dependabot)

Each bullet: `* <PR title> by @<author> in <PR URL>`. Add a short prose line under a section when the change needs more than the title to explain (see v1.13.0 release for a worked example).

Show the drafted notes to the user before publishing, unless they've already asked you to just go ahead.

## 3. Get the tag onto GitHub

**Known issue**: pushing a brand-new tag ref with this session's GitHub App token reliably gets HTTP 403 on the `POST .../git-receive-pack` step specifically for tag-ref creation — even though the same token pushes branches fine, `GET info/refs?service=git-receive-pack` returns 200, and the repo has no Rulesets or legacy Protected Tags configured. Root cause is an unconfirmed GitHub App permission nuance around tag-ref creation, not a sandbox network issue and not a repo setting. Don't waste time re-diagnosing this — go straight to the workaround:

- Ask the user to push the tag themselves from their own machine/credentials:
  ```bash
  git fetch origin main
  git tag vX.Y.Z $(git rev-parse origin/main)
  git push origin vX.Y.Z
  ```
- Or have them use the GitHub web UI: Releases → Draft a new release → Choose a tag → type `vX.Y.Z` → Create new tag on publish.

After they say it's done, **verify independently** — `mcp__github__get_tag` or `list_tags` — before proceeding; don't trust "done" at face value, the push can silently fail or land on the wrong ref, and GitHub's API can lag a few seconds behind a fresh push.

## 4. Apply curated notes

The tag push alone triggers `release.yml` and creates a release with GitHub's auto-generated notes (flat, ungrouped, per `.github/release.yml`'s wildcard rule) — that's expected, not a bug. To replace it with the categorized draft from step 2:

```
mcp__github__actions_run_trigger (method: run_workflow, workflow_id: release.yml, ref: main,
  inputs: { tag: "vX.Y.Z", body: "<curated markdown>" })
```

`softprops/action-gh-release` upserts by tag name, so this overwrites the release body in place rather than creating a duplicate.

## 5. Verify

Poll `mcp__github__actions_get` (method `get_workflow_run`) until `status: completed`, then `mcp__github__get_release_by_tag` to confirm the body actually updated (the API can return the stale pre-run body if you check too early — re-fetch after confirming the run completed). Show the user the release URL.
