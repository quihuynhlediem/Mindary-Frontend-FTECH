'use client'
import React from "react";
import { ChevronLeft, BotMessageSquare } from 'lucide-react';
import { useRouter } from "next/navigation";

interface PageProps {
  page: string;
}

const Header: React.FC<PageProps> = ({ page }) => {
  const router = useRouter();
  const handleOnclickChat = () => {
    router.replace('/chat');
  }
  const handleBackToHome = () => {
    router.replace('/');
  }
  return (
    <div className="w-full px-4 py-3 bg-[#FFFFFF] flex justify-start items-center">
      <div onClick={handleBackToHome} className="w-7 flex justify-end items-center gap-5">
        <div className="w-7 h-7 relative overflow-hidden">
          <ChevronLeft className="w-8" />
        </div>
      </div>
      <h1 className="flex-1 text-center justify-start text-black text-xl font-semibold font-sans leading-loose">{page}</h1>
      <div className="w-7 flex justify-end items-center gap-5">
        <button onClick={handleOnclickChat} className="flex justify-center items-center gap-1.5 bg-primary rounded-full p-2 cursor-pointer shadow-md">
          <BotMessageSquare className="text-white" />
          <span className="text-center justify-start text-white text-sm font-semibold tracking-wide">Chat</span>
        </button>
      </div>
    </div>
  )
}

export default Header;