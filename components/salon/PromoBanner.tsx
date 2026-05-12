'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  offer: string
  bookingUrl: string
}

export default function PromoBanner({ offer, bookingUrl }: Props) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative bg-ink text-white py-2.5 px-4 text-center text-sm">
      <span className="mr-2 text-blush">✦</span>
      <span className="font-medium">{offer}</span>
      <span className="mx-3 text-white/40">—</span>
      <Link
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline underline-offset-2 hover:text-blush transition-colors duration-200"
      >
        Book Now
      </Link>
      <span className="ml-2 text-blush">✦</span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200 text-xl leading-none"
      >
        ×
      </button>
    </div>
  )
}
