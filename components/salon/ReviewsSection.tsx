import Image from 'next/image'
import Link from 'next/link'
import type { SalonGoogleReviews } from '@/types/salon'

interface Props {
  google: SalonGoogleReviews
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span className="inline-flex gap-0.5 text-mauve" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? 'opacity-100' : 'opacity-25'}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function ReviewsSection({ google }: Props) {
  const { rating, reviewCount, reviews, mapsUri } = google

  if (reviews.length === 0) return null

  return (
    <section id="reviews" className="bg-cream py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
              Reviews from Google
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal">
              What Clients Say
            </h2>
            <p className="mt-2 text-sm text-charcoal/45">Latest Google reviews</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-charcoal">
              <span className="font-serif text-4xl font-medium tabular-nums">{rating.toFixed(1)}</span>
              <Stars rating={rating} />
              <span className="text-sm text-charcoal/50">
                based on {reviewCount.toLocaleString()} review{reviewCount === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          <Link
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-mauve hover:text-mauve-dark transition-colors"
          >
            View on Google
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <article
              key={`${review.authorName}-${i}`}
              className="bg-cream-50 border border-blush/15 p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                {review.authorPhotoUrl ? (
                  <Image
                    src={review.authorPhotoUrl}
                    alt={review.authorName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-10 h-10 bg-cream-200"
                    unoptimized
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-sm font-medium text-charcoal/50">
                    {review.authorName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  {review.authorUri ? (
                    <a
                      href={review.authorUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-charcoal text-sm truncate block hover:text-mauve transition-colors"
                    >
                      {review.authorName}
                    </a>
                  ) : (
                    <p className="font-medium text-charcoal text-sm truncate">{review.authorName}</p>
                  )}
                  <div className="flex items-center gap-2 mt-0.5">
                    <Stars rating={review.rating} />
                    {review.relativeTime && (
                      <span className="text-[11px] text-charcoal/40">{review.relativeTime}</span>
                    )}
                  </div>
                </div>
              </div>

              {review.text && (
                <p className="text-sm text-charcoal/65 leading-relaxed line-clamp-5">
                  {review.text}
                </p>
              )}
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] text-charcoal/35 tracking-wide">
          Reviews from Google ·{' '}
          <Link href={mapsUri} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal/55">
            See all reviews
          </Link>
        </p>
      </div>
    </section>
  )
}
