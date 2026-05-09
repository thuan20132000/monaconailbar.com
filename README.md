# Monaco Nail Bar — Landing Page

Business landing page for [monaconailbar.com](https://monaconailbar.com), part of the [Bookngon](https://bookngon.com) multi-tenant platform. The page is also served at `bookngon.com/salons/monaco-nail-bar`.

## Tech Stack

- **Next.js 14** (App Router, SSG + ISR)
- **TypeScript**
- **Tailwind CSS** with custom design tokens
- **`next/font/google`** — Cormorant Garamond + DM Sans

## Getting Started

```bash
npm install
npm run dev       # dev server → http://localhost:3000
```

`/` redirects automatically to `/salons/monaco-nail-bar`.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (ISR, revalidate = 3600s) |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Optional — connect to the live Bookngon API.
# If unset, the app falls back to hardcoded static data.
API_BASE_URL=https://api.bookngon.com
```

## Project Structure

```
app/
  page.tsx                    # Redirects / → /salons/monaco-nail-bar
  layout.tsx                  # Root layout (fonts, globals)
  globals.css
  salons/[slug]/
    layout.tsx                # generateMetadata (OG/Twitter/canonical) + JSON-LD schema
    page.tsx                  # Page entry — fetches salon data, renders components

components/salon/
  PromoBanner.tsx             # Dismissible top bar (client)
  Navigation.tsx              # Sticky header + hamburger (client)
  HeroSection.tsx             # Split layout with fade-up animations
  TrustStrip.tsx              # Trust signals row
  ServicesGrid.tsx            # 3→2→1 col card grid with hover overlay
  WhyChooseUs.tsx             # Dark-bg USP section (3 cards)
  Gallery.tsx                 # Masonry CSS grid
  HoursContact.tsx            # Full-bleed 2-panel split (hours + contact)
  BookingCTA.tsx              # Centred CTA + badge row
  Footer.tsx                  # 4-col footer with Bookngon credit
  FloatingBookButton.tsx      # Fixed mobile-only CTA (client)

lib/
  api.ts                      # getSalon(slug) — API fetch with static fallback

types/
  salon.ts                    # Salon, SalonService, SalonPhoto, SalonHours, SalonContact
```

## Data Flow

`lib/api.ts → getSalon(slug)` first attempts `API_BASE_URL/api/salons/:slug`. If the env var is not set or the request fails, it returns hardcoded static data. `generateStaticParams` pre-renders `monaco-nail-bar` at build time; `revalidate = 3600` keeps pages fresh via ISR.

## Design Tokens

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#FBF7F4` | Page background |
| `cream-200` | `#F0E8E2` | Trust strip, hours panel |
| `blush` | `#E8B4BC` | Accents on dark backgrounds |
| `mauve` | `#C97D8A` | Primary CTA, highlights |
| `mauve-dark` | `#A85F6E` | Hover state for mauve |
| `charcoal` | `#2D2828` | Body text |
| `ink` | `#1C1818` | Dark sections (Why / Footer) |

## Before Going Live

- Replace all placeholder values in `lib/api.ts → getStaticSalonData()` (phone, email, address, social handles, booking URL, services, hours) **or** wire up `API_BASE_URL` to the live API.
- Verify OG images and canonical URLs in `app/salons/[slug]/layout.tsx`.
- Update the `BeautySalon` JSON-LD schema with real business details.
