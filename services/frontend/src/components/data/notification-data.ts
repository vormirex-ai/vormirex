import { Trophy, Flame, CheckCircle2, CalendarDays, Star } from "lucide-react";


export const notificationTabs = [
  "All",
  "Unread",
  "Achievements",
  "Lessons",
  "Reminders",
  "AI Recommendations",
  "System Updates",
];

export const notificationIcons: any = {
  achievement: {
    icon: Trophy,
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  streak: {
    icon: Flame,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  completed: {
    icon: CheckCircle2,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  reminder: {
    icon: CalendarDays,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },


  xp: {
    icon: Star,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-yellow-400",
  },
};