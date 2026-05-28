# 跨项目开发插件标准（可复制基线）

## 1. 目标与默认原则

- 目标：在所有新项目中使用统一工程基线，优先保障质量稳定性，再追求交付速度。
- 默认项目画像：现代全栈 Web，代码托管在 GitHub。
- 默认部署平台：Vercel；当出现边缘实时或强状态需求时升级为 Cloudflare 主平台或混合部署。

## 2. 插件分层与职责

### P0 必装

- GitHub
- 用途：Issue/PR 协作、Code Review、CI 质量门禁、故障定位。

### P1 默认部署层

- Vercel（默认 Web 部署）
- 用途：PR Preview、环境隔离、快速回归验收。

### P1 可替代/增强部署层

- Cloudflare（按需启用）
- 用途：边缘计算、实时协作、队列、Durable Objects、MCP 服务等。

### P2 前端设计协同

- Figma（按需启用）
- 用途：设计到代码、设计系统规则、组件映射（Code Connect）。

### P2 AI 能力扩展

- Hugging Face（按需启用）
- 用途：模型/数据集检索、评测、训练任务。

### P3 内容与运营素材

- Canva（非研发主链路）
- 用途：运营设计、品牌素材、内容资产。

## 3. 项目类型 -> 插件组合

- 纯 Web 管理台/业务系统：`GitHub + Vercel`，有设计协作时加 `Figma`。
- 边缘 API/实时协作/状态型后端：`GitHub + Cloudflare`，前端可叠加 `Vercel`。
- AI SaaS/智能功能：`GitHub + Vercel + Hugging Face`，高并发边缘需求再加 `Cloudflare`。
- 设计驱动产品：`GitHub + Figma + Vercel`，必要时加 `Cloudflare`。

## 4. 跨项目统一工程约束

- PR 合并门禁固定为：`lint`、`unit test`、`build` 全通过。
- 关键项目再加：`e2e` 门禁。
- GitHub 评审规则：至少 1 个 approval，阻断评论已处理，CI 全绿后合并。
- 环境策略：`PR Preview -> Staging -> Production`，禁止本地直推生产。
- 回滚策略：优先平台原生回滚，且保留最近稳定版本标签（`stable-*`）。

## 5. 本仓库已落地的基线

- CI 门禁：`.github/workflows/quality-gate.yml`
- PR 检查模板：`.github/pull_request_template.md`
- NPM 脚本基线：`lint`、`test:unit`、`build`
- 单测占位与门禁验证：`tests/quality-gate.test.js`

## 6. 新项目落地步骤（复制即用）

1. 复制以下文件到新仓库：
   - `.github/workflows/quality-gate.yml`
   - `.github/pull_request_template.md`
   - `docs/engineering/cross-project-plugin-standard.md`
2. 对齐 `package.json` 脚本：
   - `lint`
   - `test:unit`
   - `build`
3. 在 GitHub 仓库设置中启用 Branch Protection：
   - Require pull request before merging
   - Require approvals (>=1)
   - Require status checks to pass（勾选 `Lint`、`Unit Test`、`Build`）
4. 连接部署平台（Vercel 或 Cloudflare）并验证 PR Preview、Staging、Production 三层流程。
5. 上线后建立稳定标签策略（示例：`stable-2026-04-22`）。
