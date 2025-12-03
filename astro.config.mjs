import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://Ai-Novatra.github.io', // 修正：移除末尾空格
  base: '/',
  devToolbar: { enabled: false },
  
  // 必须为 static 模式
  output: 'static',
  
  // 关键：强制预渲染所有路由
  trailingSlash: 'always',

  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
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
  
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/core', '@keystatic/astro'],
    },
  },
});
