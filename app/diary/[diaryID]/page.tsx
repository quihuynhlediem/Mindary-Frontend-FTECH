"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation';
import Calendar from '@/components/diary/Calendar';
import Header from '@/components/general/Header';
import DailyUserContent from '@/components/diary/DailyUserContent';
import useAuthStore from '@/hooks/useAuthStore';
import useUserStore from '@/hooks/useUserStore';
import axiosInstance from '@/apiConfig';
import { ErrorResponse, IsAnalysisDto } from '@/app/types/diary';
import axios, { AxiosError } from 'axios';
import EmptyDiary from '@/components/diary/EmptyDiary';
import { Button } from '@/components/ui/button';
import Loader from '@/components/general/Loader';
import MoonLoader from 'react-spinners/MoonLoader';
import { toast } from '@/hooks/use-toast';
import DailyUserDiary from '@/components/diary/DailyUserDiary';
import { ChartArea } from 'lucide-react';

const Diary = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const accessToken = useAuthStore((state) => state.accessToken);
    const userId = useAuthStore((state) => state.userId);
    const chosenDate = useUserStore((state) => state.selectedDate);
    const router = useRouter();
    const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
    const [isAnalysisLoading, setIsAnalysisLoading] = useState<boolean>(false);
    const [isContentLoading, setIsContentLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [diaryExists, setDiaryExists] = useState<boolean>(false);
    const [isAnalyzed, setIsAnalyzed] = useState<boolean>(false);
    const diaryContent = useUserStore((state) => state.diaries)
    const setCurrentDiaryId = useAuthStore((state) => state.setCurrentDiaryId)
    const currentDiaryId = useAuthStore((state) => state.currentDiaryId)

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

    // Check diary existence and analysis status
    const checkDiaryAndAnalysis = useCallback(async () => {
        if (!chosenDate || !userId || !accessToken) return;

        setIsContentLoading(true);
        setErrorMessage(null);

        try {
            // Fetch diary metadata to check if diary exists
            const checkAnalysisResponse = await axiosInstance.get<IsAnalysisDto>(
                `/diaries/user/${userId}/${chosenDate}/check-is-analyzed`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            setDiaryExists(true);
            setIsAnalyzed(checkAnalysisResponse.data.analyzed);
            setCurrentDiaryId(checkAnalysisResponse.data.diaryId)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setDiaryExists(false);
                    setCurrentDiaryId("");
                    setIsAnalyzed(false);

                } else {
                    setErrorMessage('Failed to check diary or analysis status.');
                }
            }
        } finally {
            setIsContentLoading(false);
        }
    }, [chosenDate, userId, accessToken]);

    const triggerAnalysis = async () => {
        setIsAnalysisLoading(true)
        try {
            let formData = new FormData();
            formData.append("userId", userId!)
            formData.append("diaryId", currentDiaryId!)
            formData.append("content", diaryContent[chosenDate!]!)

            const analysisResponse = await axiosInstance.post(
                '/diary/analyze',
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`
                    },
                }
            )

            const markDiaryAsAnalysis = await axiosInstance.post(
                `/diaries/${currentDiaryId}/user/${userId}/mark-is-analyzed`,
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                }
            )

            toast({
                variant: "success",
                title: "Successfully Analyzed!",
                description: "Your diary is analyzed",
                duration: 3000
            })

            setIsAnalyzed(true)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    setDiaryExists(false);
                    setCurrentDiaryId("");
                    setIsAnalyzed(false);

                } else {
                    setErrorMessage('Failed to analyzed diary.');
                }
            }
        } finally {
            setIsAnalysisLoading(false)
        }
    }

    // Check diary and analysis status when chosenDate changes
    useEffect(() => {
        checkDiaryAndAnalysis();
    }, [checkDiaryAndAnalysis]);

    // Handle button click
    const handleAnalysisButtonClick = () => {
        if (isAnalyzed) {
            setShowAnalysis(true);
        } else {
            triggerAnalysis();
        }
    };

    return (
        <>
            <Header page="My Journals" />
            <div className='relative min-h-screen max-w-screen w-screen px-4 pt-4 pb-10 bg-background space-y-6'>
                <Calendar />
                {isContentLoading ? (
                    <div className="flex justify-center items-center my-48">
                        <Loader />
                    </div>
                ) : showAnalysis ? (
                    <div className="flex flex-col space-y-4">
                        {/* DIARY ANALYSIS HERE */}
                        {/* <DiaryAnalysis diaryId={currentDiaryId} /> */}
                        <DailyUserContent buttonOnClick={() => setShowAnalysis(false)} />
                    </div>
                ) : diaryExists ? (
                    <>
                        {/* <div className="flex justify-end items-center">
                        <button onClick={handleAnalysisButtonClick} disabled={isAnalysisLoading} className="flex justify-center items-center gap-1.5 bg-[#E6F4F1] border-[#7EC8D3] rounded-lg border-2 border-solid p-1 cursor-pointer">
                            <ChartArea className="w-4" /> <span className="text-center justify-start text-black text-sm font-semibold tracking-wide">                        {isAnalysisLoading ? (
                                <MoonLoader />
                            ) : isAnalyzed ? (
                                'View Analysis'
                            ) : (
                                'Analyze Diary'
                            )}</span>
                        </button>
                    </div> */}
                        <DailyUserDiary handleAnalysisButtonClick={handleAnalysisButtonClick} isAnalysisLoading={isAnalysisLoading} />
                        {errorMessage && (
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                                {errorMessage}
                            </div>
                        )}
                        {/* <Button
                        onClick={handleAnalysisButtonClick}
                        disabled={isAnalysisLoading}
                        className="bg-primary-hover text-white p-2 rounded hover:bg-primary"
                    >
                        {isAnalysisLoading ? (
                            <MoonLoader />
                        ) : isAnalyzed ? (
                            'View Analysis'
                        ) : (
                            'Analyze Diary'
                        )}
                    </Button> */}
                    </>
                ) : (
                    <EmptyDiary />
                )}
            </div>
        </>
    );
}

export default Diary;