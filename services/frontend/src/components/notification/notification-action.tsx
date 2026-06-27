import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";


import { useClearNotificationsMutation,useLazyExportNotificationsQuery} from "@/store/api/notificationsApi";


const NotificationActions = () => {
  const [clearNotifications, { isLoading }] = useClearNotificationsMutation();
  const [triggerExport] = useLazyExportNotificationsQuery();


  const handleClear = async () => {
    try {
      await clearNotifications(undefined).unwrap();
      toast.success("Notifications cleared");
    } catch (err) {
      toast.error("Failed to clear notifications");
      console.error(err);
    }
  };




  const handleExport = async () => {
    try {
      const response = await triggerExport(undefined).unwrap();
      const data = Array.isArray(response) ? response : [response];


      const formattedData = data.map((item) => ({
        Title: item.title,
        Message: item.message,
        Type: item.type,
        Read: item.isRead ? "Yes" : "No",
        XP_Earned: item.metadata?.xpEarned || 0,
        Subject_ID: item.metadata?.subjectId || "",
        Created_At: new Date(item.createdAt).toLocaleString(),
        Updated_At: new Date(item.updatedAt).toLocaleString(),
      }));


      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Notifications");
      XLSX.writeFile(workbook, "notifications.xlsx");


      toast.success("Excel exported successfully");
    } catch (err) {
      toast.error("Export failed");
      console.error(err);
    }
  };


  return (
    <div className="mt-5 flex flex-col gap-2">
      <Button
        variant="outline"
        className="justify-start rounded-lg"
        onClick={handleExport}
      >
        Export Activity
      </Button>


      <div
        onClick={handleClear}
        className="flex items-center gap-2 text-red-500 font-semibold mt-2 hover:bg-red-600 hover:text-white rounded-lg p-3 cursor-pointer"
      >
        <Trash2 className="h-4 w-4" />
        <span>{isLoading ? "Clearing..." : "Clear History"}</span>
      </div>
    </div>
  );
};


export default NotificationActions;
