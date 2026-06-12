import { ArrowRight, Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function ContinueLearning({ data }: any) {
  const navigate = useNavigate();

  return (
    <Card className="lg:col-span-2 border border-cyan-500/10 ">
      <CardHeader>
        <CardTitle>Continue Learning</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 max-h-[350px] overflow-y-auto custom-scrollbar">
        {data?.map((item: any) => (
          <div
            key={item.subjectId}
            className="flex items-center gap-4 rounded-2xl border border-white/5 bg-primary/15 dark:bg-white/[0.02] p-4"
          >

            {/* <Button className="rounded-full h-14 w-14">
              <Play className="h-5 w-5 fill-black text-black" />
            </Button> */}
            <Button
              onClick={() =>
                navigate(`/dashboard/course-details/${item.subjectId}`)
              }
              className="rounded-full px-4 h-12 flex items-center gap-2"
            >

              <ArrowRight className="h-4 w-4" />
            </Button>


            <div className="flex-1">
              <p className="text-xs text-[#4AA59D] dark:text-primary ">
                {item?.subject}
              </p>

              <h3 className="mt-1">{item?.title}</h3>

              <div className="mt-3 flex items-center gap-3">
                <Progress value={item.percent} />

                <span className="text-xs text-textColor">
                  {item?.percent}%
                </span>
              </div>
            </div>

            <span className="text-xs text-textColor">
              {item?.timeLeftMinutes}m
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


