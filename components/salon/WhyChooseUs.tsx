const REASONS = [
  {
    icon: '◎',
    title: 'Licensed Nail Experts',
    body: 'Every technician is fully certified and trained in the latest nail care techniques, hygiene standards, and colour theory.',
  },
  {
    icon: '♡',
    title: 'Creative & Comfortable',
    body: 'From minimalist elegance to bold nail art, we bring your vision to life in a warm, boutique setting built for relaxation.',
  },
  {
    icon: '✦',
    title: 'Premium Products Only',
    body: 'We use only top-tier, long-lasting gels and polishes so your nails look flawless — not just on day one, but for weeks.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id="about" className="bg-ink py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-blush mb-3">
            Why Monaco
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-cream text-balance">
            More Than a Manicure —{' '}
            <em className="italic text-blush not-italic font-light">An Experience</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {REASONS.map((reason, i) => (
            <div
              key={i}
              className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.09] transition-colors duration-300"
            >
              <div className="text-[1.75rem] text-blush mb-5">{reason.icon}</div>
              <h3 className="font-serif text-xl font-medium text-cream mb-3">{reason.title}</h3>
              <p className="text-cream/45 text-sm leading-relaxed">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
