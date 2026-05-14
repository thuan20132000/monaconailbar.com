# Monaco Nail Bar — Landing Page Design Spec

A luxury nail salon landing page with a dark, high-contrast aesthetic using black backgrounds and gold accents. Designed for a single-page scrolling experience targeting local clientele.

---

## Color Palette

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| Page background | `cream` | `#000000` | Body bg, hero bg, section fills |
| Surface | `cream-200` | `#1a1a1a` | Trust strip bg, hours panel bg |
| Gold accent | `blush` | `#e8d5a3` | Decorative icons, dark-section accents |
| Gold light | `blush-light` | `#f0e5c0` | Decorative accent blobs |
| Gold dark | `blush-dark` | `#d4b87a` | Hover tints |
| Primary CTA | `mauve` | `#caa343` | Primary buttons, labels, highlights |
| CTA hover | `mauve-dark` | `#a8892d` | Hover state |
| CTA deep | `mauve-deeper` | `#8a7022` | Active/pressed state |
| Body text | `charcoal` | `#ffffff` | All body text (white on black bg) |
| Dark sections | `ink` | `#111111` | Promo banner, WhyChooseUs, Footer |

**Opacity usage:** Text muted states use Tailwind opacity modifiers (`charcoal/60`, `charcoal/45`, `white/45`, `white/60`) rather than separate tokens.

---

## Typography

| Font | Variable | Stack | Usage |
|------|----------|-------|-------|
| Cormorant Garamond | `--font-serif` | `Georgia, serif` | All headings (h1–h3), brand name, stat numbers |
| DM Sans | `--font-sans` | `system-ui, sans-serif` | Body text, nav links, labels, captions |

### Heading Scale

| Element | Classes | Notes |
|---------|---------|-------|
| Hero H1 | `font-serif text-5xl sm:text-6xl xl:text-7xl font-light leading-[1.08]` | Light weight, tight line-height |
| Section H2 | `font-serif text-4xl sm:text-5xl font-light` | Consistent across all sections |
| Large CTA H2 | `font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1]` | BookingCTA section |
| Card H3 | `font-serif text-xl font-medium` | Services and WhyChooseUs cards |
| Eyebrow label | `text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve` | Precedes every H2; `text-blush` on dark sections |

**Italic emphasis pattern:** Section headings feature one italic-styled word to add rhythm, e.g. `<em className="italic text-mauve not-italic font-light">Every</em>`. The `not-italic` class overrides the browser default so the serif renders in its natural italic glyph without slant correction.

---

## Spacing & Layout

- **Max content width:** `max-w-7xl` (1280px) centered with `mx-auto`
- **Horizontal padding:** `px-4 sm:px-6 lg:px-8`
- **Section vertical padding:** `py-20 lg:py-28`
- **Card gap:** `gap-5 lg:gap-6`
- **Container:** No card wrapper background on light sections; cards use `bg-white/[0.07]` for subtle lift on dark bg

---

## Animations

Defined in `tailwind.config.ts` with staggered entrance delays:

| Class | Keyframe | Delay | Trigger |
|-------|----------|-------|---------|
| `animate-fade-up` | Y28→0, opacity 0→1, 0.8s | 0s | First element |
| `animate-fade-up-1` | same | 0.12s | Second element |
| `animate-fade-up-2` | same | 0.26s | Third element |
| `animate-fade-up-3` | same | 0.40s | Fourth element |
| `animate-fade-up-4` | same | 0.54s | Fifth element |
| `animate-fade-in` | opacity 0→1, 1.0s | 0s | Hero image |

All use `ease-out both` fill. Applied on page load (no scroll trigger).

---

## Button Styles

