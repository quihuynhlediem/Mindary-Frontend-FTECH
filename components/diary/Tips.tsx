"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { diaryAtom } from "./DailyUserDiary";
import { Recommendation } from "@/app/types/diary";

const tipsData = [
    {
        title: "Take a walk",
        description:
            "Take a stroll around the local area and meet with other people",
    },
    {
        title: "Connect with nature",
        description: "Spend time outdoors with the nature and fresh air",
    },
    {
        title: "Smile",
        description: "Put a smile on your face and start to feel more positive",
    },
];

const Tips = () => {
    const diary = useAtomValue(diaryAtom)!;

    const reccomendations = diary.data[0].recommendations;
    // console.log(diary);
    console.log(reccomendations);

    if (!reccomendations) {
        return <></>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <img src="/lightbulb.svg" alt="Lightbulb" className="mr-2" /> Meditation
                suggestions
            </h2>
            <div className="space-y-4">
                {reccomendations.map((rec, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <h3 className="text-lg font-bold">{rec.practice}</h3>
                        <p className="text-gray-600 text-body-1">
                            {rec.action.replaceAll("\\n*", "")}
                        </p>
                        <p className="text-gray-600 text-body-2">{rec.benefit}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;