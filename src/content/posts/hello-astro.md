---
title: "重构完成！从 Hexo 到 Astro 的进化"
description: "这篇文章展示了如何使用 Tailwind Typography 完美渲染 Markdown 内容，包括代码高亮和响应式排版。"
tags: ["架构", "Astro"]
date: "2025-01-02"
lang: "zh"
---

## 为什么选择 Astro？

Astro 是一个**以内容为中心**的 Web 框架。与 Next.js 不同，它默认不发送 JavaScript 到浏览器，除非你显式要求。这种设计理念使得 Astro 特别适合构建内容密集型的网站，如博客、文档和营销页面。Astro 的核心优势在于它能够在构建时生成完全静态的 HTML，同时保留在需要时注入交互式组件的能力。

### 代码块演示 1

这是一个 React 组件的示例：

```jsx
import React from 'react';

export default function Button() {
  return <button className="bg-blue-500 text-white">Click me</button>;
}
```

## Astro 的核心优势

Astro 框架的核心优势在于其独特的构建时渲染策略。它能够在构建阶段生成完全静态的 HTML，同时在需要交互的地方精确地注入 JavaScript。这种方式极大地减少了客户端的 JavaScript 负载，提高了页面加载速度和用户体验。

### 代码块演示 2

Astro 组件的基本结构：

```astro
---
// 组件脚本部分（只在构建时运行）
const title = "Hello Astro";
---

<!-- 组件模板部分 -->
<h1>{title}</h1>
<p>这是一个 Astro 组件</p>
```

## 性能优化策略

性能优化是现代 Web 开发的核心关注点。Astro 提供了多种内置的性能优化策略，帮助开发者构建更快、更高效的网站。这些优化包括部分水合、代码分割、资源优化等，使得 Astro 应用能够轻松达到出色的性能指标。

### 代码块演示 3

优化图像加载：

```astro
---
import { Image } from 'astro:assets';
---

<Image 
  src="../assets/hero.jpg" 
  alt="英雄图片" 
  width={800} 
  height={600} 
  loading="lazy" 
/>
```

## 组件框架集成

Astro 支持多种流行的前端框架，包括 React、Vue、Svelte 等，让开发者可以在同一个项目中使用自己熟悉的框架。这种灵活性使得团队可以充分利用现有技能，同时享受 Astro 带来的性能优势。

### 代码块演示 4

在 Astro 中使用 Vue 组件：

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
const increment = () => { count.value++ };
</script>

