"use client";
import React, { useState, useEffect } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import PersonalizedMessage from "./PersonalizedMessage";
import StatusMessage from "./StatusMessage";
import ReasonSection from "./ReasonSection";
import Tips from "./Tips";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import EmptyDiary from "./EmptyDiary";
import Loader from "../general/Loader";
import { Diaries, DiaryDto } from "@/app/types/diary";
import { ErrorResponse } from "@/app/types/diary";
import axiosInstance from "@/apiConfig";
import useUserStore from "@/hooks/useUserStore";
import useAuthStore from "@/hooks/useAuthStore";


const DailyUserContent = () => {
    const selectedDate = useUserStore((state) => state.selectedDate);
    const setSelectedDate = useUserStore((state) => state.setSelectedDate);
    const [diaries, setDiaries] = useState<Array<object>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const accessToken = useAuthStore((state) => state.accessToken);
    const userId = useAuthStore((state) => state.userId);

    useEffect(() => {
        const req = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                setIsLoading(true)
                const res = await axiosInstance.get<DiaryDto>(
                    `/diaries/user/${userId}/${selectedDate}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        },
                    }
                );

                setDiaries((prevDiary) => ({ ...prevDiary, [format(res.data.createdAt, "yyyy-MM-dd")]: res.data.content }))
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    if (axiosError.response?.data) {
                        setErrorMessage(axiosError.response.data.message)
                    }
                }
            } finally {
                setIsLoading(false)
            }
        };

        req();
    }, [selectedDate]);

    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    // const currentDiary = diaries[selectedDate || 0];
    const currentDiary = null;

    return currentDiary ? (
        <div>
            {currentDiary}
            <AnimatedEmoji />
            <StatusMessage />
            <PersonalizedMessage />
            <ReasonSection />
            <Tips />
        </div>
    ) : (
        <EmptyDiary />
    );
};

export default DailyUserContent;