import { Zap } from "lucide-react";

type Props = {
  isPro?: boolean;
  dayStreak?: number;
  xpPoints?: number;
  level?: number;
  percentile?: string | number;
};

export function ProfileStatsBadges({
  isPro,
  dayStreak,
  xpPoints,
  level,
  percentile,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold my-2">
      {isPro && (
        <span className="bg-primary/5 border border-primary px-2 py-0.5 rounded-full">
          Pro Member
        </span>
      )}

      <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/30 text-amber-600 dark:text-amber-500">
        🔥 {dayStreak} Day Streak
      </span>

      <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/30 text-cyan-700 dark:text-cyan-400 flex items-center gap-1">
        <Zap className="w-3 h-3" />
        {xpPoints} XP
      </span>

      <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/30 text-purple-600 dark:text-purple-400">
        🏆 Level {level}
      </span>

      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400">
        {percentile}
      </span>
    </div>
  );
}