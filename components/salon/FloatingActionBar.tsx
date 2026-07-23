'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Props {
  bookingUrl: string
  phone: string
}

export default function FloatingActionBar({ bookingUrl, phone }: Props) {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)
  const telHref = `tel:${phone.replace(/\D/g, '')}`

  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      const currentY = window.scrollY
      // Always show near the top; hide on scroll up, show on scroll down
      if (currentY < 24) {
        setVisible(true)
      } else if (currentY > lastY.current + 4) {
        setVisible(true)
      } else if (currentY < lastY.current - 4) {
        setVisible(false)
      }
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[70] transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-ink/40 to-transparent" />

      <nav
        aria-label="Quick actions"
        className="pointer-events-auto border-t border-blush/20 bg-ink/95 backdrop-blur-md"
      >
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-1 px-3 sm:px-6 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
          <Link
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg py-2.5 sm:py-3 text-white hover:bg-white/10 active:bg-mauve/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-mauve shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
              Book
            </span>
          </Link>

          <Link
            href="/menu"
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg py-2.5 sm:py-3 text-white hover:bg-white/10 active:bg-mauve/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-mauve shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
              Menu
            </span>
          </Link>

          <a
            href={telHref}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg py-2.5 sm:py-3 text-white hover:bg-white/10 active:bg-mauve/30 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-mauve shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-[10px] sm:text-xs font-medium tracking-wide uppercase">
              Call
            </span>
          </a>
        </div>
      </nav>
    </div>
  )
}
