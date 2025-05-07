"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Calendar from '@/components/diary/Calendar';
import DailyUserContent from '@/components/diary/DailyUserContent';
import useAuthStore from '@/hooks/useAuthStore';
import { format } from "date-fns";

const DiaryRedirect = () => {
    const router = useRouter();
    const today = format(new Date(), "yyyy-MM-dd");

    useEffect(() => {
        router.replace(`/diary/${today}`);
    }, [router]);

    return null;
};

export default DiaryRedirect;