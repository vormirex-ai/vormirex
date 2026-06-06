import {
  Trophy,
  Flame,
  CheckCircle2,
  CalendarDays,
  Star,
} from "lucide-react";

export const notifications = [
  {
    id: 1,
    title: "+120 XP earned",
    description: "Completed Python Quiz",
    time: "2 minutes ago",
    icon: Star,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-yellow-400",
  },
  {
    id: 2,
    title: "Lesson completed",
    description: "Derivatives & Rules Ch. 4",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconBg: "bg-blue-500/20",
    iconColor: "text-green-400",
  },
  {
    id: 3,
    title: "12-day streak!",
    description: "Keep going — you're on fire!",
    time: "Today, 8:00 AM",
    icon: Flame,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    id: 4,
    title: "Reminder",
    description: "Physics lesson scheduled for today 6 PM",
    time: "Yesterday, 9:00 PM",
    icon: CalendarDays,
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    id: 5,
    title: "Rank up!",
    description: "You're now in the top 5% of learners",
    time: "2 days ago",
    icon: Trophy,
    iconBg: "bg-pink-500/20",
    iconColor: "text-yellow-400",
  },
];



interface Props {
  item: (typeof notifications)[0];
}

const NotificationCard = ({ item }: Props) => {
  const Icon = item.icon;

  return (
    <div className="flex items-start gap-4 p-4 border-b border-border hover:bg-primary/10 transition cursor-pointer">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconBg}`}
      >
        <Icon className={`w-5 h-5 ${item.iconColor}`} />
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-foreground">
          {item.title}
          <span className="text-muted-foreground font-normal">
            {" "}
            — {item.description}
          </span>
        </h4>

        <p className="text-xs text-muted-foreground mt-1">
          {item.time}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;