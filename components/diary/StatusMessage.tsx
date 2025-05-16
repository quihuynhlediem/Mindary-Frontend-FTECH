"use client";

// Define the shape of the result prop
interface EmotionObject {
  emotionCategory: string[];
}

interface StatusMessageProps {
  result: {
    emotionObjects: EmotionObject[];
  } | null; // Allow null for error cases
}

const StatusMessage: React.FC<StatusMessageProps> = ({ result }) => {

  // Handle cases where result or emotionObjects is missing or invalid
  if (!result || !result.emotionObjects || result.emotionObjects.length === 0) {
    return (
      <div className="text-center text-2xl font-bold pb-3">
        <h2 className="text-headline-1">No mood data available</h2>
      </div>
    );
  }

  // Safely access emotionCategory and provide a fallback
  const emotionCategory = result.emotionObjects[0]?.emotionCategory || [];
  const moodDescriptions = Array.isArray(emotionCategory) && emotionCategory.length > 0
    ? emotionCategory.join(", ").toLowerCase()
    : "unknown";

  const description = `Today you feel ${moodDescriptions}`;

  return (
    <div className="text-center text-2xl font-bold pb-3">
      <h2 className="text-headline-1">{description}</h2>
    </div>
  );
};

// export default StatusMessage;