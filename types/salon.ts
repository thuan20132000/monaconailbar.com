export interface SalonHours {
  day: string
  hours: string
  closed?: boolean
  /** 24h "09:00" form, when known — lets JSON-LD skip parsing the display string. */
  opens?: string
  closes?: string
}

export interface SalonService {
  id: string
  name: string
  description: string
  startingPrice: number
  image: string
  category?: string
}

export interface SalonPhoto {
  url: string
  alt: string
}

export interface SalonAddress {
  street: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface SalonContact {
  phone: string
  email: string
  address: SalonAddress
  /** Full profile URLs. */
  instagram?: string
  facebook?: string
  tiktok?: string
  googleReviewUrl?: string
}

export interface SalonColors {
  primary: string
  accent: string
  background: string
}

export interface SalonStats {
  clients?: number
  yearsOpen?: number
  rating?: number
  reviewCount?: number
}

export interface SalonReview {
  authorName: string
  authorPhotoUrl?: string
  rating: number
  text: string
  relativeTime: string
  authorUri?: string
}

export interface SalonGoogleReviews {
  rating: number
  reviewCount: number
  reviews: SalonReview[]
  mapsUri: string
}

export interface SalonGiftCardDesign {
  id: number
  name: string
  image: string
}

export interface SalonGiftCardTheme {
  name: string
  designs: SalonGiftCardDesign[]
}

export interface SalonWebsiteSlide {
  url: string
  alt: string
  title?: string
  caption?: string
}

export interface SalonWebsiteSections {
  services: boolean
  gallery: boolean
  team: boolean
  reviews: boolean
  hours: boolean
}

/** Published website content. Absent until the salon publishes from the partners app. */
export interface SalonWebsite {
  tagline?: string
  heroTitle: string
  heroSubtitle?: string
  heroCtaText: string
  /** Markdown body — untrusted, must be sanitized when rendered. */
  about?: { title: string; body: string }
  seo: { title: string; description: string; image?: string }
  googleMapsUrl?: string
  sections: SalonWebsiteSections
  slides: SalonWebsiteSlide[]
  updatedAt: string
}

export interface Salon {
  slug: string
  name: string
  logo?: string
  tagline: string
  description: string
  contact: SalonContact
  hours: SalonHours[]
  services: SalonService[]
  photos: SalonPhoto[]
  heroImage: string
  colors?: SalonColors
  bookingUrl: string
  bookingWidgetId: string
  firstVisitOffer?: string
  stats?: SalonStats
  /** Sellable themes from the public catalog. Absent when gift cards are unavailable. */
  giftCards?: SalonGiftCardTheme[]
  /** Absolute URL of the booking site's gift card purchase page. */
  giftCardUrl?: string
  website?: SalonWebsite
}
