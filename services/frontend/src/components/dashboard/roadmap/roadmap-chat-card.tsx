import { Send } from "lucide-react";

export function RoadmapChatCard() {
  return (
    <div className="rounded-2xl sm:rounded-3xl custom-surface p-4 sm:p-6">

      <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full bg-primary-gradient flex items-center justify-center text-sm sm:text-base">
          🤖
        </div>

        <h3 className="font-bold text-base sm:text-lg lg:text-xl leading-snug">
          Ask About Your Roadmap
        </h3>
      </div>

      <div className="flex gap-2 sm:gap-3">

        <input
          placeholder="e.g. Why is integration first?"
          className="flex-1 h-10 sm:h-12 rounded-xl bg-background border border-border px-3 sm:px-4 text-sm outline-none placeholder:text-xs sm:placeholder:text-sm"
        />

        <button className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-primary-gradient flex items-center justify-center">
          <Send
            size={16}
            className="text-black sm:w-[18px] sm:h-[18px]"
          />
        </button>
      </div>
    </div>
  );
}