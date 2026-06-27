import {
  Brain,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { recommendationStyles } from "@/components/data/dashboard";

export function AIRecommendations({ data }: any) {

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

      <CardContent className="space-y-3  max-h-[350px] overflow-y-auto custom-scrollbar">
        {data?.map((item: any) => {
          const style =
            recommendationStyles[
            item.tag as keyof typeof recommendationStyles
            ];

          const Icon = style?.icon ?? Sparkles;

          return (
            <div
              key={item.title}
              className="group flex items-center justify-between rounded-2xl border dark:border-white/5 border-primary bg-primary/5 dark:bg-[#154249]/40 p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border ${style?.iconBorder}`}
                >
                  <Icon
                    className={`h-4 w-4 ${style?.iconColor}`}
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </h4>

                  <div
                    className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${style?.tagBg} ${style?.tagColor}`}
                  >
                    {item.tag}
                  </div>
                </div>
              </div>

              <ArrowUpRight className="h-4 w-4" />
            </div>
          );
        })}

      </CardContent>
    </Card>
  );
}