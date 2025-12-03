import React, { useState, useEffect } from 'react';
import { Languages, Github, Moon, Sun, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from '../utils';

interface NavbarProps {
  lang: 'zh' | 'en';
}

export default function Navbar({ lang }: NavbarProps) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const t = useTranslations(lang);

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle('dark');
  };

  const switchLang = (targetLang: string) => {
    const currentPath = window.location.pathname;
    if (targetLang === 'zh') {
        window.location.href = currentPath.replace('/en', '') || '/';
    } else {
        if (!currentPath.startsWith('/en')) window.location.href = '/en' + (currentPath === '/' ? '' : currentPath);
    }
  };

  const links = [
    { name: t('nav.home'), href: lang === 'zh' ? '/' : '/en' },
    { name: t('nav.archives'), href: lang === 'zh' ? '/archives' : '/en/archives' },
    { name: t('nav.about'), href: lang === 'zh' ? '/about' : '/en/about' },
  ];

  const menuVariants = {
    closed: { opacity: 0, x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-stone-200/80 dark:border-stone-800/80 bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          
          <a href={lang === 'zh' ? '/' : '/en'} className="flex items-center gap-3 group z-50 relative">
            <img src="/logo.svg" alt="Novatra Logo" className="w-9 h-9 md:w-10 md:h-10 group-hover:scale-105 transition-transform drop-shadow-lg" />
            <span className="font-bold text-xl md:text-2xl tracking-tight text-stone-900 dark:text-white">Novatra</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* 修复：更新 GitHub 链接 */}
            <a href="https://github.com/Ai-Novatra" target="_blank" className="p-2 text-stone-500 hover:text-teal-600 dark:text-stone-400 dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>

            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-200 transition-all border border-transparent hover:border-stone-300 dark:hover:border-stone-700"
              >
                <Languages className="w-4 h-4" />
                <span>{t('lang.current')}</span>
                <ChevronDown className={`w-3 h-3 opacity-50 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-40 bg-white dark:bg-stone-900 rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
                  >
                    <div className="p-1">
                      <button onClick={() => switchLang('zh')} className={`w-full text-left px-4 py-2.5 text-sm rounded-xl flex items-center justify-between transition-colors ${lang === 'zh' ? 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300' : 'hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
                        简体中文 {lang === 'zh' && <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>}
                      </button>
                      <button onClick={() => switchLang('en')} className={`w-full text-left px-4 py-2.5 text-sm rounded-xl flex items-center justify-between transition-colors ${lang === 'en' ? 'bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300' : 'hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
                        English {lang === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={toggleTheme} className="p-2.5 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-500 hover:text-teal-600 dark:text-stone-400 dark:hover:text-white transition-colors">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors z-50 relative">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial="closed" animate="open" exit="closed" variants={menuVariants} className="fixed inset-0 z-40 bg-white dark:bg-[#0c0a09] pt-24 px-6 md:hidden flex flex-col h-screen">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Menu</p>
                {links.map(link => (
                  <a key={link.href} href={link.href} className="block text-3xl font-bold text-stone-900 dark:text-white hover:text-teal-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                ))}
                {/* 修复：移动端菜单 GitHub 链接 */}
                <a href="https://github.com/Ai-Novatra" className="block text-3xl font-bold text-stone-900 dark:text-white hover:text-teal-600 transition-colors">GitHub</a>
              </div>

              <div className="h-px bg-stone-200 dark:bg-stone-800 my-4"></div>

              <div className="space-y-4">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Settings</p>
                
                <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-900 p-4 rounded-2xl">
                  <span className="font-medium text-stone-700 dark:text-stone-200">Language</span>
                  <div className="flex gap-2">
                    <button onClick={() => switchLang('zh')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${lang === 'zh' ? 'bg-white dark:bg-stone-800 shadow text-teal-600 dark:text-teal-400' : 'text-stone-500'}`}>中</button>
                    <button onClick={() => switchLang('en')} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${lang === 'en' ? 'bg-white dark:bg-stone-800 shadow text-teal-600 dark:text-teal-400' : 'text-stone-500'}`}>EN</button>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-900 p-4 rounded-2xl">
                  <span className="font-medium text-stone-700 dark:text-stone-200">Theme</span>
                  <button onClick={toggleTheme} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-800 shadow text-sm font-medium text-stone-700 dark:text-stone-200">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
