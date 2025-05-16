"use client";

import React, { useState } from "react";
import OnboardingStep from "./OnboardingStep";
import { cn } from "@/lib/utils";
import WheelPicker from "../general/WheelPicker";
import { Button } from "../ui/button";

interface SelectPreferTimeProps {
    title: string,
    description: string,
    reminderHour: string,
    setReminderHour: (value: string) => void;
    reminderMinute: string;
    setReminderMinute: (value: string) => void;
    ampm: "AM" | "PM";
    setAmpm: (value: "AM" | "PM") => void;
}

const SelectPreferTime: React.FC<SelectPreferTimeProps> = ({
    title,
    description,
    reminderHour,
    setReminderHour,
    reminderMinute,
    setReminderMinute,
    ampm,
    setAmpm
}) => {
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    return (
        <OnboardingStep title={title} description={description}>
            <div className="flex items-center justify-center space-x-6 w-full">
                {/* Hour Picker */}
                <div className="w-1/4">
                    <WheelPicker
                        data={hours}
                        selectedValue={reminderHour}
                        onValueChange={setReminderHour}
                        height={200}
                        itemHeight={40}
                    />
                </div>

                <span className="text-3xl font-bold text-primary mb-2">:</span>

                {/* Minute Picker */}
                <div className="w-1/4">
                    <WheelPicker
                        data={minutes}
                        selectedValue={reminderMinute}
                        onValueChange={setReminderMinute}
                        height={200}
                        itemHeight={40}
                    />
                </div>

                {/* AM/PM Toggle */}
                <div className="flex flex-col space-y-2">
                    <Button
                        className={cn(
                            "w-16 p-2 text-lg font-semibold rounded transition",
                            ampm === "AM" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                        )}
                        onClick={() => setAmpm("AM")}
                    >
                        AM
                    </Button>

                    <Button
                        className={cn(
                            "w-16 p-2 text-lg font-semibold rounded transition",
                            ampm === "PM" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                        )}
                        onClick={() => setAmpm("PM")}
                    >
                        PM
                    </Button>
                </div>
            </div>
        </OnboardingStep>
    );
};

export default SelectPreferTime;
