import {
    BusFront,
    ExternalLink,
    MapPin,
    Navigation,
    ShoppingBasket,
} from 'lucide-react';

const locationPoints = [
    { icon: Navigation, text: '2 menit ke Kampus UPN' },
    { icon: ShoppingBasket, text: '5 menit ke minimarket' },
    { icon: BusFront, text: 'Dekat halte & angkutan umum' },
    { icon: MapPin, text: 'Jl. Merdeka No. 123, Sleman, Yogyakarta 55281' },
];

export function LocationSection() {
    return (
        <section
            id="lokasi"
            aria-labelledby="location-title"
            className="scroll-mt-24 rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(47,79,62,0.07)] sm:p-6"
        >
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold tracking-[0.18em] text-[#4F6F52]">
                        SEMUA DEKAT
                    </p>
                    <h2
                        id="location-title"
                        className="mt-1 text-2xl font-bold text-[#1F2A24]"
                    >
                        Lokasi Strategis
                    </h2>
                </div>
                <a
                    href="https://maps.google.com/?q=Sleman,Yogyakarta"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden items-center gap-1.5 text-xs font-bold text-[#4F6F52] hover:underline sm:inline-flex"
                >
                    Google Maps
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
                <ul className="space-y-3">
                    {locationPoints.map(({ icon: Icon, text }) => (
                        <li
                            key={text}
                            className="flex gap-3 text-sm leading-5 text-[#5F6B63]"
                        >
                            <Icon
                                className="mt-0.5 size-4 shrink-0 text-[#4F6F52]"
                                aria-hidden="true"
                            />
                            {text}
                        </li>
                    ))}
                </ul>

                <div
                    className="relative min-h-56 overflow-hidden rounded-2xl border border-[#DDE8D8] bg-[#F3F7F1]"
                    role="img"
                    aria-label="Placeholder peta lokasi KosKita Residence di Sleman, Yogyakarta"
                >
                    <div className="absolute inset-0 [background-image:linear-gradient(32deg,transparent_45%,#DDE8D8_46%,#DDE8D8_48%,transparent_49%),linear-gradient(118deg,transparent_44%,#DDE8D8_45%,#DDE8D8_48%,transparent_49%)] [background-size:82px_82px,110px_110px] opacity-70" />
                    <div className="absolute top-[28%] left-[18%] h-3 w-28 rotate-12 rounded-full bg-white shadow-sm" />
                    <div className="absolute right-[14%] bottom-[24%] h-3 w-36 -rotate-12 rounded-full bg-white shadow-sm" />
                    <div className="absolute inset-0 grid place-items-center">
                        <div className="flex flex-col items-center">
                            <span className="grid size-12 place-items-center rounded-full bg-[#4F6F52] text-white shadow-lg shadow-[#4F6F52]/30">
                                <MapPin className="size-6" aria-hidden="true" />
                            </span>
                            <span className="mt-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#1F2A24] shadow-md">
                                KosKita Residence
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
