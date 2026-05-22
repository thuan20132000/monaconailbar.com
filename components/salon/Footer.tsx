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
    <footer className="bg-ink text-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-white text-xl font-semibold mb-3">{name}</p>
            <p className="text-sm leading-relaxed text-white/45 max-w-[220px]">
              Barrie&apos;s premier destination for luxurious, artful nail care.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
              Navigate
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.slice(0, 5).map(service => (
                <li key={service.id}>
                  <Link
                    href={bookingUrl}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white text-[0.65rem] font-bold tracking-[0.18em] uppercase mb-5">
              Connect
            </h3>
            <ul className="space-y-3">
              {contact.instagram && (
                <li>
                  <Link
                    href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-2.5 group"
                  >
                    {/* Instagram logo */}
                    <svg
                      aria-hidden
                      className="w-4 h-4 shrink-0 text-white/50 group-hover:text-blush transition-colors duration-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                    Instagram
                  </Link>
                </li>
              )}
              {contact.facebook && (
                <li>
                  <Link
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors flex items-center gap-2.5 group"
                  >
                    {/* Facebook logo */}
                    <svg
                      aria-hidden
                      className="w-4 h-4 shrink-0 text-white/50 group-hover:text-blush transition-colors duration-200"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                    Facebook
                  </Link>
                </li>
              )}
              <li>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm hover:text-white transition-colors flex items-center gap-2.5 group"
                >
                  <svg
                    aria-hidden
                    className="w-4 h-4 shrink-0 text-white/50 group-hover:text-blush transition-colors duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© {year} {name}. All rights reserved.</p>
          <p>
            Powered by{' '}
            <Link
              href="https://bookngon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 hover:text-white transition-colors"
            >
              Bookngon
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
