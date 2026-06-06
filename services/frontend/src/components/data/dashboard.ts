import {
  Flame,
  Target,
  Clock3,
  Zap,
  CheckCircle2,
  Brain,
  MessageCircle,
  Trophy,
} from "lucide-react";

export const stats = [
  {
    title: "Daily Streak",
    value: "12",
    suffix: "Days",
    icon: Flame,
    badge: "3 days this week",
    iconBg: "bg-gradient-to-br from-orange-400 via-red-400 to-pink-500",
    iconColor: "text-white",
  },
  {
    title: "Overall Completion",
    value: "68",
    suffix: "%",
    icon: Target,
    badge: "4% this week",
    iconBg: "bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-500",
    iconColor: "text-white",
  },
  {
    title: "Total Study Time",
    value: "124",
    suffix: "h",
    icon: Clock3,
    badge: "3.2h today",
    iconBg: "bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-500",
    iconColor: "text-white",
  },
  {
    title: "XP Points",
    value: "2,840",
    suffix: "P",
    icon: Zap,
    badge: "120 today",
    iconBg: "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500",
    iconColor: "text-black",
  },
];

export const weeklyData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 40 },
  { day: "Thu", value: 82 },
  { day: "Fri", value: 58 },
  { day: "Sat", value: 96 },
  { day: "Sun", value: 72 },
];

export const subjects = [
  {
    title: "Mathematics",
    progress: 73,
    color: "bg-cyan-400",
  },
  {
    title: "Python Coding",
    progress: 68,
    color: "bg-blue-500",
  },
  {
    title: "Physics",
    progress: 47,
    color: "bg-emerald-400",
  },
];

export const continueLearning = [
  {
    title: "Calculus Integration Techniques",
    category: "MATHEMATICS",
    progress: 62,
    time: "18 min left",
  },
  {
    title: "Python Object-Oriented Programming",
    category: "CODING",
    progress: 41,
    time: "32 min left",
  },
];

// dashboard.ts

import { Lightbulb, Sparkles, ListChecks } from "lucide-react";

export const recommendations = [
  {
    title: "Review Integration by Parts",
    tag: "Weak Spot",

    icon: Lightbulb,

    iconBg: "bg-yellow-500/10",
    iconBorder: "border-yellow-500/20",
    iconColor: "text-yellow-400",

    tagBg: "bg-yellow-500/10",
    tagColor: "text-yellow-300",
  },

  {
    title: "Practice Python Decorators",
    tag: "Recommended",

    icon: Sparkles,

    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    iconColor: "text-violet-400",

    tagBg: "bg-violet-500/10",
    tagColor: "text-violet-300",
  },

  {
    title: "Take Weekly Quiz",
    tag: "New",

    icon: ListChecks,

    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",

    tagBg: "bg-blue-500/10",
    tagColor: "text-blue-300",
  },
];

export const activities = [
  {
    title: "Completed Calculus Quiz",
    subtitle: "Score 8/10",
    time: "2h ago",
    icon: CheckCircle2,

    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    iconColor: "text-emerald-400",

    lineColor: "bg-emerald-500/20",
  },

  {
    title: "Physics Basics Quiz",
    subtitle: "Score 7/10",
    time: "5h ago",
    icon: Brain,

    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",

    lineColor: "bg-blue-500/20",
  },

  {
    title: "AI Chat about Newton's Laws",
    subtitle: "12 messages",
    time: "Yesterday",
    icon: MessageCircle,

    iconBg: "bg-violet-500/10",
    iconBorder: "border-violet-500/20",
    iconColor: "text-violet-400",

    lineColor: "bg-violet-500/20",
  },

  {
    title: "10-Day Study Achievement",
    subtitle: "Badge unlocked",
    time: "2 days ago",
    icon: Trophy,

    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
    iconColor: "text-amber-400",

    lineColor: "bg-amber-500/20",
  },
];
