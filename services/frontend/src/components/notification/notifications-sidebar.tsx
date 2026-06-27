import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NotificationActions from "./notification-action";


const NotificationsSidebar = ({ statsData }: any) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold">
            Notification Insights
          </h3>


          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Notifications This Week
              </span>
              <span className="font-medium">{statsData?.insights?.notificationsThisWeek}</span>
            </div>


            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Lessons Completed
              </span>
              <span className="font-medium">{statsData?.insights?.lessonsCompletedCount}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-yellow-600">
              <span>
                XP Earned
              </span>

              <span className="font-medium">{statsData?.insights?.xpEarned}</span>
            </div>


            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Reminders Count
              </span>
              <span className="font-medium">{statsData?.remindersCount}</span>
            </div>


          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-2">
     
            <NotificationActions />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default NotificationsSidebar;
