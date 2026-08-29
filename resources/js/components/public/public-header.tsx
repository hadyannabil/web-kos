import { Link } from '@inertiajs/react';
import { BrandLogo } from '@/components/home/brand-logo';

export function PublicHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-[#DDE8D8]/80 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-[1440px] items-center px-4 sm:px-6 lg:px-12">
                <Link
                    href="/"
                    aria-label="KosKita Residence - Kembali ke beranda"
                    className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4F6F52]"
                >
                    <BrandLogo />
                </Link>
            </div>
        </header>
    );
}
