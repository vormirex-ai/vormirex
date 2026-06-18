import { Button } from "@/components/ui/button";
import { notificationTabs } from "../data/notification-data";


interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}


const NotificationsTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {notificationTabs.map((tab) => (
        <Button
          key={tab}
          size="sm"
          variant={
            activeTab === tab ? "default" : "outline"
          }
          className="rounded-full"
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
};


export default NotificationsTabs;
