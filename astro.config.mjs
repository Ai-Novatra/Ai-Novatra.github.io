import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// 1. 引入 Keystatic
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://Ai-Novatra.github.io', 
  base: '/',
  devToolbar: { enabled: false },
  
  // 2. 必须设置为 static，因为我们要部署到 GitHub Pages
  output: 'static',

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    // 3. 启用 CMS 路由
    keystatic(),
  ],

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  
  // 避免构建时优化掉 CMS 的内部组件
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/core', '@keystatic/astro'],
    },
  },
});
