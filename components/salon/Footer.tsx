import Link from 'next/link'
import type { Salon } from '@/types/salon'

interface Props {
  salon: Salon
}

const QUICK_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'About',    href: '#about' },
  { label: 'Hours',    href: '#hours' },
  { label: 'Contact',  href: '#contact' },
]

export default function Footer({ salon }: Props) {
  const { name, services, contact, bookingUrl } = salon
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-cream text-xl font-semibold mb-3">{name}</p>
            <p className="text-sm leading-relaxed text-cream/45 max-w-[220px]">
              Barrie&apos;s premier destination for luxurious, artful nail care.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-cream text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-cream transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-cream text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 5).map(service => (
                <li key={service.id}>
                  <Link
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-cream transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-cream text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              {contact.instagram && (
                <li>
                  <Link
                    href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-cream transition-colors flex items-center gap-2"
                  >
                    <span aria-hidden>◻</span> Instagram
                  </Link>
                </li>
              )}
              {contact.facebook && (
                <li>
                  <Link
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-cream transition-colors flex items-center gap-2"
                  >
                    <span aria-hidden>◻</span> Facebook
                  </Link>
                </li>
              )}
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm hover:text-cream transition-colors flex items-center gap-2"
                >
                  <span aria-hidden>◻</span> {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/25">
          <p>© {year} {name}. All rights reserved.</p>
          <p>
            Powered by{' '}
            <Link
              href="https://bookngon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/45 hover:text-cream transition-colors"
            >
              Bookngon
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
