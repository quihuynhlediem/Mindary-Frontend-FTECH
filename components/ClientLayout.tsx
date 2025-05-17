"use client";

import React from 'react';
import BottomNav from '@/components/ui/BottomNav';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
    children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    const noPaddingPaths = ['/login', '/signup', '/onboarding', '/onboarding-profile'];
    const shouldHavePadding = !noPaddingPaths.some(path => pathname?.startsWith(path));

    return (
        <>
            <main className={shouldHavePadding ? "pb-20" : ""}>
                {children}
            </main>
            <BottomNav />
        </>
    );
};

export default ClientLayout; 