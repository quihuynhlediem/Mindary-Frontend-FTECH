"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Calendar from '@/components/diary/Calendar';
import DailyUserContent from '@/components/diary/DailyUserDiary';
import useAuthStore from '@/hooks/useAuthStore';

const page = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const router = useRouter();

    // Redirect to login page
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    // Prevent rendering while redirecting
    if (!isAuthenticated) {
        return null
    }

    return (
        <div className='relative min-h-full max-w-screen w-screen h-screen px-4 py-14 bg-primary-foreground space-y-6'>
            <Calendar />
            {/* <DailyUserContent /> */}
        </div>
    );
}

export default page;