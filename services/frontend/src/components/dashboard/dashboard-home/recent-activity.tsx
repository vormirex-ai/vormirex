import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { activities } from "@/components/data/dashboard";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold ">
            Recent Activity
          </CardTitle>

          <p className="text-sm text-slate-400">
            Your last sessions
          </p>
        </div>

        <button className="text-xs text-violet-600 dark:text-violet-300 dark:hover:text-violet-200 transition-colors">
          See timeline
        </button>
      </CardHeader>

      <CardContent className="space-y-6">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-start justify-between"
            >
              <div className="flex gap-4">

                <div className="relative flex flex-col items-center">
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border ${item.iconBorder} ${item.iconBg} backdrop-blur-sm`}
                  >
                    <Icon
                      className={`h-4 w-4 ${item.iconColor}`}
                    />
                  </div>

                  {index !== activities.length - 1 && (
                    <div
                      className={`absolute top-10 h-[38px] w-px ${item.lineColor}`}
                    />
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium ">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-textColor">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <span className="text-xs text-textColor">
                {item.time}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}