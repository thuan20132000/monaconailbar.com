import Link from 'next/link'
import type { Metadata } from 'next'
import MenuShell from '@/components/salon/MenuShell'

export const metadata: Metadata = {
  title: 'Menus | Monaco Nail Bar — Barrie, ON',
  description:
    'Browse Monaco Nail Bar service menus and complimentary drinks menu in Barrie, ON.',
}

const MENUS = [
  {
    href: '/menu/services',
    label: 'Services Menu',
    description: 'Full nail & spa service list with pricing',
  },
  {
    href: '/menu/drinks',
    label: 'Drinks Menu',
    description: 'Complimentary mocktails & cocktails with every service',
  },
] as const

export default function MenuHubPage() {
  return (
    <MenuShell title="Menus">
      <div className="max-w-3xl mx-auto px-4 py-14 flex flex-col gap-5">
        <div className="text-center mb-4">
          <p className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-mauve mb-3">
            Monaco Nail Bar
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-white">
            Choose a Menu
          </h1>
        </div>

        {MENUS.map(menu => (
          <Link
            key={menu.href}
            href={menu.href}
            className="group border border-white/15 hover:border-mauve/60 bg-white/[0.03] hover:bg-mauve/10 px-6 py-7 transition-all duration-200"
          >
            <p className="text-white text-lg font-medium tracking-wide group-hover:text-mauve transition-colors">
              {menu.label}
            </p>
            <p className="mt-1.5 text-sm text-white/45">{menu.description}</p>
            <p className="mt-4 text-xs tracking-wider uppercase text-mauve/80">
              View menu →
            </p>
          </Link>
        ))}
      </div>
    </MenuShell>
  )
}
