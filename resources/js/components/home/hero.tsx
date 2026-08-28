import { ArrowRight, MessageCircle } from 'lucide-react';
import { homeImages } from '@/components/home/home-data';

export function Hero() {
    return (
        <section
            id="beranda"
            className="scroll-mt-20 overflow-hidden bg-[#F3F7F1]"
        >
            <div className="mx-auto grid min-h-[520px] max-w-[1600px] md:grid-cols-[0.88fr_1.12fr]">
                <div className="relative z-10 flex items-center px-5 py-14 sm:px-8 md:py-16 md:pr-4 lg:pl-12 xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
                    <div className="max-w-[640px]">
                        <p className="mb-4 text-xs font-bold tracking-[0.24em] text-[#4F6F52] sm:text-sm">
                            KOSKITA RESIDENCE
                        </p>
                        <h1 className="max-w-[620px] text-[clamp(2.25rem,4vw,4.35rem)] leading-[1.08] font-bold tracking-[-0.04em] text-[#1F2A24]">
                            Kos nyaman, aman, dan strategis untuk mahasiswa
                            &amp; pekerja
                        </h1>
                        <p className="mt-6 max-w-[540px] text-base leading-7 text-[#5F6B63] sm:text-lg">
                            Lingkungan tenang, fasilitas lengkap, dan lokasi
                            terbaik yang mendukung produktivitasmu setiap hari.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#kamar"
                                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#4F6F52] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4F6F52]/20 transition hover:-translate-y-0.5 hover:bg-[#2F4F3E]"
                            >
                                Lihat Kamar
                                <ArrowRight
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            </a>
                            <a
                                href="https://wa.me/6281234567890?text=Halo%20KosKita%2C%20saya%20ingin%20bertanya%20tentang%20kamar."
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#4F6F52] bg-white/80 px-6 py-3 text-sm font-semibold text-[#4F6F52] transition hover:bg-[#F3F7F1]"
                            >
                                <MessageCircle
                                    className="size-5"
                                    aria-hidden="true"
                                />
                                Hubungi Kami
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[320px] md:min-h-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#F3F7F1] via-transparent to-transparent md:bg-gradient-to-r md:from-[#F3F7F1] md:via-[#F3F7F1]/20 md:to-transparent" />
                    <img
                        src={homeImages.hero}
                        alt="Placeholder foto bangunan KosKita Residence"
                        className="absolute inset-0 h-full w-full object-cover"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#F3F7F1]/80 to-transparent md:hidden" />
                </div>
            </div>
        </section>
    );
}
