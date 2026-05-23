# GitHub 仓库设置清单（跨项目统一）

> 目的：把代码仓库层面的质量稳定性规则落到平台设置，而不是仅靠口头约定。

## Branch Protection（主分支）

- Branch name pattern: `main`（或你的默认发布分支）
- Enable `Require a pull request before merging`
- Enable `Require approvals`，minimum approvals = `1`
- Enable `Dismiss stale pull request approvals when new commits are pushed`
- Enable `Require review from Code Owners`（如果仓库使用 CODEOWNERS）
- Enable `Require status checks to pass before merging`
- Required checks:
  - `Lint`
  - `Unit Test`
  - `Build`
- Enable `Require branches to be up to date before merging`
- Enable `Do not allow bypassing the above settings`

## Deployment Environments

- Create environments:
  - `preview`
  - `staging`
  - `production`
- For `production`, require manual approval from maintainers.
- Use deployment platform integration to enforce:
  - PR -> Preview
  - Main/Release -> Staging
  - Approved promotion -> Production

## Rollback and Stable Tags

- Keep stable tags in the repository (example: `stable-2026-04-22`).
- Every production release should map to a stable tag.
- Rollback order:
  1. Platform-native rollback (Vercel/Cloudflare)
  2. If needed, redeploy from the latest stable tag
