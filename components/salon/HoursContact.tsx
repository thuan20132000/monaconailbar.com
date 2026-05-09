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

  return (
    <section id="hours">
      {/* Full-bleed split — each panel carries its own background */}
      <div className="grid md:grid-cols-2">

        {/* ── Hours (light panel) ── */}
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

        {/* ── Contact (accent panel) ── */}
        <div id="contact" className="bg-mauve text-white py-16 md:py-20">
          <div className="max-w-md mr-auto px-4 sm:px-8 md:pl-14 lg:pl-20">
            <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-white/60 mb-3">
              Contact & Location
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light mb-8">
              Come Find Us
            </h2>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="mt-0.5 text-white/70 text-lg flex-shrink-0">◎</span>
                <div>
                  <p className="font-medium">{contact.address.street}</p>
                  <p className="text-sm text-white/65 mt-0.5">
                    {contact.address.city}, {contact.address.province}{' '}
                    {contact.address.postalCode}
                  </p>
                  <Link
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline underline-offset-2 text-white/60 hover:text-white mt-1.5 inline-block transition-colors"
                  >
                    Get Directions →
                  </Link>
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

            {/* Social links */}
            {(contact.instagram || contact.facebook) && (
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
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
