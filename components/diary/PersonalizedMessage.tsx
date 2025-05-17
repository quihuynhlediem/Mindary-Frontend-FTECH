"use client";

import React from "react";
import Excerpt from "@/components/Excerpt";

// Define the shape of the result prop
interface EmotionObject {
  emotionSummary: string;
}

interface PersonalizedMessageProps {
  result: {
    emotionObjects: EmotionObject[];
  } | null; // Allow null for error cases
}

const PersonalizedMessage: React.FC<PersonalizedMessageProps> = ({ result }) => {
  // Handle cases where result or emotionObjects is missing or invalid
  if (!result || !result.emotionObjects || result.emotionObjects.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-lg text-body-1">No summary available</p>
      </div>
    );
  }

  // Safely access emotionSummary with a fallback
  const emotionSummary = result.emotionObjects[0]?.emotionSummary || "No summary provided";

  return (
    <div className="text-justify py-4">
      <div className="text-lg text-body-1">
        <Excerpt text={emotionSummary} />
      </div>
    </div>
  );
};

export default PersonalizedMessage;