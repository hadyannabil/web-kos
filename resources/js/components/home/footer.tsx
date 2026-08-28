import {
    Clock3,
    Facebook,
    Globe2,
    Instagram,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from 'lucide-react';
import { BrandLogo } from '@/components/home/brand-logo';

const quickLinks = [
    { label: 'Kamar', href: '/#kamar' },
    { label: 'Fasilitas', href: '/#fasilitas' },
    { label: 'Lokasi', href: '/#lokasi' },
    { label: 'Testimoni', href: '/#testimoni' },
    { label: 'FAQ', href: '/#faq' },
];

export function Footer() {
    return (
        <footer id="kontak" className="border-t border-[#DDE8D8] bg-[#F3F7F1]">
            <div className="mx-auto grid max-w-[1440px] gap-9 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_1.2fr_0.9fr] lg:px-12">
                <div>
                    <BrandLogo />
                    <p className="mt-4 max-w-xs text-sm leading-6 text-[#5F6B63]">
                        Kos nyaman, aman, dan strategis untuk mahasiswa &amp;
                        pekerja produktif.
                    </p>
                    <div className="mt-5 flex gap-2">
                        <SocialLink
                            label="Instagram"
                            href="#"
                            icon={Instagram}
                        />
                        <SocialLink
                            label="WhatsApp"
                            href="https://wa.me/6281234567890"
                            icon={MessageCircle}
                        />
                        <SocialLink label="Facebook" href="#" icon={Facebook} />
                    </div>
                </div>

                <FooterColumn title="Kontak">
                    <ContactLine icon={Phone}>0812-3456-7890</ContactLine>
                    <ContactLine icon={Mail}>
                        halo@koskitaresidence.id
                    </ContactLine>
                    <ContactLine icon={Globe2}>
                        www.koskitaresidence.id
                    </ContactLine>
                </FooterColumn>

                <FooterColumn title="Tautan Cepat">
                    <ul className="space-y-2.5 text-sm text-[#5F6B63]">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="transition hover:text-[#4F6F52]"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </FooterColumn>

                <FooterColumn title="Alamat">
                    <ContactLine icon={MapPin} alignStart>
                        Jl. Merdeka No. 123, Sleman, Yogyakarta 55281, Indonesia
                    </ContactLine>
                </FooterColumn>

                <FooterColumn title="Jam Operasional">
                    <ContactLine icon={Clock3} alignStart>
                        Senin – Minggu
                        <br />
                        08.00 – 20.00 WIB
                    </ContactLine>
                </FooterColumn>
            </div>
            <div className="border-t border-[#DDE8D8] px-5 py-5 text-center text-xs text-[#5F6B63]">
                © {new Date().getFullYear()} KosKita Residence. All rights
                reserved.
            </div>
        </footer>
    );
}

type FooterColumnProps = {
    title: string;
    children: React.ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
    return (
        <div>
            <h2 className="mb-4 text-sm font-bold text-[#1F2A24]">{title}</h2>
            {children}
        </div>
    );
}

type ContactLineProps = {
    icon: typeof Phone;
    children: React.ReactNode;
    alignStart?: boolean;
};

function ContactLine({ icon: Icon, children, alignStart }: ContactLineProps) {
    return (
        <p
            className={`mb-3 flex gap-2.5 text-sm leading-6 text-[#5F6B63] ${alignStart ? 'items-start' : 'items-center'}`}
        >
            <Icon
                className="mt-1 size-4 shrink-0 text-[#2F4F3E]"
                aria-hidden="true"
            />
            <span>{children}</span>
        </p>
    );
}

type SocialLinkProps = {
    label: string;
    href: string;
    icon: typeof Instagram;
};

function SocialLink({ label, href, icon: Icon }: SocialLinkProps) {
    return (
        <a
            href={href}
            aria-label={label}
            className="grid size-9 place-items-center rounded-full border border-[#DDE8D8] bg-white text-[#4F6F52] transition hover:border-[#4F6F52] hover:bg-[#F3F7F1]"
        >
            <Icon className="size-4" aria-hidden="true" />
        </a>
    );
}
