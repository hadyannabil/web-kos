import { ArrowRight } from 'lucide-react';
import { rooms } from '@/components/home/home-data';
import { RoomCard } from '@/components/home/room-card';

export function RoomSection() {
    return (
        <section
            id="kamar"
            aria-labelledby="rooms-title"
            className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_12px_35px_rgba(28,73,133,0.07)] sm:p-6"
        >
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs font-bold tracking-[0.18em] text-[#0769f1]">
                        PILIH YANG PALING NYAMAN
                    </p>
                    <h2
                        id="rooms-title"
                        className="mt-1 text-2xl font-bold text-[#09245f]"
                    >
                        Pilihan Kamar
                    </h2>
                </div>
                <a
                    href="#survey"
                    className="hidden items-center gap-1.5 text-xs font-bold text-[#0769f1] hover:underline sm:inline-flex"
                >
                    Cek semua
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {rooms.map((room) => (
                    <RoomCard key={room.name} room={room} />
                ))}
            </div>
        </section>
    );
}
