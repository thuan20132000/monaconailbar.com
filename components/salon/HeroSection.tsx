'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import type { Salon } from '@/types/salon'

interface Props {
  salon: Salon
}

export default function HeroSection({ salon }: Props) {
  const { name, tagline, description, contact, heroImage, bookingUrl, stats, photos } = salon

  const slides = [
    { url: heroImage, alt: `${name} — Nail Salon in ${contact.address.city}` },
    ...(photos ?? []).map(p => ({ url: p.url, alt: p.alt })),
  ]

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [slides.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides.length])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section className="relative bg-cream overflow-hidden">
      {/* Decorative background blob */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[55%] h-full bg-cream-200 rounded-bl-[80px] -z-0 hidden lg:block"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 xl:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Text ── */}
          <div className="order-2 lg:order-1">
            <p className="animate-fade-up text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-4">
              {contact.address.city}&apos;s Premier Nail Destination
            </p>

            <h1 className="animate-fade-up-1 font-serif text-5xl sm:text-6xl xl:text-7xl font-light text-charcoal leading-[1.08] mb-6 text-balance">
              {tagline || name}
            </h1>

            <p className="animate-fade-up-2 text-charcoal/60 text-lg leading-relaxed mb-10 max-w-[440px]">
              {description}
            </p>

            <div className="animate-fade-up-3 flex flex-wrap gap-4 mb-14">
              <Link
                href={bookingUrl}
                className="bg-mauve text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-mauve/30 hover:bg-mauve-dark transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Book Appointment
              </Link>
              <Link
                href="/menu"
                className="border border-charcoal/20 text-charcoal font-medium px-8 py-3.5 rounded-full hover:border-mauve hover:text-mauve transition-all duration-200"
              >
                See Full Menu
              </Link>
            </div>

            {/* Stats */}
            {stats && (
              <div className="animate-fade-up-4 flex flex-wrap gap-10">
                {stats.clients && (
                  <div>
                    <p className="font-serif text-4xl font-medium text-charcoal tabular-nums">
                      {stats.clients}+
                    </p>
                    <p className="text-[0.68rem] text-charcoal/45 tracking-widest uppercase mt-1">
                      Happy Clients
                    </p>
                  </div>
                )}
                {stats.rating && (
                  <div>
                    <p className="font-serif text-4xl font-medium text-charcoal tabular-nums">
                      {stats.rating}★
                    </p>
                    <p className="text-[0.68rem] text-charcoal/45 tracking-widest uppercase mt-1">
                      Avg Rating
                    </p>
                  </div>
                )}
                {stats.yearsOpen && (
                  <div>
                    <p className="font-serif text-4xl font-medium text-charcoal tabular-nums">
                      {stats.yearsOpen}+
                    </p>
                    <p className="text-[0.68rem] text-charcoal/45 tracking-widest uppercase mt-1">
                      Years Open
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Image Slideshow ── */}
          <div
            className="order-1 lg:order-2 animate-fade-in relative flex justify-center lg:justify-end"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative w-full max-w-[520px] h-[400px] sm:h-[520px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl shadow-charcoal/15">
              {/* Slides */}
              {slides.map((slide, i) => (
                <div
                  key={slide.url}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
                >
                  <Image
                    src={slide.url}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent z-10" />

              {/* Prev / Next */}
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/35 transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/35 transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-5 h-2 bg-white'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Accent blobs */}
            <div aria-hidden className="absolute -bottom-6 -left-6 w-20 h-20 rounded-2xl bg-blush-light -z-10" />
            <div aria-hidden className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-cream-200 -z-10 hidden lg:block" />
          </div>

        </div>
      </div>
    </section>
  )
}
