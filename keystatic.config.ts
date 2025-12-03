import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // === 核心安全配置 ===
  // 使用 GitHub 模式：只有仓库拥有者（你）才能登录编辑
  storage: {
    kind: 'github',
    repo: 'Ai-Novatra/Ai-Novatra.github.io', 
  },
  // 使用 Keystatic 免费云服务处理 OAuth 登录握手（不存储任何数据）
  cloud: {
    project: 'novatra-ai-blog', 
  },

  // === 1. 首页控制 (Homepage) ===
  singletons: {
    homepage: singleton({
      label: '首页配置 (Homepage)',
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
    
    // === 2. 关于页控制 (About) ===
    about: singleton({
      label: '关于页配置 (About)',
      path: 'src/content/pages/about',
      schema: {
        intro: fields.document({
          label: '自我介绍 (支持富文本)',
          formatting: true,
          dividers: true,
          links: true,
        }),
        philosophy: fields.array(
          fields.text({ label: '理念段落' }),
          { label: '人生理念' }
        ),
      },
    }),
  },

  // === 3. 归档/文档管理 (Archives) ===
  // 这里实现了“像 Word 一样”的编辑体验
  collections: {
    posts: collection({
      label: '文章归档 (Posts)',
      slugField: 'title',
      // *关键*：每篇文章一个文件夹，方便管理图片和素材
      path: 'src/content/posts/*/', 
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '文章标题' } }),
        date: fields.date({ label: '发布日期', defaultValue: { kind: 'today' } }),
        
        // 自动归档分类
        tags: fields.array(
          fields.text({ label: '分类/标签' }),
          { label: '标签 (用于生成左侧文件夹结构)', itemLabel: props => props.value }
        ),
        
        lang: fields.select({
          label: '语言',
          options: [
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'zh',
        }),
        
        description: fields.text({ label: '文章摘要 (SEO)', multiline: true }),
        
        // 核心：所见即所得编辑器 (Word 体验)
        content: fields.document({
          label: '正文内容',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/content/posts', // 图片直接存放在文章文件夹内
            publicPath: '../../content/posts/',
          },
          tables: true,
        }),
      },
    }),
  },
});
