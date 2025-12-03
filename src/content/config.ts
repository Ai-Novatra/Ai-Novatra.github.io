import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(), // 或者 z.date()，这里为了简单用字符串
    tags: z.array(z.string()),
    lang: z.enum(['zh', 'en']), // 强制标记语言
  }),
});

export const collections = {
  'posts': postsCollection,
};
