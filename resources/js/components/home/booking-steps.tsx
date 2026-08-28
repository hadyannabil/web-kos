import { ArrowRight, BedDouble, CalendarCheck, CreditCard } from 'lucide-react';

const steps = [
    {
        icon: BedDouble,
        title: 'Pilih Kamar',
        description: 'Tentukan tipe kamar yang sesuai kebutuhanmu.',
    },
    {
        icon: CalendarCheck,
        title: 'Isi Data & Jadwal Survey',
        description: 'Lengkapi data diri dan pilih waktu kunjungan.',
    },
    {
        icon: CreditCard,
        title: 'Bayar DP / Konfirmasi',
        description: 'Amankan kamar pilihanmu dengan konfirmasi booking.',
    },
];

export function BookingSteps() {
    return (
        <section
            aria-labelledby="booking-title"
            className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(47,79,62,0.07)] sm:p-6"
        >
            <h2
                id="booking-title"
                className="text-2xl font-bold text-[#1F2A24]"
            >
                Cara Booking
            </h2>
            <ol className="mt-5 grid gap-3 md:grid-cols-3">
                {steps.map(({ icon: Icon, title, description }, index) => (
                    <li
                        key={title}
                        className="relative flex gap-3 rounded-2xl bg-[#F3F7F1] p-4"
                    >
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#4F6F52] text-sm font-bold text-white">
                            {index + 1}
                        </span>
                        <span className="min-w-0">
                            <Icon
                                className="mb-3 size-7 text-[#4F6F52]"
                                aria-hidden="true"
                            />
                            <strong className="block text-sm font-bold text-[#1F2A24]">
                                {title}
                            </strong>
                            <span className="mt-1 block text-xs leading-5 text-[#5F6B63]">
                                {description}
                            </span>
                        </span>
                        {index < steps.length - 1 && (
                            <ArrowRight
                                className="absolute top-1/2 -right-5 z-10 hidden size-5 -translate-y-1/2 text-[#DDE8D8] md:block"
                                aria-hidden="true"
                            />
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
