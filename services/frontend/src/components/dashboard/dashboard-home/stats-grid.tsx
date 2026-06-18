import { StatCard } from "./dashboard-stats-cards";
import {
  Flame,
  Trophy,
  Clock3,
  Target,
  Zap,
} from "lucide-react";

const statsConfig = {
  dailyStreak: {
    title: "Daily Streak",
    icon: Flame,
    suffix: "days",
    badge: "+3 this week",
    iconBg: "bg-gradient-to-br from-orange-400 via-red-400 to-pink-500",
    iconColor: "text-white",
  },
  xpPoints: {
    title: "XP Points",
    icon: Zap,
    badge: "+120 today",
    suffix: "",
    iconBg: "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500",
    iconColor: "text-black",
  },
  totalStudyTime: {
    title: "Study Time",
    icon: Clock3,
    suffix: "hrs",
    badge: "+3.2 today",
    iconBg: "bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500",
    iconColor: "text-white",
  },
  overallCompletion: {
    title: "Completion",
    icon: Target,
    suffix: "%",
    badge: "+4 this week",
    iconBg: "bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-500",
    iconColor: "text-white",
  },
};

type StatsKey = keyof typeof statsConfig;

type StatsGridProps = {
  data: any;
  className?: string;
};

export function StatsGrid({ data, className }: StatsGridProps) {
  if (!data) return null;

  return (
    <div className={className ?? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"}>
      {Object.entries(data).map(([key, value]) => {
        const config = statsConfig[key as StatsKey];

        return (
          <StatCard
            key={key}
            title={config.title}
            value={(value as any).value}
            suffix={config.suffix}
            badge={config.badge}
            icon={config.icon}
            iconColor={config.iconColor}
            iconBg={config.iconBg}
          />
        );
      })}
    </div>
  );
}