| Variant | Classes | Usage |
|---------|---------|-------|
| Primary filled | `bg-mauve text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-mauve/30 hover:bg-mauve-dark hover:scale-105 active:scale-95` | Main CTAs |
| Primary large | `bg-mauve text-white font-semibold text-[1.05rem] px-10 py-4 rounded-full shadow-xl shadow-mauve/25 hover:bg-mauve-dark hover:scale-105 active:scale-95` | BookingCTA |
| Outline | `border border-charcoal/20 text-charcoal font-medium px-8 py-3.5 rounded-full hover:border-mauve hover:text-mauve` | Secondary actions |
| Outline mauve | `border border-mauve/60 text-mauve font-medium px-8 py-3 rounded-full hover:bg-mauve hover:text-white hover:border-mauve` | "See Full Menu" |
| Ghost (dark bg) | `border border-white/30 text-sm font-medium px-4 py-2 rounded-full hover:bg-white/10` | Social links on mauve panel |
| Nav CTA | `bg-mauve text-white text-base font-semibold px-6 py-2.5 rounded-full hover:bg-mauve-dark hover:scale-105 active:scale-95 shadow-sm` | Navigation bar |

All buttons use `transition-all duration-200` unless noted otherwise.

---

## Page Sections (top → bottom)

### 1. PromoBanner
- Full-width bar, `bg-ink text-white py-2.5 px-4 text-center text-sm`
- Blush `✦` decorators flanking the offer text
- Gold-colored "Book Now" underline link
- Dismiss `×` button, absolute right; hides banner on click (`useState`)

### 2. Navigation
- `sticky top-0 z-50`
- Height: `h-32` (128px), tall bar with logo as visual anchor
- Logo: `100×100px` circular (`rounded-full object-cover`), centered on mobile, left on desktop
- On scroll > 56px: `bg-cream-50/96 backdrop-blur-sm shadow-sm border-b border-blush/20`
- Desktop: logo left | links center | "Book Now" pill right
- Mobile: logo centered | hamburger button absolute-right
- Mobile drawer: `max-h-80` animated open/close, `border-t border-blush/20`
- Nav links: `text-base font-medium text-charcoal/65 hover:text-mauve tracking-wide`

### 3. HeroSection
- Two-column grid (`lg:grid-cols-2 gap-12 lg:gap-16`) on black background
- **Decorative blob:** `absolute top-0 right-0 w-[55%] h-full bg-cream-200 rounded-bl-[80px]` — visible desktop only, creates a split-panel illusion
- **Text column (left):**
  - Eyebrow → H1 → description → two CTAs → stats row
  - Stats: 3 figures in `font-serif text-4xl font-medium tabular-nums` with `text-[0.68rem] uppercase tracking-widest text-charcoal/45` labels
- **Image column (right):**
  - Auto-advancing slideshow, 4500ms interval, pauses on hover
  - Container: `rounded-[2rem] overflow-hidden shadow-2xl shadow-charcoal/15` — large 2rem border radius
  - Overlay gradient: `bg-gradient-to-t from-charcoal/35 via-transparent to-transparent`
  - Nav arrows: `w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30`
  - Dot indicators: active dot is `w-5 h-2` pill, inactive `w-2 h-2` circle
  - Accent blobs: `-bottom-6 -left-6 w-20 h-20 rounded-2xl bg-blush-light` and `-top-6 -right-6 w-28 h-28 rounded-full bg-cream-200`

### 4. TrustStrip
- `bg-cream-200 border-y border-blush/30`
- Horizontal flex row, centered, wrapping
- 4–5 items: `text-sm font-medium text-charcoal/70` with `text-mauve text-[0.65rem]` icon prefix
- Icons: ✓ ⊕ ◇ ♡ ✦

