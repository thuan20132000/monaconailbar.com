import Link from 'next/link'
import type { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
  active?: 'services' | 'drinks'
}

export default function MenuShell({ title, children, active }: Props) {
  return (
    <main className="min-h-screen bg-black font-sans">
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <span className="text-white/40 text-xs tracking-widest uppercase">{title}</span>
        </div>

        {active && (
          <div className="max-w-3xl mx-auto px-4 pb-3 flex gap-2">
            <Link
              href="/menu/services"
              className={`text-xs tracking-wider uppercase px-4 py-1.5 border transition-colors ${
                active === 'services'
                  ? 'border-mauve bg-mauve/20 text-white'
                  : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              Services
            </Link>
            <Link
              href="/menu/drinks"
              className={`text-xs tracking-wider uppercase px-4 py-1.5 border transition-colors ${
                active === 'drinks'
                  ? 'border-mauve bg-mauve/20 text-white'
                  : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
              }`}
            >
              Drinks
            </Link>
          </div>
        )}
      </div>

      {children}
    </main>
  )
}
