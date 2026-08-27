import { Link } from '@inertiajs/react';
import { CalendarDays, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandLogo } from '@/components/home/brand-logo';

const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Kamar', href: '#kamar' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Lokasi', href: '#lokasi' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'FAQ', href: '#faq' },
];

type NavbarProps = {
    isAuthenticated: boolean;
    accountUrl: string;
};

export function Navbar({ isAuthenticated, accountUrl }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
                <a href="#beranda" aria-label="KosKita Residence - Beranda">
                    <BrandLogo />
                </a>

                <nav
                    className="hidden items-center gap-7 lg:flex"
                    aria-label="Navigasi utama"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-semibold text-[#26375f] transition hover:text-[#0769f1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        href={accountUrl}
                        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0a2a68] transition hover:bg-blue-50"
                    >
                        {isAuthenticated ? 'Dashboard' : 'Login'}
                    </Link>
                    <a
                        href="#survey"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0769f1] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#005bd6]"
                    >
                        <CalendarDays className="size-4" aria-hidden="true" />
                        Booking Sekarang
                    </a>
                </div>

                <button
                    type="button"
                    className="grid size-11 place-items-center rounded-xl text-[#0769f1] transition hover:bg-blue-50 lg:hidden"
                    aria-label={
                        isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
                    }
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsOpen((current) => !current)}
                >
                    {isOpen ? (
                        <X className="size-7" aria-hidden="true" />
                    ) : (
                        <Menu className="size-8" aria-hidden="true" />
                    )}
                </button>
            </div>

            {isOpen && (
                <nav
                    id="mobile-navigation"
                    className="border-t border-blue-100 bg-white px-5 py-5 shadow-xl lg:hidden"
                    aria-label="Navigasi mobile"
                >
                    <div className="mx-auto flex max-w-2xl flex-col gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="rounded-xl px-4 py-3 text-sm font-semibold text-[#163064] hover:bg-blue-50 hover:text-[#0769f1]"
                                onClick={closeMenu}
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-blue-100 pt-4">
                            <Link
                                href={accountUrl}
                                className="rounded-xl border border-blue-200 px-4 py-3 text-center text-sm font-semibold text-[#0769f1]"
                                onClick={closeMenu}
                            >
                                {isAuthenticated ? 'Dashboard' : 'Login'}
                            </Link>
                            <a
                                href="#survey"
                                className="rounded-xl bg-[#0769f1] px-4 py-3 text-center text-sm font-semibold text-white"
                                onClick={closeMenu}
                            >
                                Booking
                            </a>
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}
