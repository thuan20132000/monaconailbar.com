import type { SalonGoogleReviews, SalonPlacePhoto, SalonReview } from '@/types/salon'

const PLACE_ID = process.env.GOOGLE_PLACE_ID
const API_KEY = process.env.GOOGLE_PLACES_API_KEY

interface PlacesAuthorAttribution {
  displayName?: string
  uri?: string
  photoUri?: string
}

interface PlacesReview {
  rating?: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: PlacesAuthorAttribution
}

interface PlacesPhoto {
  name?: string
  widthPx?: number
  heightPx?: number
}

interface PlacesDetailsResponse {
  rating?: number
  userRatingCount?: number
  reviews?: PlacesReview[]
  photos?: PlacesPhoto[]
  googleMapsUri?: string
}

function photoMediaUrl(photoName: string, maxHeightPx = 800): string {
  return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=${maxHeightPx}&key=${API_KEY}`
}

export async function getGoogleReviews(): Promise<SalonGoogleReviews | null> {
  if (!PLACE_ID || !API_KEY) return null

  try {
    const placePath = PLACE_ID.startsWith('places/') ? PLACE_ID : `places/${PLACE_ID}`
    const res = await fetch(`https://places.googleapis.com/v1/${placePath}`, {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask':
          'displayName,rating,userRatingCount,reviews,photos,googleMapsUri',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('[google-reviews]', res.status, detail.slice(0, 300))
      return null
    }

    const data = (await res.json()) as PlacesDetailsResponse
    if (typeof data.rating !== 'number') return null

    const reviews: SalonReview[] = (data.reviews ?? []).slice(0, 5).map(r => ({
      authorName: r.authorAttribution?.displayName ?? 'Google user',
      authorPhotoUrl: r.authorAttribution?.photoUri,
      rating: r.rating ?? 0,
      text: r.text?.text ?? '',
      relativeTime: r.relativePublishTimeDescription ?? '',
      authorUri: r.authorAttribution?.uri,
    }))

    const photos: SalonPlacePhoto[] = (data.photos ?? [])
      .filter(p => Boolean(p.name))
      .slice(0, 8)
      .map(p => ({
        url: photoMediaUrl(p.name!),
        width: p.widthPx,
        height: p.heightPx,
      }))

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount ?? reviews.length,
      reviews,
      photos,
      mapsUri:
        data.googleMapsUri ??
        `https://www.google.com/maps/place/?q=place_id:${PLACE_ID.replace(/^places\//, '')}`,
    }
  } catch (err) {
    console.error('[google-reviews] fetch failed', err)
    return null
  }
}
