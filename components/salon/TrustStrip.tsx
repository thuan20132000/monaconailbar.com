interface Props {
  firstVisitOffer?: string
}

const BASE_ITEMS = [
  { icon: '✓', label: 'Licensed Experts' },
  { icon: '⊕', label: 'Walk-ins Welcome' },
  { icon: '◇', label: 'Gift Cards Available' },
  { icon: '♡', label: 'Birthday Perks' },
]

export default function TrustStrip({ firstVisitOffer }: Props) {
  const items = firstVisitOffer
    ? [...BASE_ITEMS, { icon: '✦', label: firstVisitOffer }]
    : BASE_ITEMS

  return (
    <section aria-label="Trust signals" className="bg-cream-200 border-y border-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[18px]">
        <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm font-medium text-charcoal/70">
              <span className="text-mauve text-[0.65rem]">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
