import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import NotificationsHeader from "@/components/notification/notification-header";
import NotificationsStats from "@/components/notification/notifications-stats";
import NotificationsTabs from "@/components/notification/notifications-tabs";
import NotificationsList from "@/components/notification/notifications-list";
import NotificationsSidebar from "@/components/notification/notifications-sidebar";
import NotificationDetailsById from "@/components/notification/notification-details-by-id";

import {
  useGetNotificationsQuery,
  useGetNotificationStatsQuery,
} from "@/store/api/notificationsApi";

import { useGetSubjectsQuery } from "@/store/api/subjectsApi";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const notificationId = searchParams.get("notificationId");
  const { data, isLoading } = useGetNotificationsQuery(undefined);
  const { data: statsData } = useGetNotificationStatsQuery(undefined);
  const { data: subjectsData } = useGetSubjectsQuery(undefined);
  const notifications = data?.notifications || [];
  const subjects = subjectsData?.subjects || subjectsData?.data || [];

  const getSubjectById = (id: string) => {
    return subjects.find((s: any) => s._id === id);
  };

  const selectedNotification = notifications.find(
    (n: any) => n._id === notificationId
  );

  const handleBack = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("notificationId");
      return params;
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto space-y-6">

        {notificationId && selectedNotification ? (
          <div className="space-y-6">

            <button
              onClick={handleBack}
              className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
            >
              ← Back
            </button>

            <NotificationsHeader
              unreadCount={data?.unreadCount || 0}
            />
               <NotificationsStats statsData={statsData} />
            <NotificationDetailsById
              notification={selectedNotification}
              getSubjectById={getSubjectById}
            />
          </div>
        ) : (
          <>

            <NotificationsHeader
              unreadCount={data?.unreadCount || 0}
            />

            <NotificationsStats statsData={statsData} />

            <NotificationsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
              <div className=" max-h-[540px] overflow-y-auto custom-scrollbar">
              <NotificationsList
                activeTab={activeTab}
                notifications={notifications}
                isLoading={isLoading}
                onSelect={(item: any) => {
                  setSearchParams((prev) => {
                    const params = new URLSearchParams(prev);
                    params.set("notificationId", item._id);
                    return params;
                  });
                }}
              />
</div>
              <NotificationsSidebar statsData={statsData} />
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default NotificationsPage;