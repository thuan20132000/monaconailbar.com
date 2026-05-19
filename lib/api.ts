import type { Salon } from '@/types/salon'

export async function getSalon(slug: string): Promise<Salon> {
  if (process.env.API_BASE_URL) {
    const res = await fetch(`${process.env.API_BASE_URL}/api/salons/${slug}`, {
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
    tagline: 'Where Every Detail Matters',
    description:
      "Monaco Nail Bar is Barrie's premier nail destination, offering luxurious nail services in a warm, welcoming boutique environment. Led by skilled nail artists passionate about perfection, we blend high-end techniques with a relaxed, editorial aesthetic.",
    contact: {
      phone: '(705) 000-0000',
      email: 'hello@monaconailbar.com',
      address: {
        street: '123 Dunlop Street West',
        city: 'Barrie',
        province: 'ON',
        postalCode: 'L4N 1B2',
        country: 'CA',
      },
      instagram: '@monaconailbar',
      facebook: 'https://facebook.com/monaconailbar',
      tiktok: 'https://tiktok.com/@monaconailbar',
    },
    hours: [
      { day: 'Monday', hours: '10am – 7pm' },
      { day: 'Tuesday', hours: '10am – 7pm' },
      { day: 'Wednesday', hours: '10am – 7pm' },
      { day: 'Thursday', hours: '10am – 7pm' },
      { day: 'Friday', hours: '10am – 7pm' },
      { day: 'Saturday', hours: '9am – 6pm' },
      { day: 'Sunday', hours: 'By Appointment' },
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
    bookingUrl: 'https://bookngon.com/book/monaco-nail-bar',
    firstVisitOffer: '15% Off Your First Visit',
    stats: {
      clients: 4000,
      yearsOpen: 5,
      rating: 4.9,
    },
  }
}
