import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import NotificationCard from "./notification-card";

import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
} from "@/store/api/notificationsApi";

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetNotificationsQuery(undefined);
  const [readAllNotifications, { isLoading: isReading }] =
    useReadAllNotificationsMutation();

  const notifications = data?.notifications || [];

  const unreadCount = data?.unreadCount || 0;

  const handleNavigate = () => {
    setOpen(false);
    navigate("/dashboard/notifications");
  };

  const handleReadAll = async () => {

  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="relative"
        >
          <Bell size={18} />

          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0 rounded-2xl overflow-hidden custom-scrollbar border border-border bg-background"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-base">
              Notifications
            </h3>

            <p className="text-xs text-muted-foreground">
              {unreadCount} unread notifications
            </p>
          </div>

          <button
            onClick={handleReadAll}
            disabled={isReading || unreadCount === 0}
            className="text-sm text-primary hover:underline disabled:opacity-50"
          >
            Mark all read
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {isLoading ? (
            <div className="p-5 text-sm text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((item: any) => (
              <NotificationCard
                key={item._id}
                item={item}
              />
            ))
          ) : (
            <div className="p-5 text-sm text-center text-muted-foreground">
              No notifications found
            </div>
          )}
        </div>

        <button
          onClick={handleNavigate}
          className="w-full py-4 text-sm font-medium dark:text-primary text-cyan-500 hover:text-blue-500 border-t border-border transition"
        >
          View all notifications →
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;