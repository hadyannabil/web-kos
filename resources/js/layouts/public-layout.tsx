import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { Footer } from '@/components/home/footer';
import { Navbar } from '@/components/home/navbar';
import { PublicHeader } from '@/components/public/public-header';
import { dashboard } from '@/routes';

export default function PublicLayout({ children }: PropsWithChildren) {
    const page = usePage();
    const { auth, currentTeam } = page.props;
    const isHomepage = page.component === 'welcome';
    const accountUrl =
        auth.user && currentTeam ? dashboard(currentTeam.slug).url : '/';

    return (
        <div className="min-h-screen overflow-x-clip bg-[#F3F7F1] text-[#1F2A24] [color-scheme:light]">
            {isHomepage ? (
                <Navbar
                    isAuthenticated={Boolean(auth.user)}
                    accountUrl={accountUrl}
                />
            ) : (
                <PublicHeader />
            )}
            {children}
            <Footer />
        </div>
    );
}
