import {
    BedDouble,
    CarFront,
    GraduationCap,
    MapPin,
    ShieldCheck,
    Users,
    Wifi,
} from 'lucide-react';

const items = [
    { icon: Wifi, title: 'WiFi Cepat', detail: 'Hingga 100 Mbps' },
    { icon: CarFront, title: 'Parkir Luas', detail: 'Motor & mobil aman' },
    {
        icon: ShieldCheck,
        title: 'Keamanan 24 Jam',
        detail: 'CCTV & access card',
    },
    { icon: GraduationCap, title: 'Dekat Kampus', detail: 'Lokasi strategis' },
    { icon: BedDouble, title: '45+', detail: 'Kamar tersedia' },
    { icon: Users, title: '320+', detail: 'Penghuni puas' },
    { icon: MapPin, title: '< 2 km', detail: 'Ke kampus terdekat' },
];

export function FeatureStats() {
    return (
        <section aria-label="Keunggulan KosKita Residence">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#DDE8D8] bg-[#DDE8D8] shadow-[0_12px_35px_rgba(47,79,62,0.08)] sm:grid-cols-4 lg:grid-cols-7">
                {items.map(({ icon: Icon, title, detail }, index) => (
                    <div
                        key={title}
                        className={`flex min-h-28 flex-col items-center justify-center bg-white px-3 py-5 text-center ${index === items.length - 1 ? 'col-span-2 sm:col-span-4 lg:col-span-1' : ''}`}
                    >
                        <Icon
                            className="mb-2 size-7 text-[#4F6F52]"
                            aria-hidden="true"
                        />
                        <strong className="text-sm font-bold text-[#1F2A24]">
                            {title}
                        </strong>
                        <span className="mt-1 text-xs text-[#5F6B63]">
                            {detail}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
