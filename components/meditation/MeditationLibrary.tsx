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
    <div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              ref={modalRef}
              className="relative flex flex-col mx-auto rounded-3xl overflow-hidden bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm p-3 w-[280px] h-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: 0.1,
                type: "spring",
              }}
              layout
            >
              <audio
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                className="hidden"
              />

              <motion.div
                className="flex flex-col relative"
                layout
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Cover */}
                {active.picture_url && (
                  <motion.div className="bg-white/20 overflow-hidden rounded-[12px] h-[180px] w-full relative">
                    <img
                      src={active.picture_url}
                      alt="cover"
                      className="!object-cover w-full my-0 p-0 !mt-0 border-none !h-full"
                    />
                  </motion.div>
                )}

                <motion.div className="flex flex-col w-full gap-y-2">
                  {/* Title */}
                  {active.title && (
                    <motion.h3 className="text-white font-bold text-base text-center mt-1">
                      {active.title}
                    </motion.h3>
                  )}

                  {/* Slider */}
                  <motion.div className="flex flex-col gap-y-1">
                    <CustomSlider
                      value={progress}
                      onChange={handleSeek}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-white text-sm">
                        {formatTime(active.media_length)}
                      </span>
                    </div>
                  </motion.div>

                  {/* Controls */}
                  <motion.div className="flex items-center justify-center w-full">
                    <div className="flex items-center gap-2 w-fit bg-[#11111198] rounded-[16px] p-2">
                      {/* Shuffle button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShuffle();
                          }}
                          className={cn(
                            "text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full",
                            isShuffle && "bg-[#111111d1] text-white"
                          )}
                        >
                          <Shuffle className="h-5 w-5" />
                        </Button>
                      </motion.div>

                      {/* SkipBack button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                          className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                        >
                          <SkipBack className="h-5 w-5" />
                        </Button>
                      </motion.div>

                      {/* Play/Pause button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5" />
                          )}
                        </Button>
                      </motion.div>

                      {/* SkipForward button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}
                          className="text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full"
                        >
                          <SkipForward className="h-5 w-5" />
                        </Button>
                      </motion.div>

                      {/* Repeat button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRepeat();
                          }}
                          className={cn(
                            "text-white hover:bg-[#111111d1] hover:text-white h-8 w-8 rounded-full",
                            isRepeat && "bg-[#111111d1] text-white"
                          )}
                        >
                          <Repeat className="h-5 w-5" />
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                  {/* <motion.div>
                    <button onClick={() => setIsExpanded((state) => !state)} className={`text-white ${!isExpanded ? 'block' : 'hidden'}`}>Track detail</button>
                    {isExpanded && (
                      <div>
                        <h1 className="text-white">{active.description}</h1>
                      </div>
                    )}
                  </motion.div> */}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-start gap-4">
        {meditations.map((med: MeditationProp) => (
          <motion.div
            key={med._id}
            onClick={() => setActive(med)}
            className="mb-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-[16px] cursor-pointer"
          >
            <div className="flex gap-2 flex-col w-full">
              <motion.div
                className="relative"
                layoutId={`image-${med._id}`}
              >
                <img
                  width={500}
                  height={100}
                  src={med.picture_url}
                  alt={med.title}
                  className="h-60 w-full rounded-[16px] object-cover object-top"
                />
                <div
                  className="bg-black/50 w-fit absolute bottom-1 left-1 text-white text-xs font-semibold px-2 py-1 rounded-full"
                >
                  <p>
                    {med.media_length >= 3600
                      ? `${Math.floor(med.media_length / 3600)} hour`
                      : `${Math.floor(med.media_length / 60)} min`}
                  </p>
                </div>
              </motion.div>
              <div className="flex justify-center flex-col">
                <motion.h3
                  layoutId={`title-${med._id}`}
                  className="text-lg font-bold text-neutral-800 dark:text-neutral-200 text-left"
                >
                  {med.title}
                </motion.h3>
                <motion.p
                  layoutId={`author-${med._id}`}
                  className="text-xs font-normal text-neutral-600 dark:text-neutral-400 text-left"
                >
                  by {med.author}
                </motion.p>

                {/* Truncated description with See More/See Less toggle */}
                <motion.div>
                  {med.description && (
                    <>
                      <motion.p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                        {med.description.length > 50 ? (
                          <>
                            {expandedDescriptions.includes(med._id)
                              ? med.description
                              : `${med.description.substring(0, 50)}...`}
                          </>
                        ) : (
                          med.description
                        )}
                      </motion.p>
                      {med.description.length > 50 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescription(med._id);
                          }}
                          className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1 hover:underline"
                        >
                          {expandedDescriptions.includes(med._id) ? "See Less" : "See More"}
                        </button>
                      )}
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
      <div
        ref={observerRef}
        className="w-full flex justify-center items-center h-20 mt-4"
      >
        <p className={`animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 ${hasMore ? 'block' : 'hidden'}`}></p>
      </div>
    </div>
  );
}