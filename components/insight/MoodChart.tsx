'use client'
import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axiosInstance from "@/apiConfig";
import useAuthStore from "@/hooks/useAuthStore";
import { subDays, addDays, isAfter } from "date-fns";
import axios from "axios";

// interface MoodChartProps {
//   label: string[] | null,
// }

// Import for chartjs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const emojiIcons = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
];

emojiIcons[0].src = '/bad-mood.svg';
emojiIcons[1].src = '/not-good-mood.svg';
emojiIcons[2].src = '/okay-mood.svg';
emojiIcons[3].src = '/good-mood.svg';
emojiIcons[4].src = '/great-mood.svg';

// Plugin to draw emoji icons on y-axis
const customYAxisIconPlugin: Plugin = {
  id: 'customYAxisIconPlugin',
  afterDraw(chart) {
    const yAxis = chart.scales['y'];
    console.log(yAxis);
    const ctx = chart.ctx;
    console.log(ctx);

    yAxis.ticks.forEach((tick, index) => {
      const y = yAxis.getPixelForTick(index);
      const icon = emojiIcons[tick.value - 1 as number];

      if (icon && icon.complete) {
        ctx.drawImage(icon, yAxis.left + 3, y - 10, 20, 20); // Adjust position and size
      }
    });
  }
};

export const options = {
  responsive: true,
  scales: {
    y: {
      min: 1,
      max: 5,
      ticks: {
        display: true,
        callback: (val: number) => "  " + val,
      },
      grid: {
        display: true,
        drawBorder: false,
      }
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

export const plugins = [customYAxisIconPlugin];

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

  return (
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
        <Bar options={options} plugins={plugins} data={{
          labels: dateLabel, datasets: [
            {
              label: 'Emotion Level',
              data: emotionLevel,
              backgroundColor: (context: any) => {
                const value = context.dataset.data[context.dataIndex];
                // console.log(context.dataIndex, value);
                switch (value) {
                  case 1:
                    return "#F54336";
                  case 2:
                    return "#FF981F";
                  case 3:
                    return "#FFC02D";
                  case 4:
                    return "#7EC8D3";
                  case 5:
                    return "#00A5E3";
                }
              },
              borderRadius: Number.MAX_VALUE
            },]
        }} />
      </div>
    </div>)
}

export default MoodChart;