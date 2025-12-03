/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Menlo', 'monospace'], // 优化代码字体
      },
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        primary: {
          DEFAULT: '#0d9488',
          hover: '#0f766e',
          light: '#2dd4bf',
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            '--tw-prose-body': theme('colors.stone.700'),
            '--tw-prose-headings': theme('colors.stone.900'),
            '--tw-prose-links': theme('colors.teal.600'),
            '--tw-prose-code': theme('colors.teal.600'),
            '--tw-prose-quote-borders': theme('colors.teal.500'),
            '--tw-prose-pre-bg': '#1e1e1e', // VS Code 风格深色背景
            a: {
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: theme('colors.teal.500') },
            },
            // 行内代码样式
            code: {
              backgroundColor: theme('colors.stone.100'),
              color: theme('colors.stone.800'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.375rem',
              fontWeight: '600',
            },
            // 代码块样式
            pre: {
              borderRadius: '0.75rem', // 更大的圆角
              border: `1px solid ${theme('colors.stone.200')}`,
              boxShadow: theme('boxShadow.lg'),
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.stone.400'),
            '--tw-prose-headings': theme('colors.stone.100'),
            '--tw-prose-links': theme('colors.teal.400'),
            '--tw-prose-code': theme('colors.teal.300'),
            '--tw-prose-quote-borders': theme('colors.teal.500'),
            '--tw-prose-pre-bg': '#000000', // 深色模式下纯黑背景
            code: {
              backgroundColor: theme('colors.stone.900'),
              color: theme('colors.teal.200'),
            },
            pre: {
              border: `1px solid ${theme('colors.stone.800')}`,
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}
