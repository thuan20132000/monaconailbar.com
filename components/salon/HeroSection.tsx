'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import type { SalonWebsite } from '@/types/salon'

interface Props {
  website: SalonWebsite
  bookingUrl: string
  name: string
  logo?: string
}

const AUTO_ADVANCE_MS = 5500

export default function HeroSection({ website, bookingUrl, name, logo }: Props) {
  const { tagline, heroTitle, heroSubtitle, heroCtaText, slides } = website
  const count = slides.length
  const isSlideshow = count > 1

  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [tabHidden, setTabHidden] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const prev = useCallback(() => setCurrent(i => (i - 1 + count) % count), [count])
  const next = useCallback(() => setCurrent(i => (i + 1) % count), [count])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const update = () => setTabHidden(document.visibilityState === 'hidden')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (!isSlideshow || hovered || tabHidden || reducedMotion) return
    const id = setInterval(next, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [isSlideshow, hovered, tabHidden, reducedMotion, next])

  const active = slides[current]

  return (
    <section
      aria-roledescription={isSlideshow ? 'carousel' : undefined}
      aria-label={isSlideshow ? `${name} highlights` : undefined}
      className="relative isolate overflow-hidden bg-ink text-white min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Background ── */}
      {count === 0 ? (
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink to-mauve-dark">
          {logo && (
            <div className="absolute inset-0 flex items-start justify-center pt-20 sm:pt-24">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-white/95 ring-1 ring-white/20 shadow-2xl">
                <Image src={logo} alt="" fill priority className="object-contain p-4" sizes="176px" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 -z-10">
          {slides.map((slide, i) => {
            const offset = i - current
            const isActive = offset === 0
            return (
              <div
                key={`${slide.url}-${i}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 ease-in-out ${
                  reducedMotion ? 'transition-opacity duration-500' : 'transition-transform duration-700'
                }`}
                style={
                  reducedMotion
                    ? { opacity: isActive ? 1 : 0 }
                    : { transform: `translateX(${offset * 100}%)` }
                }
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'lazy'}
                  sizes="100vw"
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Keeps white text readable on light photos */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/10"
      />

      {/* ── Copy ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 pt-32">
        <div className="max-w-2xl">
          {tagline && (
            <p className="animate-fade-up text-[0.68rem] font-bold tracking-[0.22em] uppercase text-blush mb-4">
              {tagline}
            </p>
          )}

          <h1 className="animate-fade-up-1 font-serif text-5xl sm:text-6xl xl:text-7xl font-light leading-[1.08] mb-6 text-balance">
            {heroTitle}
          </h1>

          {heroSubtitle && (
            <p className="animate-fade-up-2 text-white/80 text-lg leading-relaxed mb-8 max-w-[520px]">
              {heroSubtitle}
            </p>
          )}

          {(active?.title || active?.caption) && (
            <div key={current} aria-live={isSlideshow ? 'polite' : undefined} className="animate-fade-up mb-8 border-l-2 border-blush pl-4">
              {active.title && <p className="font-serif text-2xl text-white">{active.title}</p>}
              {active.caption && <p className="text-sm text-white/70 mt-1">{active.caption}</p>}
            </div>
          )}

          <Link
            href={bookingUrl}
            className="animate-fade-up-3 inline-block bg-mauve text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-ink/30 hover:bg-mauve-dark transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {heroCtaText}
          </Link>
        </div>
      </div>

      {/* ── Controls ── */}
      {isSlideshow && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
