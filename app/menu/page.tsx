import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Drinks Menu | Monaco Nail Bar — Barrie, ON',
  description:
    'Complimentary mocktails and cocktails with every nail service at Monaco Nail Bar. Tropical Sunrise, Cranberry Blue Ocean, Mango Sparkle, and more.',
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-black font-sans">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10 pb-6">
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

          <span className="text-white/40 text-xs tracking-widest uppercase">
            Drinks Menu
          </span>
        </div>
      </div>

      {/* Menu image */}
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
        <Image
          src="/menu-drinks.JPG"
          alt="Monaco Nail Bar drinks menu — complimentary mocktails and cocktails with every nail service"
          width={700}
          height={1050}
          priority
          className="w-full h-auto rounded-sm shadow-2xl"
        />

        {/* Footer note */}
        <p className="mt-8 text-white/40 text-xs tracking-wide text-center">
          All drinks are complimentary with every service · Monaco Nail Bar · 31 Commerce Park Dr, Barrie ON
        </p>
      </div>
    </main>
  )
}
