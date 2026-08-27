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
            className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_12px_35px_rgba(28,73,133,0.07)] sm:p-6"
        >
            <p className="text-xs font-bold tracking-[0.18em] text-[#0769f1]">
                SERBA LENGKAP
            </p>
            <h2
                id="facilities-title"
                className="mt-1 text-2xl font-bold text-[#09245f]"
            >
                Fasilitas
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {facilities.map(({ icon: Icon, label }) => (
                    <div
                        key={label}
                        className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-[#f3f8ff] p-3 text-center transition hover:bg-blue-100/70"
                    >
                        <Icon
                            className="size-8 text-[#0769f1]"
                            aria-hidden="true"
                        />
                        <span className="mt-3 text-xs leading-4 font-bold text-[#15316b]">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
