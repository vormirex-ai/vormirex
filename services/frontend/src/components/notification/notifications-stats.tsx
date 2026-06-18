import {
  Bell,
  Sparkles,
  Trophy,
  CalendarDays,
} from "lucide-react";


import { Card, CardContent } from "@/components/ui/card";


interface Props {
  statsData?: any;
}


const NotificationsStats = ({
  statsData,
}: Props) => {
  const stats = [
    {
      title: "All Notifications",
      label: "total",
      value: statsData?.total || 0,
      icon: Bell,
    },
    {
      title: "Unread",
      label: "new",
      value: statsData?.unreadCount || 0,
      icon: Sparkles,
    },
    {
      title: "Achievements",
      label: "XP earned",
      value:
        statsData?.insights?.xpEarned || 0,
      icon: Trophy,
    },
    {
      title: "Reminders",
      label: "upcoming",
      value:
        statsData?.remindersCount || 0,
      icon: CalendarDays,
    },
  ];


  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;


        return (
          <Card key={index}>
            <CardContent className="items-center justify-between p-5">
              <div className="flex h-11 w-11 mb-3 text-primary bg-primary/20 border border-primary/10 items-center justify-center rounded-2xl">
                <Icon className="h-5 w-5" />
              </div>


              <div>
                <p className="text-2xl font-bold">
                  {item.value}
                </p>


                <p className="mt-1 text-sm">
                  {item.title}
                </p>


                <p className="mt-1 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


export default NotificationsStats;
