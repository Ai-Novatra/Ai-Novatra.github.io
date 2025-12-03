import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, ArrowLeft } from 'lucide-react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
  lang: 'zh' | 'en';
}

export default function PostTOC({ headings, lang }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  // 滚动监听逻辑
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' } // 调整触发区域
    );

    headings.forEach((h) => {
      const element = document.getElementById(h.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="space-y-6">
      {/* 返回按钮整合在左侧 */}
      <a href={lang === 'zh' ? '/archives' : '/en/archives'} className="inline-flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-teal-600 transition-colors group mb-6">
        <div className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 transition-colors">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </div>
        {lang === 'zh' ? '返回列表' : 'Back'}
      </a>

      <div>
        <div className="flex items-center gap-2 mb-4 text-stone-900 dark:text-white font-bold uppercase tracking-wider text-xs">
          <AlignLeft className="w-4 h-4 text-teal-500" />
          {lang === 'zh' ? '文章目录' : 'On This Page'}
        </div>
        
        <div className="relative border-l border-stone-200 dark:border-stone-800 pl-4">
          <ul className="space-y-3">
            {headings.map((heading) => (
              <li 
                key={heading.slug} 
                className={`transition-all duration-300 ${
                  heading.depth === 3 ? 'ml-4' : ''
                }`}
              >
                <a
                  href={`#${heading.slug}`}
                  className={`block text-sm leading-tight transition-colors duration-200 ${
                    activeId === heading.slug
                      ? 'text-teal-600 dark:text-teal-400 font-bold translate-x-1'
                      : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    // 平滑滚动并避开顶部导航栏
                    const el = document.getElementById(heading.slug);
                    if (el) {
                      const offset = 100; // 顶部预留空间
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                    setActiveId(heading.slug);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
