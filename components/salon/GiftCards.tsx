import type { SalonGiftCardTheme } from '@/types/salon'

interface Props {
  themes: SalonGiftCardTheme[]
  giftCardUrl: string
}

export default function GiftCards({ themes, giftCardUrl }: Props) {
  if (!themes.length) return null

  return (
    <section id="gift-cards" className="">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
            Gift Cards
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-charcoal text-balance">
            Give the <em className="italic text-mauve not-italic font-light">Perfect</em> Treat
          </h2>
          <p className="text-charcoal/45 text-sm mt-3">
            Choose a design, then finish your purchase online
          </p>
        </div>

        <div className="space-y-12">
          {themes.map(theme => (
            <div key={theme.name}>
              <h3 className="font-serif text-2xl font-medium text-charcoal mb-5">{theme.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {theme.designs.map(design => (
                  <a
                    key={design.id}
                    href={giftCardUrl}
                    className="group block rounded-2xl overflow-hidden bg-white/[0.07] shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={design.image}
                        alt={design.name}
                        className="h-full w-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-serif text-lg font-medium text-charcoal leading-snug">
                        {design.name}
                      </p>
                      <p className="text-sm text-mauve mt-1">Buy this card</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
