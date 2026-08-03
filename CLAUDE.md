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
- `lib/api.ts → getSalon('monaco-nail-bar')` fetches
  `NEXT_PUBLIC_API_BASE_URL/api/business-booking/business-info/?business_slug=:slug`.
  The endpoint wraps the record as `{ results, success, status_code }`; `mapBusinessToSalon`
  converts the `BusinessInfo` wire shape (`types/business.ts`) into the `Salon` view model.
- **API wins, static fills gaps.** The endpoint owns contact, hours, gallery photos, banner
  and booking link. It has *no* service menu, tagline, socials or stats — those stay in
  `getStaticSalonData()`, which the mapper uses as its base layer. Any failure (unset base
  URL, non-2xx, missing envelope, throw) logs and returns the static record whole.
- Exception: `firstVisitOffer` comes solely from `active_banner`. A hidden/expired banner
  means "no offer" — it does *not* fall back to the static promo string.
- `getSalonWithGoogle` merges the live Google rating/reviewCount into `salon.stats`.
- `getSalon` is wrapped in React `cache()` — it's called from `generateMetadata`, `RootLayout`,
  and `page.tsx` on every render.
- `export const revalidate = 3600` triggers ISR; both fetches use `next: { revalidate: 3600 }`.

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

**Types:**
- `types/salon.ts` — view model consumed by components: `Salon`, `SalonService`, `SalonPhoto`, `SalonHours`, `SalonContact`, `SalonGoogleReviews`
- `types/business.ts` — API wire shape: `BusinessInfo`, `OperatingHour`, `BusinessOnlineBooking`, `BusinessBanner`, `BusinessInfoResponse`
- `types/gallery.ts` — `BusinessGalleryImage` · `types/payment.ts` — `CurrencyType`

Components only ever see `Salon`. Keep API field names out of `components/`.

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

## Static data status

`getStaticSalonData()` is no longer a placeholder — it's the offline fallback *and* the
source of truth for fields the API doesn't serve. Note which parts are still curated:

- **Real, API-backed at runtime:** contact, hours, gallery photos, hero image, booking URL.
  The static copies of these are only a safety net and may drift (e.g. the static postal code
  is stale — the API is authoritative).
- **Curated, edit here:** `services` (name/description/price/image), `tagline`, `stats`,
  `bookingWidgetId`, and the `instagram`/`facebook`/`tiktok` handles. The service images are
  still stock pinimg/etsy URLs.

## Environment

Copy `.env.example` → `.env`. Never commit real keys — `.env` is gitignored.
`getGoogleReviews()` requests rating + reviews only (no Place Photos field) to avoid
the Place Photo media SKU.
