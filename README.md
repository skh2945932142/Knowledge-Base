# 个人知识库前端

基于 Vue 3、Vite 和 Element Plus 构建的个人知识库前端应用，支持账号登录、页面管理、Markdown 编辑与内容预览。

## 功能概览

- 用户登录与注册
- 页面列表管理
- Markdown 编辑与预览
- 页面内容自动保存
- 登录状态校验与路由拦截
- 开发环境接口代理

## 技术栈

- Vue 3
- Vite
- Element Plus
- Vue Router
- Axios
- @kangc/v-md-editor

## 环境要求

建议使用 Node.js 18.0.0 或更高版本。

## 开发说明

本项目为前后端分离应用。启动前端前，请确保后端服务已正常运行，并可通过开发环境代理访问 `/api` 接口。

## 安装依赖

```bash
npm install
```

## 启动开发服务

```bash
npm run dev
```

默认访问地址为：`http://localhost:5173`。

## Quality Gate Commands

```bash
npm run lint
npm run test:unit
npm run build
```

这三个检查是 CI 中必需的合并门禁。

## 构建生产版本

```bash
npm run build
```

## 目录结构

```text
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── router/          # 路由配置
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.js          # 应用入口
```
