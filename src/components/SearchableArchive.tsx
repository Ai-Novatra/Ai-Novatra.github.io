import React, { useState, useMemo, useEffect } from 'react';
import { Search, FolderOpen, Folder, FileCode, Cloud, Bot, Coffee, ArrowUpRight, Clock, Flame, Calendar, Layers, Code2, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../utils';

interface Post {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}

interface Props {
  posts: Post[];
  lang: 'zh' | 'en';
}

type SortOption = 'newest' | 'popular';
type CategoryId = 'all' | 'group_eng' | 'dev' | 'cloud' | 'group_ai' | 'ai' | 'group_life' | 'misc';

const ITEMS_PER_PAGE = 8; 

export default function SearchableArchive({ posts, lang }: Props) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [sortOrder, setSortOrder] = useState<SortOption>('newest');
  
  // 修改点：初始值设为空数组 []，表示默认不展开任何文件夹
  const [expandedGroups, setExpandedGroups] = useState<CategoryId[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations(lang);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCategory, sortOrder]);

  const categoryTree = useMemo(() => [
    { 
      id: 'all' as CategoryId, 
      label: t('cat.all'), 
      icon: Layers, 
      isParent: false 
    },
    {
      id: 'group_eng' as CategoryId,
      label: t('cat.group.eng'),
      icon: FolderOpen,
      isParent: true,
      children: [
        { id: 'dev' as CategoryId, label: t('cat.dev'), icon: Code2 },
        { id: 'cloud' as CategoryId, label: t('cat.cloud'), icon: Cloud },
      ]
    },
    {
      id: 'group_ai' as CategoryId,
      label: t('cat.group.ai'),
      icon: FolderOpen,
      isParent: true,
      children: [
        { id: 'ai' as CategoryId, label: t('cat.ai'), icon: Bot },
      ]
    },
    {
      id: 'group_life' as CategoryId,
      label: t('cat.group.life'),
      icon: FolderOpen,
      isParent: true,
      children: [
        { id: 'misc' as CategoryId, label: t('cat.misc'), icon: Coffee },
      ]
    }
  ], [lang]);

  const toggleGroup = (id: CategoryId, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleGroupClick = (id: CategoryId) => {
    setSelectedCategory(id);
    // 点击父级时，如果未展开则自动展开；如果已展开则保持展开（不自动折叠，符合操作直觉）
    if (!expandedGroups.includes(id)) {
      setExpandedGroups(prev => [...prev, id]);
    }
  };

  const getPostCategoryId = (post: Post): CategoryId => {
    const tagStr = post.tags.join(' ').toLowerCase();
    if (tagStr.includes('架构') || tagStr.includes('cloud')) return 'cloud';
    if (tagStr.includes('前端') || tagStr.includes('dev')) return 'dev';
    if (tagStr.includes('ai') || tagStr.includes('llm')) return 'ai';
    return 'misc';
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(query.toLowerCase()) || 
                            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;

      const postCatId = getPostCategoryId(post);
      if (postCatId === selectedCategory) return true;

      const parentGroup = categoryTree.find(group => group.id === selectedCategory);
      if (parentGroup && parentGroup.children) {
        return parentGroup.children.some(child => child.id === postCatId);
      }

      return false;
    }).sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      } else {
        return b.description.length - a.description.length;
      }
    });
  }, [posts, query, selectedCategory, sortOrder, categoryTree]);

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getCurrentCategoryLabel = () => {
    for (const group of categoryTree) {
      if (group.id === selectedCategory) return group.label;
      if (group.children) {
        const child = group.children.find(c => c.id === selectedCategory);
        if (child) return child.label;
      }
    }
    return t('cat.all');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-stone-50 dark:bg-stone-950 overflow-hidden pt-16 md:pt-20">
      
      {/* Sidebar */}
      <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm z-20">
        <div className="p-4 md:p-6 pb-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-white tracking-tight">
              {t('archives.title')}
            </h2>
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {filteredPosts.length}
            </span>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 group-focus-within:text-teal-500 transition-colors" />
            <input
              type="text"
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-sm font-medium text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all shadow-sm"
              placeholder={t('search.placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto px-3 py-2 scrollbar-hide">
          <div className="flex md:flex-col gap-1 min-w-max md:min-w-0">
            {categoryTree.map(group => {
              const isExpanded = expandedGroups.includes(group.id);
              const isActive = selectedCategory === group.id;
              return (
                <div key={group.id} className="flex flex-col">
                  <button
                    onClick={() => group.isParent ? handleGroupClick(group.id) : setSelectedCategory(group.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-bold transition-all w-full text-left group relative ${
                      isActive 
                        ? 'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300' 
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <group.icon className={`w-4 h-4 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'opacity-70 group-hover:text-stone-900 dark:group-hover:text-stone-200'}`} />
                    <span className="flex-1">{group.label}</span>
                    {group.isParent && (
                      <div role="button" onClick={(e) => toggleGroup(group.id, e)} className="p-1 rounded-md hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    )}
                  </button>
                  <AnimatePresence>
                    {group.isParent && isExpanded && group.children && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="ml-4 pl-3 border-l border-stone-200 dark:border-stone-800 space-y-1 my-1">
                          {group.children.map(child => (
                            <button
                              key={child.id}
                              onClick={() => setSelectedCategory(child.id)}
                              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all w-full text-left ${
                                selectedCategory === child.id 
                                  ? 'bg-stone-100 dark:bg-stone-800 text-teal-600 dark:text-teal-400' 
                                  : 'text-stone-500 dark:text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                              }`}
                            >
                              <child.icon className="w-3.5 h-3.5 opacity-70" />
                              {child.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 text-center">
          <p className="text-xs text-stone-400 font-medium">{t('footer.copyright')}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-stone-50/30 dark:bg-[#0c0a09]">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-10 min-h-full flex flex-col">
          
          {/* Header */}
          <header className="mb-6 flex items-center justify-between">
             <div className="flex items-baseline gap-3">
               <h1 className="text-xl font-bold text-stone-900 dark:text-white">
                 {getCurrentCategoryLabel()}
               </h1>
               <span className="text-xs text-stone-400 hidden sm:inline-block">
                 / {t('archives.subtitle')}
               </span>
             </div>

             <div className="flex gap-2">
                <button onClick={() => setSortOrder('newest')} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${sortOrder === 'newest' ? 'bg-stone-200 dark:bg-stone-800 text-teal-700 dark:text-teal-400' : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}>
                  <Clock className="w-3 h-3" /> <span className="hidden sm:inline">{t('filter.newest')}</span>
                </button>
                <button onClick={() => setSortOrder('popular')} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${sortOrder === 'popular' ? 'bg-stone-200 dark:bg-stone-800 text-teal-700 dark:text-teal-400' : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'}`}>
                  <Flame className="w-3 h-3" /> <span className="hidden sm:inline">{t('filter.popular')}</span>
                </button>
             </div>
          </header>

          <div className="flex-1">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <AnimatePresence mode='popLayout'>
                {paginatedPosts.map((post, idx) => (
                  <motion.a
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    key={post.slug}
                    href={lang === 'zh' ? `/posts/${post.slug}` : `/en/posts/${post.slug}`}
                    className="group relative flex flex-col p-5 bg-white dark:bg-[#1c1917] border border-stone-200 dark:border-stone-800 rounded-2xl hover:border-teal-500/40 dark:hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                          {post.tags[0]}
                        </span>
                        <span className="text-xs font-medium text-stone-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-teal-500 transition-colors" />
                    </div>
                    
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-2 line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
                      {post.description}
                    </p>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>

            {filteredPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-stone-400">
                <Search className="w-12 h-12 mb-4 opacity-20" />
                <p>{t('search.no_results')}</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 py-8 mt-4 border-t border-stone-200 dark:border-stone-800/50">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> {t('pagination.prev')}
              </button>
              
              <span className="text-xs font-medium text-stone-500">
                {t('pagination.info').replace('{current}', currentPage.toString()).replace('{total}', totalPages.toString())}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                {t('pagination.next')} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
