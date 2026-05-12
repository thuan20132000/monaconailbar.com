'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  name: string
  bookingUrl: string
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About',   href: '#about' },
  { label: 'Hours',   href: '#hours' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({ name, bookingUrl }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/96 backdrop-blur-sm shadow-sm border-b border-blush/20'
          : 'bg-cream-50'
      }`}
    >
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 h-32 flex items-center justify-center md:justify-between">
        {/* Logo — centred on mobile, left-aligned on desktop */}
        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt={name}
            width={100}
            height={100}
            className="rounded-full object-cover group-hover:opacity-85 transition-opacity duration-200"
            priority
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-base font-medium text-charcoal/65 hover:text-mauve transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-mauve text-white text-base font-semibold px-6 py-2.5 rounded-full hover:bg-mauve-dark transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          >
            Book Now
          </Link>
        </div>

        {/* Hamburger — absolute right on mobile so logo stays centred */}
        <button
          className="md:hidden absolute right-4 p-2 text-charcoal hover:text-mauve transition-colors"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className={`block w-5 h-px bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : 'mb-[5px]'}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : 'mb-[5px]'}`} />
          <span className={`block w-5 h-px bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } border-t border-blush/20 bg-cream-50`}
      >
        <ul className="px-4 sm:px-6 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-charcoal/70 hover:text-mauve py-2 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-mauve text-white text-base font-semibold py-3 rounded-full hover:bg-mauve-dark transition-colors"
            >
              Book Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
