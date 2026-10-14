import { getSalonWithGoogle } from '@/lib/api'
import SalonContactBanner from '@/components/salon/SalonContactBanner'
import Navigation from '@/components/salon/Navigation'
import HeroSection from '@/components/salon/HeroSection'
import TrustStrip from '@/components/salon/TrustStrip'
import ServicesGrid from '@/components/salon/ServicesGrid'
import WhyChooseUs from '@/components/salon/WhyChooseUs'
import AboutSection from '@/components/salon/AboutSection'
import PoliciesSection from '@/components/salon/PoliciesSection'
import Gallery from '@/components/salon/Gallery'
import ReviewsSection from '@/components/salon/ReviewsSection'
import HoursContact from '@/components/salon/HoursContact'
import BookingCTA from '@/components/salon/BookingCTA'
import GiftCards from '@/components/salon/GiftCards'
import Footer from '@/components/salon/Footer'
import FloatingActionBar from '@/components/salon/FloatingActionBar'

export const revalidate = 300

export default async function Home() {
  const { salon, google } = await getSalonWithGoogle('monaco-nail-bar')
  const { website } = salon

  // Unpublished (website === undefined) means every section shows, as before.
  const show = {
    services: website?.sections.services ?? true,
    gallery: website?.sections.gallery ?? true,
    reviews: (website?.sections.reviews ?? true) && Boolean(google),
    hours: website?.sections.hours ?? true,
  }
  const hiddenHrefs = [
    !show.services && '#services',
    !show.gallery && '#gallery',
    !show.hours && '#hours',
  ].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-cream font-sans pb-20">
      <SalonContactBanner contact={salon.contact} bookingUrl={salon.bookingUrl} />
      {/* {salon.firstVisitOffer && (
        <PromoBanner offer={salon.firstVisitOffer} bookingUrl={salon.bookingUrl} />
      )} */}
      <Navigation
        name={salon.name}
        bookingUrl={salon.bookingUrl}
        showGiftCards={Boolean(salon.giftCards?.length)}
        hiddenHrefs={hiddenHrefs}
      />

      <main>
        {website && (
          <HeroSection
            website={website}
            bookingUrl={salon.bookingUrl}
            name={salon.name}
            logo={salon.logo}
          />
        )}
        <TrustStrip
          firstVisitOffer={salon.firstVisitOffer}
          giftCardsAvailable={Boolean(salon.giftCards?.length)}
        />
        <BookingCTA
          salonName={salon.name}
          giftCardsAvailable={Boolean(salon.giftCards?.length)}
        />
        {salon.giftCards && salon.giftCards.length > 0 && salon.giftCardUrl ? (
          <GiftCards themes={salon.giftCards} giftCardUrl={salon.giftCardUrl} />
        ) : null}
        {show.services && (
          <ServicesGrid
            services={salon.services}
            bookingUrl={salon.bookingUrl}
            bookingWidgetId={salon.bookingWidgetId}
          />
        )}

        {website?.about && <AboutSection title={website.about.title} body={website.about.body} />}
        <WhyChooseUs />
        {show.gallery && <Gallery photos={salon.photos} salonName={salon.name} />}
        {show.reviews && google && <ReviewsSection google={google} />}
        {website?.policies && (
          <PoliciesSection title={website.policies.title} body={website.policies.body} />
        )}
        <HoursContact salon={salon} showHours={show.hours} />
      </main>

      <Footer salon={salon} hiddenHrefs={hiddenHrefs} />
      <FloatingActionBar bookingUrl={salon.bookingUrl} phone={salon.contact.phone} />
    </div>
  )
}
