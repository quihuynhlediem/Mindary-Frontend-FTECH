"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { MessageCircle, BookOpen, User, LucideHome, BookAudio } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const hideNavPaths = [
        '/login',
        '/signup',
        '/onboarding',
        '/onboarding-profile',
        // '/profile'
    ];

    if (hideNavPaths.some(path => pathname.startsWith(path))) {
        return null;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-around items-center h-16 shadow-md">
            <Link href="/" className="flex flex-col items-center justify-center flex-1 p-2">
                <LucideHome className={`h-6 w-6 ${pathname == '/' ? 'text-[#7EC8D3]' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${pathname == '/' ? 'text-[#7EC8D3] font-semibold' : 'text-gray-400'}`}>Home</span>
            </Link>
            <Link href="/diary" className="flex flex-col items-center justify-center flex-1 p-2">
                <BookOpen className={`h-6 w-6 ${pathname.startsWith('/diary') ? 'text-[#7EC8D3]' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${pathname.startsWith('/diary') ? 'text-[#7EC8D3] font-semibold' : 'text-gray-400'}`}>Journalling</span>
            </Link>
            <Link href="/meditation" className="flex flex-col items-center justify-center flex-1 p-2">
                <BookAudio className={`h-6 w-6 ${pathname.startsWith('/meditation') ? 'text-[#7EC8D3]' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${pathname.startsWith('/meditation') ? 'text-[#7EC8D3] font-semibold' : 'text-gray-400'}`}>Meditation</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center justify-center flex-1 p-2">
                <User className={`h-6 w-6 ${pathname.startsWith('/profile') ? 'text-[#7EC8D3]' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${pathname.startsWith('/profile') ? 'text-[#7EC8D3] font-semibold' : 'text-gray-400'}`}>Profile</span>
            </Link>
        </nav>
    );
} 