import { useReadNotificationMutation } from "@/store/api/notificationsApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notificationIcons } from "../data/notification-data";


interface Props {
  item: any;
}

const NotificationCard = ({ item, setOpen }: any) => {
  const navigate = useNavigate();
  const [readNotification] = useReadNotificationMutation();
  const config = notificationIcons[item.type] || notificationIcons.achievement;
  const Icon = config.icon;


  const handleReadNotification = async () => {
    try {
      setOpen?.(false);
      if (!item.isRead) {
        await readNotification(item._id).unwrap();
      }
navigate(`/dashboard/notifications?notificationId=${item._id}`);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      onClick={handleReadNotification}
      className={`flex items-start gap-4 p-4 border-b border-border hover:bg-primary/10 transition cursor-pointer ${!item.isRead ? "bg-primary/5" : ""
        }`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${config.iconBg}`}
      >
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
      </div>




      <div className="flex-1">
        <h4 className="text-sm font-semibold text-foreground line-clamp-1">
          {item.title}
          <span className="text-muted-foreground font-normal text-xs ">
            {" "}
            —     {item.message}
          </span>
        </h4>


        <p className="text-xs text-muted-foreground mt-1">
          {new Date(item.createdAt).toLocaleString()}
        </p>


      </div>


      {!item.isRead && (
        <span className="w-2 h-2 rounded-full bg-primary mt-2 " />
      )}
    </div>


  );
};


export default NotificationCard;






