"use client";

import { MeditationProp } from "@/app/types/meditation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CustomSlider, formatTime } from "@/components/ui/audio-player";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import our custom hooks
import { useMeditationData } from "@/hooks/useMeditationData";
import { useMeditationPlayer } from "@/hooks/useMeditationPlayer";
import { useActiveMeditation } from "@/hooks/useActiveMeditation";
import DetailCard from "@/components/meditation/DetailCard";

export default function MeditationLibrary(accessToken: { accessToken: string | null }) {
  const { meditations, loading, hasMore, setMeditations, observerRef } = useMeditationData(accessToken);
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
  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-primary min-h-screen dark:bg-neutral-900 m-0 p-6">
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
              className="fixed inset-0 bg-black/70 backdrop-blur-sm h-full w-full"
            />
            <motion.div
              ref={modalRef}
              className="relative flex flex-col mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 shadow-2xl backdrop-blur-md p-6 w-[340px] max-w-[95vw] h-auto"
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
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
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
                      <motion.h3 className="text-white font-bold text-xl">
                        {active.title}
                      </motion.h3>
                    )}
                    {active.author && (
                      <motion.p className="text-neutral-300 font-normal text-sm mt-1">
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
                      <span className="text-neutral-300 text-xs font-medium">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-neutral-300 text-xs font-medium">
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
                            "text-neutral-300 hover:bg-neutral-700 hover:text-white h-10 w-10 rounded-full transition-colors",
                            isShuffle && "bg-neutral-700 text-white"
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
                            className="text-white hover:bg-neutral-700 hover:text-white h-10 w-10 rounded-full"
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
                            className="bg-primary hover:bg-primary/90 text-white h-14 w-14 rounded-full flex items-center justify-center"
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
                            className="text-white hover:bg-neutral-700 hover:text-white h-10 w-10 rounded-full"
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
                            "text-neutral-300 hover:bg-neutral-700 hover:text-white h-10 w-10 rounded-full transition-colors",
                            isRepeat && "bg-neutral-700 text-white"
                          )}
                        >
                          <Repeat className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Description Toggle (Optional) */}
                  {/* {active.description && (
                    <motion.div className="mt-2 border-t border-neutral-700 pt-3">
                      <Button
                        variant="ghost"
                        className="text-sm text-neutral-300 w-full justify-start hover:bg-[#7EC8D3]/20 hover:text-[#7EC8D3] p-2 rounded-lg transition-colors"
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
                          className="mt-2 text-sm text-neutral-300 leading-relaxed px-3 py-2 bg-[#7EC8D3]/10 rounded-lg"
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

      {/* Replace the meditation card grid with this improved version */}
      <ul className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meditations.map((med: MeditationProp) => (
          <motion.div
            key={med._id}
            onClick={() => setActive(med)}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 15px 30px -10px rgba(0, 165, 227, 0.15)",
              y: -3
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-3 flex flex-col bg-white dark:bg-neutral-800 rounded-2xl cursor-pointer shadow-sm hover:shadow-lg border border-transparent hover:border-[#7EC8D3]/30 dark:hover:border-[#7EC8D3]/20 transition-all duration-300 group"
          >
            <div className="flex gap-3 flex-col w-full">
              <motion.div className="relative overflow-hidden rounded-xl">
                {/* Play overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#00A5E3]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center">
                  <div className="bg-white dark:bg-[#212429] rounded-full p-3 translate-y-12 group-hover:translate-y-[-20px] transition-transform duration-300 shadow-lg">
                    <Play className="h-7 w-7 text-[#00A5E3]" />
                  </div>
                </div>

                <img
                  width={500}
                  height={100}
                  src={med.picture_url}
                  alt={med.title}
                  className="h-60 w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="bg-[#212429]/80 backdrop-blur-sm w-fit absolute top-3 left-3 text-white text-xs font-medium px-4 py-1.5 rounded-full border border-[#7EC8D3]/20">
                  <p>
                    {med.media_length >= 3600
                      ? `${Math.floor(med.media_length / 3600)} hr ${Math.floor((med.media_length % 3600) / 60)} min`
                      : `${Math.floor(med.media_length / 60)} min`}
                  </p>
                </div>

              </motion.div>

              <div className="flex justify-center flex-col pt-2 px-1">
                <motion.h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-[#00A5E3] transition-colors duration-300">
                  {med.title}
                </motion.h3>
                <motion.p className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
                  by <span className="text-[#7EC8D3] font-bold">{med.author}</span>
                </motion.p>

                {/* Description with improved toggle */}
                <motion.div className="mt-2">
                  {med.description && (
                    <>
                      <motion.p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {med.description.length > 20 ? (
                          <>
                            {expandedDescriptions.includes(med._id)
                              ? med.description
                              : `${med.description.substring(0, 50)}...`}
                          </>
                        ) : (
                          med.description
                        )}
                      </motion.p>
                      {med.description.length > 20 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescription(med._id);
                          }}
                          className="mt-2 px-3 py-1 text-xs font-medium hover:font-bold text-[#00A5E3] bg-[#7EC8D3]/10 rounded-md inline-flex items-center gap-1 transition-all duration-200"
                        >
                          {expandedDescriptions.includes(med._id) ? "See Less" : "Read More"}
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {expandedDescriptions.includes(med._id)
                              ? <path d="M18 15l-6-6-6 6" />
                              : <path d="M6 9l6 6 6-6" />}
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Progress indicator for in-progress meditations */}
            <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7EC8D3] to-[#00A5E3] rounded-full" style={{ width: '0%' }}></div>
            </div>
          </motion.div>
        ))}
      </ul>
      {/* Updated loader */}
      <div
        ref={observerRef}
        className="w-full flex justify-center items-center h-20 mt-4"
      >
        {hasMore && (
          <div className="flex flex-col items-center">
            <div className="relative h-10 w-10">
              <div className="animate-ping absolute inset-0 bg-[#00A5E3]/30 rounded-full"></div>
              <div className="animate-spin relative rounded-full h-8 w-8 border-b-2 border-[#00A5E3]"></div>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">Loading more...</p>
          </div>
        )}
      </div>
    </div >
  );
}