import Link from 'next/link'
import type { Salon } from '@/types/salon'

interface Props {
  salon: Salon
}

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default function HoursContact({ salon }: Props) {
  const { hours, contact } = salon
  const todayName = DAYS[new Date().getDay()]

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${contact.address.street}, ${contact.address.city}, ${contact.address.province}`
  )}`

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${contact.address.street}, ${contact.address.city}, ${contact.address.province} ${contact.address.postalCode}`
  )}&output=embed&z=15`

  return (
    <section id="hours">
      {/* ── Row 1: Hours / Contact split ── */}
      <div className="grid md:grid-cols-2">

        {/* Hours (light panel) */}
        <div className="bg-cream-200 py-16 md:py-20">
          <div className="max-w-md ml-auto px-4 sm:px-8 md:pr-14 lg:pr-20">
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
              Opening Hours
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-charcoal mb-8">
              We&apos;re Open for You
            </h2>

            <table className="w-full">
              <tbody>
                {hours.map(({ day, hours: h, closed }) => {
                  const isToday = day === todayName
                  return (
                    <tr
                      key={day}
                      className={`border-b border-charcoal/10 last:border-0 ${
                        isToday ? 'text-mauve' : 'text-charcoal/65'
                      }`}
                    >
                      <td className="py-3 text-sm font-medium">
                        {day}
                        {isToday && (
                          <span className="ml-2 text-[0.6rem] bg-mauve/12 text-mauve px-2 py-0.5 rounded-full font-bold tracking-wide">
                            TODAY
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-sm text-right">
                        {closed
                          ? <span className="text-charcoal/30 italic">Closed</span>
                          : h}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact (accent panel) */}
        <div id="contact" className="bg-mauve text-white py-16 md:py-20">
          <div className="max-w-md mr-auto px-4 sm:px-8 md:pl-14 lg:pl-20">
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-white/60 mb-3">
              Contact & Location
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light mb-6">
              Come Find Us
            </h2>

            {/* Embedded map */}
            <div className="relative w-full h-44 mb-7 overflow-hidden rounded-sm ring-1 ring-white/20">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${salon.name} location`}
                className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
              <Link
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5 bg-ink/85 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide px-3 py-1.5 hover:bg-ink transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-blush" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get Directions
              </Link>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="mt-0.5 text-white/70 text-lg flex-shrink-0">◎</span>
                <div>
                  <p className="font-medium">{contact.address.street}</p>
                  <p className="text-sm text-white/65 mt-0.5">
                    {contact.address.city}, {contact.address.province}{' '}
                    {contact.address.postalCode}
                  </p>
                </div>
              </li>

              <li className="flex gap-4 items-center">
                <span className="text-white/70 text-lg flex-shrink-0">☏</span>
                <a
                  href={`tel:${contact.phone}`}
                  className="font-medium hover:text-white/80 transition-colors"
                >
                  {contact.phone}
                </a>
              </li>

              <li className="flex gap-4 items-center">
                <span className="text-white/70 text-lg flex-shrink-0">✉</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-medium hover:text-white/80 transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>

            {(contact.instagram || contact.facebook || contact.tiktok) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {contact.instagram && (
                  <Link
                    href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    Instagram
                  </Link>
                )}
                {contact.facebook && (
                  <Link
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    Facebook
                  </Link>
                )}
                {contact.tiktok && (
                  <Link
                    href={contact.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium border border-white/30 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    TikTok
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
