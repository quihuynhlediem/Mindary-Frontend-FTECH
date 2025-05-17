"use client";

import React, { useState, useEffect, useCallback } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import PersonalizedMessage from "./PersonalizedMessage";
import StatusMessage from "./StatusMessage";
import ReasonSection from "./ReasonSection";
import Tips from "./Tips";
import Loader from "../general/Loader";
import { Pencil } from 'lucide-react';
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/app/types/diary";
import axiosInstance from "@/apiConfig";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import EmptyDiary with SSR disabled
const EmptyDiary = dynamic(() => import("./EmptyDiary"), { ssr: false });

// Define types for clarity (should match diary.ts and ReasonSection)
interface EmotionObject {
    emotionCategory: string[];
    emotionSummary: string;
}

interface CorrelationObject {
    name: string;
    description: string;
}

interface SymptomObject {
    name: string;
    risk: string;
    description: string;
    suggestions: string;
}

interface DiaryDto {
    emotionObjects: EmotionObject[];
    correlationObjects: CorrelationObject[];
    symptomObjects: SymptomObject[];
    id?: string;
    date?: string;
}

const DailyUserContent: React.FC = () => {
    const { selectedDate } = useUserStore();
    const { accessToken, userId } = useAuthStore();
    const [diary, setDiary] = useState<DiaryDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const currentDiaryId = useAuthStore((state) => state.currentDiaryId);
    const router = useRouter();

    const fetchDiary = useCallback(async () => {
        if (!userId || !accessToken || !selectedDate) {
            setErrorMessage("Missing user ID, token, or date");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);
        // meditations/get-recommendations?userId=?????&date=????
        try {
            const res = await axiosInstance.get<DiaryDto>(
                `/diary/${currentDiaryId!}/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDiary(res.data);
        } catch (error: unknown) {
            console.error("Failed to fetch diary:", error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                setErrorMessage(
                    axiosError.response?.data?.message || "Failed to fetch diary"
                );
            } else {
                setErrorMessage("An unexpected error occurred");
            }
            setDiary(null);
        } finally {
            setIsLoading(false);
        }
    }, [userId, accessToken, selectedDate]);

    useEffect(() => {
        fetchDiary();
    }, [selectedDate, userId, accessToken, fetchDiary]);

    if (isLoading) {
        return (
            <div className="text-center py-4">
                <Loader />
            </div>
        );
    }

    const handleViewDiary = () => {
        const currentDate = selectedDate;
        router.replace(`/diary/${currentDate}/input`);
    }

    if (errorMessage) {
        return (
            <div className="text-center py-4 text-red-500">
                <p>{errorMessage}</p>
                <button
                    className="mt-2 text-blue-500 hover:underline"
                    onClick={fetchDiary}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!diary || !diary.emotionObjects?.length) {
        return <EmptyDiary />;
    }

    return (
        <div className="text-center py-4">
            <div className="flex justify-end items-center">
                <button onClick={handleViewDiary} className="flex justify-center items-center gap-1.5 bg-[#E6F4F1] border-[#7EC8D3] rounded-lg border-2 border-solid p-1 cursor-pointer">
                    <Pencil className="w-4" /> <span className="text-center justify-start text-black text-sm font-semibold tracking-wide">View Diary</span>
                </button>
            </div>
            <AnimatedEmoji />
            <StatusMessage result={diary} />
            <PersonalizedMessage result={diary} />
            <ReasonSection result={diary} />
            <Tips result={diary} />
        </div>
    );
};

export default DailyUserContent;