<template>
  <div>
    <p>计数：{{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<style scoped>
button {
  background: green;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}
</style>
```

## 路由系统

Astro 采用基于文件系统的路由，使得页面创建和管理变得简单直观。每个在 `src/pages` 目录下的文件都会自动成为一个可访问的路由。这种约定优于配置的方式减少了样板代码，提高了开发效率。

### 代码块演示 5

动态路由示例：

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';

// 获取所有博客文章
const posts = await getCollection('blog');

// 生成所有可能的路由参数
export async function getStaticPaths() {
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

// 从路由参数获取当前文章
const { post } = Astro.props;
---

<h1>{post.data.title}</h1>
<Content content={post.body} />
```

## 内容集合

Astro 的内容集合系统提供了一种类型安全的方式来管理和查询内容，特别适合博客、文档等场景。通过 Zod 模式验证，可以在开发阶段捕获内容错误，提高内容质量。

### 代码块演示 6

定义内容集合配置：

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

## 服务端渲染

除了静态生成外，Astro 还支持服务端渲染（SSR）模式，可以处理动态内容、用户认证等需要服务器参与的场景。SSR 模式使得 Astro 可以构建更复杂的 Web 应用，而不仅仅是静态网站。

### 代码块演示 7

启用服务端渲染：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server',
  adapter: {
    // 根据部署目标选择合适的适配器
    // 例如 Netlify, Vercel, Cloudflare Pages 等
  },
});
```

## 样式处理

Astro 支持多种样式处理方式，包括 CSS Modules、Tailwind CSS、Sass 等，满足不同开发者的需求和偏好。这种灵活性使得开发者可以选择最适合自己项目的样式解决方案。

### 代码块演示 8

使用 CSS Modules：

```css
/* styles.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}
```

```astro
---
import styles from './styles.module.css';
---

<div class={styles.container}>
  <h1 class={styles.title}>使用 CSS Modules</h1>
</div>
```

## 部署选项

Astro 应用可以部署到各种静态站点托管服务和支持 SSR 的平台，提供了极大的灵活性。常见的部署目标包括 Netlify、Vercel、GitHub Pages、Cloudflare Pages 等。

### 代码块演示 9

Netlify 适配器配置：

```bash
# 安装 Netlify 适配器
npm install @astrojs/netlify
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
});
```

## 国际化支持

Astro 提供了良好的国际化支持，可以轻松构建多语言网站和应用。通过结合路由系统和内容管理，可以创建无缝的多语言用户体验。

### 代码块演示 10

简单的国际化实现：

```js
// src/i18n/ui.ts
export const ui = {
  en: {
    greeting: 'Hello',
    welcome: 'Welcome to our website',
  },
  zh: {
    greeting: '你好',
    welcome: '欢迎访问我们的网站',
  },
};
```

## 主题系统

Astro 项目可以实现灵活的主题系统，支持浅色/深色模式切换，以及自定义主题配置。这对于提供良好的用户体验和可访问性至关重要。

### 代码块演示 11

主题切换组件：

```tsx
// ThemeToggle.tsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // 从本地存储或系统偏好加载主题
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button onClick={toggleTheme} aria-label="切换主题">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

## 数据获取

在 Astro 中，数据获取可以在构建时或运行时进行，具体取决于项目的需求和输出模式。这使得开发者可以灵活地处理各种数据源。

### 代码块演示 12

从 API 获取数据：

```astro
---
// 获取博客文章数据
const fetchPosts = async () => {
  const response = await fetch('https://api.example.com/posts');
  return response.json();
};

const posts = await fetchPosts();
---

<ul>
  {posts.map(post => (
    <li key={post.id}>
      <a href={`/posts/${post.slug}`}>{post.title}</a>
    </li>
  ))}
</ul>
```

## 插件生态系统

Astro 拥有丰富的插件生态系统，可以扩展核心功能，添加新特性，简化开发工作流。插件可以处理从代码高亮到 RSS 生成等各种任务。

### 代码块演示 13

配置常用插件：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
  ],
});
```

## 测试策略

为了确保 Astro 应用的质量和稳定性，实施良好的测试策略至关重要。Astro 项目可以使用各种测试工具和框架，包括单元测试、集成测试和端到端测试。

### 代码块演示 14

组件单元测试示例：

```js
// Button.test.js
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('渲染按钮并显示正确文本', () => {
  render(<Button>点击我</Button>);
  const buttonElement = screen.getByText(/点击我/i);
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveClass('bg-blue-500');
});
```

## SEO 最佳实践

Astro 应用可以轻松实现各种 SEO 最佳实践，包括元标签管理、结构化数据、站点地图等，帮助网站在搜索引擎中获得更好的排名。

### 代码块演示 15

配置页面元数据：

```astro
---
// src/components/Head.astro
const { title, description, image } = Astro.props;
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {image && <meta property="og:image" content={image} />}
  <meta property="og:type" content="website" />
</head>
```

## 无障碍设计

在现代 Web 开发中，无障碍设计是一个不可忽视的重要方面。Astro 项目可以通过各种技术和最佳实践，确保网站对所有用户都可用，包括使用辅助技术的用户。

### 代码块演示 16

添加 ARIA 属性：

```astro
<div role="tablist" aria-label="项目导航">
  <button 
    role="tab" 
    aria-selected="true" 
    aria-controls="panel-1"
    id="tab-1"
    class="tab-button active"
  >
    概述
  </button>
  <button 
    role="tab" 
    aria-selected="false" 
    aria-controls="panel-2"
    id="tab-2"
    class="tab-button"
  >
    特性
  </button>
</div>

<div id="panel-1" role="tabpanel" aria-labelledby="tab-1">
  <!-- 面板内容 -->
</div>
```

## 渐进式 Web 应用

Astro 可以用来构建渐进式 Web 应用（PWA），提供类似原生应用的体验，包括离线功能、推送通知等。通过添加适当的配置和资源，可以将 Astro 站点转变为完整的 PWA。

### 代码块演示 17

配置 PWA 插件：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import pwa from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    pwa({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.svg'],
      manifest: {
        name: '我的 Astro 应用',
        short_name: 'AstroApp',
        description: '使用 Astro 构建的渐进式 Web 应用',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

## 微前端架构

Astro 可以作为微前端架构的基础，允许团队独立开发和部署不同的应用模块。这种架构特别适合大型组织和复杂项目，可以提高开发效率和系统灵活性。

### 代码块演示 18

微前端集成示例：

```astro
---
// src/pages/micro-frontend.astro
// 可以在这里加载不同的微前端模块
---

<div class="micro-frontends-container">
  <!-- 导航模块 -->
  <div id="navigation-module"></div>
  
  <!-- 内容模块 -->
  <div id="content-module"></div>
  
  <!-- 用户模块 -->
  <div id="user-module"></div>
</div>

<script>
  // 动态加载微前端模块
  async function loadModule(id, url) {
    const container = document.getElementById(id);
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => {
      console.log(`模块 ${id} 加载完成`);
    };
    container.appendChild(script);
  }
  
  // 加载各个模块
  loadModule('navigation-module', '/modules/navigation.js');
  loadModule('content-module', '/modules/content.js');
  loadModule('user-module', '/modules/user.js');
</script>
```

## 状态管理

对于需要复杂状态管理的 Astro 应用，可以集成各种状态管理解决方案，如 Redux、MobX、Zustand 等。这些工具可以帮助管理组件间的状态共享和数据流。

### 代码块演示 19

使用 Zustand 进行状态管理：

```js
// src/store/counter.js
import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
```

```tsx
// Counter.tsx
import { useCounterStore } from '../store/counter';

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

## 表单处理

表单是 Web 应用中收集用户输入的重要方式。Astro 项目可以使用各种表单处理技术，从简单的原生表单到复杂的表单库，满足不同项目的需求。

### 代码块演示 20

使用 React Hook Form 处理表单：

```tsx
// ContactForm.tsx
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log(data);
    // 这里可以处理表单提交逻辑
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">姓名</label>
        <input 
          id="name" 
          {...register('name', { required: '姓名是必填项' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <label htmlFor="email">邮箱</label>
        <input 
          id="email" 
          type="email"
          {...register('email', { 
            required: '邮箱是必填项',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '请输入有效的邮箱地址'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      
      <div>
        <label htmlFor="message">留言</label>
        <textarea 
          id="message" 
          {...register('message', { required: '留言是必填项' })}
        />
        {errors.message && <span>{errors.message.message}</span>}
      </div>
      
      <button type="submit">提交</button>
    </form>
  );
}
```

## 动画和过渡效果

动画和过渡效果可以增强用户体验，使界面更加生动和响应迅速。Astro 项目可以使用各种动画库和技术，包括 CSS 动画、JavaScript 动画和专门的动画库。

### 代码块演示 21

使用 Framer Motion 添加动画：

```tsx
// AnimatedComponent.tsx
import { motion } from 'framer-motion';

export default function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2>动画组件</h2>
      <p>这个组件使用 Framer Motion 添加了动画效果</p>
    </motion.div>
  );
}
```

## 错误处理

良好的错误处理是确保应用稳定性和用户体验的关键。Astro 提供了多种错误处理机制，帮助开发者捕获和处理各种运行时错误。

### 代码块演示 22

全局错误处理：

```js
// src/pages/error.astro
---
export const prerender = false;

const error = Astro.state.error;
---

<html lang="zh">
<head>
  <title>发生错误</title>
</head>
<body>
  <div class="error-container">
    <h1>出错了！</h1>
    <p>{error?.message || '未知错误'}</p>
    {error?.stack && (
      <details class="error-stack">
        <summary>错误详情</summary>
        <pre>{error.stack}</pre>
      </details>
    )}
    <a href="/">返回首页</a>
  </div>
</body>
</html>
```

## 性能监控

监控和分析应用性能是优化 Web 应用的重要环节。Astro 项目可以集成各种性能监控工具，帮助开发者识别和解决性能瓶颈。

### 代码块演示 23

集成 Web Vitals 监控：

```js
// src/components/PerformanceMonitor.astro
---
// 这个组件只在客户端运行
---

<script>
  // 导入 Web Vitals
  import { onCLS, onFID, onLCP, onINP, onTTFB } from 'web-vitals';
  
  // 收集性能指标
  function sendToAnalytics(metric) {
    console.log('性能指标:', metric);
    // 这里可以将性能指标发送到分析服务
    // navigator.sendBeacon('/analytics', JSON.stringify(metric));
  }
  
  // 注册性能监控
  onCLS(sendToAnalytics);
  onFID(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
  onTTFB(sendToAnalytics);
</script>
```

## 缓存策略

有效的缓存策略可以显著提高应用的加载速度和响应性能。Astro 应用可以通过各种缓存机制，包括浏览器缓存、Service Worker 缓存等，优化资源加载和用户体验。

### 代码块演示 24

Service Worker 缓存示例：

```js
// service-worker.js
const CACHE_NAME = 'my-astro-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/main.css',
  '/assets/main.js',
  // 其他需要缓存的资源
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果找到了缓存的响应，则返回它
        if (response) {
          return response;
        }
        // 否则，发起网络请求
        return fetch(event.request).then(
          (response) => {
            // 检查响应是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 克隆响应，因为响应流只能使用一次
            const responseToCache = response.clone();
            
            // 将响应添加到缓存
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      }).catch(() => {
        // 网络请求失败时的回退策略
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});
```

## 安全最佳实践

Web 安全是开发过程中必须考虑的重要因素。Astro 项目可以采用各种安全最佳实践，包括内容安全策略、XSS 防护、CSRF 防护等，保护用户数据和应用安全。

### 代码块演示 25

配置内容安全策略：

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
});
```

## 微数据和结构化数据

添加微数据和结构化数据可以帮助搜索引擎更好地理解网页内容，提高搜索结果的显示效果，增加点击率和流量。

### 代码块演示 26

添加 Schema.org 结构化数据：

```astro
---
// src/components/ArticleSchema.astro
const { title, description, author, datePublished, imageUrl } = Astro.props;
---

<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title}",
    "description": "{description}",
    "author": {
      "@type": "Person",
      "name": "{author}"
    },
    "datePublished": "{datePublished}",
    "dateModified": "{datePublished}",
    "image": "{imageUrl}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "{Astro.url}"
    }
  }
</script>
```

## 内容管理系统集成

Astro 可以与各种内容管理系统（CMS）集成，提供灵活的内容创作和管理体验。常见的 CMS 集成包括 Sanity、Contentful、Strapi 等。

### 代码块演示 27

与 Strapi CMS 集成：

```js
// src/lib/strapi.js
const API_URL = import.meta.env.STRAPI_API_URL || 'http://localhost:1337';

// 获取文章列表
export async function getArticles() {
  const response = await fetch(`${API_URL}/api/articles?populate=*`);
  const data = await response.json();
  return data.data;
}

// 获取单个文章
export async function getArticle(slug) {
  const response = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);
  const data = await response.json();
  return data.data[0];
}

// 获取所有文章的 slug 用于生成路由
export async function getArticleSlugs() {
  const articles = await getArticles();
  return articles.map(article => article.attributes.slug);
}
```

```astro
---
// src/pages/blog/[slug].astro
import { getArticle, getArticleSlugs } from '../../lib/strapi';

// 生成静态路径
export async function getStaticPaths() {
  const slugs = await getArticleSlugs();
  return slugs.map(slug => ({
    params: { slug },
  }));
}

// 获取当前文章
const { slug } = Astro.params;
const article = await getArticle(slug);
---

<article>
  <h1>{article.attributes.title}</h1>
  <div set:html={article.attributes.content}></div>
</article>
```

## 响应式设计

响应式设计是现代 Web 开发的核心原则，确保网站在各种设备和屏幕尺寸上都有良好的显示效果。Astro 项目可以使用 CSS 媒体查询、Flexbox、Grid 等技术实现响应式布局。

### 代码块演示 28

响应式布局示例：

```css
/* 基础样式 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* 导航栏样式 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.nav-menu {
  display: flex;
  gap: 20px;
}

/* 移动端菜单按钮 */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .nav-menu.open {
    display: flex;
  }
  
  .menu-toggle {
    display: block;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 10px;
  }
  
  h1 {
    font-size: 1.8rem;
  }
}
```

## 字体优化

字体优化对于页面加载性能和用户体验有重要影响。Astro 项目可以通过各种技术优化字体加载，包括字体子集化、预加载、字体显示策略等。

### 代码块演示 29

字体优化配置：

```astro
<!-- 在 HTML head 中添加 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>
  /* 设置字体显示策略 */
  body {
    font-family: 'Inter', sans-serif;
    font-display: swap; /* 可选值: auto, block, swap, fallback, optional */
  }
