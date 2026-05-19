'use client'

import { useEffect, useRef, useState } from 'react'
import type { SalonContact } from '@/types/salon'

interface Props {
  contact: SalonContact
  bookingUrl: string
}

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

export default function SalonContactBanner({ contact, bookingUrl }: Props) {
  const instagramHandle = contact.instagram?.replace('@', '')
  const instagramUrl = instagramHandle ? `https://instagram.com/${instagramHandle}` : null

  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY < 10) {
        setVisible(true)
      } else {
        setVisible(currentY < lastY.current)
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const socials = [
    contact.facebook && { href: contact.facebook, label: 'Facebook', Icon: FacebookIcon },
    instagramUrl    && { href: instagramUrl,       label: 'Instagram', Icon: InstagramIcon },
    contact.tiktok  && { href: contact.tiktok,     label: 'TikTok',    Icon: TikTokIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: () => JSX.Element }[]

  return (
    <div className={`sticky top-0 z-[60] bg-ink border-b border-blush/20 font-sans transition-transform duration-300 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-11">

        {/* Left — phone on mobile, email + phone on desktop */}
        <div className="flex items-center gap-6">
          {/* Email — desktop only */}
          <a
            href={`mailto:${contact.email}`}
            className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <MailIcon />
            <span className="text-[11px] tracking-wide">{contact.email}</span>
          </a>

          <span className="hidden md:inline text-white/15 select-none">◆</span>

          {/* Phone — always visible */}
          <a
            href={`tel:${contact.phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
          >
            <PhoneIcon />
            <span className="text-[11px] tracking-wide">{contact.phone}</span>
          </a>
        </div>

        {/* Right — socials (desktop only) + Book Now (always) */}
        <div className="flex items-center gap-4 md:gap-5">
          {socials.length > 0 && (
            <div className="hidden md:flex items-center gap-3.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/50 hover:text-blush hover:scale-110 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
              <span className="w-px h-4 bg-white/10" />
            </div>
          )}

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 md:px-5 py-1.5 border border-blush/50 hover:border-mauve hover:bg-mauve text-white text-[10px] font-medium tracking-[0.18em] uppercase transition-all duration-300"
          >
            Book Now
          </a>
        </div>

      </div>
    </div>
  )
}
