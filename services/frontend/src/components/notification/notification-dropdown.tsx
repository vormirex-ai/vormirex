import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { notifications } from "./notification-card";
import NotificationCard from "./notification-card";

const NotificationDropdown = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setOpen(false);

    navigate("/dashboard/notifications");
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="relative">
          <Bell size={18} />

          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[380px] p-0 rounded-2xl overflow-hidden custom-scrollbar border border-border bg-background"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-base">
            Notifications
          </h3>

          <button className="text-sm text-primary hover:underline">
            Mark all read
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {notifications.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
            />
          ))}
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