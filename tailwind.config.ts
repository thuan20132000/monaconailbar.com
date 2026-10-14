import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: 'rgb(var(--cream) / <alpha-value>)',
          50: 'rgb(var(--cream-50) / <alpha-value>)',
          100: 'rgb(var(--cream-100) / <alpha-value>)',
          200: 'rgb(var(--cream-200) / <alpha-value>)',
        },
        blush: {
          DEFAULT: 'rgb(var(--blush) / <alpha-value>)',
          light: 'rgb(var(--blush-light) / <alpha-value>)',
          dark: 'rgb(var(--blush-dark) / <alpha-value>)',
        },
        mauve: {
          DEFAULT: 'rgb(var(--mauve) / <alpha-value>)',
          dark: 'rgb(var(--mauve-dark) / <alpha-value>)',
          deeper: 'rgb(var(--mauve-deeper) / <alpha-value>)',
        },
        charcoal: 'rgb(var(--charcoal) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.8s ease-out both',
        'fade-up-1': 'fadeUp 0.8s ease-out 0.12s both',
        'fade-up-2': 'fadeUp 0.8s ease-out 0.26s both',
        'fade-up-3': 'fadeUp 0.8s ease-out 0.40s both',
        'fade-up-4': 'fadeUp 0.8s ease-out 0.54s both',
        'fade-in':   'fadeIn 1.0s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
