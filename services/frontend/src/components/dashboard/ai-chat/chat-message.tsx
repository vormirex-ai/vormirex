import React from "react";
import { Bot, User } from "lucide-react";

interface MessageProps {
  role: "ai" | "user";
  content: React.ReactNode;
}

export function ChatMessage({ role, content }: MessageProps) {
  return (
    <div
      className={`flex gap-4 items-end my-6 animate-in fade-in slide-in-from-bottom-2 ${role === "user" ? "justify-end" : "justify-start"
        }`}
    >
      {role === "ai" && (
        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-primary-gradient flex items-center justify-center border border-cyan-500/10">
          <Bot
            size={16}
            className="text-white sm:w-5 sm:h-5"
          />
        </div>
      )}


      <div
        className={`px-5 py-4 border w-fit max-w-[75%] break-words text-xs md:text-base ${role === "ai"
          ? "rounded-2xl rounded-tl-none dark:bg-card border-cyan-500/10"
          : "rounded-2xl rounded-tr-none bg-primary-gradient border-indigo-500/20 text-black"
          }`}
      >
        {content}
      </div>


      {role === "user" && (
        <div className="w-8 h-8 sm:w-10 sm:h-10  shrink-0 rounded-full bg-primary-gradient flex items-center justify-center border border-cyan-500/10">
          <User

            size={16}
            className="text-black sm:w-5 sm:h-5" />
        </div>
      )}
    </div>
  );
}