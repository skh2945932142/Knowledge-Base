# 🦁 我的知识库 (Knowledge Base - Frontend)

一个追求极致体验的 **Notion 风格** 全栈 Markdown 笔记应用。采用 Vue 3 + Vite 驱动，提供沉浸式的写作与知识管理体验。

![Vue3](https://img.shields.io/badge/Vue.js-3.x-4fc08d?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?logo=vite)
![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409eff?logo=element-plus)
![Markdown](https://img.shields.io/badge/Markdown-Support-000000?logo=markdown)

## ✨ 项目亮点

- **📑 Notion 视觉体系**：深度还原 Notion 的极简布局，包括侧边栏导航、悬浮顶部栏以及大标题设计。
- **✍️ 沉浸式编辑**：集成 `v-md-editor` 强力插件，支持所见即所得的 Markdown 写作。
- **🚀 自动保存机制**：内置 Debounce（防抖）技术，编辑后 1 秒自动同步至后端，无需手动保存。
- **🎨 深度美化预览**：对 Markdown 预览区进行了二次 CSS 改造，优化了引用块、代码高亮及字体排版，确保观感优雅。
- **🔒 安全鉴权**：完备的登录拦截机制，保障个人笔记的私密性。

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建**: Vite
- **UI 组件库**: Element Plus
- **编辑器**: @kangc/v-md-editor (Vuepress Theme)
- **通信**: Axios
- **路由**: Vue Router

## 🚀 快速开始

### 1. 环境准备
确保你的电脑已安装 [Node.js](https://nodejs.org/) (建议 v18.0.0+)。

### 2. 克隆项目
```bash
git clone [https://github.com/skh2945932142/Knowledge-Base-frontend.git](https://github.com/skh2945932142/Knowledge-Base-frontend.git)
cd vuedemo
3. 安装依赖
Bash
npm install
4. 运行后端服务
本项目为前后端分离项目。在启动前端前，请确保 后端服务 (Knowledge-Base-server) 已在 http://localhost:3000 正常运行。

5. 启动前端
Bash
npm run dev
项目运行后，访问：http://localhost:5173。

📦 文件夹结构
Plaintext
src/
├── assets/          # 静态资源
├── components/      # 公共组件 (如 NoteList.vue)
├── router/          # 路由配置 (包含登录守卫)
├── views/           # 页面组件 (Home.vue, Login.vue)
├── App.vue          # 全局样式修复与根组件
└── main.js          # 入口文件 (引入编辑器及 UI 库)
📝 开发说明
接口代理：前端开发服务器已配置 proxy 代理。所有以 /api 开头的请求都会转发到后端的 3000 端口。

字体修复：本项目针对系统“暗黑模式”导致的白字问题进行了全局强制覆盖，确保在任何环境下文字清晰可见。

🤝 参与贡献
欢迎提交 Pull Request 或开 Issue 交流想法！

⭐ 如果这个项目对你有帮助，欢迎点个 Star 支持一下！
