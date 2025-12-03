import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Code2, Cloud, Bot, Layers } from 'lucide-react';
import { useTranslations } from '../utils';

interface HeroProps {
  lang: 'zh' | 'en';
}

export default function Hero({ lang }: HeroProps) {
  const t = useTranslations(lang);

  const features = [
    { icon: <Code2 className="w-4 h-4 md:w-5 md:h-5" />, title: t('feat.dev'), desc: t('feat.dev.desc') },
    { icon: <Cloud className="w-4 h-4 md:w-5 md:h-5" />, title: t('feat.cloud'), desc: t('feat.cloud.desc') },
    { icon: <Bot className="w-4 h-4 md:w-5 md:h-5" />, title: t('feat.ai'), desc: t('feat.ai.desc') },
    { icon: <Layers className="w-4 h-4 md:w-5 md:h-5" />, title: t('feat.misc'), desc: t('feat.misc.desc') },
  ];

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-16">
      
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] md:w-[800px] md:h-[500px] bg-teal-500/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-60 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] md:w-[800px] md:h-[500px] bg-emerald-500/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100"></div>
        <div className="absolute inset-0 bg-grid-slate-200/[0.4] dark:bg-grid-slate-800/[0.2] bg-[bottom_1px_center] mask-image-linear-gradient"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8 max-w-2xl"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
            {t('hero.title')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 animate-gradient-x">
              {t('hero.highlight')}
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-lg lg:mx-0 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-row items-center gap-3 md:gap-4 w-full justify-center lg:justify-start">
            <a 
              href={lang === 'zh' ? '/archives' : '/en/archives'}
              className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-sm md:text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-teal-500/20"
            >
              {t('hero.cta.read')} 
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            {/* 修复：更新 Hero GitHub 链接 */}
            <a 
              href="https://github.com/Ai-Novatra" 
              target="_blank"
              className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-100 border border-stone-200 dark:border-stone-800 font-bold text-sm md:text-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" /> 
              <span className="hidden sm:inline">{t('hero.cta.github')}</span>
              <span className="sm:hidden">GitHub</span>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 w-full max-w-md lg:max-w-none flex items-center"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-full">
            {features.map((item, idx) => (
              <div key={idx} className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-md border border-stone-200/60 dark:border-stone-800/60 p-4 md:p-6 rounded-2xl hover:border-teal-500/30 transition-all hover:shadow-lg group">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-stone-100 dark:bg-stone-800 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400 mb-2 md:mb-4 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm md:text-lg font-bold text-stone-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed line-clamp-2 hidden sm:block">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
