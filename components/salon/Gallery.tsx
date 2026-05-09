import Image from 'next/image'
import type { SalonPhoto } from '@/types/salon'

interface Props {
  photos: SalonPhoto[]
  salonName: string
}

export default function Gallery({ photos, salonName }: Props) {
  if (!photos.length) return null

  return (
    <section id="gallery" className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal">
            Our Work
          </h2>
          <p className="text-charcoal/45 text-sm mt-3">
            A showcase of stunning designs created right here in Barrie
          </p>
        </div>

        {/*
          Masonry-style grid:
          - 2 cols mobile, 3 cols md+
          - First photo spans 2 rows for visual anchor
          - auto-rows so cells have consistent base height
        */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          style={{ gridAutoRows: '220px' }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-xl ${
                i === 0 ? 'row-span-2' : ''
              }`}
            >
              <Image
                src={photo.url}
                alt={photo.alt || `${salonName} nail design ${i + 1}`}
                fill
                className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/15 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
