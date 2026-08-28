import { Head } from '@inertiajs/react';
import { AvailabilitySearch } from '@/components/home/availability-search';
import { BookingSteps } from '@/components/home/booking-steps';
import { CtaSection } from '@/components/home/cta-section';
import { Facilities } from '@/components/home/facilities';
import { FaqSection } from '@/components/home/faq-section';
import { FeatureStats } from '@/components/home/feature-stats';
import { Hero } from '@/components/home/hero';
import { LocationSection } from '@/components/home/location-section';
import { RoomSection } from '@/components/home/room-section';
import { Testimonials } from '@/components/home/testimonials';

export default function Welcome() {
    return (
        <>
            <Head title="Kos Nyaman di Yogyakarta">
                <meta
                    name="description"
                    content="KosKita Residence menyediakan kamar kos yang nyaman, aman, dan strategis untuk mahasiswa dan pekerja di Yogyakarta."
                />
            </Head>
            <Hero />
            <AvailabilitySearch />

            <main className="mx-auto max-w-[1440px] space-y-5 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
                <FeatureStats />
                <div className="grid items-start gap-5 lg:grid-cols-2">
                    <RoomSection />
                    <Facilities />
                    <BookingSteps />
                    <LocationSection />
                    <Testimonials />
                    <FaqSection />
                </div>
                <CtaSection />
            </main>
        </>
    );
}
