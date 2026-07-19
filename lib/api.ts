import type { Salon } from '@/types/salon'

export async function getSalon(slug: string): Promise<Salon> {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business-booking/business-info?slug=${slug}`, {
      next: { revalidate: 3600 },
    })
    if (res.ok) return res.json()
  }
  return getStaticSalonData(slug)
}

// ---------------------------------------------------------------------------
// Static fallback — replace with real API data once available
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
      { day: 'Monday', hours: '9:00 AM – 7:30 PM' },
      { day: 'Tuesday', hours: '9:00 AM – 7:30 PM' },
      { day: 'Wednesday', hours: '9:00 AM – 7:30 PM' },
      { day: 'Thursday', hours: '9:00 AM – 7:30 PM' },
      { day: 'Friday', hours: '9:00 AM – 7:30 PM' },
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
    },
  }
}
