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
import type { RoomFilters } from '@/data/rooms';

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

            <main className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 sm:py-4 lg:px-12">
                <div className="space-y-2">
                    <p
                        className="pl-1 text-[15px] font-semibold text-[#2F4F3E] sm:text-base"
                        role="status"
                        aria-live="polite"
                    >
                        Menampilkan {filteredRooms.length} kamar
                    </p>

                    <RoomFilterBar
                        key={url}
                        filters={filters}
                        onApply={navigateWithFilters}
                    />
                </div>

                <section aria-labelledby="room-results-title" className="mt-4">
                    <h2 id="room-results-title" className="sr-only">
                        Daftar kamar KosKita Residence
                    </h2>

                    {filteredRooms.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filteredRooms.map((room) => (
                                <RoomResultCard key={room.id} room={room} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-[#DDE8D8] bg-white px-5 py-10 text-center">
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
