import {
    BookOpen,
    CarFront,
    Cctv,
    CookingPot,
    ShowerHead,
    Snowflake,
    WashingMachine,
    Wifi,
} from 'lucide-react';

const facilities = [
    { icon: Wifi, label: 'WiFi Cepat' },
    { icon: Snowflake, label: 'AC' },
    { icon: ShowerHead, label: 'Kamar Mandi Dalam' },
    { icon: CookingPot, label: 'Dapur Bersama' },
    { icon: WashingMachine, label: 'Laundry' },
    { icon: Cctv, label: 'CCTV 24 Jam' },
    { icon: CarFront, label: 'Parkir Luas' },
    { icon: BookOpen, label: 'Area Belajar' },
];

export function Facilities() {
    return (
        <section
            id="fasilitas"
            aria-labelledby="facilities-title"
            className="scroll-mt-24 rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(47,79,62,0.07)] sm:p-6"
        >
            <p className="text-xs font-bold tracking-[0.18em] text-[#4F6F52]">
                SERBA LENGKAP
            </p>
            <h2
                id="facilities-title"
                className="mt-1 text-2xl font-bold text-[#1F2A24]"
            >
                Fasilitas
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {facilities.map(({ icon: Icon, label }) => (
                    <div
                        key={label}
                        className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-[#F3F7F1] p-3 text-center transition hover:bg-[#DDE8D8]/70"
                    >
                        <Icon
                            className="size-8 text-[#4F6F52]"
                            aria-hidden="true"
                        />
                        <span className="mt-3 text-xs leading-4 font-bold text-[#1F2A24]">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
