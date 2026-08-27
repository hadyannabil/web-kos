import { BedDouble, CalendarDays, Search, WalletCards } from 'lucide-react';
import type { FormEvent } from 'react';

export function AvailabilitySearch() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        document
            .getElementById('kamar')
            ?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            aria-labelledby="availability-title"
            className="relative z-20 mx-auto -mt-8 max-w-[1240px] px-4 sm:px-6 lg:-mt-10"
        >
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_18px_50px_rgba(21,74,145,0.13)] sm:p-5"
            >
                <h2
                    id="availability-title"
                    className="mb-4 flex items-center gap-3 text-lg font-bold text-[#09245f] lg:hidden"
                >
                    <CalendarDays
                        className="size-6 text-[#0769f1]"
                        aria-hidden="true"
                    />
                    Cek Ketersediaan Kamar
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr_auto] lg:items-center">
                    <SearchField
                        id="room-type"
                        label="Tipe Kamar"
                        icon={BedDouble}
                    >
                        <option>Semua Tipe</option>
                        <option>Standard</option>
                        <option>Premium</option>
                        <option>Deluxe</option>
                    </SearchField>
                    <SearchField
                        id="budget"
                        label="Budget per bulan"
                        icon={WalletCards}
                    >
                        <option>Rp 1.000.000 - Rp 3.000.000</option>
                        <option>Di bawah Rp 1.500.000</option>
                        <option>Rp 1.500.000 - Rp 2.000.000</option>
                        <option>Di atas Rp 2.000.000</option>
                    </SearchField>
                    <SearchField
                        id="duration"
                        label="Durasi Sewa"
                        icon={CalendarDays}
                    >
                        <option>Minimal 3 Bulan</option>
                        <option>6 Bulan</option>
                        <option>12 Bulan</option>
                    </SearchField>
                    <button
                        type="submit"
                        className="flex min-h-[68px] items-center justify-center gap-2 rounded-xl bg-[#0769f1] px-7 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-[#005bd6] sm:col-span-2 lg:col-span-1"
                    >
                        <Search className="size-5" aria-hidden="true" />
                        Cek Ketersediaan
                    </button>
                </div>
            </form>
        </section>
    );
}

type SearchFieldProps = {
    id: string;
    label: string;
    icon: typeof BedDouble;
    children: React.ReactNode;
};

function SearchField({ id, label, icon: Icon, children }: SearchFieldProps) {
    return (
        <label
            htmlFor={id}
            className="flex min-h-[68px] items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100"
        >
            <Icon
                className="size-6 shrink-0 text-[#0769f1]"
                aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[#61708e]">
                    {label}
                </span>
                <select
                    id={id}
                    name={id}
                    className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-4 text-sm font-semibold text-[#102b63] outline-none"
                >
                    {children}
                </select>
            </span>
        </label>
    );
}