</style>
```

## 内容优化

内容是网站的核心，优化内容结构和质量对于用户体验和搜索引擎排名至关重要。Astro 项目可以通过各种内容优化技术，提高内容的可读性和价值。

### 代码块演示 30

内容优化组件：

```astro
---
// src/components/ContentOptimizer.astro
const { content } = Astro.props;

// 这里可以添加内容优化逻辑
// 例如：自动生成目录、优化图片、增强链接等
const generateTableOfContents = (htmlContent) => {
  // 从 HTML 中提取标题并生成目录
  // 这是一个简化的示例
  const headings = htmlContent.match(/<h[2-4][^>]*>.*?<\/h[2-4]>/g) || [];
  
  return headings.map((heading, index) => {
    const id = heading.match(/id="([^"]+)"/)?.[1] || `heading-${index}`;
    const text = heading.replace(/<[^>]+>/g, '');
    const level = parseInt(heading.match(/<h([2-4])/)?.[1], 10);
    
    return {
      id,
      text,
      level
    };
  });
};

const toc = generateTableOfContents(content);
---

<div class="content-container">
  {toc.length > 0 && (
    <aside class="toc">
      <h3>目录</h3>
      <ul>
        {toc.map((item) => (
          <li 
            key={item.id} 
            class={`toc-item level-${item.level}`}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  )}
  
  <main class="content" set:html={content}></main>
</div>

<style>
  .content-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
  }
  
  .toc {
    position: sticky;
    top: 20px;
    align-self: start;
  }
  
  .toc-item {
    margin-bottom: 10px;
  }
  
  .toc-item.level-3 {
    margin-left: 20px;
  }
  
  .toc-item.level-4 {
    margin-left: 40px;
  }
  
  @media (max-width: 768px) {
    .content-container {
      grid-template-columns: 1fr;
    }
    
    .toc {
      position: relative;
      top: 0;
    }
  }
</style>