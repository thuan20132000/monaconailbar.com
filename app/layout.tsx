import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { getSalon } from '@/lib/api'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const SITE_URL = 'https://monaconailbar.com'

export async function generateMetadata(): Promise<Metadata> {
  const salon = await getSalon('monaco-nail-bar')
  const { name, contact, heroImage } = salon
  const city = contact.address.city
  const province = contact.address.province

  const title = `${name} | Luxury Nail Salon & Spa in ${city}, ${province}`
  const description = `${name} — ${city}'s top-rated luxury nail salon. Expert BIAB, Gel, Acrylic Extensions & Nail Art paired with a signature Cocktail & Mocktail experience. Book online instantly. E2 – 31 Commerce Park Dr, ${city}, ${province}.`

  const ogImage = {
    url: heroImage,
    width: 1200,
    height: 630,
    alt: `${name} — luxury nail salon & spa in ${city}, ${province}`,
    type: 'image/jpeg' as const,
  }

  const keywords = [
    // Primary local intent
    `nail salon ${city}`,
    `nail bar ${city}`,
    `luxury nail salon ${city}`,
    `nail salon ${city} ${province}`,
    `nail salon near me ${city}`,
    // Services
    `BIAB nails ${city}`,
    `gel manicure ${city}`,
    `gel nails ${city}`,
    `acrylic nail extensions ${city}`,
    `nail art ${city}`,
    `spa pedicure ${city}`,
    `nail extensions ${city}`,
    // Brand USP
    `cocktail nail salon ${city}`,
    `mocktail nail bar ${city}`,
    `luxury nail spa ${province}`,
    // Brand
    name,
    'Monaco Nail Bar',
    'Monaco Nail Bar Barrie',
    // Generic high-volume
    'nail salon near me',
    'gel nails near me',
    'nail art near me',
    'BIAB nails near me',
    'luxury nail salon',
    '5 star nail salon',
    'best nail salon Barrie Ontario',
  ]

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    authors: [{ name, url: SITE_URL }],
    creator: name,
    publisher: name,
    category: 'Beauty & Personal Care',
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },

    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: name,
      locale: 'en_CA',
      type: 'website',
      images: [ogImage],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: contact.instagram ?? undefined,
      site: contact.instagram ?? undefined,
    },

    alternates: {
      canonical: SITE_URL,
    },

    other: {
      'pinterest-rich-pin': 'true',
      'og:street-address': contact.address.street,
      'og:locality': city,
      'og:region': province,
      'og:postal-code': contact.address.postalCode,
      'og:country-name': 'Canada',
      'og:phone_number': contact.phone,
      'og:email': contact.email,
      'business:contact_data:street_address': contact.address.street,
      'business:contact_data:locality': city,
      'business:contact_data:region': province,
      'business:contact_data:postal_code': contact.address.postalCode,
      'business:contact_data:country_name': 'Canada',
      'business:contact_data:phone_number': contact.phone,
      'business:contact_data:website': SITE_URL,
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const salon = await getSalon('monaco-nail-bar')
  const { name, contact, hours, heroImage } = salon

  // Parse "9:30 AM – 7:30 PM" → { opens: "09:30", closes: "19:30" }
  function parseHours(raw: string): { opens: string; closes: string } | null {
    const match = raw.match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*[–-]\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (!match) return null
    const to24 = (h: string, m: string, period: string) => {
      let hour = parseInt(h, 10)
      if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12
      if (period.toUpperCase() === 'AM' && hour === 12) hour = 0
      return `${String(hour).padStart(2, '0')}:${m}`
    }
    return {
      opens:  to24(match[1], match[2], match[3]),
      closes: to24(match[4], match[5], match[6]),
    }
  }

  const DAY_ABBR: Record<string, string> = {
    Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday',
    Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday',
  }

  const openingHoursSpecification = hours
    .filter(h => !h.closed)
    .flatMap(h => {
      const parsed = parseHours(h.hours)
      if (!parsed || !DAY_ABBR[h.day]) return []
      return [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${DAY_ABBR[h.day]}`,
        opens: parsed.opens,
        closes: parsed.closes,
      }]
    })

  const sameAs = [
    contact.facebook,
    contact.instagram
      ? `https://instagram.com/${contact.instagram.replace('@', '')}`
      : null,
    contact.tiktok ?? null,
  ].filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name,
    description: salon.description,
    url: SITE_URL,
    telephone: contact.phone,
    email: contact.email,
    image: heroImage,
    priceRange: '$$',
    currenciesAccepted: 'CAD',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.province,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.3547,
      longitude: -79.6901,
    },
    openingHoursSpecification,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: salon.stats?.rating ?? 4.9,
      reviewCount: salon.stats?.clients ?? 400,
      bestRating: 5,
      worstRating: 1,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Online Booking', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Cocktail & Mocktail Experience', value: true },
    ],
    sameAs,
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(
      `${contact.address.street}, ${contact.address.city}, ${contact.address.province}`
    )}`,
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: salon.bookingUrl,
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'Reservation',
        name: 'Book Nail Appointment',
      },
    },
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
