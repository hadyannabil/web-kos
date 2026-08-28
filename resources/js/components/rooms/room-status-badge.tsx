import { CheckCircle2, Clock3, Wrench } from 'lucide-react';
import { roomStatusLabels } from '@/data/rooms';
import type { RoomStatus } from '@/data/rooms';
import { cn } from '@/lib/utils';

type RoomStatusBadgeProps = {
    status: RoomStatus;
    className?: string;
};

export function RoomStatusBadge({ status, className }: RoomStatusBadgeProps) {
    const Icon =
        status === 'available'
            ? CheckCircle2
            : status === 'occupied'
              ? Clock3
              : Wrench;

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
                status === 'available' && 'bg-emerald-50 text-emerald-700',
                status === 'occupied' && 'bg-amber-50 text-amber-700',
                status === 'maintenance' && 'bg-slate-100 text-slate-600',
                className,
            )}
        >
            <Icon className="size-3.5" aria-hidden="true" />
            {roomStatusLabels[status]}
        </span>
    );
}
