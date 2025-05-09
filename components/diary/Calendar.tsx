"use client";
import React, { useState } from "react";
import { format, subDays, addDays, isAfter } from "date-fns";
import { useRouter } from "next/navigation";
import useUserStore from "@/hooks/useUserStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const Calendar = () => {
    const today = new Date();
    const router = useRouter();
    const selectedDate = useUserStore((state) => state.selectedDate);
    const setSelectedDate = useUserStore((state) => state.setSelectedDate);
    const [endDate, setEndDate] = useState<Date>(today);

    // Generate 5 days ending with endDate
    const days = Array.from({ length: 5 }).map((_, i) =>
        subDays(endDate, 4 - i)
    );

    // Handle user choose to view a date
    const handleDayClick = (date: string) => {
        setSelectedDate(date);
        router.push(`/diary/${date}`)
    };

    // Slide to previous 5 days
    const handlePrevious = () => {
        setEndDate((prev) => subDays(prev, 5));
    };

    // Slide to next 5 days, but not beyond today
    const handleNext = () => {
        const newEndDate = addDays(endDate, 5);
        // Prevent moving past today
        if (!isAfter(newEndDate, today)) {
            setEndDate(newEndDate);
        } else {
            setEndDate(today); // Snap back to today if overshooting
        }
    };

    // Disable next button if endDate is today
    const isNextDisabled = !isAfter(today, endDate);

    return (
        <div className="flex flex-col items-center my-4 w-full">
            <div className="grid grid-cols-7 w-full gap-1 items-center">
                {/* Left Arrow */}
                <button
                    onClick={handlePrevious}
                    className="p-2 rounded-full bg-transparent hover:bg-gray-200 flex justify-center items-center"
                >
                    <ChevronLeft className="text-primary w-6 h-6" />
                </button>

                {/* Dates */}
                {days.map((day, index) => {
                    const dayKey = format(day, "yyyy-MM-dd");
                    const isFuture = isAfter(day, today);
                    return (
                        <div
                            key={index}
                            onClick={() => {
                                if (!isFuture) {
                                    handleDayClick(dayKey);
                                }
                            }}
                            className={`px-2 py-2 text-center rounded-lg ${isFuture
                                ? "bg-gray-100 text-black cursor-not-allowed"
                                : "cursor-pointer"
                                } ${dayKey === selectedDate && !isFuture
                                    ? "bg-primary font-bold text-white"
                                    : " text-black font-bold"
                                } ${dayKey !== selectedDate && !isFuture && "hover:bg-gray-300"}`}
                        >
                            {format(day, "dd")}
                            <br />
                            {format(day, "EEE")}
                        </div>
                    );
                })}

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className={`p-2 bg-transparent rounded-full flex justify-center items-center ${isNextDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                        }`}
                    disabled={isNextDisabled}
                >
                    <ChevronRight className="text-primary w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Calendar;