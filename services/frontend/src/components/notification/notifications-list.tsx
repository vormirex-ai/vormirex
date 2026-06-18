import { useEffect, useRef } from "react";
import {
  Trophy,
  Sparkles,
  Bell,
  CalendarDays,
} from "lucide-react";


import { Card, CardContent } from "@/components/ui/card";
import { useReadNotificationMutation } from "@/store/api/notificationsApi";
import { notificationIcons } from "../data/notification-data";
import { useSearchParams } from "react-router-dom";
import { AppSkeletonCard } from "../skeleton/card-skeleton";


interface Props {
  activeTab?: string;
  notifications: any[];
  isLoading?: boolean;
  onSelect?: (item: any) => void;
}


const tabTypeMap: Record<string, string | null> = {
  All: null,
  Unread: "unread",
  Achievements: "achievement",
  Lessons: "completed",
  Reminders: "reminder",
  "AI Recommendations": "ai",
  "System Updates": "system",
};


const NotificationsList = ({
  activeTab = "All",
  notifications,
  isLoading,
  onSelect,

}: Props) => {
  const [readNotification] = useReadNotificationMutation();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const filterType = tabTypeMap[activeTab];

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter((item) => {
        if (activeTab === "Unread") return !item.isRead;
        return item.type === filterType;
      });


  const handleReadNotification = async (id: string, isRead: boolean) => {
    if (!isRead) {
      try {
        const response = await readNotification(id).unwrap();

        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (selectedId && itemRefs.current[selectedId]) {
      itemRefs.current[selectedId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedId, filteredNotifications]);


  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
         <AppSkeletonCard/>
         <AppSkeletonCard/>
        </CardContent>
      </Card>
    );
  }
  if (!filteredNotifications.length) {
    return (
      <Card>
        <CardContent className="p-24 text-center">
          <Bell className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold">
            No Notifications
          </h3>
        </CardContent>
      </Card>
    );
  }


  return (
    <div className="space-y-4">
      {filteredNotifications.map((item: any) => {
        const config =
          notificationIcons[item.type] ||
          notificationIcons.achievement;
        const Icon = config.icon;
        const isSelected = selectedId === item._id;

        return (
          <Card
            key={item._id}
            ref={(el) => void (itemRefs.current[item._id] = el)}

            onClick={() => {
              handleReadNotification(item._id, item.isRead);
              onSelect?.(item);
            }}
            className={`cursor-pointer transition hover:shadow-sm
              ${!item.isRead ? "bg-primary/5" : ""}
              ${isSelected ? "bg-primary/15 border-l-4 border-primary" : ""}
            `}
          >
            <CardContent className="p-5 flex gap-4">
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-xl ${config.iconBg}`}
              >
                <Icon
                  className={`h-5 w-5 ${config.iconColor}`}
                />
              </div>


              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>


                  {!item.isRead && (
                    <span className="h-2 w-2 bg-primary rounded-full" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {item.message}
                </p>

                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


export default NotificationsList;
