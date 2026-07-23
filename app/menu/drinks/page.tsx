import Image from 'next/image'
import type { Metadata } from 'next'
import MenuShell from '@/components/salon/MenuShell'

export const metadata: Metadata = {
  title: 'Drinks Menu | Monaco Nail Bar — Barrie, ON',
  description:
    'Complimentary mocktails and cocktails with every nail service at Monaco Nail Bar. Tropical Sunrise, Cranberry Blue Ocean, Mango Sparkle, and more.',
}

export default function DrinksMenuPage() {
  return (
    <MenuShell title="Drinks Menu" active="drinks">
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
        <Image
          src="/menu-drinks.JPG"
          alt="Monaco Nail Bar drinks menu — complimentary mocktails and cocktails with every nail service"
          width={700}
          height={1050}
          priority
          className="w-full h-auto rounded-sm shadow-2xl"
        />

        <p className="mt-8 text-white/40 text-xs tracking-wide text-center">
          All drinks are complimentary with every service · Monaco Nail Bar · 31 Commerce Park Dr, Barrie ON
        </p>
      </div>
    </MenuShell>
  )
}
