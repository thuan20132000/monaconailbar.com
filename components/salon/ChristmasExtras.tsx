'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

const BULBS = ['#D4AF5A', '#C5D8E4', '#F7F4EF', '#9E3B45', '#E8D6A0', '#D7E6EE']

export function FairyLights() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 h-8">
      <div className="absolute inset-x-6 top-3 h-px bg-blush/40" />
      <div className="absolute inset-x-4 top-1 flex justify-between">
        {BULBS.map((color, i) => (
          <span
            key={i}
            className="fairy-bulb"
            style={{ ['--bulb' as string]: color, animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function Pine({ className }: { className: string }) {
  return (
    <svg aria-hidden viewBox="0 0 80 120" className={className} fill="none">
      <path d="M40 8 L58 42 H48 L66 72 H52 L70 108 H10 L28 72 H14 L32 42 H22 Z" fill="#0C241C" fillOpacity="0.55" />
      <circle cx="28" cy="58" r="3" fill="#D4AF5A" />
      <circle cx="48" cy="86" r="3.5" fill="#9E3B45" />
      <circle cx="36" cy="100" r="2.5" fill="#C5D8E4" />
    </svg>
  )
}

export function HeroWinterFrame() {
  return (
    <>
      <FairyLights />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/30 via-transparent to-ink/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(12_36_28/0.45)_100%)]"
      />
      <Pine className="pointer-events-none absolute -left-3 bottom-0 z-10 h-28 w-16 sm:h-36 sm:w-20 opacity-80" />
      <Pine className="pointer-events-none absolute -right-3 bottom-0 z-10 h-28 w-16 sm:h-36 sm:w-20 opacity-80 -scale-x-100" />
    </>
  )
}

export function HolidayOffer({ offer, bookingUrl }: { offer?: string; bookingUrl: string }) {
  return (
    <section className="bg-ink text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-blush mb-2">
            Holiday appointments
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-light text-balance">
            {offer || 'Evenings fill quickly this season. Reserve your chair.'}
          </p>
        </div>
        <Link
          href={bookingUrl}
          className="shrink-0 inline-block bg-mauve text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-mauve-dark transition-colors"
        >
          Book a visit
        </Link>
      </div>
    </section>
  )
}

export function HolidayNotes({ email }: { email: string }) {
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const value = address.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    const body = encodeURIComponent(`Please add ${value} to the holiday notes.`)
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Holiday notes')}&body=${body}`
  }

  return (
    <section id="holiday-notes" className="bg-cream-200 py-16 lg:py-20 scroll-mt-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
          Holiday notes
        </p>
        <h2 className="font-serif text-4xl font-light text-charcoal text-balance mb-3">
          A note when the season opens
        </h2>
        <p className="text-charcoal/65 text-sm leading-relaxed mb-8">
          Leave your email and we will open a message to the salon. Nothing is stored on this page.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3" noValidate>
          <label className="sr-only" htmlFor="holiday-email">Email address</label>
          <input
            id="holiday-email"
            type="email"
            name="email"
            autoComplete="email"
            value={address}
            onChange={event => setAddress(event.target.value)}
            placeholder="you@email.com"
            className="flex-1 rounded-full border border-charcoal/15 bg-white/70 px-5 py-3 text-charcoal placeholder:text-charcoal/35 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-mauve/40"
          />
          <button
            type="submit"
            className="rounded-full bg-ink text-white text-sm font-semibold px-6 py-3 hover:bg-mauve transition-colors"
          >
            Send a note
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-mauve" role="alert">{error}</p>}
      </div>
    </section>
  )
}
