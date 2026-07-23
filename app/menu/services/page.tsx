import Image from 'next/image'
import type { Metadata } from 'next'
import MenuShell from '@/components/salon/MenuShell'

export const metadata: Metadata = {
  title: 'Services Menu | Monaco Nail Bar — Barrie, ON',
  description:
    'Full services menu for Monaco Nail Bar in Barrie — BIAB, gel, extensions, nail art, pedicures, and more.',
}

const SERVICE_PAGES = [
  '/services-menu/page-01.JPG',
  '/services-menu/page-02.JPG',
  '/services-menu/page-03.JPG',
  '/services-menu/page-04.JPG',
  '/services-menu/page-05.JPG',
  '/services-menu/page-06.JPG',
  '/services-menu/page-07.JPG',
] as const

export default function ServicesMenuPage() {
  return (
    <MenuShell title="Services Menu" active="services">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-6">
        {SERVICE_PAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`Monaco Nail Bar services menu — page ${i + 1} of ${SERVICE_PAGES.length}`}
            width={845}
            height={1200}
            priority={i === 0}
            className="w-full h-auto rounded-sm shadow-2xl"
          />
        ))}

        <p className="mt-4 text-white/40 text-xs tracking-wide text-center">
          Prices subject to change · Monaco Nail Bar · 31 Commerce Park Dr, Barrie ON
        </p>
      </div>
    </MenuShell>
  )
}
