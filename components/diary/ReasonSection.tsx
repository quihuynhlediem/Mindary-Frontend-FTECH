"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

// Define types
interface Correlation {
  name: string;
  term: string;
  description: string;
  bgColor: "bg-blue-100" | "bg-red-100" | "bg-orange-100" | "bg-purple-100";
}

interface CorrelationObject {
  name: string;
  description: string;
}

interface ReasonSectionProps {
  result: {
    correlationObjects: CorrelationObject[];
  } | null;
}

const ReasonSection: React.FC<ReasonSectionProps> = ({ result }) => {
  // Handle invalid or missing data
  if (
    !result ||
    !result.correlationObjects 
  ) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl font-bold mb-6">
          What may affect your emotion
        </h2>
        <p className="text-gray-600">No reasons available</p>
      </div>
    );
  }

  // Define color rotation
  const colors: Correlation["bgColor"][] = [
    "bg-blue-100",
    "bg-orange-100",
    "bg-red-100",
    "bg-purple-100",
  ];

  // Map correlation objects to reasons
  const reasons: Correlation[] = result.correlationObjects.map((c, idx) => {
    const [name = "Unknown", term = ""] = c.name?.split(" - ") || [];
    return {
      name,
      term,
      description: c.description || "No description provided",
      bgColor: colors[idx % colors.length], // Cycle through colors
    };
  });

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        What may affect your emotion
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`${reason.bgColor} p-4 rounded-lg flex flex-col items-center relative ${
              index === reasons.length - 1 && reasons.length % 2 !== 0
                ? "md:col-span-2"
                : ""
            }`}
          >
            <h3 className="text-xl font-semibold mb-2 text-left w-full">
              {reason.name}
            </h3>
            <div className="flex justify-between w-full">
              <p className="text-gray-600 mb-4">{reason.term}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="absolute bottom-2 right-2 hover:bg-gray-200 rounded-full p-1"
                  aria-label={`View details for ${reason.name}`}
                >
                  <Image
                    src="/toggle.svg"
                    alt="Toggle details"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 max-h-64 overflow-auto">
                <DropdownMenuLabel>{reason.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm">
                  {reason.description}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReasonSection;