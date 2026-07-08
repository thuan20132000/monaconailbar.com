'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Change this date to control when the modal stops appearing automatically.
// After this date the modal will never be shown, even without dismissal.
const HIDE_AFTER = new Date('2026-07-15:59:59')

const STORAGE_KEY = 'mnb_soft_opening_dismissed'
// ───────────────────────────────────────────────────────────────────────────

export default function SoftOpeningModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const expired   = new Date() > HIDE_AFTER
    const dismissed = localStorage.getItem(STORAGE_KEY) === '1'
    if (!expired && !dismissed) setOpen(true)
  }, [])

  const close = () => {
    // localStorage.setItem(STORAGE_KEY, '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-3xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-ink border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-all shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Banner image */}
        <Image
          src="/banner-soft-openning.JPG"
          alt="Monaco Nail Bar Soft Opening — 20% off all services with complimentary mocktail, July 2–15 2026"
          width={1024}
          height={512}
          priority
          className="w-full h-auto rounded-sm shadow-2xl"
        />

        {/* Dismiss note */}
        <p className="mt-3 text-center text-white/40 text-[11px] tracking-wide">
          Click anywhere outside or ✕ to close
        </p>
      </div>
    </div>
  )
}
