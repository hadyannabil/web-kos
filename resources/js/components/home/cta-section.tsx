import { CalendarDays } from 'lucide-react';
import { homeImages } from '@/components/home/home-data';

export function CtaSection() {
    return (
        <section
            id="survey"
            aria-labelledby="survey-title"
            className="scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0759df] to-[#0878ff] text-white shadow-[0_20px_50px_rgba(7,105,241,0.24)]"
        >
            <div className="grid items-center sm:grid-cols-[180px_1fr] lg:grid-cols-[230px_1fr_auto]">
                <img
                    src={homeImages.cta}
                    alt="Placeholder tampak luar KosKita Residence"
                    className="h-48 w-full object-cover sm:h-full sm:min-h-48"
                    loading="lazy"
                />
                <div className="px-5 py-7 sm:px-7">
                    <p className="text-xs font-bold tracking-[0.18em] text-blue-100">
                        JADWALKAN KUNJUNGAN
                    </p>
                    <h2
                        id="survey-title"
                        className="mt-2 text-2xl leading-tight font-bold sm:text-3xl"
                    >
                        Yuk, survey langsung dan rasakan nyamannya!
                    </h2>
                    <p className="mt-2 text-sm text-blue-100">
                        Lihat kamar, fasilitas, dan lingkungan KosKita secara
                        langsung.
                    </p>
                </div>
                <div className="px-5 pb-7 sm:col-start-2 sm:px-7 lg:col-start-auto lg:p-7 lg:pl-0">
                    <a
                        href="https://wa.me/6281234567890?text=Halo%20KosKita%2C%20saya%20ingin%20menjadwalkan%20survey."
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0769f1] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
                    >
                        Jadwalkan Survey
                        <CalendarDays className="size-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}
