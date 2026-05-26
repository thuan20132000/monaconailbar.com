import Image from 'next/image'
import Link from 'next/link'
import type { SalonService } from '@/types/salon'

interface Props {
  services: SalonService[]
  bookingUrl: string
  bookingWidgetId: string
}

export default function ServicesGrid({ services, bookingUrl, bookingWidgetId }: Props) {
  return (
    <section id="services" className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
            Our Services
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal text-balance">
            Crafted for <em className="italic text-mauve not-italic font-light">Every</em> Occasion
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map(service => (
            <article
              key={service.id}
              className="group relative bg-white/[0.07] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-[1.06] transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href="#booking"
                    className="bg-mauve text-ink text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-mauve-dark hover:text-white transition-colors duration-200 translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
                    {service.name}
                  </h3>
                </div>
                <p className="text-sm text-charcoal/55 leading-relaxed">{service.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="#booking"
            className="inline-block border border-mauve/60 text-mauve font-medium px-8 py-3 rounded-full hover:bg-mauve hover:text-white hover:border-mauve transition-all duration-200"
          >
            See Full Menu & Book
          </Link>
        </div>
      </div>
    </section>
  )
}
