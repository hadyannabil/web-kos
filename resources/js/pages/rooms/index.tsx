import { Head, router, usePage } from '@inertiajs/react';
import { SearchX } from 'lucide-react';
import { useMemo } from 'react';
import { RoomFilterBar } from '@/components/rooms/room-filter-bar';
import { RoomResultCard } from '@/components/rooms/room-result-card';
import {
    buildRoomQuery,
    filterAndSortRooms,
    parseRoomFilters,
    rooms,
} from '@/data/rooms';
import type { RoomFilters, RoomSort } from '@/data/rooms';

export default function RoomsIndex() {
    const { url } = usePage();
    const filters = useMemo(() => parseRoomFilters(url), [url]);
    const filteredRooms = useMemo(
        () => filterAndSortRooms(rooms, filters),
        [filters],
    );

    const navigateWithFilters = (nextFilters: RoomFilters) => {
        const query = buildRoomQuery(nextFilters);

        router.get(
            query ? `/kamar?${query}` : '/kamar',
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleSort = (sort: RoomSort) => {
        navigateWithFilters({ ...filters, sort });
    };

    const resetFilters = () => {
        router.get('/kamar', {}, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Cari Kamar">
                <meta
                    name="description"
                    content="Cari kamar KosKita Residence berdasarkan tipe, budget, fasilitas, dan durasi sewa."
                />
            </Head>

            <main className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 sm:py-10 lg:px-12">
                <header className="mb-5 sm:mb-6">
                    <h1 className="text-3xl leading-tight font-bold tracking-[-0.025em] text-[#1F2A24] sm:text-4xl">
                        Cari Kamar
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-[#5F6B63] sm:text-base">
                        Temukan kamar yang sesuai dengan kebutuhanmu.
                    </p>
                </header>

                <RoomFilterBar
                    key={url}
                    filters={filters}
                    onApply={navigateWithFilters}
                    onReset={resetFilters}
                />

                <section aria-labelledby="room-results-title" className="mt-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-[0.16em] text-[#4F6F52] uppercase">
                                Hasil Pencarian
                            </p>
                            <h2
                                id="room-results-title"
                                className="mt-1 text-2xl font-bold text-[#1F2A24]"
                            >
                                {filters.status === 'available'
                                    ? `${filteredRooms.length} kamar tersedia`
                                    : `${filteredRooms.length} kamar ditemukan`}
                            </h2>
                        </div>
                        <label
                            htmlFor="room-sort"
                            className="flex items-center gap-3 text-sm font-semibold text-[#5F6B63]"
                        >
                            Urutkan
                            <select
                                id="room-sort"
                                value={filters.sort}
                                onChange={(event) =>
                                    handleSort(event.target.value as RoomSort)
                                }
                                className="min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-[#1F2A24] outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#DDE8D8]"
                            >
                                <option value="price-asc">
                                    Harga Terendah
                                </option>
                                <option value="price-desc">
                                    Harga Tertinggi
                                </option>
                                <option value="room-number">Nomor Kamar</option>
                            </select>
                        </label>
                    </div>

                    {filteredRooms.length > 0 ? (
                        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredRooms.map((room) => (
                                <RoomResultCard key={room.id} room={room} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-[#DDE8D8] bg-white px-5 py-12 text-center">
                            <span className="grid size-16 place-items-center rounded-2xl bg-[#F3F7F1] text-[#4F6F52]">
                                <SearchX
                                    className="size-8"
                                    aria-hidden="true"
                                />
                            </span>
                            <h3 className="mt-5 text-2xl font-bold text-[#1F2A24]">
                                Tidak ada kamar yang sesuai
                            </h3>
                            <p className="mt-3 max-w-lg text-sm leading-6 text-[#5F6B63]">
                                Kami belum menemukan kamar dengan kriteria
                                tersebut. Coba ubah tipe kamar, budget, atau
                                durasi sewa.
                            </p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-6 min-h-11 rounded-xl bg-[#4F6F52] px-6 text-sm font-bold text-white transition hover:bg-[#2F4F3E]"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
