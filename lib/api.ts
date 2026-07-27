import { cache } from 'react'
import type { Salon, SalonGoogleReviews, SalonHours, SalonPhoto } from '@/types/salon'
import type { BusinessBanner, BusinessInfo, BusinessInfoResponse } from '@/types/business'
import { getGoogleReviews } from '@/lib/google-reviews'

export const getSalon = cache(async (slug: string): Promise<Salon> => {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) return getStaticSalonData(slug)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business-booking/business-info/?business_slug=${slug}`,
      { next: { revalidate: 3600 } }
    )

    if (!res.ok) {
      console.error('getSalon:: API responded', res.status)
      return getStaticSalonData(slug)
    }

    // The endpoint wraps the business record as { results, success, status_code }.
    const data = (await res.json()) as BusinessInfoResponse
    if (!data.results) {
      console.error('getSalon:: response missing results envelope')
      return getStaticSalonData(slug)
    }

    return mapBusinessToSalon(slug, data.results)
  } catch (error) {
    console.error('getSalon:: fetch failed', error)
    return getStaticSalonData(slug)
  }
})

export async function getSalonWithGoogle(slug: string): Promise<{
  salon: Salon
  google: SalonGoogleReviews | null
}> {
  const [salon, google] = await Promise.all([getSalon(slug), getGoogleReviews()])
  if (!google) return { salon, google: null }

  return {
    salon: {
      ...salon,
      stats: {
        ...salon.stats,
        rating: google.rating,
        reviewCount: google.reviewCount,
      },
    },
    google,
  }
}

// ---------------------------------------------------------------------------
// API → view model
//
// The business-info endpoint owns contact, hours, gallery, banner and booking
// link. It has no service menu, tagline, socials or stats, so we layer the API
// values over the curated static record rather than building from scratch.
// ---------------------------------------------------------------------------
function mapBusinessToSalon(slug: string, api: BusinessInfo): Salon {
  const base = getStaticSalonData(slug)

  const photos = (api.gallery_images ?? [])
    .filter(g => g.is_active && g.media_type === 'image' && Boolean(g.image))
    .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
    .map<SalonPhoto>(g => ({
      url: g.image as string,
      alt: g.alt_text ?? `${base.name} — gallery photo`,
    }))

  const hours = (api.operating_hours ?? []).map<SalonHours>(h => {
    const open = h.is_open && h.open_time && h.close_time
    return {
      day: h.day_name,
      hours: open ? `${formatTime(h.open_time!)} – ${formatTime(h.close_time!)}` : 'Closed',
      closed: !open,
      opens: open ? toHourMinute(h.open_time!) : undefined,
      closes: open ? toHourMinute(h.close_time!) : undefined,
    }
  })

  return {
    ...base,
    slug: api.online_booking?.slug ?? base.slug,
    description: api.description?.trim() || base.description,
    contact: {
      ...base.contact,
      phone: formatPhone(api.phone_number) || base.contact.phone,
      email: api.email?.trim() || base.contact.email,
      address: {
        street: api.address ? api.address.split(',')[0].trim() : base.contact.address.street,
        city: api.city ?? base.contact.address.city,
        province: normalizeProvince(api.state_province) ?? base.contact.address.province,
        postalCode: api.postal_code ?? base.contact.address.postalCode,
        country: normalizeCountry(api.country) ?? base.contact.address.country,
      },
      googleReviewUrl: api.google_review_url ?? undefined,
    },
    hours: hours.length > 0 ? hours : base.hours,
    photos: photos.length > 0 ? photos : base.photos,
    heroImage: photos[0]?.url ?? api.logo ?? base.heroImage,
    bookingUrl: api.online_booking?.shareable_link ?? api.website ?? base.bookingUrl,
    // A hidden or expired banner means "no offer" — don't fall back to the
    // static promo string, or the site advertises something the salon retired.
    firstVisitOffer: getActiveBannerMessage(api.active_banner),
  }
}

function getActiveBannerMessage(banner?: BusinessBanner | null): string | undefined {
  if (!banner || !banner.is_active || !banner.is_visible) return undefined
  const now = Date.now()
  if (banner.start_at && now < Date.parse(banner.start_at)) return undefined
  if (banner.end_at && now > Date.parse(banner.end_at)) return undefined
  return banner.message?.trim() || banner.title?.trim() || undefined
}

/** "7059056789" / "+17059056789" → "(705) 905-6789" */
function formatPhone(raw: string | null): string {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  const local = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (local.length !== 10) return raw
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`
}

/** "09:00:00" → "9:00 AM" — matches the display format the components expect. */
function formatTime(raw: string): string {
  const [hStr, mStr] = raw.split(':')
  let hour = Number(hStr)
  const period = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12
  return `${hour}:${(mStr ?? '00').padStart(2, '0')} ${period}`
}

/** "09:00:00" → "09:00" */
function toHourMinute(raw: string): string {
  const [hStr, mStr] = raw.split(':')
  return `${hStr.padStart(2, '0')}:${(mStr ?? '00').padStart(2, '0')}`
}

const PROVINCE_CODES: Record<string, string> = {
  alberta: 'AB',
  'british columbia': 'BC',
  manitoba: 'MB',
  'new brunswick': 'NB',
  'newfoundland and labrador': 'NL',
  'northwest territories': 'NT',
  'nova scotia': 'NS',
  nunavut: 'NU',
  ontario: 'ON',
  'prince edward island': 'PE',
  quebec: 'QC',
  saskatchewan: 'SK',
  yukon: 'YT',
}

