import { Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { continueLearning } from "@/components/data/dashboard";
import { Button } from "@/components/ui/button";

export function ContinueLearning() {
  return (
    <Card className="lg:col-span-2 border border-cyan-500/10 ">
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {continueLearning.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-primary/15 dark:bg-white/[0.02] p-4"
          >

            <Button className="rounded-full h-14 w-14">
              <Play className="h-5 w-5 fill-black text-black" />
            </Button>

            <div className="flex-1">
              <p className="text-xs text-[#4AA59D] dark:text-primary ">
                {item.category}
              </p>

              <h3 className="mt-1">{item.title}</h3>

              <div className="mt-3 flex items-center gap-3">
                <Progress value={item.progress} />

                <span className="text-xs text-textColor">
                  {item.progress}%
                </span>
              </div>
            </div>

            <span className="text-xs text-textColor">
              {item.time}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


