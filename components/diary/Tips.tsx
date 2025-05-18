"use client";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useActiveMeditation } from "@/hooks/useActiveMeditation";
import { useMeditationPlayer } from "@/hooks/useMeditationPlayer";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CustomSlider, formatTime } from "../ui/audio-player";
import { cn } from "@/lib/utils";
// import Image from "next/image";

interface SymptomObject {
    name: string;
    risk: string;
    description: string;
    suggestions: string;
}

export interface MeditationDto {
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
    const { active, setActive, modalRef, getActiveMeditation } = useActiveMeditation();
    const activeMeditation = getActiveMeditation();
    const [expandedDescriptions, setExpandedDescriptions] = useState<string[]>([]);
    const {
        videoRef,
        isPlaying,
        progress,
        currentTime,
        duration,
        isShuffle,
        isRepeat,
        togglePlay,
        handleTimeUpdate,
        handleSeek,
        handleShuffle,
        handleRepeat,
        resetDuration
    } = useMeditationPlayer(activeMeditation);

    useOutsideClick(
        modalRef,
        () => setActive(null),
        resetDuration
    );

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

                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 h-full w-full z-10"
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <div className="fixed inset-0 grid place-items-center z-[100]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-white/70 backdrop-blur-sm h-full w-full"
                            />
                            <motion.div
                                ref={modalRef}
                                className="relative flex flex-col mx-auto rounded-3xl overflow-hidden bg-white shadow-xl p-6 w-[340px] max-w-[95vw] h-auto"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                    type: "spring",
                                    damping: 20,
                                }}
                            >
                                <audio
                                    ref={videoRef}
                                    onTimeUpdate={handleTimeUpdate}
                                    className="hidden"
                                />

                                <motion.div className="flex flex-col relative gap-y-4">
                                    {/* Cover Image with Gradient Overlay */}
                                    {active.picture_url && (
                                        <motion.div className="overflow-hidden rounded-2xl h-[200px] w-full relative">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10"></div>
                                            <img
                                                src={active.picture_url}
                                                alt={active.title || "Meditation cover"}
                                                className="object-cover w-full h-full transform scale-105 hover:scale-110 transition-transform duration-1000"
                                            />
                                        </motion.div>
                                    )}

                                    <motion.div className="flex flex-col w-full mt-1">
                                        {/* Title & Author */}
                                        <div className="mb-4">
                                            {active.title && (
                                                <motion.h3 className="text-neutral-900 font-bold text-xl">
                                                    {active.title}
                                                </motion.h3>
                                            )}
                                            {active.author && (
                                                <motion.p className="text-neutral-600 font-normal text-sm mt-1">
                                                    by {active.author}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Progress Slider */}
                                        <motion.div className="flex flex-col mb-4">
                                            <CustomSlider
                                                value={progress}
                                                onChange={handleSeek}
                                                className="w-full"
                                            />
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-neutral-600 text-xs font-medium">
                                                    {formatTime(currentTime)}
                                                </span>
                                                <span className="text-neutral-600 text-xs font-medium">
                                                    {formatTime(active.media_length)}
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Controls */}
                                        <motion.div className="flex items-center justify-center w-full mb-2">
                                            <div className="flex items-center justify-between w-full px-2 py-3">
                                                {/* Shuffle button */}
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShuffle();
                                                        }}
                                                        className={cn(
                                                            "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 h-10 w-10 rounded-full transition-colors",
                                                            isShuffle && "bg-neutral-100 text-neutral-800"
                                                        )}
                                                    >
                                                        <Shuffle className="h-5 w-5" />
                                                    </Button>
                                                </motion.div>

                                                {/* Main Controls Group */}
                                                <div className="flex items-center gap-3">
                                                    {/* SkipBack button */}
                                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 h-10 w-10 rounded-full"
                                                        >
                                                            <SkipBack className="h-5 w-5" />
                                                        </Button>
                                                    </motion.div>

                                                    {/* Play/Pause button */}
                                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                        <Button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                togglePlay();
                                                            }}
                                                            variant="default"
                                                            size="icon"
                                                            className="bg-primary hover:bg-primary/90 text-white h-14 w-14 rounded-full flex items-center justify-center shadow-md"
                                                        >
                                                            {isPlaying ? (
                                                                <Pause className="h-7 w-7" />
                                                            ) : (
                                                                <Play className="h-7 w-7 ml-1" />
                                                            )}
                                                        </Button>
                                                    </motion.div>

                                                    {/* SkipForward button */}
                                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 h-10 w-10 rounded-full"
                                                        >
                                                            <SkipForward className="h-5 w-5" />
                                                        </Button>
                                                    </motion.div>
                                                </div>

                                                {/* Repeat button */}
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRepeat();
                                                        }}
                                                        className={cn(
                                                            "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 h-10 w-10 rounded-full transition-colors",
                                                            isRepeat && "bg-neutral-100 text-neutral-800"
                                                        )}
                                                    >
                                                        <Repeat className="h-5 w-5" />
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </motion.div>

                                        {/* Description Toggle (Optional) - Uncomment if needed */}
                                        {/* {active.description && (
                    <motion.div className="mt-2 border-t border-neutral-200 pt-3">
                      <Button
                        variant="ghost"
                        className="text-sm text-neutral-700 w-full justify-start hover:bg-[#7EC8D3]/10 hover:text-[#7EC8D3] p-2 rounded-lg transition-colors"
                        onClick={() => toggleDescription(active._id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full border border-[#7EC8D3]/70 flex items-center justify-center">
                            {expandedDescriptions.includes(active._id) ? (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 15l-6-6-6 6" stroke="#7EC8D3" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            ) : (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9l6 6 6-6" stroke="#7EC8D3" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>
                          {expandedDescriptions.includes(active._id) ? "Hide Details" : "Show Details"}
                        </div>
                      </Button>
                      {expandedDescriptions.includes(active._id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 text-sm text-neutral-700 leading-relaxed px-3 py-2 bg-[#7EC8D3]/5 rounded-lg"
                        >
                          {active.description}
                        </motion.div>
                      )}
                    </motion.div>
                  )} */}
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    )
                    }
                </AnimatePresence >

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
                                            // href={med.media_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#7EC8D3] text-white rounded-full text-sm font-medium hover:bg-[#7EC8D3]/90 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActive(med)
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