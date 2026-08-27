import { Check } from 'lucide-react';
import type { Room } from '@/components/home/home-data';

type RoomCardProps = {
    room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                    src={room.image}
                    alt={room.imageAlt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-[#0a2864]">{room.name}</h3>
                <ul className="mt-3 space-y-1.5">
                    {room.features.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-center gap-2 text-xs text-[#526484]"
                        >
                            <Check
                                className="size-3.5 text-[#0769f1]"
                                strokeWidth={3}
                                aria-hidden="true"
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                        <span className="block text-[11px] text-[#7b89a1]">
                            Mulai dari
                        </span>
                        <strong className="text-lg leading-none font-bold text-[#0769f1]">
                            {room.price}
                        </strong>
                        <span className="ml-1 text-[11px] text-[#526484]">
                            /bulan
                        </span>
                    </div>
                    <a
                        href="#survey"
                        className="shrink-0 text-xs font-bold text-[#0769f1] hover:underline"
                        aria-label={`Tanyakan ketersediaan ${room.name}`}
                    >
                        Pilih
                    </a>
                </div>
            </div>
        </article>
    );
}
