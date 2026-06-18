import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import { useReadAllNotificationsMutation } from "@/store/api/notificationsApi";


interface Props {
  unreadCount: number;
}


const NotificationsHeader = ({
  unreadCount,
}: Props) => {
  const [readAllNotifications, { isLoading }] =
    useReadAllNotificationsMutation();


  const handleReadAll = async () => {
    try {
      await readAllNotifications(undefined).unwrap();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-2">
            Notifications
          </h1>


          <Badge
            variant="secondary"
            className="rounded-full"
          >
            {unreadCount}
          </Badge>
        </div>


        <p className="mt-2 text-sm text-muted-foreground">
          Stay updated with your learning progress,
          achievements, reminders and system updates.
        </p>
      </div>


      <Button
        onClick={handleReadAll}
        disabled={isLoading || unreadCount === 0}
      >
        Mark All As Read
      </Button>
    </div>
  );
};


export default NotificationsHeader;
