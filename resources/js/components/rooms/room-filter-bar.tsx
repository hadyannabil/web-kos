import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { roomFacilities } from '@/data/rooms';
import type { RoomFilters, RoomStatus, RoomType } from '@/data/rooms';

type RoomFilterBarProps = {
    filters: RoomFilters;
    onApply: (filters: RoomFilters) => void;
    onReset: () => void;
};

type FilterDraft = {
    type: RoomType | '';
    maxPrice: string;
    duration: string;
    status: RoomStatus | 'all';
    facility: string;
};

function toDraft(filters: RoomFilters): FilterDraft {
    return {
        type: filters.type ?? '',
        maxPrice: filters.maxPrice ? String(filters.maxPrice) : '',
        duration: filters.duration ? String(filters.duration) : '',
        status: filters.status,
        facility: filters.facility ?? '',
    };
}

export function RoomFilterBar({
    filters,
    onApply,
    onReset,
}: RoomFilterBarProps) {
    const [draft, setDraft] = useState<FilterDraft>(() => toDraft(filters));

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onApply({
            type: draft.type || undefined,
            maxPrice: draft.maxPrice ? Number(draft.maxPrice) : undefined,
            duration: draft.duration ? Number(draft.duration) : undefined,
            status: draft.status,
            facility: draft.facility || undefined,
            sort: filters.sort,
        });
    };

    const handleReset = () => {
        setDraft(toDraft({ status: 'available', sort: 'price-asc' }));
        onReset();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_16px_45px_rgba(47,79,62,0.09)] sm:p-6"
        >
            <div className="mb-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-[#F3F7F1] text-[#4F6F52]">
                    <SlidersHorizontal className="size-5" aria-hidden="true" />
                </span>
                <div>
                    <h2 className="font-bold text-[#1F2A24]">Filter Kamar</h2>
                    <p className="text-xs text-[#5F6B63]">
                        Sesuaikan hasil dengan kebutuhanmu.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <FilterSelect
                    id="filter-type"
                    label="Tipe kamar"
                    value={draft.type}
                    onChange={(value) =>
                        setDraft((current) => ({
                            ...current,
                            type: value as RoomType | '',
                        }))
                    }
                >
                    <option value="">Semua tipe</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="deluxe">Deluxe</option>
                </FilterSelect>
                <FilterSelect
                    id="filter-budget"
                    label="Budget maksimum"
                    value={draft.maxPrice}
                    onChange={(value) =>
                        setDraft((current) => ({
                            ...current,
                            maxPrice: value,
                        }))
                    }
                >
                    <option value="">Semua budget</option>
                    <option value="1500000">Rp 1.500.000</option>
                    <option value="2000000">Rp 2.000.000</option>
                    <option value="2500000">Rp 2.500.000</option>
                </FilterSelect>
                <FilterSelect
                    id="filter-duration"
                    label="Durasi sewa"
                    value={draft.duration}
                    onChange={(value) =>
                        setDraft((current) => ({
                            ...current,
                            duration: value,
                        }))
                    }
                >
                    <option value="">Semua durasi</option>
                    <option value="1">1 bulan</option>
                    <option value="3">3 bulan</option>
                    <option value="6">6 bulan</option>
                    <option value="12">12 bulan</option>
                </FilterSelect>
                <FilterSelect
                    id="filter-status"
                    label="Status"
                    value={draft.status}
                    onChange={(value) =>
                        setDraft((current) => ({
                            ...current,
                            status: value as RoomStatus | 'all',
                        }))
                    }
                >
                    <option value="available">Tersedia</option>
                    <option value="all">Semua status</option>
                </FilterSelect>
                <FilterSelect
                    id="filter-facility"
                    label="Fasilitas"
                    value={draft.facility}
                    onChange={(value) =>
                        setDraft((current) => ({
                            ...current,
                            facility: value,
                        }))
                    }
                >
                    <option value="">Semua fasilitas</option>
                    {roomFacilities.map((facility) => (
                        <option key={facility} value={facility}>
                            {facility}
                        </option>
                    ))}
                </FilterSelect>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DDE8D8] px-5 text-sm font-bold text-[#2F4F3E] transition hover:border-[#4F6F52] hover:bg-[#F3F7F1]"
                >
                    <RotateCcw className="size-4" aria-hidden="true" />
                    Reset Filter
                </button>
                <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white shadow-md shadow-[#4F6F52]/20 transition hover:bg-[#2F4F3E]"
                >
                    <Search className="size-4" aria-hidden="true" />
                    Terapkan Filter
                </button>
            </div>
        </form>
    );
}

type FilterSelectProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    children: React.ReactNode;
};

function FilterSelect({
    id,
    label,
    value,
    onChange,
    children,
}: FilterSelectProps) {
    return (
        <label htmlFor={id} className="block">
            <span className="mb-2 block text-xs font-bold text-[#5F6B63]">
                {label}
            </span>
            <select
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#1F2A24] transition outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#DDE8D8]"
            >
                {children}
            </select>
        </label>
    );
}
