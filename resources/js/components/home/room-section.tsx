import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { RoomCard } from '@/components/home/room-card';
import { getFeaturedRooms } from '@/data/rooms';

export function RoomSection() {
    const featuredRooms = getFeaturedRooms();

    return (
        <section
            id="kamar"
            aria-labelledby="rooms-title"
            className="scroll-mt-24 rounded-3xl border border-[#DDE8D8] bg-white p-5 shadow-[0_12px_35px_rgba(47,79,62,0.07)] sm:p-6"
        >
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold tracking-[0.18em] text-[#4F6F52]">
                        PILIH YANG PALING NYAMAN
                    </p>
                    <h2
                        id="rooms-title"
                        className="mt-1 text-2xl font-bold text-[#1F2A24]"
                    >
                        Pilihan Kamar
                    </h2>
                </div>
                <Link
                    href="/kamar"
                    className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#4F6F52] hover:underline"
                >
                    Cek semua
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {featuredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </section>
    );
}
