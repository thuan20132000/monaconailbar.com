import type { Metadata } from 'next'
import { getSalon } from '@/lib/api'

interface Props {
  children: React.ReactNode
  params: { slug: string }
}

const SITE_URL = 'https://monaconailbar.com'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const salon = await getSalon(params.slug)
  const { name, contact, heroImage, description: salonDescription, bookingUrl } = salon
  const city = contact.address.city
  const province = contact.address.province

  const title = `${name} | Nail Salon in ${city}, ${province}`
  const description = `Visit ${name} in ${city}, ${province} for luxurious gel manicures, nail art, pedicures & more. Book your next appointment online — no phone call needed.`

  const ogImage = {
    url: heroImage,
    width: 1200,
    height: 630,
    alt: `${name} — nail salon in ${city}, ${province}`,
    type: 'image/jpeg' as const,
  }

  const keywords = [
    `nail salon ${city}`,
    `nail bar ${city}`,
    `gel manicure ${city}`,
    `nail art ${city}`,
    `pedicure ${city}`,
    `acrylic nails ${city}`,
    `luxury nail salon ${province}`,
    name,
    'Monaco Nail Bar',
    'nail salon near me',
    'gel nails',
    'nail extensions',
    'spa pedicure',
    'Bookngon',
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

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
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
      // Pinterest rich-pin verification helpers
      'pinterest-rich-pin': 'true',
      // Open Graph extras not covered by Next.js built-ins
      'og:street-address': contact.address.street,
      'og:locality': city,
      'og:region': province,
      'og:postal-code': contact.address.postalCode,
      'og:country-name': 'Canada',
      'og:phone_number': contact.phone,
      'og:email': contact.email,
      // Business info for search engines
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

export default async function SalonLayout({ children, params }: Props) {
  const salon = await getSalon(params.slug)
  const { name, contact, hours, heroImage, bookingUrl } = salon

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name,
    description: salon.description,
    url: `https://bookngon.com/${salon.slug}`,
    telephone: contact.phone,
    email: contact.email,
    image: heroImage,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.province,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.country,
    },
    openingHours: hours
      .filter(h => !h.closed)
      .map(h => `${h.day.slice(0, 2)} ${h.hours}`),
    sameAs: [
      contact.facebook,
      contact.instagram
        ? `https://instagram.com/${contact.instagram.replace('@', '')}`
        : null,
    ].filter(Boolean),
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(
      `${contact.address.street}, ${contact.address.city}, ${contact.address.province}`
    )}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
