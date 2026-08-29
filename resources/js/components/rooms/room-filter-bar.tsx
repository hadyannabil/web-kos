import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { formatRupiah, roomFacilities, roomTypeLabels } from '@/data/rooms';
import type { RoomFilters, RoomSort, RoomType } from '@/data/rooms';

type RoomFilterBarProps = {
    filters: RoomFilters;
    onApply: (filters: RoomFilters) => void;
};

type FilterDraft = {
    type: RoomType | '';
    maxPrice: string;
    duration: string;
    facility: string;
    sort: RoomSort;
};

type ClearableFilter = 'type' | 'maxPrice' | 'duration' | 'facility';

function toDraft(filters: RoomFilters): FilterDraft {
    return {
        type: filters.type ?? '',
        maxPrice: filters.maxPrice ? String(filters.maxPrice) : '',
        duration: filters.duration ? String(filters.duration) : '',
        facility: filters.facility ?? '',
        sort: filters.sort,
    };
}

export function RoomFilterBar({ filters, onApply }: RoomFilterBarProps) {
    const [draft, setDraft] = useState<FilterDraft>(() => toDraft(filters));

    const buildFilters = (nextDraft: FilterDraft): RoomFilters => ({
        type: nextDraft.type || undefined,
        maxPrice: nextDraft.maxPrice ? Number(nextDraft.maxPrice) : undefined,
        duration: nextDraft.duration ? Number(nextDraft.duration) : undefined,
        status: filters.status,
        facility: nextDraft.facility || undefined,
        sort: nextDraft.sort,
    });

    const updateAndApply = (
        field: keyof FilterDraft,
        value: FilterDraft[keyof FilterDraft],
    ) => {
        const nextDraft = { ...draft, [field]: value };

        setDraft(nextDraft);
        onApply(buildFilters(nextDraft));
    };

    const removeFilter = (field: ClearableFilter) => {
        const nextDraft = { ...draft, [field]: '' };

        setDraft(nextDraft);
        onApply(buildFilters(nextDraft));
    };

    const activeFilters: Array<{
        key: ClearableFilter;
        label: string;
    }> = [];

    if (filters.type) {
        activeFilters.push({
            key: 'type',
            label: roomTypeLabels[filters.type],
        });
    }

    if (filters.maxPrice) {
        activeFilters.push({
            key: 'maxPrice',
            label: `≤ ${formatRupiah(filters.maxPrice)}`,
        });
    }

    if (filters.duration) {
        activeFilters.push({
            key: 'duration',
            label: `${filters.duration} bulan`,
        });
    }

    if (filters.facility) {
        activeFilters.push({
            key: 'facility',
            label: filters.facility,
        });
    }

    return (
        <div>
            <div className="grid gap-2 rounded-2xl border border-[#DDE8D8] bg-white p-2.5 shadow-[0_8px_24px_rgba(47,79,62,0.07)] sm:grid-cols-2 xl:flex xl:items-center">
                <CompactSelect
                    label="Tipe kamar"
                    value={draft.type}
                    onChange={(value) =>
                        updateAndApply('type', value as RoomType | '')
                    }
                >
                    <option value="">Tipe Kamar</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="deluxe">Deluxe</option>
                </CompactSelect>
                <CompactSelect
                    label="Budget maksimum"
                    value={draft.maxPrice}
                    onChange={(value) => updateAndApply('maxPrice', value)}
                >
                    <option value="">Budget</option>
                    <option value="1500000">≤ Rp 1.500.000</option>
                    <option value="2000000">≤ Rp 2.000.000</option>
                    <option value="2500000">≤ Rp 2.500.000</option>
                </CompactSelect>
                <CompactSelect
                    label="Durasi sewa"
                    value={draft.duration}
                    onChange={(value) => updateAndApply('duration', value)}
                >
                    <option value="">Durasi</option>
                    <option value="1">1 bulan</option>
                    <option value="3">3 bulan</option>
                    <option value="6">6 bulan</option>
                    <option value="12">12 bulan</option>
                </CompactSelect>
                <CompactSelect
                    label="Fasilitas"
                    value={draft.facility}
                    onChange={(value) => updateAndApply('facility', value)}
                >
                    <option value="">Fasilitas</option>
                    {roomFacilities.map((facility) => (
                        <option key={facility} value={facility}>
                            {facility}
                        </option>
                    ))}
                </CompactSelect>
                <CompactSelect
                    label="Urutkan hasil"
                    value={draft.sort}
                    onChange={(value) =>
                        updateAndApply('sort', value as RoomSort)
                    }
                    className="hidden xl:ml-auto xl:block"
                >
                    <option value="price-asc">Urutkan: Harga Terendah</option>
                    <option value="price-desc">Urutkan: Harga Tertinggi</option>
                    <option value="room-number">Urutkan: Nomor Kamar</option>
                </CompactSelect>
            </div>

            {activeFilters.length > 0 && (
                <div
                    className="mt-2 flex flex-wrap gap-2"
                    aria-label="Filter aktif"
                >
                    {activeFilters.map((filter) => (
                        <button
                            key={filter.key}
                            type="button"
                            onClick={() => removeFilter(filter.key)}
                            aria-label={`Hapus filter ${filter.label}`}
                            className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-[#DDE8D8] px-3 text-xs font-bold text-[#2F4F3E] transition hover:bg-[#cbdcc5]"
                        >
                            {filter.label}
                            <X className="size-3.5" aria-hidden="true" />
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-2 flex items-center justify-between gap-3 xl:hidden">
                <span className="shrink-0 text-sm font-semibold text-[#2F4F3E]">
                    Urutkan
                </span>
                <CompactSelect
                    label="Urutkan hasil"
                    value={draft.sort}
                    onChange={(value) =>
                        updateAndApply('sort', value as RoomSort)
                    }
                    className="shrink-0"
                    compact
                >
                    <option value="price-asc">Harga Terendah</option>
                    <option value="price-desc">Harga Tertinggi</option>
                    <option value="room-number">Nomor Kamar</option>
                </CompactSelect>
            </div>
        </div>
    );
}

type CompactSelectProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    compact?: boolean;
    children: React.ReactNode;
};

function CompactSelect({
    label,
    value,
    onChange,
    className,
    compact = false,
    children,
}: CompactSelectProps) {
    return (
        <label
            className={`relative block min-w-0 xl:shrink-0 ${className ?? ''}`}
        >
            <span className="sr-only">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label={label}
                className={`min-h-11 min-w-0 cursor-pointer appearance-none rounded-xl border border-[#DDE8D8] bg-white py-2 pr-9 pl-4 text-sm font-bold text-[#2F4F3E] transition outline-none hover:border-[#4F6F52] focus:border-[#4F6F52] focus:ring-2 focus:ring-[#DDE8D8] xl:w-auto xl:max-w-56 xl:rounded-full ${compact ? 'w-[160px]' : 'w-full'}`}
            >
                {children}
            </select>
            <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#4F6F52]"
                aria-hidden="true"
            />
        </label>
    );
}
