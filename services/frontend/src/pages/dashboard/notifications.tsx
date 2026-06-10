import { useState } from "react";

import NotificationsHeader from "@/components/notification/notification-header";
import NotificationsStats from "@/components/notification/notifications-stats";
import NotificationsTabs from "@/components/notification/notifications-tabs";
import NotificationsList from "@/components/notification/notifications-list";
import NotificationsSidebar from "@/components/notification/notifications-sidebar";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto  space-y-6">
        <NotificationsHeader />

        <NotificationsStats />

        <NotificationsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
          <NotificationsList activeTab={activeTab} />

          <NotificationsSidebar />
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;