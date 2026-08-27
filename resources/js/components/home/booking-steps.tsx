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
            className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_12px_35px_rgba(28,73,133,0.07)] sm:p-6"
        >
            <h2
                id="booking-title"
                className="text-2xl font-bold text-[#09245f]"
            >
                Cara Booking
            </h2>
            <ol className="mt-5 grid gap-3 md:grid-cols-3">
                {steps.map(({ icon: Icon, title, description }, index) => (
                    <li
                        key={title}
                        className="relative flex gap-3 rounded-2xl bg-[#f7faff] p-4"
                    >
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0769f1] text-sm font-bold text-white">
                            {index + 1}
                        </span>
                        <span className="min-w-0">
                            <Icon
                                className="mb-3 size-7 text-[#0769f1]"
                                aria-hidden="true"
                            />
                            <strong className="block text-sm font-bold text-[#0a2864]">
                                {title}
                            </strong>
                            <span className="mt-1 block text-xs leading-5 text-[#6d7b96]">
                                {description}
                            </span>
                        </span>
                        {index < steps.length - 1 && (
                            <ArrowRight
                                className="absolute top-1/2 -right-5 z-10 hidden size-5 -translate-y-1/2 text-blue-300 md:block"
                                aria-hidden="true"
                            />
                        )}
                    </li>
                ))}
            </ol>
        </section>
    );
}
