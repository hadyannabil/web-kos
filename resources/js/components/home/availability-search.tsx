import { router } from '@inertiajs/react';
import { BedDouble, CalendarDays, Search, WalletCards } from 'lucide-react';
import type { FormEvent } from 'react';

export function AvailabilitySearch() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const filters: Record<string, string> = {};

        for (const [key, value] of formData.entries()) {
            if (typeof value === 'string' && value) {
                filters[key] = value;
            }
        }

        router.get('/kamar', filters);
    };

    return (
        <section
            aria-labelledby="availability-title"
            className="relative z-20 mx-auto -mt-8 max-w-[1240px] px-4 sm:px-6 lg:-mt-10"
        >
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#DDE8D8] bg-white p-4 shadow-[0_18px_50px_rgba(47,79,62,0.13)] sm:p-5"
            >
                <h2
                    id="availability-title"
                    className="mb-4 flex items-center gap-3 text-lg font-bold text-[#1F2A24] lg:hidden"
                >
                    <CalendarDays
                        className="size-6 text-[#4F6F52]"
                        aria-hidden="true"
                    />
                    Cek Ketersediaan Kamar
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr_auto] lg:items-center">
                    <SearchField id="type" label="Tipe Kamar" icon={BedDouble}>
                        <option value="">Semua Tipe</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="deluxe">Deluxe</option>
                    </SearchField>
                    <SearchField
                        id="maxPrice"
                        label="Budget per bulan"
                        icon={WalletCards}
                    >
                        <option value="">Semua Budget</option>
                        <option value="1500000">Maks. Rp 1.500.000</option>
                        <option value="2000000">Maks. Rp 2.000.000</option>
                        <option value="2500000">Maks. Rp 2.500.000</option>
                    </SearchField>
                    <SearchField
                        id="duration"
                        label="Durasi Sewa"
                        icon={CalendarDays}
                    >
                        <option value="">Semua Durasi</option>
                        <option value="1">1 Bulan</option>
                        <option value="3">3 Bulan</option>
                        <option value="6">6 Bulan</option>
                        <option value="12">12 Bulan</option>
                    </SearchField>
                    <button
                        type="submit"
                        className="flex min-h-[68px] items-center justify-center gap-2 rounded-xl bg-[#4F6F52] px-7 text-sm font-semibold text-white shadow-md shadow-[#4F6F52]/20 transition hover:bg-[#2F4F3E] sm:col-span-2 lg:col-span-1"
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
            className="flex min-h-[68px] items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-[#4F6F52] focus-within:ring-2 focus-within:ring-[#DDE8D8]"
        >
            <Icon
                className="size-6 shrink-0 text-[#4F6F52]"
                aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-[#5F6B63]">
                    {label}
                </span>
                <select
                    id={id}
                    name={id}
                    className="mt-0.5 w-full cursor-pointer appearance-none bg-transparent pr-4 text-sm font-semibold text-[#1F2A24] outline-none"
                >
                    {children}
                </select>
            </span>
        </label>
    );
}
