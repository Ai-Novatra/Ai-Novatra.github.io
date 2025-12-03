export const languages = {
  zh: '简体中文',
  en: 'English',
};

export const defaultLang = 'zh';

export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.archives': '归档',
    'nav.about': '关于',
    'nav.github': 'GitHub',
    'lang.current': '中文',
    
    'hero.title': '构建未来的',
    'hero.highlight': '数字基础设施',
    'hero.subtitle': '探索技术的无限边界，打造极致的用户体验。',
    'hero.cta.read': '开始阅读',
    'hero.cta.github': '关注 GitHub',
    
    'feat.dev': '开发相关',
    'feat.dev.desc': 'Web 框架、语言特性与工程化实践。',
    'feat.cloud': '云原生',
    'feat.cloud.desc': 'Kubernetes、容器化与微服务架构。',
    'feat.ai': '人工智能',
    'feat.ai.desc': '大模型应用、RAG 与智能体开发。',
    'feat.misc': '综合',
    'feat.misc.desc': '系统设计、产品思维与职场成长。',

    'section.latest': '最新发布',
    'card.read': '阅读文章',
    
    'archives.title': '知识库',
    'archives.subtitle': '技术沉淀与思考',
    'search.placeholder': '搜索文章标题、标签...',
    'search.results': '找到 {count} 篇',
    'search.no_results': '没有找到相关文章',
    'filter.label': '排序',
    'filter.newest': '最新',
    'filter.popular': '最热',
    
    // 新增：分页
    'pagination.prev': '上一页',
    'pagination.next': '下一页',
    'pagination.info': '第 {current} 页 / 共 {total} 页',
    
    'cat.label': '分类导航',
    'cat.all': '全部文件',
    
    'cat.group.eng': '工程研发',
    'cat.group.ai': '前沿科技',
    'cat.group.life': '生活随笔',

    'cat.dev': '开发架构',
    'cat.cloud': '云原生',
    'cat.ai': 'AI / 大模型',
    'cat.misc': '综合杂谈',
    
    'footer.copyright': '© 2025 Novatra AI. 版权所有',
    'theme.toggle': '切换主题',
  },
  en: {
    'nav.home': 'Home',
    'nav.archives': 'Archives',
    'nav.about': 'About',
    'nav.github': 'GitHub',
    'lang.current': 'EN',

    'hero.title': 'Building the Future of',
    'hero.highlight': 'Digital Infrastructure',
    'hero.subtitle': 'Exploring the infinite boundaries of technology.',
    'hero.cta.read': 'Start Reading',
    'hero.cta.github': 'Follow GitHub',

    'feat.dev': 'Development',
    'feat.dev.desc': 'Web frameworks, language features and engineering.',
    'feat.cloud': 'Cloud Native',
    'feat.cloud.desc': 'Kubernetes, containerization and microservices.',
    'feat.ai': 'Artificial Intelligence',
    'feat.ai.desc': 'LLM apps, RAG and Agent development.',
    'feat.misc': 'General',
    'feat.misc.desc': 'System design, product thinking and growth.',

    'section.latest': 'Latest Posts',
    'card.read': 'Read Article',

    'archives.title': 'Knowledge Base',
    'archives.subtitle': 'Notes and Thoughts',
    'search.placeholder': 'Search articles...',
    'search.results': '{count} results',
    'search.no_results': 'No articles found',
    'filter.label': 'Sort by',
    'filter.newest': 'Newest',
    'filter.popular': 'Popular',

    'pagination.prev': 'Prev',
    'pagination.next': 'Next',
    'pagination.info': 'Page {current} of {total}',

    'cat.label': 'Explorer',
    'cat.all': 'All Files',
    
    'cat.group.eng': 'Engineering',
    'cat.group.ai': 'Frontier Tech',
    'cat.group.life': 'Life & Misc',

    'cat.dev': 'Dev & Arch',
    'cat.cloud': 'Cloud Native',
    'cat.ai': 'AI / LLM',
    'cat.misc': 'General',

    'footer.copyright': '© 2025 Novatra AI. All rights reserved',
    'theme.toggle': 'Toggle Theme',
  },
} as const;
