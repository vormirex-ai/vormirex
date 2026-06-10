import {
  ArrowRight,
  Bell,
} from "lucide-react";



import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notifications } from "../data/notification-data";

interface Props {
  activeTab?: string;
}

const NotificationsList = ({
  activeTab = "All",
}: Props) => {
  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : notifications.filter(
        (item) => item.category === activeTab
      );

  if (!filteredNotifications.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border bg-background shadow-lg">
              <Bell className="h-9 w-9 text-primary" />
            </div>
          </div>

          <h3 className="text-xl font-semibold">
            No Notifications Yet
          </h3>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            We'll notify you when there are learning
            updates, reminders or recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {filteredNotifications.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.id}
            className="transition-all duration-200 hover:shadow-sm"
          >
            <CardContent className="p-5">
              <div className="flex gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${item.iconColor}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {item.title}
                        </h3>

                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>

                      <p className="mt-3 text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                    >
                      {item.action}

                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default NotificationsList;