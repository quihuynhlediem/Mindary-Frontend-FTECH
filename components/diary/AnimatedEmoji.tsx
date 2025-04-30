"use client";
import React, { useEffect, useState } from "react";
import Lottie, { LottieOptions, useLottie } from "lottie-react";
import depressEmoji from "@/public/emoji/depress.json";
import sadEmoji from "@/public/emoji/sad.json";
import okayEmoji from "@/public/emoji/okay.json";
import happyEmoji from "@/public/emoji/happy.json";
import happiestEmoji from "@/public/emoji/happiest.json";
// import { useAtomValue } from "jotai";
// import { diaryAtom } from "@/components/diary/DailyUserDiary";

import { Diaries } from "@/app/types/diary";
import useUserStore from "@/hooks/useUserStore";

const AnimatedEmoji = () => {
    const diary: Diaries = useUserStore((state) => state.diaries)
    const chosenDate: string | null = useUserStore((state) => state.selectedDate)

    const moodRating = diary[chosenDate!];

    const getEmojiAnimation = (rating: string) => {
        switch (rating) {
            case "1":
                return depressEmoji;
            case "2":
                return sadEmoji;
            case "3":
                return okayEmoji;
            case "4":
                return happyEmoji;
            case "5":
                return happiestEmoji;
            default:
                return happiestEmoji;
        }
    };

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: getEmojiAnimation(moodRating!),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    } as LottieOptions;

    const { View } = useLottie(defaultOptions);

    return (
        <div className="flex w-full justify-center items-center pb-3">
            <div className="size-48">{View}</div>
        </div>
    );
};

export default AnimatedEmoji;