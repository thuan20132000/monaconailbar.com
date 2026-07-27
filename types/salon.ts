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

export interface SalonPlacePhoto {
  url: string
  width?: number
  height?: number
}

export interface SalonGoogleReviews {
  rating: number
  reviewCount: number
  reviews: SalonReview[]
  photos: SalonPlacePhoto[]
  mapsUri: string
}

export interface Salon {
  slug: string
  name: string
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
}
