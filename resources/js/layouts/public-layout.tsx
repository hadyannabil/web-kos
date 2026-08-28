import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { Footer } from '@/components/home/footer';
import { Navbar } from '@/components/home/navbar';
import { dashboard, login } from '@/routes';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { auth, currentTeam } = usePage().props;
    const accountUrl = auth.user
        ? currentTeam
            ? dashboard(currentTeam.slug).url
            : '/'
        : login().url;

    return (
        <div className="min-h-screen overflow-x-clip bg-[#F3F7F1] text-[#1F2A24] [color-scheme:light]">
            <Navbar
                isAuthenticated={Boolean(auth.user)}
                accountUrl={accountUrl}
            />
            {children}
            <Footer />
        </div>
    );
}
