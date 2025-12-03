import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

interface BlogCardProps {
  title: string;
  desc: string;
  date: string;
  tag: string;
  link: string;
  readBtnText: string;
}

export default function BlogCard({ title, desc, date, tag, link, readBtnText }: BlogCardProps) {
  return (
    <motion.a 
      href={link}
      whileHover={{ y: -5 }}
      className="group flex flex-col justify-between h-full relative overflow-hidden bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800/80 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/10"
    >
      {/* 顶部青色到翠绿色高光 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      <div>
        <div className="flex items-center justify-between mb-6">
          {/* 青色标签 */}
          <span className="px-3 py-1 text-xs font-bold tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-500/10 rounded-full border border-teal-100 dark:border-teal-500/20 uppercase">
            {tag}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>
        
        {/* 标题悬停变青色 */}
        <h3 className="text-2xl font-bold mb-3 text-stone-900 dark:text-stone-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-8 line-clamp-3">
          {desc}
        </p>
      </div>
      
      <div className="flex items-center text-sm font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
        {readBtnText} <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </motion.a>
  );
}
