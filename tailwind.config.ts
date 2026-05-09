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
          DEFAULT: '#FDF6F0',
          50: '#FEFAF7',
          100: '#FDF6F0',
          200: '#F5E8DF',
        },
        blush: {
          DEFAULT: '#F2C4CE',
          light: '#F9DDE3',
          dark: '#E8A8B5',
        },
        mauve: {
          DEFAULT: '#D4A5A5',
          dark: '#B8808A',
          deeper: '#9B6370',
        },
        charcoal: '#3D3535',
        ink: '#241E1E',
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
