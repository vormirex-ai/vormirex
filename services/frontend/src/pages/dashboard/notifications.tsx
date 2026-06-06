import {
  Trophy,
  Flame,
  CheckCircle2,
  CalendarDays,
  Star,
  Bell,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "+120 XP earned",
    description: "Completed Python Quiz",
    time: "2 minutes ago",
    icon: Star,
    iconBg: "bg-emerald-500/15",
    iconColor: "text-yellow-400",
  },
  {
    id: 2,
    title: "Lesson completed",
    description: "Derivatives & Rules Ch. 4",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconBg: "bg-blue-500/15",
    iconColor: "text-green-400",
  },
  {
    id: 3,
    title: "12-day streak!",
    description: "Keep going — you're on fire!",
    time: "Today, 8:00 AM",
    icon: Flame,
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
  },
  {
    id: 4,
    title: "Reminder",
    description: "Physics lesson scheduled for today 6 PM",
    time: "Yesterday, 9:00 PM",
    icon: CalendarDays,
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
  },
  {
    id: 5,
    title: "Rank up!",
    description: "You're now in the top 5% of learners",
    time: "2 days ago",
    icon: Trophy,
    iconBg: "bg-pink-500/15",
    iconColor: "text-yellow-400",
  },
];

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Notifications
          </h1>

          <p className="text-muted-foreground mt-1 text-sm">
            Stay updated with your learning activity
          </p>
        </div>

        <button className="h-10 px-4 rounded-xl border border-border bg-card hover:bg-primary-gradient  hover:text-slateText transition text-sm font-medium">
          Mark all as read
        </button>
      </div>

      {/* Notification Card */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">

        {notifications.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`flex items-start gap-4 p-5 hover:bg-primary/10 transition cursor-pointer ${index !== notifications.length - 1
                ? "border-b border-border"
                : ""
                }`}
            >
              {/* Icon */}
              <div
                className={`min-w-12 h-12 rounded-2xl flex items-center justify-center ${item.iconBg}`}
              >
                <Icon
                  className={`w-5 h-5 ${item.iconColor}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h3 className="text-sm md:text-[15px] font-semibold text-foreground leading-6">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1 leading-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State Example */}
      {/* 
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <Bell className="w-9 h-9 text-primary" />
        </div>

        <h3 className="text-xl font-semibold">
          No notifications yet
        </h3>

        <p className="text-muted-foreground text-sm mt-2">
          We'll notify you when something arrives
        </p>
      </div>
      */}
    </div>
  );
};

export default NotificationsPage;