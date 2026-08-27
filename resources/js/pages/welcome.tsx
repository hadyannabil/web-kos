import { Head, usePage } from '@inertiajs/react';
import { AvailabilitySearch } from '@/components/home/availability-search';
import { BookingSteps } from '@/components/home/booking-steps';
import { CtaSection } from '@/components/home/cta-section';
import { Facilities } from '@/components/home/facilities';
import { FaqSection } from '@/components/home/faq-section';
import { FeatureStats } from '@/components/home/feature-stats';
import { Footer } from '@/components/home/footer';
import { Hero } from '@/components/home/hero';
import { LocationSection } from '@/components/home/location-section';
import { Navbar } from '@/components/home/navbar';
import { RoomSection } from '@/components/home/room-section';
import { Testimonials } from '@/components/home/testimonials';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth, currentTeam } = usePage().props;
    const accountUrl = auth.user
        ? currentTeam
            ? dashboard(currentTeam.slug).url
            : '/'
        : login().url;

    return (
        <>
            <Head title="Kos Nyaman di Yogyakarta">
                <meta
                    name="description"
                    content="KosKita Residence menyediakan kamar kos yang nyaman, aman, dan strategis untuk mahasiswa dan pekerja di Yogyakarta."
                />
            </Head>
            <div className="min-h-screen overflow-x-clip bg-[#f8fbff] text-[#102b63] [color-scheme:light]">
                <Navbar
                    isAuthenticated={Boolean(auth.user)}
                    accountUrl={accountUrl}
                />
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

                <Footer />
            </div>
        </>
    );
}
