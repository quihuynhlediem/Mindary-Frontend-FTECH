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
import { selectedDateAtom } from "./Calendar";
import EmptyDiary from "./EmptyDiary";
import Loader from "../general/Loader";
import { Diaries, DiaryDto } from "@/app/types/diary";
import { ErrorResponse } from "@/app/types/diary";
import { accessTokenAtom, refreshTokenAtom, userIdAtom } from "@/app/login/page";
import axiosInstance from "@/apiConfig";

const diaryAtom = atom<Diaries>({});

const DailyUserContent = () => {
    const date = useAtomValue(selectedDateAtom);
    const [diaries, setDiaries] = useAtom(diaryAtom);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const accessToken = useAtomValue(accessTokenAtom)
    const userId = useAtomValue(userIdAtom)

    useEffect(() => {
        const req = async () => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                setIsLoading(true)
                const res = await axiosInstance.get<DiaryDto>(
                    `/diaries/user/${userId}/${date}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        },
                    }
                );

                setDiaries((prevDiary) => ({ ...prevDiary, [format(res.data.createdAt, "yyyy-MM-dd")]: res.data.content }))
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
    }, [date]);

    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    const currentDiary = diaries[date];

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