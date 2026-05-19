export interface SalonHours {
  day: string
  hours: string
  closed?: boolean
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
  firstVisitOffer?: string
  stats?: SalonStats
}
