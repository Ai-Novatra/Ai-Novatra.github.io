# Novatra Blog

一个基于 Astro 构建的现代化静态博客网站，支持中英文双语，提供优雅的阅读体验。

## 项目简介

Novatra Blog 是一个高性能、现代化的静态博客系统，采用 Astro 框架构建。项目专注于技术内容分享，涵盖开发架构、云原生、人工智能等多个领域。

## 主要特性

- ⚡ **极速性能** - 基于 Astro 的静态生成，默认零 JavaScript 运行时开销
- 🎨 **现代化 UI** - 采用 Tailwind CSS 构建，支持明暗主题切换
- 🌐 **国际化支持** - 内置中英文双语切换
- 📱 **响应式设计** - 完美适配各种设备屏幕
- 🔍 **文章搜索** - 支持标题、标签等多种搜索方式
- 📝 **Markdown 支持** - 完整的 Markdown 语法和代码高亮
- 📋 **文章目录** - 自动生成文章目录，便于快速导航
- 🔔 **RSS 订阅** - 支持 RSS 订阅功能
- 🗺️ **站点地图** - 自动生成站点地图，便于 SEO

## 技术栈

- **框架**: [Astro](https://astro.build/) 5.16
- **UI 框架**: [React](https://react.dev/) 18
- **样式**: [Tailwind CSS](https://tailwindcss.com/) 3.4
- **语言**: TypeScript 5.7
- **代码高亮**: Shiki (One Dark Pro 主题)
- **动画**: Framer Motion
- **图标**: Lucide React

## 项目结构

```
Blogs/
├── src/
│   ├── components/     # React 组件
│   ├── content/        # Markdown 文章内容
│   ├── layouts/        # 页面布局
│   ├── pages/          # 路由页面
│   ├── styles/         # 全局样式
│   └── utils.ts        # 工具函数
├── public/             # 静态资源
└── dist/               # 构建输出
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 [http://localhost:4321](http://localhost:4321)

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 部署

项目部署在 GitHub Pages: [novatra-ai.github.io](https://novatra-ai.github.io)

## 内容分类

- **开发架构** - Web 框架、语言特性与工程化实践
- **云原生** - Kubernetes、容器化与微服务架构
- **人工智能** - 大模型应用、RAG 与智能体开发
- **综合杂谈** - 系统设计、产品思维与职场成长

## 所有者

**Ai-Novatra**

---

## 版权与许可

© 2025 Ai-Novatra. 保留所有权利。

本项目为私有项目，受专有许可证保护。未经明确授权，严禁任何人以任何形式使用、复制、修改、分发本项目的代码或内容。本项目仅供 Ai-Novatra 个人开发和使用。

详见 [LICENSE](LICENSE) 文件。

---

> 构建未来的数字基础设施 🌟

