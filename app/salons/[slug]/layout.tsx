import type { Metadata } from 'next'
import { getSalon } from '@/lib/api'

interface Props {
  children: React.ReactNode
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const salon = await getSalon(params.slug)
  const { name, contact, heroImage } = salon
  const city = contact.address.city

  const title = `${name} | Nail Salon in ${city}`
  const description = `Visit ${name} in ${city} for luxurious gel manicures, nail art, pedicures & more. Book your next appointment online — no phone call needed.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://bookngon.com/${salon.slug}`,
      siteName: name,
      images: [{ url: heroImage, width: 1200, height: 630, alt: `${name} nail salon in ${city}` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [heroImage],
    },
    alternates: {
      canonical: `https://bookngon.com/${salon.slug}`,
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
