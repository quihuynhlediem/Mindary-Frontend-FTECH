'use client'
import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axiosInstance from "@/apiConfig";
import useAuthStore from "@/hooks/useAuthStore";
import { subDays, addDays, isAfter } from "date-fns";
import axios from "axios";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Loader from "../general/Loader";

const MoodChart = () => {
  const { accessToken, userId } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const today = new Date();
  const [endDate, setEndDate] = useState<Date>(today);
  const [emotionLevel, setEmotionLevel] = useState<number[]>([]);

  const generateLastSevenDays = (selectedDate: string | null) => {
    // If selectedDate is null, use current date
    const currDate = selectedDate ? new Date(selectedDate) : new Date();

    // Create an array to store the day strings
    const lastSevenDays: string[] = [];
    const labels: string[] = [];

    // Loop through the last 7 days (including the current date)
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currDate);
      // Subtract i days from the current date
      date.setDate(date.getDate() - i);
      // Get only the day part
      const day = date.getDate().toString();
      const formattedDate = date.toISOString().split('T')[0];
      labels.push(day);
      lastSevenDays.push(formattedDate);
    }

    return labels;

    // return { lastSevenDays: lastSevenDays, labels: labels }
  }

  const dayLabels = generateLastSevenDays(endDate.toISOString());
  const [dateLabel, setDateLabel] = useState<string[]>(dayLabels);
  const handlePrevious = () => {
    setEndDate((prev) => subDays(prev, 7));
    setDateLabel(generateLastSevenDays(endDate.toISOString()));
  };

  // Slide to next 5 days, but not beyond today
  const handleNext = () => {
    const newEndDate = addDays(endDate, 7);
    // Prevent moving past today
    if (!isAfter(newEndDate, today)) {
      setEndDate(newEndDate);
    } else {
      setEndDate(today); // Snap back to today if overshooting
    }
    setDateLabel(generateLastSevenDays(endDate.toISOString()));
  };

  // Disable next button if endDate is today
  const isNextDisabled = !isAfter(today, endDate);

  const fetchEmotionLevel = useCallback(async () => {
    if (!userId || !accessToken) {
      setErrorMessage("Missing user ID, token, or date");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await axiosInstance.get(
        `/diary/emotionlevel/${userId}/${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEmotionLevel(res.data.emotionLevels);
    } catch (error: unknown) {
      console.error("Failed to fetch diary:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          "Failed to fetch diary"
        );
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, accessToken, endDate]);

  useEffect(() => {
    fetchEmotionLevel();
  }, [fetchEmotionLevel])

  //Handle loading
  if (isLoading) {
    return <Loader />
  }

  //Handle error
  if (errorMessage) {
    return (
      <div className="text-center py-4 text-red-500">
        <p>{errorMessage}</p>
        <button
          className="mt-2 text-blue-500 hover:underline"
          onClick={fetchEmotionLevel}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 px-4 py-4 bg-white rounded-lg flex flex-col justify-start items-center gap-4">
        <div className="text-black text-xl font-bold font-sans leading-7 self-start">Mood Chart</div>
        <div className="self-stretch h-0 relative">
          <div className="w-[100%] h-0 left-0 top-0 absolute outline outline-1 outline-offset-[-0.50px] outline-[#EEEEEE]"></div>
        </div>
        <div className="self-stretch inline-flex justify-between items-center">
          <button onClick={handlePrevious} className="w-6 h-6 relative">
            <ChevronLeft className="w-8" />
          </button>
          <div className="flex-1 text-center justify-center text-Text-General-Text-Light text-lg font-semibold font-sans leading-relaxed">
            {new Date(subDays(endDate, 6)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <button onClick={handleNext} disabled={isNextDisabled} className="w-6 h-6 relative">
            <ChevronRight className="w-8" />
          </button>
        </div>

        {/* Chart Main Part */}
        <div>
          <BarChart dateLabel={dateLabel} emotionLevel={emotionLevel} />
        </div>
      </div>
      <div className="mx-4 px-4 py-4 bg-white rounded-lg flex flex-col justify-start items-center gap-4">
        <div className="text-black text-xl font-bold font-sans leading-7 self-start">Mood Chart</div>
        <div className="self-stretch h-0 relative">
          <div className="w-[100%] h-0 left-0 top-0 absolute outline outline-1 outline-offset-[-0.50px] outline-[#EEEEEE]"></div>
        </div>
        <div className="self-stretch inline-flex justify-between items-center">
          <button onClick={handlePrevious} className="w-6 h-6 relative">
            <ChevronLeft className="w-8" />
          </button>
          <div className="flex-1 text-center justify-center text-Text-General-Text-Light text-lg font-semibold font-sans leading-relaxed">
            {new Date(subDays(endDate, 6)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <button onClick={handleNext} disabled={isNextDisabled} className="w-6 h-6 relative">
            <ChevronRight className="w-8" />
          </button>
        </div>

        {/* Chart Main Part */}
        <div>
          <LineChart dateLabel={dateLabel} emotionLevel={emotionLevel} />
        </div>
      </div></>)
}

export default MoodChart;