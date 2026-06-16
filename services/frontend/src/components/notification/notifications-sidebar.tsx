import {
  Flame,
  Trophy,
  BookOpen,
  Trash2,
} from "lucide-react";


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


      {/* <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold">
            Recent Achievements
          </h3>


          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3 rounded-full custom-surface  p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>


              <div>
                <p className="text-sm font-medium">
                  12-Day Streak
                </p>


                <p className="text-xs text-muted-foreground">
                  Consistency
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3 rounded-full custom-surface p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500/10">
                <Trophy className="h-5 w-5 text-pink-500" />
              </div>


              <div>
                <p className="text-sm font-medium">
                  Top 5% Rank
                </p>


                <p className="text-xs text-muted-foreground">
                  Leaderboard
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3 rounded-full custom-surface  p-3">
              <div className="flex h-10 w-10 items-center justify-center  bg-blue-500/10">
                <BookOpen className="h-5 w-5 text-blue-500" />
              </div>


              <div>
                <p className="text-sm font-medium">
                  Python Quiz Master
                </p>


                <p className="text-xs text-muted-foreground">
                  96% score
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}


      {/* Actions */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold">
            Quick Actions
          </h3>

          <div className="mt-5 flex flex-col gap-2">
            <Button
              variant="outline"
              className="justify-start"
            >
              Mark All Read
            </Button>

            <NotificationActions />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default NotificationsSidebar;
