import React from "react";

interface BadgeProps {
  emoji: string;
  title: string;
  unlocked: boolean;
}

function AchievementBadge({ emoji, title, unlocked }: BadgeProps) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 border transition-all duration-200 aspect-square ${unlocked
        ? "dark:bg-[#154249]  border border-cyan-500/10 shadow-md dark:text-slate-200 text-slateText "
        : "dark:bg-[#154249]/100 border-slate-900/40 opacity-20 dark:text-slate-300  text-slateText select-none"
        }`}
    >
      <span className={`text-2xl filter ${!unlocked && "grayscale saturate-0"}`}>
        {emoji}
      </span>
      <span className="text-[10px] font-bold tracking-wider uppercase max-w-[80px] leading-tight">
        {title}
      </span>
    </div>
  );
}

export function BadgesSection() {
  const achievements = [
    { emoji: "🔥", title: "10-Day Streak", unlocked: true },
    { emoji: "🎯", title: "Quiz Master", unlocked: true },
    { emoji: "📚", title: "Fast Learner", unlocked: true },
    { emoji: "💬", title: "AI Explorer", unlocked: true },
    { emoji: "⭐", title: "Top Student", unlocked: false },
    { emoji: "🔬", title: "Science Buff", unlocked: false },
    { emoji: "🏅", title: "100-Day Streak", unlocked: false },
    { emoji: "👑", title: "Legend", unlocked: false },
  ];

  return (
    <div className="w-full flex flex-col gap-3 h-full">
      <div className="flex items-center gap-2 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
        <span>🥇</span> Badges Earned
      </div>
      <div className="custom-surface rounded-2xl p-5 shadow-xl grid grid-cols-4 gap-3 flex-1 items-center">
        {achievements.map((badge, idx) => (
          <AchievementBadge key={idx} {...badge} />
        ))}
      </div>
    </div>
  );
}