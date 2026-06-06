import {
  Brain,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { recommendations } from "@/components/data/dashboard";

export function AIRecommendations() {
  return (
    <Card >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-lg">
            <Brain className="h-5 w-5 text-black" />
          </div>

          <div>
            <CardTitle className="text-lg font-semibold">
              AI Recommendations
            </CardTitle>

            <p className="text-sm text-slate-400">
              Personalized for you
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {recommendations.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group flex items-center justify-between rounded-2xl border dark:border-white/5 border-primary bg-primary/5 dark:bg-[#154249]/40  p-4 transition-all duration-300 hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${item.iconBorder} ${item.iconBg}`}
                >
                  <Icon
                    className={`h-4 w-4 ${item.iconColor}`}
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium ">
                    {item.title}
                  </h4>

                  <div
                    className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${item.tagBg} ${item.tagColor}`}
                  >
                    {item.tag}
                  </div>
                </div>
              </div>

              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] text-textColor transition-all duration-300  group-hover:translate-x-0.5">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}