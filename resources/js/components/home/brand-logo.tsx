import { House } from 'lucide-react';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
    className?: string;
    inverse?: boolean;
};

export function BrandLogo({ className, inverse = false }: BrandLogoProps) {
    return (
        <span className={cn('inline-flex items-center gap-3', className)}>
            <span
                className={cn(
                    'grid size-10 place-items-center rounded-xl border-2',
                    inverse
                        ? 'border-white/70 bg-white/10 text-white'
                        : 'border-[#0b6cf0] bg-blue-50 text-[#0b6cf0]',
                )}
            >
                <House
                    className="size-6"
                    strokeWidth={2.2}
                    aria-hidden="true"
                />
            </span>
            <span className="leading-none">
                <span
                    className={cn(
                        'block text-lg font-bold tracking-tight',
                        inverse ? 'text-white' : 'text-[#09245f]',
                    )}
                >
                    KosKita
                </span>
                <span
                    className={cn(
                        'mt-1 block text-xs font-semibold tracking-[0.16em]',
                        inverse ? 'text-blue-100' : 'text-[#0b6cf0]',
                    )}
                >
                    RESIDENCE
                </span>
            </span>
        </span>
    );
}