function normalizeProvince(raw: string | null): string | undefined {
  const value = raw?.trim()
  if (!value) return undefined
  return PROVINCE_CODES[value.toLowerCase()] ?? value
}

const COUNTRY_CODES: Record<string, string> = {
  canada: 'CA',
  'united states': 'US',
  usa: 'US',
}

function normalizeCountry(raw: string | null): string | undefined {
  const value = raw?.trim()
  if (!value) return undefined
  return COUNTRY_CODES[value.toLowerCase()] ?? value
}

// ---------------------------------------------------------------------------
// Static fallback — used when the API is unreachable, and as the base layer for
// fields the business-info endpoint does not expose (services, tagline, socials,
// stats, bookingWidgetId).
// ---------------------------------------------------------------------------
function getStaticSalonData(_slug: string): Salon {
  return {
    slug: 'monaco-nail-bar',
    name: 'Monaco Nail Bar',
    tagline: "Barrie's Top Destination for Luxury Nails & Spa",
    description:
      "Monaco Nail Bar is Barrie's top destination for luxury nails and spa. Experience precision nail artistry — BIAB, Gel, Extensions & Nail Art — paired with our signature Cocktail & Mocktail experience. Our 5-star service blends expert technique with a warm, boutique atmosphere. Book your self-care moment now.",
    contact: {
      phone: '(705) 905-6789',
      email: 'monaconailbar@gmail.com',
      address: {
        street: 'E2 - 31 Commerce Park Dr',
        city: 'Barrie',
        province: 'ON',
        postalCode: 'L4N 8A4',
        country: 'CA',
      },
      instagram: '@monaconailbarbarrie',
      facebook: 'https://facebook.com/monaconailbar',
      tiktok: 'https://tiktok.com/@monaconailbarbarrie',
    },
    hours: [
      { day: 'Monday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Tuesday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Thursday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Friday', hours: '9:00 AM – 7:00 PM' },
      { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
      { day: 'Sunday', hours: '10:00 AM – 5:00 PM' },
    ],
    services: [
      {
        id: 'classic-manicure',
        name: 'Classic Manicure',
        description: 'Shape, buff, cuticle care, and a flawless polish finish.',
        startingPrice: 35,
        image:
          'https://i.pinimg.com/736x/05/c4/63/05c4637a6cf51dd5a56ad48dbe324c29.jpg',
      },
      {
        id: 'gel-manicure',
        name: 'Gel Manicure',
        description: 'Long-lasting gel colour with a mirror-shine finish that holds for weeks.',
        startingPrice: 55,
        image:
          'https://i.pinimg.com/736x/e9/2b/7a/e92b7a50092c920b538fd87d4c35c5f7.jpg',
      },
      {
        id: 'luxury-pedicure',
        name: 'Luxury Pedicure',
        description: 'Soak, scrub, extended massage, and polish for total relaxation.',
        startingPrice: 65,
        image:
          'https://i.pinimg.com/1200x/a6/57/c5/a657c5587cad07a39fcf7feee94a3fc4.jpg',
      },
      {
        id: 'nail-art',
        name: 'Nail Art',
        description: 'Custom designs from minimalist to bold — your vision, our craft.',
        startingPrice: 75,
        image:
          'https://i.pinimg.com/736x/05/c4/63/05c4637a6cf51dd5a56ad48dbe324c29.jpg',
      },
      {
        id: 'acrylic-extensions',
        name: 'Acrylic Extensions',
        description: 'Full sets and fills for strong, sculpted nails that last.',
        startingPrice: 90,
        image:
          'https://i.pinimg.com/736x/e9/2b/7a/e92b7a50092c920b538fd87d4c35c5f7.jpg',
      },
      {
        id: 'spa-pedicure',
        name: 'Spa Pedicure',
        description: 'Our signature spa treatment with hot stone massage and paraffin wrap.',
        startingPrice: 95,
        image:
          'https://i.pinimg.com/1200x/a6/57/c5/a657c5587cad07a39fcf7feee94a3fc4.jpg',
      },
    ],
    photos: [
      {
        url: 'https://i.pinimg.com/736x/e9/2b/7a/e92b7a50092c920b538fd87d4c35c5f7.jpg',
        alt: 'Intricate nail art design',
      },
      {
        url: 'https://i.etsystatic.com/54106546/r/il/6c3bc0/6487079503/il_1140xN.6487079503_i9lb.jpg',
        alt: 'Luxury pedicure treatment',
      },
      {
        url: 'https://i.pinimg.com/736x/76/41/38/764138e4d945c725150da1a7eb0cf9cd.jpg',
        alt: 'Gel nail manicure',
      },
      {
        url: 'https://i.pinimg.com/736x/8c/d1/e4/8cd1e4ab7a54c494e4f7ae8697473cf3.jpg',
        alt: 'Acrylic nail extensions',
      },
      {
        url: 'https://i.pinimg.com/736x/73/28/10/732810e26408494ed42330c7b2220541.jpg',
        alt: 'Classic nail polish finish',
      },
      {
        url: 'https://i.pinimg.com/1200x/a6/57/c5/a657c5587cad07a39fcf7feee94a3fc4.jpg',
        alt: 'Spa pedicure in progress',
      },
    ],
    heroImage:
      'https://i.pinimg.com/1200x/a6/57/c5/a657c5587cad07a39fcf7feee94a3fc4.jpg',
    bookingUrl: 'https://book.bookngon.com/monaco-nail-bar',
    bookingWidgetId: 'monaco-nail-bar',
    firstVisitOffer: '15% Off Your First Visit',
    stats: {
      clients: 4000,
      yearsOpen: 5,
      rating: 4.9,
      reviewCount: 400,
    },
  }
}
