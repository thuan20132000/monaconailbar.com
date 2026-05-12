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
          DEFAULT: '#000000',
          50: '#111111',
          100: '#000000',
          200: '#1a1a1a',
        },
        blush: {
          DEFAULT: '#e8d5a3',
          light: '#f0e5c0',
          dark: '#d4b87a',
        },
        mauve: {
          DEFAULT: '#caa343',
          dark: '#a8892d',
          deeper: '#8a7022',
        },
        charcoal: '#ffffff',
        ink: '#111111',
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
