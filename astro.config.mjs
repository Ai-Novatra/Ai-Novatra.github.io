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
  
  // 2. 必须保留 static 模式以适配 GitHub Pages
  output: 'static',

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    // 3. 启用 Keystatic
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
  
  // 优化构建，防止 CMS 报错
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/core', '@keystatic/astro'],
    },
  },
});
