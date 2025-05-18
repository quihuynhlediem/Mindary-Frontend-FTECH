"use client";
import React from "react";
// import Image from "next/image";

interface SymptomObject {
    name: string;
    risk: string;
    description: string;
    suggestions: string;
}

interface MeditationDto {
    title: string,
    author: string,
    media_url: string,
    media_length: number,
    picture_url: string,
    intention: string,
}

interface RecommendationSectionProps {
    result: {
        symptomObjects: SymptomObject[];
    } | null;
    meditation: MeditationDto[] | null
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

const Tips: React.FC<RecommendationSectionProps> = ({ result, meditation }) => {

    const symptoms = result?.symptomObjects;
    console.log(symptoms);
    console.log(meditation);

    if (!symptoms) {
        return <></>;
    }

    return (
        <div className="p-0">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                Suggestions
            </h2>
            <div className="space-y-4">
                {symptoms.map((symptom, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 border border-gray-200"
                    >
                        <h3 className="text-lg font-bold">{symptom.name}</h3>
                        {/* <p className="text-justify text-gray-600 text-body-1">
                            {symptom.description.replaceAll("\\n*", "")}
                        </p> */}
                        <p className="text-justify text-gray-600 text-body-2">{symptom.suggestions}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    Recommended Meditations
                </h2>

                {meditation && meditation.length > 0 ? (
                    <div className="space-y-4">
                        {meditation.map((med, index) => (
                            <div
                                key={`meditation-${index}`}
                                className="flex flex-col gap-2 bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:border-[#7EC8D3] transition-colors duration-200"
                            >
                                <div className="flex items-start">
                                    {med.picture_url && (
                                        <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                                            <img 
                                                src={med.picture_url} 
                                                alt={med.title} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-neutral-800">{med.title}</h3>
                                        <p className="text-sm text-gray-500">by {med.author}</p>

                                        {med.media_length && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {Math.floor(med.media_length / 60)} min
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {med.intention && (
                                    <p className="text-sm text-gray-600 mt-2 border-t border-gray-100 pt-2">
                                        {med.intention}
                                    </p>
                                )}
                                
                                {/* Add media URL link */}
                                {med.media_url && (
                                    <div className="mt-3 flex justify-end">
                                        <a 
                                            href={med.media_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7EC8D3] text-white rounded-full text-sm font-medium hover:bg-[#7EC8D3]/90 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <svg 
                                                width="16" 
                                                height="16" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="stroke-current"
                                            >
                                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                                <path d="M15.5 12L10.5 15.5V8.5L15.5 12Z" fill="currentColor" stroke="none" />
                                            </svg>
                                            Listen Now
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No meditation recommendations available.</p>
                )}
            </div>
        </div>
    );
};

export default Tips;