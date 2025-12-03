import React, { useEffect, useState, useRef } from 'react';
import { Hash, ChevronRight } from 'lucide-react';

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  lang: string;
}

interface TOCItem {
  heading: Heading;
  children: TOCItem[];
}

interface TOCItemComponentProps {
  item: TOCItem;
  activeId: string;
  onClick: (slug: string) => void;
  level: number;
}

// 构建目录树结构
const buildTOCTree = (headings: Heading[]): TOCItem[] => {
  const tree: TOCItem[] = [];
  const stack: TOCItem[] = [];

  headings.forEach(heading => {
    const item: TOCItem = { heading, children: [] };
    
    while (stack.length > 0 && stack[stack.length - 1].heading.depth >= heading.depth) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      tree.push(item);
    } else {
      stack[stack.length - 1].children.push(item);
    }
    
    stack.push(item);
  });

  return tree;
};

const TOCItemComponent: React.FC<TOCItemComponentProps> = ({ item, activeId, onClick, level }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // 默认展开前两级
  const hasChildren = item.children.length > 0;
  const isActive = activeId === item.heading.slug;
  
  const getLevelStyles = (level: number) => {
    const styles = [
      'font-medium text-sm', // level 0
      'text-sm', // level 1
      'text-xs', // level 2
      'text-xs opacity-90', // level 3
      'text-xs opacity-80', // level 4
      'text-xs opacity-70', // level 5
    ];
    return styles[level] || styles[styles.length - 1];
  };

  const getIndentStyles = (level: number) => {
    const baseIndent = 8;
    const indentPerLevel = 16;
    const indent = baseIndent + (level * indentPerLevel);
    return {
      paddingLeft: `${indent}px`,
      position: 'relative' as const,
    };
  };

  return (
    <div className="w-full group">
      <div className="flex items-center relative">
        {/* 连接线 */}
        {level > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-stone-200 dark:bg-stone-700" style={{ left: `${8 + (level - 1) * 16}px` }} />
        )}
        
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors rounded hover:bg-stone-100 dark:hover:bg-stone-800"
            style={{ marginLeft: `${8 + level * 16}px` }}
          >
            <ChevronRight 
              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
            />
          </button>
        )}
        
        <button
          onClick={() => onClick(item.heading.slug)}
          className={`flex-1 text-left py-1.5 px-2 rounded transition-all duration-150 truncate
            ${getLevelStyles(level)}
            ${isActive 
              ? 'text-teal-700 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-900/20 border-l-2 border-teal-600 dark:border-teal-400' 
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800/50 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
          style={getIndentStyles(level)}
        >
          <span className="truncate block leading-relaxed">
            {level === 0 && <span className="mr-1">📄</span>}
            {level === 1 && <span className="mr-1 text-xs">▸</span>}
            {level >= 2 && <span className="mr-1 text-xs">•</span>}
            {item.heading.text}
          </span>
        </button>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="relative">
          {item.children.map((child) => (
            <TOCItemComponent
              key={child.heading.slug}
              item={child}
              activeId={activeId}
              onClick={onClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings, lang }) => {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 构建目录树
  const tocTree = buildTOCTree(headings.filter(h => h.depth >= 2 && h.depth <= 6));

  // 滚动到指定标题
  const scrollToHeading = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // 设置活动标题观察者
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1
      }
    );

    // 观察所有标题元素
    const allHeadings = tocTree.flatMap(item => [item, ...item.children.flatMap(child => [child, ...child.children])]);
    allHeadings.forEach((item) => {
      const element = document.getElementById(item.heading.slug);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [tocTree]);

  // 没有有效标题时不显示任何内容
  if (tocTree.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-stone-500 dark:text-stone-400">暂无目录</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 目录标题 */}
      <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center">
          <Hash className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" />
          文章目录
        </h3>
      </div>
      
      {/* 目录内容 */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="w-full px-2">
          {tocTree.map((item) => (
            <TOCItemComponent
              key={item.heading.slug}
              item={item}
              activeId={activeId}
              onClick={scrollToHeading}
              level={0}
            />
          ))}
        </nav>
      </div>
      
      {/* 底部装饰 */}
      <div className="px-4 py-2 border-t border-stone-200 dark:border-stone-700">
        <div className="text-xs text-stone-500 dark:text-stone-400 text-center">
          📖 文档导航
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;