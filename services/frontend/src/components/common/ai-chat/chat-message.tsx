import React from "react";
import { User } from "lucide-react";
import logo from "@/assets/logo.png";

interface MessageProps {
  role: "ai" | "user";
  content: React.ReactNode;

  aiClassName?: string;
  userClassName?: string;
}

export function ChatMessage({
  role,
  content,
  aiClassName = "",
  userClassName = "",
}: MessageProps) {
  const isAI = role === "ai";

  return (
    <div
      className={`flex gap-4 items-end my-6 animate-in fade-in slide-in-from-bottom-2 ${isAI ? "justify-start" : "justify-end"
        }`}
    >
      {isAI && (
        <div className="w-6 h-6 sm:w-9 sm:h-9 shrink-0 rounded-full bg-primary-gradient flex items-center justify-center border border-cyan-500/10 overflow-hidden">
          <img src={logo} alt="AI" className="h-3 w-3 md:w-4 md:h-4" />
        </div>
      )}

      <div
        className={`p-3 border w-fit max-w-[75%] break-words text-xs md:text-base ${isAI
          ? `bg-[#27545A] text-white rounded-2xl rounded-tl-none border-cyan-500/10 ${aiClassName}`
          : `bg-primary-gradient text-black rounded-2xl rounded-tr-none border-indigo-500/20 ${userClassName}`
          }`}
      >
        {content}
      </div>

      {!isAI && (
        <div className="w-6 h-6 sm:w-9 sm:h-9 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary">
          <User size={16} className=" h-3 w-3 md:w-4 md:h-4" />
        </div>
      )}
    </div>
  );
}