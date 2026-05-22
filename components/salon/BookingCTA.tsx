interface Props {
  salonName: string
}

const BADGES = ['Gift Cards Available', 'Walk-ins Welcome', 'No Phone Call Needed']

export default function BookingCTA({ salonName }: Props) {
  return (
    <section id="booking" className="bg-cream py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-charcoal leading-[1.1] mb-5 text-balance">
          Book Your{' '}
          <em className="italic text-mauve not-italic font-light">Perfect</em>{' '}
          Appointment
        </h2>
        <div className="bg-white rounded-3xl shadow-xl shadow-mauve/10 overflow-hidden w-full max-w-4xl mx-auto h-[850px] border border-charcoal/5 relative mb-10">
          <iframe
            src="https://book.bookngon.com/monaco-nail-bar/booking"
            className="w-full h-full border-none absolute top-0 left-0"
            title={`Book an appointment at ${salonName}`}
            loading="lazy"
            allowFullScreen
          />
        </div>

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
