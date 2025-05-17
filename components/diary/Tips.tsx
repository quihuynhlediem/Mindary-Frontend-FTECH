"use client";
import React from "react";
// import Image from "next/image";

interface SymptomObject {
    name: string;
    risk: string;
    description: string;
    suggestions: string;
}

interface RecommendationSectionProps {
    result: {
        symptomObjects: SymptomObject[];
    } | null;
}

// const tipsData = [
//     {
//         title: "Take a walk",
//         description:
//             "Take a stroll around the local area and meet with other people",
//     },
//     {
//         title: "Connect with nature",
//         description: "Spend time outdoors with the nature and fresh air",
//     },
//     {
//         title: "Smile",
//         description: "Put a smile on your face and start to feel more positive",
//     },
// ];

const Tips: React.FC<RecommendationSectionProps> = ({ result }) => {

    const symptoms = result?.symptomObjects;
    console.log(symptoms);

    if (!symptoms) {
        return <></>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                Symptoms and suggestions
            </h2>
            <div className="space-y-4">
                {symptoms.map((symptom, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <h3 className="text-lg font-bold">{symptom.name}</h3>
                        <p className="text-justify text-gray-600 text-body-1">
                            {symptom.description.replaceAll("\\n*", "")}
                        </p>
                        <p className="text-justify text-gray-600 text-body-2">{symptom.suggestions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;