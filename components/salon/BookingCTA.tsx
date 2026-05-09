import Link from 'next/link'

interface Props {
  bookingUrl: string
  salonName: string
}

const BADGES = ['Gift Cards Available', 'Walk-ins Welcome', 'No Phone Call Needed']

export default function BookingCTA({ bookingUrl, salonName }: Props) {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-4">
          Ready?
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.1] mb-5 text-balance">
          Book Your{' '}
          <em className="italic text-mauve not-italic font-light">Perfect</em>{' '}
          Appointment
        </h2>
        <p className="text-charcoal/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Skip the phone tag. Browse real-time availability and book your next visit at{' '}
          {salonName} in under 60 seconds.
        </p>

        <Link
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-mauve text-white font-semibold text-[1.05rem] px-10 py-4 rounded-full shadow-xl shadow-mauve/25 hover:bg-mauve-dark transition-all duration-200 hover:scale-105 active:scale-95 mb-10"
        >
          Book My Appointment
        </Link>

        {/* Badge row */}
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          {BADGES.map((badge, i) => (
            <span key={i} className="flex items-center gap-1.5 text-sm text-charcoal/45">
              <span className="text-mauve text-[0.6rem]">✦</span>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
