"use client";

import React, { useEffect } from "react";
import MeditationCard from "@/components/MeditationCard";
import useAuthStore from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";

export default function Meditation() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const router = useRouter();
    const accessToken = useAuthStore((state) => state.accessToken);
    console.log("accessToken", accessToken);
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
        <div className="bg-primary py-6 px-10 flex flex-col gap-8">
            <h2 className="text-white text-3xl font-bold">Meditation library</h2>
            <MeditationCard accessToken = {accessToken}/>
        </div>
    );
}