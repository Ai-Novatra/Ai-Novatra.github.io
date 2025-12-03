import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  return rss({
    title: 'Novatra AI Technical Blog',
    description: 'Exploring Cloud Native, AI, and Modern Web Architecture.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: post.data.lang === 'zh' 
        ? `/posts/${post.slug}/` 
        : `/en/posts/${post.slug}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
