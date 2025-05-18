"use client";

import React, { useState, useEffect, useCallback, FunctionComponent } from "react";
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

interface MeditationDto {
    title: string,
    author: string,
    media_url: string,
    media_length: number,
    picture_url: string,
    intention: string,
}

interface DailyUserContentProps {
    buttonOnClick: () => void,
}

const fakedata: MeditationDto[] = [
    {
        "title": "Anxiety Relief",
        "author": "Oliver James Jenkin",
        "media_url": "https://libraryitems.insighttimer-api.net/k6m9p1g0v1k6e6t3n7n0c1h5g3u9y7x8n8p3x1c8/hls/v2/index.m3u8",
        "media_length": 975,
        "picture_url": "https://libraryitems.insighttimer.com/k6m9p1g0v1k6e6t3n7n0c1h5g3u9y7x8n8p3x1c8/pictures/tiny_rectangle_xlarge.jpeg",
        "intention": "You will practice mindful breathing to calm your nervous system, visualize yourself as a jigsaw puzzle coming together, and cultivate a sense of inner peace and strength."
    },
    {
        "title": "Inner Peace Treaty: 10-Minute Self-Harmony Guide",
        "author": "Sarah Blondin",
        "media_url": "https://libraryitems.insighttimer-api.net/d9z9k5a2c7u4p1x8f5q3q7x2y6g4x1h3h4e4b4k4/hls/v1/index.m3u8",
        "media_length": 741,
        "picture_url": "https://libraryitems.insighttimer.com/d9z9k5a2c7u4p1x8f5q3q7x2y6g4x1h3h4e4b4k4/pictures/tiny_rectangle_xlarge.jpeg",
        "intention": "You will explore the two opposing forces within you, the warrior and the gentle one, and learn to cultivate the peace and love that resides in your essence."
    },
    {
        "title": "A Pause For Presence",
        "author": "Tara Brach",
        "media_url": "https://libraryitems.insighttimer-api.net/y1v1u4r3h6y3p3w9q8r5d8c8d4v0f1t2g5r4h3s1/hls/v1/index.m3u8",
        "media_length": 703,
        "picture_url": "https://libraryitems.insighttimer.com/y1v1u4r3h6y3p3w9q8r5d8c8d4v0f1t2g5r4h3s1/pictures/tiny_rectangle_xlarge.jpeg",
        "intention": "You will practice mindful breathing, gently returning your attention to the breath whenever your mind wanders, and cultivate a sense of presence and peace."
    }
]

const DailyUserContent: React.FC<DailyUserContentProps> = ({ buttonOnClick }) => {
    const { selectedDate } = useUserStore();
    const { accessToken, userId } = useAuthStore();
    const [diary, setDiary] = useState<DiaryDto | null>(null);
    const [meditation, setMeditation] = useState<MeditationDto[] | null>(fakedata);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const currentDiaryId = useAuthStore((state) => state.currentDiaryId);
    const router = useRouter();

    const fetchMeditation = useCallback(async () => {
        if (!userId || !accessToken || !selectedDate) {
            setErrorMessage("Missing user ID, token, or date");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);
        // meditations/get-recommendations?userId=?????&date=????
        try {
            const res = await axiosInstance.post<MeditationDto[]>(
                '/meditations/get-recommendations',
                null,
                {
                    params: {
                        userId,
                        diaryId: currentDiaryId,
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            setMeditation(res.data);
            console.log("Meditation fetched" + res.data);
        } catch (error: unknown) {
            console.error("Failed to fetch meditation:", error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                setErrorMessage(
                    axiosError.response?.data?.message || "Failed to fetch diary"
                );
            } else {
                setErrorMessage("An unexpected error occurred");
            }
            setMeditation(null);
        } finally {
            setIsLoading(false);
        }
    }, [userId, accessToken, selectedDate]);

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
        fetchMeditation();
    }, [selectedDate, userId, accessToken, fetchDiary, fetchMeditation]);

    if (isLoading) {
        return (
            <div className="text-center py-4">
                <Loader />
            </div>
        );
    }

    // const handleViewDiary = () => {
    //     const currentDate = selectedDate;
    //     router.replace(`/diary/${currentDate}/input`);
    // }

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
                <button onClick={buttonOnClick} className="flex justify-center items-center gap-1.5 bg-[#E6F4F1] border-[#7EC8D3] rounded-lg border-2 border-solid p-1 cursor-pointer">
                    <Pencil className="w-4" /> <span className="text-center justify-start text-black text-sm font-semibold tracking-wide">View Diary</span>
                </button>
            </div>
            <AnimatedEmoji />
            <StatusMessage result={diary} />
            <PersonalizedMessage result={diary} />
            <ReasonSection result={diary} />
            <Tips meditation={meditation} result={diary} />
        </div>
    );
};

export default DailyUserContent;