"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { MessageCircle, BookOpen } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex justify-around items-center h-16 shadow-md">
            <Link href="/chat" className="flex flex-col items-center justify-center flex-1">
                <MessageCircle className={`h-6 w-6 ${pathname.startsWith('/chat') ? 'text-[#19A7CE]' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${pathname.startsWith('/chat') ? 'text-[#19A7CE] font-semibold' : 'text-gray-400'}`}>Chat</span>
            </Link>
            <Link href="/diary" className="flex flex-col items-center justify-center flex-1">
                <BookOpen className={`h-6 w-6 ${pathname.startsWith('/diary') ? 'text-[#19A7CE]' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${pathname.startsWith('/diary') ? 'text-[#19A7CE] font-semibold' : 'text-gray-400'}`}>Diary</span>
            </Link>
        </nav>
    );
} 