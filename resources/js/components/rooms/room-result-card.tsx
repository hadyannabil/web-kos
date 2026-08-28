import { Link } from '@inertiajs/react';
import { Building2, Check, Ruler } from 'lucide-react';
import { RoomStatusBadge } from '@/components/rooms/room-status-badge';
import { formatRupiah, roomTypeLabels } from '@/data/rooms';
import type { Room } from '@/data/rooms';

type RoomResultCardProps = {
    room: Room;
};

export function RoomResultCard({ room }: RoomResultCardProps) {
    const isAvailable = room.status === 'available';

    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(47,79,62,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#4F6F52] hover:shadow-xl hover:shadow-[#2F4F3E]/10">
            <Link
                href={`/kamar/${room.slug}`}
                className="block overflow-hidden bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#4F6F52]"
            >
                <img
                    src={room.image}
                    alt={`Interior ${room.name}`}
                    className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </Link>
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold tracking-[0.12em] text-[#4F6F52] uppercase">
                            {roomTypeLabels[room.type]}
                        </p>
                        <h2 className="mt-1 text-xl font-bold text-[#1F2A24]">
                            <Link
                                href={`/kamar/${room.slug}`}
                                className="rounded-sm hover:text-[#4F6F52] focus-visible:outline-2 focus-visible:outline-[#4F6F52]"
                            >
                                {room.name}
                            </Link>
                        </h2>
                    </div>
                    <RoomStatusBadge status={room.status} />
                </div>

                <p className="mt-4 text-2xl font-bold text-[#4F6F52]">
                    {formatRupiah(room.price)}
                    <span className="ml-1 text-xs font-medium text-[#5F6B63]">
                        / bulan
                    </span>
                </p>

                <div className="mt-4 flex gap-5 border-y border-slate-100 py-3 text-sm text-[#5F6B63]">
                    <span className="flex items-center gap-2">
                        <Building2
                            className="size-4 text-[#4F6F52]"
                            aria-hidden="true"
                        />
                        Lantai {room.floor}
                    </span>
                    <span className="flex items-center gap-2">
                        <Ruler
                            className="size-4 text-[#4F6F52]"
                            aria-hidden="true"
                        />
                        {room.size}
                    </span>
                </div>

                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
                    {room.facilities.slice(0, 4).map((facility) => (
                        <li
                            key={facility}
                            className="flex items-start gap-1.5 text-xs leading-4 text-[#5F6B63]"
                        >
                            <Check
                                className="mt-0.5 size-3.5 shrink-0 text-[#4F6F52]"
                                strokeWidth={3}
                                aria-hidden="true"
                            />
                            {facility}
                        </li>
                    ))}
                </ul>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                        href={`/kamar/${room.slug}`}
                        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#DDE8D8] px-3 text-center text-sm font-bold text-[#4F6F52] transition hover:border-[#4F6F52] hover:bg-[#F3F7F1]"
                    >
                        Lihat Detail
                    </Link>
                    {isAvailable ? (
                        <Link
                            href={`/kamar/${room.slug}/pesan`}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#4F6F52] px-3 text-center text-sm font-bold text-white transition hover:bg-[#2F4F3E]"
                        >
                            Pilih Kamar
                        </Link>
                    ) : (
                        <span
                            aria-disabled="true"
                            className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-xl bg-slate-100 px-3 text-center text-sm font-bold text-slate-400"
                        >
                            Belum Tersedia
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
