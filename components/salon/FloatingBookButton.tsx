import Link from 'next/link'

interface Props {
  bookingUrl: string
}

export default function FloatingBookButton({ bookingUrl }: Props) {
  return (
    <div className="fixed bottom-6 right-5 z-50 md:hidden">
      <Link
        href={bookingUrl}
        className="flex items-center gap-2 bg-mauve text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-2xl shadow-mauve/40 hover:bg-mauve-dark transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span aria-hidden className="text-base">✦</span>
        Book Now
      </Link>
    </div>
  )
}
