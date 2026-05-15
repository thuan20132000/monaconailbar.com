# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Monaco Nail Bar** — a business landing page for monaconailbar.com, part of the Bookngon multi-tenant platform. The page lives at `bookngon.com/salons/monaco-nail-bar` and is served under the `monaconailbar.com` domain.

## Commands

```bash
npm install      # install deps
npm run dev      # dev server at localhost:3000
npm run build    # production build (Next.js ISR, revalidate=3600)
npm run lint     # ESLint
npm run start    # serve production build
```

## Architecture

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · `next/font/google`

**Routing:**
- `/` → `app/page.tsx` — renders the Monaco Nail Bar page directly (SSG + ISR, no redirect)

**Data flow:**
- `lib/api.ts → getSalon('monaco-nail-bar')` — tries `API_BASE_URL/api/salons/:slug` first, falls back to hardcoded static data. Set `API_BASE_URL` in `.env.local` to connect the live API.
- `export const revalidate = 3600` triggers ISR.

**SEO + Schema:**
- `app/layout.tsx` — exports `generateMetadata` (OG, Twitter, canonical) and injects a `<script type="application/ld+json">` `BeautySalon` schema.

**Component tree** (all in `components/salon/`):
```
PromoBanner          ← 'use client', dismissible top bar
Navigation           ← 'use client', sticky + hamburger
HeroSection          ← split layout, CSS fade-up animations
TrustStrip           ← static trust signals row
ServicesGrid         ← 3→2→1 col card grid, hover overlay
WhyChooseUs          ← dark bg section, 3-card USP
Gallery              ← masonry CSS grid, first image row-span-2
HoursContact         ← full-bleed 2-panel split (light/mauve)
BookingCTA           ← centred CTA + badge row
Footer               ← 4-col, Bookngon credit
FloatingBookButton   ← fixed mobile-only CTAv
```

**Types:** `types/salon.ts` — `Salon`, `SalonService`, `SalonPhoto`, `SalonHours`, `SalonContact`

## Design tokens (Tailwind custom colors)

| Token         | Hex       | Usage                           |
|---------------|-----------|---------------------------------|
| `cream`       | `#FBF7F4` | Page background                 |
| `cream-200`   | `#F0E8E2` | Trust strip, hours panel        |
| `blush`       | `#E8B4BC` | Accents on dark backgrounds     |
| `mauve`       | `#C97D8A` | Primary CTA, highlights         |
| `mauve-dark`  | `#A85F6E` | Hover state for mauve           |
| `charcoal`    | `#2D2828` | Body text                       |
| `ink`         | `#1C1818` | Dark sections (Why / Footer)    |

**Fonts:** Cormorant Garamond (`font-serif`, headings) + DM Sans (`font-sans`, body) via `next/font/google` CSS variables.

## Placeholder data

All `[BRACKET]` fields in the original spec (phone, email, address, social handles, booking URL, services, hours) are currently filled with placeholder values in `lib/api.ts → getStaticSalonData()`. Replace these before going live or wire up the API.
