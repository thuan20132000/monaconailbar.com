import { getSalon } from '@/lib/api'
import SalonContactBanner from '@/components/salon/SalonContactBanner'
import Navigation from '@/components/salon/Navigation'
import HeroSection from '@/components/salon/HeroSection'
import TrustStrip from '@/components/salon/TrustStrip'
import ServicesGrid from '@/components/salon/ServicesGrid'
import WhyChooseUs from '@/components/salon/WhyChooseUs'
import Gallery from '@/components/salon/Gallery'
import HoursContact from '@/components/salon/HoursContact'
import BookingCTA from '@/components/salon/BookingCTA'
import Footer from '@/components/salon/Footer'
import FloatingBookButton from '@/components/salon/FloatingBookButton'

export const revalidate = 3600

export default async function Home() {
  const salon = await getSalon('monaco-nail-bar')

  return (
    <div className="min-h-screen bg-cream font-sans">
      <SalonContactBanner contact={salon.contact} bookingUrl={salon.bookingUrl} />
      {/* {salon.firstVisitOffer && (
        <PromoBanner offer={salon.firstVisitOffer} bookingUrl={salon.bookingUrl} />
      )} */}
      <Navigation name={salon.name} bookingUrl={salon.bookingUrl} />

      <main>
        <HeroSection salon={salon} />
        <TrustStrip firstVisitOffer={salon.firstVisitOffer} />
        <BookingCTA salonName={salon.name} />
        <ServicesGrid
          services={salon.services}
          bookingUrl={salon.bookingUrl}
          bookingWidgetId={salon.bookingWidgetId}
        />
        <WhyChooseUs />
        <Gallery photos={salon.photos} salonName={salon.name} />
        <HoursContact salon={salon} />
      </main>

      <Footer salon={salon} />
      {/* <FloatingBookButton bookingUrl={salon.bookingUrl} /> */}
    </div>
  )
}
