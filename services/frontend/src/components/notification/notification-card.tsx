import {
  Trophy,
  Flame,
  CheckCircle2,
  CalendarDays,
  Star,
} from "lucide-react";

import { useReadNotificationMutation } from "@/store/api/notificationsApi";

const notificationIcons: any = {
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

interface Props {
  item: any;
}

const NotificationCard = ({ item }: Props) => {
  const [readNotification] = useReadNotificationMutation();

  const config =
    notificationIcons[item.type] || notificationIcons.achievement;

  const Icon = config.icon;

  const handleReadNotification = async () => {
    if (item.isRead) {
      console.log("already read");
      return;
    }

    try {
      const response = await readNotification(item._id).unwrap();

      console.log("API response:", response);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div
      onClick={handleReadNotification}
      className={`flex items-start gap-4 p-4 border-b border-border hover:bg-primary/10 transition cursor-pointer ${!item.isRead ? "bg-primary/5" : ""
        }`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.iconBg}`}
      >
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
      </div>


      <div className="flex-1">
        <h4 className="text-sm font-semibold text-foreground line-clamp-1">
          {item.title}
          <span className="text-muted-foreground font-normal text-xs ">
            {" "}
            —     {item.message}
          </span>
        </h4>

        <p className="text-xs text-muted-foreground mt-1">
          {new Date(item.createdAt).toLocaleString()}
        </p>

      </div>

      {!item.isRead && (
        <span className="w-2 h-2 rounded-full bg-primary mt-2 " />
      )}
    </div>

  );
};

export default NotificationCard;