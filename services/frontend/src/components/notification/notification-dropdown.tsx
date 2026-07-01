import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
  notificationsApi,
} from "@/store/api/notificationsApi";


import NotificationCard from "./notification-card";
import { useSelector } from "react-redux";
import { store } from "@/store/store";


const NotificationDropdown = () => {
  const navigate = useNavigate();


  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const { data, isLoading } = useGetNotificationsQuery({
    page: 1,
    limit: 10,
  });


  const [readAllNotifications, { isLoading: isReading }] =
    useReadAllNotificationsMutation();


  const token = useSelector((state: any) => state.auth.token);


  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };


    checkScreen();


    window.addEventListener("resize", checkScreen);


    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);


  // SSE REAL TIME CONNECTION
  useEffect(() => {
    if (!token) return;


    const eventSource = new EventSource(
      `https://vormirex-backend.vercel.app/api/notifications/stream?token=${token}`,
    );


    eventSource.onopen = () => {
      console.log("SSE Connected");
    };


    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);


      store.dispatch(
        notificationsApi.util.updateQueryData(
          "getNotifications",
          undefined,
          (draft: any) => {
            if (!draft?.notifications) return;


            draft.notifications.unshift(newNotification);
            draft.unreadCount = (draft.unreadCount || 0) + 1;
          },
        ),
      );
    };


    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };


    return () => {
      eventSource.close();
    };
  }, [token]);


  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;


  const handleNavigate = () => {
    setOpen(false);
    navigate("/dashboard/notifications");
  };


  const handleReadAll = async () => {
    try {
      await readAllNotifications(undefined).unwrap();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="relative">
          <Bell size={18} />


          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>


      <DropdownMenuContent
        align={isMobile ? "center" : "end"}
        sideOffset={8}
        className="w-[95vw] max-w-[380px] p-0 rounded-xl"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div>
            <p className="font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount} unread
            </p>
          </div>


          <button
            onClick={handleReadAll}
            disabled={isReading || unreadCount === 0}
            className="text-sm text-primary disabled:opacity-50"
          >
            Mark all read
          </button>
        </div>


        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <p className="p-4 text-sm">Loading...</p>
          ) : notifications.length > 0 ? (
            notifications.map((item: any) => (
              <NotificationCard key={item._id} item={item} setOpen={setOpen} />
            ))
          ) : (
            <p className="p-4 text-sm">No notifications</p>
          )}
        </div>


        {notifications.length > 4 && (
          <button
            onClick={handleNavigate}
            className="w-full py-3 text-sm border-t hover:bg-muted transition hover:text-primary"
          >
            View all notifications →
          </button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


export default NotificationDropdown;