### 5. ServicesGrid
- `bg-cream py-20 lg:py-28` — section on black bg
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6`
- **Card:**
  - `bg-white/[0.07] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg`
  - Image area: `h-52 overflow-hidden` with `group-hover:scale-[1.06] transition-transform duration-500`
  - Hover overlay: `bg-ink/50 opacity-0 group-hover:opacity-100` — reveals "Book This Service" button centered
  - Book button translates up on hover: `translate-y-3 group-hover:translate-y-0`
  - Body: `p-5` with name/price row (`justify-between`) and muted description
  - Price badge: `text-sm font-semibold text-mauve whitespace-nowrap`
- Bottom CTA: outline mauve pill, centered

### 6. WhyChooseUs
- `bg-ink py-20 lg:py-28` — dark section
- Header eyebrow in `text-blush` (not mauve), H2 in `text-white` with blush italic
- **Cards:** `bg-white/[0.05] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.09]`
  - Icon: `text-[1.75rem] text-blush mb-5` — uses Unicode symbols (◎ ♡ ✦)
  - Title: `font-serif text-xl font-medium text-white`
  - Body: `text-white/45 text-sm leading-relaxed`

### 7. Gallery
- `bg-cream py-20 lg:py-28`
- Header: eyebrow + H2 + `text-charcoal/45 text-sm` subtitle
- **Masonry grid:** `grid-cols-2 md:grid-cols-3 gap-3 md:gap-4` with `gridAutoRows: 220px`
- First photo: `row-span-2` for visual anchor
- Cells: `rounded-xl overflow-hidden` with `group-hover:scale-[1.05]` and `bg-charcoal/0 group-hover:bg-charcoal/15` dim overlay

### 8. BookingCTA
- `bg-cream py-20 lg:py-28` — full cream section, center-aligned
- Max width: `max-w-3xl mx-auto`
- Eyebrow → Large H2 → description paragraph → large pill CTA → badge row
- **Badge row:** `flex flex-wrap justify-center gap-x-7 gap-y-3`, items `text-sm text-charcoal/45` with `text-mauve text-[0.6rem] ✦` prefix

### 9. HoursContact
- **Full-bleed 2-panel split:** `grid md:grid-cols-2` — no outer container constrains width
- **Left panel (Hours):** `bg-cream-200 py-16 md:py-20`
  - Content right-aligned: `max-w-md ml-auto px-4 sm:px-8 md:pr-14 lg:pr-20`
  - Table rows: `border-b border-charcoal/10`, today's row highlighted `text-mauve`
  - "TODAY" badge: `bg-mauve/12 text-mauve px-2 py-0.5 rounded-full text-[0.6rem] font-bold tracking-wide`
- **Right panel (Contact):** `bg-mauve text-white py-16 md:py-20`
  - Content left-aligned: `max-w-md mr-auto px-4 sm:px-8 md:pl-14 lg:pl-20`
  - Contact items use Unicode icons (◎ ☏ ✉) in `text-white/70`
  - Social buttons: ghost pills `border border-white/30 px-4 py-2 rounded-full hover:bg-white/10`

### 10. Footer
- `bg-ink text-white/60`
- **4-column grid** (`grid-cols-2 md:grid-cols-4 gap-10`): Brand (col-span-2 mobile) | Navigate | Services | Connect
- Column headings: `text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5`
- Links: `text-sm hover:text-white transition-colors duration-200`
- Social links include SVG logos (Instagram, Facebook, phone) with `group-hover:text-blush` color transition
- Bottom bar: `border-t border-white/[0.08]`, flex between copyright and "Powered by Bookngon"

---

## Mobile Behavior

- Nav becomes: centered logo + absolute hamburger button (no desktop links)
- Hero: image stacks above text (`order-1/order-2` swap on `lg`)
- Decorative background blob hidden on mobile (`hidden lg:block`)
- Services: 1-col → 2-col → 3-col
- WhyChooseUs: 1-col → 3-col
- Gallery: 2-col → 3-col
- HoursContact panels stack vertically on mobile
- Footer: 2-col → 4-col
- FloatingBookButton: `fixed bottom-6 right-6 z-40 md:hidden` — mauve pill visible only on mobile

---

## Decorative Language

- **Unicode symbols** used as icons throughout (no icon library): ✓ ⊕ ◇ ♡ ✦ ◎ ☏ ✉
- **Blobs:** Rounded rectangles/circles with `bg-blush-light` or `bg-cream-200`, positioned absolutely with negative offsets, `z-[-1]` — purely decorative
- **Border radius:** Cards `rounded-2xl`, hero image `rounded-[2rem]`, pills `rounded-full`, gallery cells `rounded-xl`
- **Shadows:** Hero image `shadow-2xl shadow-charcoal/15`, CTA buttons `shadow-xl shadow-mauve/25`
