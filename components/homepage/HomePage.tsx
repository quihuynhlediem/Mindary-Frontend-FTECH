"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface DoYouRememberProps {
  title: string;
  description: string;
}

const DoYouRemember: React.FC<DoYouRememberProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 bg-white rounded-[32px] overflow-hidden shadow-lg w-[90%] max-w-[400px] p-4">
      <div className="text-[#7ec8d3] font-semibold text-lg text-center">
        {title}
      </div>
      <p className="text-black font-medium text-base mt-2 text-center">
        {description}
      </p>
      <img className="w-10 h-10 mt-4" alt="Chat Icon" src="/chatbot.svg" />
    </div>
  );
};

const Streak = () => {
  return (
    <div className="bg-white rounded-[32px] shadow-md p-4 flex flex-col items-center justify-between mt-4 w-[90%] max-w-[450px] hover:bg-gray-50">
      <div className="flex justify-start items-center gap-2 pb-4">
        <img src="/fire.svg" alt="Streak" className="w-15 h-15" />
        <span className="font-bold text-xl">11 days streak</span>
      </div>
      <div className="flex gap-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
          <div
            key={day}
            className="w-8 h-8 bg-[#e6f4f1] rounded-full flex items-center justify-center text-sm"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="w-full px-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mt-4">Welcome Back!</h1>
          <h2 className="text-xl text-[#69a8b2] font-bold">MY BELOVED USER</h2>
        </div>
        <img alt="notification" src="/notification.svg" className="w-10 h-10" />
      </div>

      <div className="bg-[#e6f4f1] rounded-[32px] shadow-lg p-6 mt-6 w-[90%] max-w-[400px] flex flex-col items-center">
        <p className="text-xl font-bold text-center">
          How are you feeling today?
        </p>
        <div className="mt-2 text-center text-lg">Can you tell me...</div>
        <button
          onClick={() => {
            push("/diary/input");
          }}
          className="bg-[#7ec8d3] rounded-2xl mt-4 py-3 px-6 text-white font-medium flex items-center gap-2 cursor-pointer"
        >
          Go to my journal
          <img alt="Open Icon" src="/whiteToggle.svg" className="w-6 h-6" />
        </button>
      </div>

      <Streak />

      <div className="grid grid-cols-3 gap-4 mt-6 w-[90%] max-w-[400px]">
        <Card
          title="Track your mood"
          description="discover what truly drives your day"
          iconSrc="/sakura.svg"
        />
        <Card
          title="Practice meditation"
          description="improve your negative feelings"
          iconSrc="/meditation.svg"
        />
        <Card title="Add Functions" iconSrc="/addFunction.svg" />
      </div>

      <DoYouRemember
        title="Do you remember..."
        description="A year ago, you became the youngest Head of Technology Department of FinTech Club. Great job girl!"
      />
    </div>
  );
}

interface CardProps {
  title: string;
  description?: string;
  iconSrc: string;
}

const Card: React.FC<CardProps> = ({ title, description, iconSrc }) => {
  return (
    <div className="flex flex-col items-center bg-white rounded-[30.35px] shadow-md p-4">
      <img alt={title} src={iconSrc} className="w-15 h-15 " />
      <div className="text-sm font-semibold mt-2 text-center">{title}</div>
      {description && (
        <p className="text-xs text-[#7ec8d3] mt-1 text-center">{description}</p>
      )}
    </div>
  );
};