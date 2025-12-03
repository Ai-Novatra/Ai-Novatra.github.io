import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // === 安全配置 ===
  // 生产环境使用 GitHub 模式 (只有你能编辑)
  storage: process.env.NODE_ENV === 'production' 
    ? {
        kind: 'github',
        repo: 'Ai-Novatra/Ai-Novatra.github.io', // 您的仓库地址
      }
    : {
        kind: 'local', // 本地开发时使用本地模式
      },
      
  // 启用 Keystatic Cloud 协助 OAuth 登录 (仅用于握手，不存数据)
  cloud: {
    project: 'novatra-ai-blog', 
  },

  // === 1. 首页控制 (Homepage) ===
  singletons: {
    homepage: singleton({
      label: '首页配置',
      path: 'src/content/pages/home',
      schema: {
        heroTitle: fields.text({ label: 'Hero 大标题' }),
        heroSubtitle: fields.text({ label: 'Hero 副标题' }),
        features: fields.array(
          fields.object({
            title: fields.text({ label: '板块标题' }),
            desc: fields.text({ label: '板块描述' }),
          }),
          { label: '四大板块内容', itemLabel: props => props.fields.title.value }
        ),
      },
    }),
    about: singleton({
      label: '关于页配置',
      path: 'src/content/pages/about',
      schema: {
        intro: fields.document({
          label: '自我介绍',
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),
  },

  // === 2. 文章管理 (像 Word 一样编辑) ===
  collections: {
    posts: collection({
      label: '文章归档 (Posts)',
      slugField: 'title',
      path: 'src/content/posts/*/', // 文章存放在 src/content/posts/下
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '文章标题' } }),
        date: fields.date({ label: '发布日期', defaultValue: { kind: 'today' } }),
        
        tags: fields.array(
          fields.text({ label: '标签' }),
          { label: '标签 (分类)', itemLabel: props => props.value }
        ),
        
        lang: fields.select({
          label: '语言',
          options: [
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'zh',
        }),
        
        description: fields.text({ label: '摘要', multiline: true }),
        
        // 所见即所得编辑器
        content: fields.document({
          label: '正文内容',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/posts', 
            publicPath: '../../content/posts/',
          },
          tables: true,
        }),
      },
    }),
  },
});
