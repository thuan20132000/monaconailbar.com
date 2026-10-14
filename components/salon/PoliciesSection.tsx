'use client'

import { useEffect, useId, useRef, useState } from 'react'
import SafeMarkdown from '@/components/salon/SafeMarkdown'

interface Props {
  title: string
  /** Untrusted Markdown. */
  body: string
}

/** Preview height before "Show more". Enough for a heading and a few bullets. */
const COLLAPSED_MAX_PX = 280

export default function PoliciesSection({ title, body }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(() => body.trim().length > 380)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const measure = () => setOverflows(el.scrollHeight > COLLAPSED_MAX_PX + 16)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [body])

  const collapsed = overflows && !expanded

  const toggle = () => {
    if (expanded) {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0
      if (top < 80) {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setExpanded(value => !value)
  }

  return (
    <section
      ref={sectionRef}
      id="policies"
      className="bg-cream-200 py-16 lg:py-20 scroll-mt-20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
          Before you visit
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal text-balance mb-8">
          {title}
        </h2>

        <div className="relative">
          <div id={panelId} className={collapsed ? 'max-h-[280px] overflow-hidden' : undefined}>
            <div ref={contentRef}>
              <SafeMarkdown className="text-base [&_li]:pl-1 marker:text-mauve">{body}</SafeMarkdown>
            </div>
          </div>
          {collapsed && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream-200 to-transparent"
            />
          )}
        </div>

        {overflows && (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-mauve hover:text-mauve-dark transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
