import { Link } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { formatRupiah, roomTypeLabels } from '@/data/rooms';
import type { Room } from '@/data/rooms';

type RoomCardProps = {
    room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
    const roomTypeUrl = `/kamar?type=${room.type}`;

    return (
        <article className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 focus-within:border-[#4F6F52] focus-within:ring-2 focus-within:ring-[#DDE8D8] hover:-translate-y-1 hover:border-[#4F6F52] hover:shadow-xl hover:shadow-[#2F4F3E]/10">
            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                    src={room.image}
                    alt={`Contoh interior kamar ${roomTypeLabels[room.type]} KosKita Residence`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-[#1F2A24]">
                    <Link
                        href={roomTypeUrl}
                        className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-[#4F6F52]"
                    >
                        Kamar {roomTypeLabels[room.type]}
                    </Link>
                </h3>
                <ul className="mt-3 space-y-1.5">
                    {room.facilities.slice(0, 3).map((facility) => (
                        <li
                            key={facility}
                            className="flex items-center gap-2 text-xs text-[#5F6B63]"
                        >
                            <Check
                                className="size-3.5 text-[#4F6F52]"
                                strokeWidth={3}
                                aria-hidden="true"
                            />
                            {facility}
                        </li>
                    ))}
                </ul>
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                        <span className="block text-[11px] text-[#5F6B63]">
                            Mulai dari
                        </span>
                        <strong className="text-lg leading-none font-bold text-[#4F6F52]">
                            {formatRupiah(room.price)}
                        </strong>
                        <span className="ml-1 text-[11px] text-[#5F6B63]">
                            /bulan
                        </span>
                    </div>
                    <Link
                        href={roomTypeUrl}
                        className="relative z-10 shrink-0 rounded-lg px-2 py-1.5 text-xs font-bold text-[#4F6F52] hover:bg-[#F3F7F1] hover:underline focus-visible:outline-2 focus-visible:outline-[#4F6F52]"
                        aria-label={`Pilih kamar tipe ${roomTypeLabels[room.type]}`}
                    >
                        Pilih
                    </Link>
                </div>
            </div>
        </article>
    );
}
