"use client";
import React, { useState, useEffect } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import PersonalizedMessage from "./PersonalizedMessage";
import StatusMessage from "./StatusMessage";
import ReasonSection from "./ReasonSection";
import Tips from "./Tips";
import axios, { AxiosError } from "axios";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { format } from "date-fns";
import EmptyDiary from "./EmptyDiary";
import Loader from "../general/Loader";
import { Diaries, DiaryDto } from "@/app/types/diary";
import { ErrorResponse } from "@/app/types/diary";
import axiosInstance from "@/apiConfig";
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";

const diaryAtom = atom<Diaries>({});

const DailyUserContent = () => {
    const chosenDate = useUserStore((state) => state.selectedDate)
    const addDiary = useUserStore((state) => state.addDiary)
    const diaries = useUserStore((state) => state.diaries)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const accessToken = useAuthStore((set) => set.accessToken)
    const userId = useAuthStore((set) => set.userId)

    useEffect(() => {
        const req = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                setIsLoading(true)
                const res = await axiosInstance.get<DiaryDto>(
                    `/diaries/user/${userId}/${chosenDate}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        },
                    }
                );
                addDiary(format(res.data.createdAt, "yyyy-MM-dd"), res.data.content)
                // setDiaries((prevDiary) => ({ ...prevDiary, [format(res.data.createdAt, "yyyy-MM-dd")]: res.data.content }))
            } catch (error: any) {
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
    }, [chosenDate]);

    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    const currentDiary = diaries[chosenDate!];

    return currentDiary ? (
        <div>
            {currentDiary}
            {/* <AnimatedEmoji />
            <StatusMessage />
            <PersonalizedMessage />
            <ReasonSection />
            <Tips /> */}
            {/* {currentDiary} */}
        </div>
    ) : (
        <EmptyDiary />
    );
};

export default DailyUserContent;
export { diaryAtom };