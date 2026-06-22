import {
  Lightbulb,
  Sparkles,
  ListChecks,
  CheckCircle2,
  Brain,
  MessageCircle,
  Trophy,
  BookOpen,
} from "lucide-react";
import { Flame, Clock3, Target, Zap } from "lucide-react";

export const recommendationStyles = {
  "Weak Spot": {
    icon: Lightbulb,
    iconBg: "bg-yellow-500/10",
    iconBorder: "border-yellow-500/20",
    iconColor: "text-yellow-400",
    tagBg: "bg-yellow-500/10",
    tagColor: "text-yellow-300",
  },

  Recommended: {
    icon: Sparkles,
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    iconColor: "text-violet-400",
    tagBg: "bg-violet-500/10",
    tagColor: "text-violet-300",
  },

  New: {
    icon: ListChecks,
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",
    tagBg: "bg-blue-500/10",
    tagColor: "text-blue-300",
  },
};

export const recentActivityConfig: Record<string, any> = {
  flashcard: {
    icon: BookOpen,
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    lineColor: "bg-emerald-500/20",
  },

  quiz: {
    icon: Brain,
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",
    lineColor: "bg-blue-500/20",
  },

  challenge: {
    icon: Trophy,
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconColor: "text-amber-400",
    lineColor: "bg-amber-500/20",
  },

  chat: {
    icon: MessageCircle,
    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    iconColor: "text-violet-400",
    lineColor: "bg-violet-500/20",
  },

  default: {
    icon: CheckCircle2,
    iconBg: "bg-gray-500/10",
    iconBorder: "border-gray-500/20",
    iconColor: "text-gray-400",
    lineColor: "bg-gray-500/20",
  },
};

export const dashboardStatsConfig = {
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

export const profileStatsConfig = [
    {
    key: "dayStreak",
    title: "Daily Streak",
    icon: Flame,
    suffix: "days",
    iconBg:
      "bg-gradient-to-br from-orange-400 via-red-400 to-pink-500",
    iconColor: "text-white",
  },
  {
    key: "totalStudyTime",
    title: "Study Time",
    icon: Clock3,
    suffix: "hrs",
    iconBg:
      "bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500",
    iconColor: "text-white",
  },
  {
    key: "activeSubjects",
    title: "Active Subjects",
    icon: Target,
    iconBg:
      "bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-500",
    iconColor: "text-white",
  },
  {
    key: "xpPoints",
    title: "XP Points",
    icon: Zap,
    iconBg:
      "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500",
    iconColor: "text-black",
  },
];