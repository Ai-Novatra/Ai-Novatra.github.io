import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ui, defaultLang } from './i18n/ui';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// React 组件专用的 Hook，直接读取字典，不依赖 props 传递
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang]?.[key] || ui[defaultLang][key] || key;
  }
}
