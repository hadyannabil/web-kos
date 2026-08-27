import { ArrowRight, MessageCircle } from 'lucide-react';
import { homeImages } from '@/components/home/home-data';

export function Hero() {
    return (
        <section
            id="beranda"
            className="scroll-mt-20 overflow-hidden bg-[#eef6ff]"
        >
            <div className="mx-auto grid min-h-[520px] max-w-[1600px] md:grid-cols-[0.88fr_1.12fr]">
                <div className="relative z-10 flex items-center px-5 py-14 sm:px-8 md:py-16 md:pr-4 lg:pl-12 xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
                    <div className="max-w-[640px]">
                        <p className="mb-4 text-xs font-bold tracking-[0.24em] text-[#0769f1] sm:text-sm">
                            KOSKITA RESIDENCE
                        </p>
                        <h1 className="max-w-[620px] text-[clamp(2.25rem,4vw,4.35rem)] leading-[1.08] font-bold tracking-[-0.04em] text-[#08255f]">
                            Kos nyaman, aman, dan strategis untuk mahasiswa
                            &amp; pekerja
                        </h1>
                        <p className="mt-6 max-w-[540px] text-base leading-7 text-[#506384] sm:text-lg">
                            Lingkungan tenang, fasilitas lengkap, dan lokasi
                            terbaik yang mendukung produktivitasmu setiap hari.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="#kamar"
                                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#0769f1] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#005bd6]"
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
                                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#0769f1] bg-white/80 px-6 py-3 text-sm font-semibold text-[#0769f1] transition hover:bg-blue-50"
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
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#eef6ff] via-transparent to-transparent md:bg-gradient-to-r md:from-[#eef6ff] md:via-[#eef6ff]/20 md:to-transparent" />
                    <img
                        src={homeImages.hero}
                        alt="Placeholder foto bangunan KosKita Residence"
                        className="absolute inset-0 h-full w-full object-cover"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#eef6ff]/80 to-transparent md:hidden" />
                </div>
            </div>
        </section>
    );
}
