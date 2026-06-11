import {
  Layers3,
  CheckCircle2,
  RefreshCcw,
  Flame,
  BarChart3,
  Trophy,
  Timer,
  Target,
} from "lucide-react";

export const statConfig: Record<
  string,
  {
    label: string;
    icon: any;
    iconColor: string;
    iconBg: string;
  }
> = {
  totalCards: {
    label: "Total Cards",
    icon: Layers3,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  masteredCount: {
    label: "Mastered",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  dueTodayCount: {
    label: "Due Today",
    icon: RefreshCcw,
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
  },
  streak: {
    label: "Day Streak",
    icon: Flame,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
  },
  totalCardsStudied: {
    label: "Studied",
    icon: BarChart3,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
  },
  totalSessions: {
    label: "Sessions",
    icon: Timer,
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/10",
  },
  decksCompleted: {
    label: "Decks Done",
    icon: Trophy,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
  },
  averageAccuracy: {
    label: "Accuracy %",
    icon: Target,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
};