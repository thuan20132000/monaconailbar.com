import type { SalonGoogleReviews } from '@/types/salon'

/** Static snapshot — no Places API calls (avoids cost / abuse spikes). */
const staticReviews: SalonGoogleReviews = {
  rating: 4.9,
  reviewCount: 526,
  reviews: [
    {
      authorName: 'Rachel Charboneau',
      authorPhotoUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocJQ65E7B9C38G2RcN1tzl2xfVR2qPYVTtbcKusCdWSMlIepaA=s128-c0x00000000-cc-rp-mo',
      rating: 5,
      text: 'Ten out of ten experience, salon is amazing, staff is so kind and accommodating (they squeezed us in last minute) and still went above and beyond for our service. If you are in the area and looking for a good nail place this is the one. Highly reccomend the jelly pedicure',
      relativeTime: '2 months ago',
      authorUri: 'https://www.google.com/maps/contrib/106693293698501521459/reviews',
    },
    {
      authorName: 'catherine crummey',
      authorPhotoUrl:
        'https://lh3.googleusercontent.com/a/ACg8ocLI2GGHBv6pLlLmEmzbx8gm7ng3ILHh84i-YcF4uy6OJYtcGQ=s128-c0x00000000-cc-rp-mo',
      rating: 5,
      text: 'New spot but it’s amazing! Best service and didn’t have to drive to Vaughan for the extra pedicure. The massage foot scrub and painted toes are 100. I’ll be back for sure',
      relativeTime: '2 months ago',
      authorUri: 'https://www.google.com/maps/contrib/111813964139078926804/reviews',
    },
    {
      authorName: 'whambamsam',
      authorPhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjVwqmlRouT-p5O8kodoCOY6HaLszwxqj8QIzynnOlVP74aJr5g=s128-c0x00000000-cc-rp-mo',
      rating: 5,
      text: 'By far one of the best pedicure experiences I’ve had. It was a surprise birthday gift and I couldn’t have been happier. Everything was clean, organized, and the staff made sure every detail was perfect. Can’t wait to be back!',
      relativeTime: '2 months ago',
      authorUri: 'https://www.google.com/maps/contrib/111433496503560463581/reviews',
    },
    {
      authorName: 'Joanna Dubs',
      authorPhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjVsqDj_odxXCK_-nlLfDgOKCqLTZ9GwDAITO_MfBenOY44RxGVTtQ=s128-c0x00000000-cc-rp-mo',
      rating: 5,
      text: 'Such an amazing place! Highly recommend. The nail technicians are so thorough with such incredible attention to detail. There’s so many options to choose from and feels so luxurious for the price of a regular salon. This is the first salon i’ve gone to that hasn’t left me disappointed in a while! Minh is especially the best! He also taught me about my nails and gave his expertise on what approach I should move forward with as acrylics were starting to be unhealthy for my nails! I drove 40 minutes to get here and will definitely be coming back!',
      relativeTime: 'a month ago',
      authorUri: 'https://www.google.com/maps/contrib/108040783764961618604/reviews',
    },
    {
      authorName: 'Paola Tomei',
      authorPhotoUrl:
        'https://lh3.googleusercontent.com/a-/ALV-UjXQyxmqQkXDI8qpWUArAxHEuo9Wylmp9aj7mPlIlH7d2J-7p7T5=s128-c0x00000000-cc-rp-mo-ba5',
      rating: 5,
      text: 'Nice new place to get pamper while getting the pedicure and manicure! Like the ambiance and the staff very friendly.',
      relativeTime: '2 months ago',
      authorUri: 'https://www.google.com/maps/contrib/112159376398650312692/reviews',
    },
  ],
  mapsUri:
    'https://maps.google.com/?cid=1733021962538669501&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA',
}

export async function getGoogleReviews(): Promise<SalonGoogleReviews | null> {
  return staticReviews
}
